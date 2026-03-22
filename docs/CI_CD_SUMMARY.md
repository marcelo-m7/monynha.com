# Resumo de CI e Testes

Última verificação: 2026-03-07

## Workflows no repositório

Apenas um arquivo de workflow existe:

- `.github/workflows/ci.yml`

Ele define dois jobs:

1. `ci` (Ubuntu)
   - Instala dependências (`pnpm install --frozen-lockfile`)
   - Roda `pnpm lint`
   - Roda `pnpm test:run`
   - Roda `pnpm build`
   - Faz upload do artefato `dist/`

2. `security` (Ubuntu)
   - Trivy filesystem scan
   - Upload opcional de SARIF

Não há workflow de deploy neste repositório no momento.

## Verificação local de comandos (2026-03-07)

- `pnpm lint`: passa
- `pnpm test:run`: passa (todos os testes unitários)
- `pnpm build`: passa
- `pnpm test:e2e`: requer servidor rodando na porta 4173 (use `pnpm preview` antes)

## Configuração de testes E2E

- `playwright.config.ts` usa `testDir: './tests/e2e'`
- Specs estão em `tests/e2e/`
- Configuração e specs estão alinhadas

## Variáveis e secrets do GitHub necessários para CI

De `.github/workflows/ci.yml`:

- Variáveis de repositório:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- Secret de repositório:
  - `VITE_GEMINI_API_KEY`

## Verificação local recomendada antes do push

```bash
pnpm ci
```

Para rodar E2E localmente:

```bash
pnpm preview &
pnpm test:e2e
```

## Atualização recente (a11y/performance)

- Modal de time em `AboutSite` agora usa semântica de diálogo (`role="dialog"`, `aria-modal`, foco inicial no botão fechar e fechamento por `Esc`).
- Avatares remotos em componentes visuais receberam `loading="lazy"` e `decoding="async"` para reduzir custo inicial de renderização.
- Ícone decorativo de seleção no wizard recebeu `aria-hidden="true"` para evitar ruído para leitores de tela.

