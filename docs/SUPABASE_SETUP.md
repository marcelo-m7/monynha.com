# Guia de Setup do Supabase

Use este guia para conectar o app ao Supabase e validar a integração.

## 1) Instalar dependências

```bash
pnpm install
```

(`@supabase/supabase-js` já está declarado em `package.json`.)

## 2) Configurar env do frontend

```bash
cp .env.example .env.local
```

Defina:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## 3) Configurar secrets das Edge Functions

Adicione em Supabase Dashboard → Project Settings → Edge Functions → Secrets:

- `GEMINI_API_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `MONYNHA_INTERNAL_EMAIL`

## 4) Deploy das functions

```bash
supabase functions deploy company-search
supabase functions deploy generate-diagnosis
supabase functions deploy send-contact-confirmation
supabase functions deploy send-diagnostic-email
```

## 5) Validar integração do app

Rode o app:

```bash
pnpm dev
```

Depois submeta o wizard e confirme:

1. Confirmação de contato chega ao e-mail do lead e ao time.
2. Diagnóstico aparece no relatório.
3. Persistência do lead ocorre (entrada criada no banco).
4. E-mail de diagnóstico é executado (notificação ao lead + interna).

## Uso opcional no nível de serviço

Exemplos de chamadas do código:

```ts
import { saveLead, fetchLeadByEmail, fetchAllLeads, updateLeadStatus, deleteLead } from './src/services';
```

## Troubleshooting

- `Error saving lead to Supabase`: RPC `save_lead_with_diagnosis` ausente ou payload incorreto.
- `Function returned error`: verifique logs da Edge Function no dashboard do Supabase.
- `Missing GEMINI_API_KEY` / `RESEND_API_KEY`: defina os secrets necessários nas functions.
- Dados não lidos de volta: verifique políticas de tabela e credenciais.

## Configuração de auth das functions

Todos os `config.toml` das functions configuram:

```toml
[function]
verify_jwt = false
```

Planeje o hardening de produção adequadamente.

## Atualização recente (a11y/performance)

- Modal de time em `AboutSite` agora usa semântica de diálogo (`role="dialog"`, `aria-modal`, foco inicial no botão fechar e fechamento por `Esc`).
- Avatares remotos em componentes visuais receberam `loading="lazy"` e `decoding="async"` para reduzir custo inicial de renderização.
- Ícone decorativo de seleção no wizard recebeu `aria-hidden="true"` para evitar ruído para leitores de tela.

