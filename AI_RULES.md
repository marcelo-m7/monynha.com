# Regras de IA e Desenvolvimento

Este arquivo documenta as convenções atuais do projeto baseadas no código deste repositório.

## Stack principal

- React 19
- TypeScript
- Vite 6
- Tailwind CSS v4 via `src/styles/index.css`
- Supabase client + Supabase Edge Functions

## Convenções de UI

- A navegação é baseada em estado via `AppState` em `src/App.tsx`.
- Não há router; evite introduzir um sem decisão de produto intencional.
- Estilos globais e tokens de design estão em `src/styles/index.css` sob `@theme`.
- Mantenha componentes de marca (`IntroScene`, `FairyCursor`, transições do wizard) a menos que haja decisão de produto para removê-los.

## Dados e serviços

- Os tipos `LeadData` e `DiagnosisResult` em `src/types/index.ts` são a fonte da verdade para payloads do app.
- O frontend não chama Gemini ou Resend diretamente.
- Operações sensíveis passam pelas Edge Functions:
  - `generate-diagnosis`
  - `send-diagnostic-email`
  - `send-contact-confirmation`
  - `company-search`

## Ambiente e secrets

- Variáveis de ambiente do frontend:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- Secrets do backend (Supabase Edge Function secrets):
  - `GEMINI_API_KEY`
  - `RESEND_API_KEY`
  - `RESEND_FROM_EMAIL`
  - `MONYNHA_INTERNAL_EMAIL`

## Regras de qualidade de código

- Use tipos TypeScript estritos.
- Prefira funções da camada de serviço em vez de chamar Supabase diretamente nos componentes.
- Mantenha o tratamento de erros assíncronos explícito (`try/catch`) em serviços e fluxos assíncronos.
- Mantenha o comportamento de validação do wizard estável a menos que os requisitos mudem.
- Mensagens de erro voltadas ao usuário devem seguir a voz da marca: português do Brasil, direta, com personalidade.

## Regras de testes

- Testes unitários ficam em `tests/unit/`.
- Specs E2E ficam em `tests/e2e/`.
- `pnpm ci` é o equivalente local das verificações principais de CI (`lint`, `test:run`, `build`).

## Regra de documentação

Quando a implementação mudar, atualize os docs na mesma mudança:

- `README.md`
- `ARCHITECTURE.md`
- `docs/EDGE_FUNCTIONS.md`
- `docs/ENVIRONMENT_SETUP.md`
- `docs/SUPABASE_SETUP.md`
- `docs/SUPABASE_IMPLEMENTATION.md`
- `docs/TESTING.md`
- `CI_CD_SUMMARY.md`

