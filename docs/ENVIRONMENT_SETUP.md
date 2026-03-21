# Setup de Ambiente

Este guia cobre variáveis de ambiente do frontend, secrets do Supabase e workflow local de functions.

## 1) Ambiente do frontend

Crie o arquivo de env local:

```bash
cp .env.example .env.local
```

Defina os valores:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

Essas são as únicas variáveis de runtime do frontend necessárias no código atual.

## 2) Secrets das Edge Functions (Supabase)

Configure em Supabase Dashboard → Project Settings → Edge Functions → Secrets:

- `GEMINI_API_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `MONYNHA_INTERNAL_EMAIL`

Alternativa via CLI:

```bash
supabase secrets set GEMINI_API_KEY=...
supabase secrets set RESEND_API_KEY=...
supabase secrets set RESEND_FROM_EMAIL=hello@monynha.com
supabase secrets set MONYNHA_INTERNAL_EMAIL=team@monynha.com
```

## 3) Desenvolvimento local

Instale e rode o app:

```bash
pnpm install
pnpm dev
```

Porta padrão do Vite: `3000`.

## 4) Execução local de Edge Functions (opcional)

A partir da raiz do projeto:

```bash
supabase functions serve company-search
supabase functions serve generate-diagnosis
supabase functions serve send-contact-confirmation
supabase functions serve send-diagnostic-email
```

As configs das functions usam `verify_jwt = false`, então chamadas manuais locais são simples.

Exemplo de chamada local:

```bash
curl -i --location --request POST "http://localhost:54321/functions/v1/company-search" \
  --header "Content-Type: application/json" \
  --data '{"query":"Monynha"}'
```

## 5) Deploy

```bash
supabase functions deploy company-search
supabase functions deploy generate-diagnosis
supabase functions deploy send-contact-confirmation
supabase functions deploy send-diagnostic-email
```

## Troubleshooting

- `GEMINI_API_KEY not configured`: secret ausente no projeto Supabase.
- `RESEND_API_KEY not configured`: secret ausente no projeto Supabase.
- Frontend não consegue persistir: verifique `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.
- CORS do browser: verifique URL da function deployada e headers da requisição.

## Atualização recente (a11y/performance)

- Modal de time em `AboutSite` agora usa semântica de diálogo (`role="dialog"`, `aria-modal`, foco inicial no botão fechar e fechamento por `Esc`).
- Avatares remotos em componentes visuais receberam `loading="lazy"` e `decoding="async"` para reduzir custo inicial de renderização.
- Ícone decorativo de seleção no wizard recebeu `aria-hidden="true"` para evitar ruído para leitores de tela.

