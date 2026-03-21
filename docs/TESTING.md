# Guia de Testes

Este guia reflete o setup atual de testes e o comportamento observado.

## Ferramentas

- Unitários/integração: Vitest (`vitest.config.ts`)
- Ambiente de DOM: `jsdom`
- E2E: Playwright (`playwright.config.ts`)

## Comandos

```bash
pnpm test         # modo watch
pnpm test:run     # execução única
pnpm test:coverage
pnpm test:ui
pnpm test:e2e
pnpm lint
pnpm build
pnpm ci
```

## Testes unitários no repositório

- `tests/unit/types.test.ts` (6 testes)
- `tests/unit/supabaseService.test.ts` (7 testes)

Resultado atual:

- `pnpm test:run` → todos os testes unitários passando

## Status E2E

- `playwright.config.ts` usa `testDir: './tests/e2e'`
- Specs estão em `tests/e2e/smoke.spec.ts`
- Configuração e specs estão alinhadas

Para rodar E2E localmente, o servidor de preview precisa estar rodando:

```bash
pnpm build && pnpm preview &
pnpm test:e2e
```

## Configuração de runtime do Playwright (atual)

- `webServer.command`: `pnpm dev --host 0.0.0.0 --port 4173`
- `baseURL`: `http://127.0.0.1:4173`
- Projects:
  - desktop chromium
  - mobile chromium

## Comportamento no CI

O workflow `.github/workflows/ci.yml` executa:

- `pnpm lint`
- `pnpm test:run`
- `pnpm build`

Não executa `pnpm test:e2e` atualmente.

## Verificações locais recomendadas antes do push

```bash
pnpm ci
```

Para validação E2E completa:

```bash
pnpm build && pnpm preview &
pnpm test:e2e
```

## Atualização recente (a11y/performance)

- Modal de time em `AboutSite` agora usa semântica de diálogo (`role="dialog"`, `aria-modal`, foco inicial no botão fechar e fechamento por `Esc`).
- Avatares remotos em componentes visuais receberam `loading="lazy"` e `decoding="async"` para reduzir custo inicial de renderização.
- Ícone decorativo de seleção no wizard recebeu `aria-hidden="true"` para evitar ruído para leitores de tela.

