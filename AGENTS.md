# AGENTS.md

Agent instructions for this repository.

## Project Snapshot

- Stack: React 19 + TypeScript + Vite frontend, Express backend in `server.js`.
- Routing: custom state routing in `App.tsx` (no React Router).
- i18n: i18next with locale files in `src/i18n/locales`.
- SEO: per-view `Seo` component usage, plus sitemap generation during build.

For full context, prefer these docs instead of duplicating details:
- [README](./README.md)
- [Development Guide](./docs/DEVELOPMENT.md)
- [CLI Notes](./docs/cli.md)
- [React Bits Integration](./docs/REACTBITS_INTEGRATION.md)

## Runbook

Use npm scripts from `package.json`:
- `npm run dev`: starts Vite on port 3000.
- `npm run start`: starts Express backend on port 8080.
- `npm run build`: Vite production build + sitemap generation.

Development behavior:
- For end-to-end local testing (including contact form), run BOTH `npm run start` and `npm run dev`.
- Vite proxies `/api/*` to `http://localhost:8080`.

## Codebase Conventions

- Keep route changes in sync in `App.tsx`:
  - `Page` union type
  - `PAGE_PATHS`
  - `PATH_PAGES`
  - `renderPage()` switch
- Keep navigation-aware components using `setPage` callback patterns already used by `Navbar`, `Footer`, and views.
- Use existing styling approach (Tailwind utility classes + design language already present).
- Use Framer Motion for non-trivial motion and transitions.
- Keep API form submissions aligned with existing `/api/contact` behavior and validation shape.

## SEO and I18n Rules

- When adding a page/view:
  - Add proper `<Seo />` metadata in the view.
  - Add route to sitemap route list in `vite.config.ts`.
- When adding copy:
  - Update all locale files in `src/i18n/locales` (`en`, `pt`, `fr`, `es`) to avoid fallback-only behavior.

## Environment and Secrets

Expected environment variables:
- `RESEND_API_KEY` (required for contact email flow)
- `PORT` (default 8080)
- `VITE_SITE_URL` (used for canonical URL generation)

Do not print or commit secret values when debugging.

## Validation Before Finishing

There is no dedicated lint/test script currently. Use:
- `npm run build` as the primary validation gate.
- If touching API behavior, also smoke test `POST /api/contact` with required fields.

## Known Pitfalls

- Running only `npm run dev` will not validate backend-dependent flows.
- This repository uses custom SPA routing; introducing React Router would be a behavior change.
- Keep route-level SEO and sitemap updates together to avoid discoverability regressions.
