# Arquitetura do Sistema

Este documento descreve a arquitetura atual implementada no codebase.

## Componentes de alto nível

- **Frontend SPA**: app React em `src/`.
- **Persistência de dados**: Supabase acessado via `src/services/supabaseService.ts`.
- **Lógica de negócio server-side**: Supabase Edge Functions em `supabase/functions/`.
- **Provedores externos (server-side)**: Gemini (`@google/genai`) e Resend.

## Máquina de estados do frontend (`src/App.tsx`)

`AppState` controla a navegação e modo de UI:

- `INTRO`
- `LANDING`
- `WIZARD`
- `LOADING`
- `REPORT`
- `ABOUT`
- `LEGAL`

As transições são animadas via `transitionTo(...)` com overlay de 600ms.

## Jornada do usuário

1. Animação de intro (`IntroScene`), depois landing.
2. Landing roteia para o wizard ou página about.
3. Wizard coleta dados do lead em 6 etapas.
4. Ao completar:
   - muda view para `LOADING`
   - chama `sendContactConfirmation(leadData)` — fallback garantido, não bloqueia o fluxo
   - chama `generateDiagnosis(leadData)`
   - chama `saveLead(...)` e `sendDiagnosticEmail(...)` em paralelo (`Promise.allSettled`)
   - loga falhas não-bloqueantes de save/email
   - transiciona para `REPORT` após delay
5. Report pode resetar para landing.

## Comportamento do Wizard (`src/components/Wizard.tsx`)

- Persistência de rascunho: chave `localStorage` `monynha_wizard_draft_v1`.
- Gates de validação:
  - Etapa 1: email válido
  - Etapa 2: nome da marca OU `no_brand=true`
  - Etapa 5: texto de struggle com comprimento >= 10
- Atalhos de teclado:
  - `Enter`: avançar quando válido
  - `Escape`: cancelar

## Camada de serviços (`src/services/`)

- `geminiService.ts`
  - Invoca Edge Function `generate-diagnosis`.
  - Retorna diagnóstico fallback em caso de falha.
- `supabaseService.ts`
  - Cria cliente Supabase com `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.
  - Persiste via RPC: `save_lead_with_diagnosis`.
  - Fornece helpers de fetch/update/delete para leads.
- `resendService.ts`
  - Invoca Edge Function `send-diagnostic-email`.
- `contactConfirmationService.ts`
  - Invoca Edge Function `send-contact-confirmation`.
  - Garante notificação ao lead e ao time independentemente do resultado do diagnóstico.
- `companySearchService.ts`
  - Invoca Edge Function `company-search`.

## Edge Functions

### `generate-diagnosis`

- Valida payload (`leadData.email`, `leadData.struggle`).
- Lê `GEMINI_API_KEY` do ambiente da function.
- Chama modelo Gemini `gemini-3-flash-preview` com:
  - `tools: [{ googleSearch: {} }]`
  - Schema de resposta JSON para output do diagnóstico
- Extrai fontes de grounding dos metadados do candidato.
- Retorna diagnóstico fallback em caso de erro de runtime.

### `send-diagnostic-email`

- Valida payload de lead + diagnóstico.
- Lê:
  - `RESEND_API_KEY`
  - `RESEND_FROM_EMAIL` (fallback: `hello@monynha.com`)
  - `MONYNHA_INTERNAL_EMAIL` (fallback: `hello@monynha.com`)
- Calcula score/classificação do lead.
- Envia dois e-mails com helper de retry simples.

### `send-contact-confirmation`

- Dispara imediatamente ao receber o submit do wizard, antes do diagnóstico.
- Valida payload (`contactData.email`, `contactData.struggle`).
- Lê:
  - `RESEND_API_KEY`
  - `RESEND_FROM_EMAIL` (fallback: `hello@monynha.com`)
  - `MONYNHA_INTERNAL_EMAIL` (fallback: `hello@monynha.com`)
- Envia dois e-mails com helper de retry:
  - confirmação ao lead
  - notificação interna
- Retorna flags `confirmationSent` e `internalSent` para logging.

### `company-search`

- Aceita um ou mais sinais de busca.
- Extração opcional de metadados de website (`title` + `description`) com timeout.
- Normaliza handle do Instagram para formato `@...`.

### Configuração de auth

Todos os `config.toml` das functions usam:

```toml
[function]
verify_jwt = false
```

## Modelo de dados (contrato tipado)

`src/supabase.types.ts` inclui:

- Tabelas: `leads`, `diagnoses`, `recommendations`, `grounding_sources`
- Function: `save_lead_with_diagnosis(...)`

O frontend persiste via RPC e lê diretamente dos helpers `leads` e `diagnoses`.

## Testes e CI

- Testes unitários: Vitest (`tests/unit/`).
- Specs E2E: Playwright em `tests/e2e/`.
- Workflow de CI: `.github/workflows/ci.yml` inclui:
  - job `ci` (lint, testes unitários, build, upload de artefato)
  - job `security` (Trivy scan)

Veja `docs/TESTING.md` e `CI_CD_SUMMARY.md` para detalhes de comandos.

## Atualização recente (a11y/performance)

- Modal de time em `AboutSite` agora usa semântica de diálogo (`role="dialog"`, `aria-modal`, foco inicial no botão fechar e fechamento por `Esc`).
- Avatares remotos em componentes visuais receberam `loading="lazy"` e `decoding="async"` para reduzir custo inicial de renderização.
- Ícone decorativo de seleção no wizard recebeu `aria-hidden="true"` para evitar ruído para leitores de tela.

