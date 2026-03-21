# Notas de Implementação do Supabase

Este documento explica como o código frontend atual usa o Supabase.

## Inicialização do cliente

`src/services/supabaseService.ts`:

- Lê `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
- Cria cliente tipado com `Database` de `src/supabase.types.ts`

## Caminho de persistência usado pelo app

Quando o wizard completa:

1. Confirmação de contato é disparada imediatamente via `send-contact-confirmation`.
2. Diagnóstico é gerado via Edge Function.
3. Lead + diagnóstico são salvos via RPC:

```ts
supabase.rpc('save_lead_with_diagnosis', payload)
```

Os campos do payload são mapeados de `LeadData` e `DiagnosisResult`.

## API de serviços no codebase

Helpers disponíveis em `src/services/supabaseService.ts`:

- `saveLead(data, diagnosis)`
- `fetchLeadByEmail(email)`
- `fetchAllLeads(limit, offset)`
- `updateLeadStatus(leadId, status)`
- `deleteLead(leadId)`

Barrel export: `src/services/index.ts`.

## Contrato de banco de dados tipado

`src/supabase.types.ts` define:

- Tabelas:
  - `leads`
  - `diagnoses`
  - `recommendations`
  - `grounding_sources`
- Function:
  - `save_lead_with_diagnosis`

O app atualmente escreve via RPC e lê diretamente pelos helpers `leads` e `diagnoses`.

## Estratégia de tratamento de erros

- `saveLead` lança exceção em caso de erro no RPC.
- Em `App.tsx`, save e email rodam com `Promise.allSettled`.
- Falha no save ou email loga o erro mas não bloqueia a renderização do relatório após geração do diagnóstico.
- `sendContactConfirmation` roda antes do diagnóstico e também não bloqueia o fluxo principal.

## Implicações práticas

- O usuário recebe o relatório desde que a geração do diagnóstico seja bem-sucedida.
- Problemas de persistência ou e-mail são efeitos colaterais não-bloqueantes.
- Falha na geração do diagnóstico retorna ao wizard com mensagem de erro.
- A confirmação de contato garante que o lead e o time são notificados independentemente do diagnóstico.

## Nota de segurança

As configs das Edge Functions usam `verify_jwt = false`. Trate isso como uma escolha operacional intencional e revise antes do hardening de produção.

## Atualização recente (a11y/performance)

- Modal de time em `AboutSite` agora usa semântica de diálogo (`role="dialog"`, `aria-modal`, foco inicial no botão fechar e fechamento por `Esc`).
- Avatares remotos em componentes visuais receberam `loading="lazy"` e `decoding="async"` para reduzir custo inicial de renderização.
- Ícone decorativo de seleção no wizard recebeu `aria-hidden="true"` para evitar ruído para leitores de tela.

