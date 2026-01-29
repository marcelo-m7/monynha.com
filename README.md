# Monynha Softwares · Corporate Website

> **Note:** This project is fully self-managed and does not rely on external site-builder dependencies.

Monynha Softwares' corporate website is a Vite + React application designed to showcase the company's services, values, and contact information. The project emphasizes accessibility, performance, and a modern user experience.

## Features

- 🌟 Professional design with responsive layouts and animations
- 🧭 Intuitive navigation with mobile-friendly menus
- 📊 Dynamic content powered by Supabase
- 🛠️ Modular components for scalability and maintainability
- ♿ Accessibility-first approach with motion-reduced fallbacks
- 📝 Integrated blog for insights and thoughts
- 🐙 Showcase of open-source repositories
- 🌍 Multi-language support with `i18next`
- 🔐 Admin dashboard for content and settings management

## Branding Assets

- `/public/brand/logo.svg` – Full logo with adaptive gradient
- `/public/brand/mark.svg` – Compact logo for avatars and small UI elements
- `/public/favicon.svg` – Favicon derived from the logo
- `/public/brand/og-image.svg` – Social media preview image

Example usage with Tailwind:

```html
<img src="/brand/logo.svg" class="h-6 md:h-8 text-white" alt="Monynha Softwares" />
```

## Tech Stack

- [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [React Router](https://reactrouter.com/) (using `HashRouter` for static hosting compatibility)
- [Tailwind CSS](https://tailwindcss.com/) with custom token scales
- [shadcn/ui](https://ui.shadcn.com/) component primitives
- Animation libraries: [Framer Motion](https://www.framer.com/motion/) and [GSAP](https://gsap.com/)
- Backend: [Supabase](https://supabase.com/) for database, authentication, and storage
- Data Fetching: [React Query](https://tanstack.com/query/latest) for server state management
- Icons: [Lucide React](https://lucide.dev/icons/)
- Notifications: [Sonner](https://sonner.emilkowalski.pl/)
- Internationalization: [i18next](https://www.i18next.com/)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase project (database + auth already provisioned)
- Supabase CLI installed locally (for database migrations and type generation)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd monynha-softwares-website
   npm install
   ```

2. Set up environment variables:

   Create a `.env` file at the project root with the following variables:

   ```env
   VITE_SUPABASE_URL=<your-supabase-url>
   VITE_SUPABASE_PUBLISHABLE_KEY=<your-anon-key>
   VITE_SUPABASE_PROJECT_ID=<your-project-id>
   VITE_GITHUB_API_TOKEN=<your-github-personal-access-token> # Optional, for higher GitHub API rate limits
   ```
   **Note:** The `VITE_GITHUB_API_TOKEN` is optional but recommended to avoid GitHub API rate limits, especially during development or for frequent data fetching.

3. Start the development server:

   ```bash
   npm run dev
   ```

The app boots on `http://localhost:5173` by default. Hot Module Reloading (HMR) is enabled out of the box.

### Production Build

```bash
npm run build
npm run preview
```

- `npm run build` compiles the project for production.
- `npm run preview` serves the production build locally for smoke testing.

### Quality Checks

```bash
npm run lint
npm run test
```

Linting ensures TypeScript, React, and accessibility conventions stay consistent. Unit tests verify component logic.

## Project Structure

```text
├── public/                # Static assets served as-is (includes locales for i18n)
├── src/
│   ├── components/
│   │   ├── reactbits/     # Custom animated UI primitives (FlowingMenu, LiquidEther, ...)
│   │   ├── ui/            # shadcn/ui components
│   │   ├── brand/         # Branding components (BrandLogo, BrandMark)
│   │   └── ...            # Other reusable components
│   ├── hooks/             # Shared hooks (useRepositories, useSettings, useAdminForm, etc.)
│   ├── integrations/      # Supabase and API adapters (client.ts, supabase.types.ts)
│   ├── pages/             # Route components (Home, About, Contact, Repositories, Thoughts, ...)
│   ├── lib/               # Utility helpers (utils.ts)
│   ├── contexts/          # React Contexts (AuthContext)
│   ├── i18n.ts            # i18next configuration
│   ├── App.tsx            # Router + providers
│   └── main.tsx           # Vite entry point
├── supabase/              # Database configuration & migrations
├── tailwind.config.ts
└── vite.config.ts
```

## Key Implementation Notes

- **Branding:** The entire site has been rebranded to "Monynha Softwares."
- **Supabase Types:** Supabase table types are centralized in `src/integrations/supabase/supabase.types.ts` for improved type safety.
- **Navigation:** Mobile navigation uses `FlowingMenu`, providing consistent hover/touch behaviour with reduced-motion awareness.
- **Motion Safeguards:** All animated components check `prefers-reduced-motion`, fall back gracefully, and avoid excessive GPU load.
- **State Safety:** The contact form clears pending timeouts during unmount to prevent memory leaks when navigating away mid-submit.
- **Blog Integration:** Blog posts are fetched from the Supabase `blog_posts` table.
- **GitHub Repositories:** Integration to display open-source repositories from GitHub.
- **Admin Forms:** A generic `useAdminForm` hook centralizes CRUD logic for admin management pages.
- **Internationalization:** The application supports multiple languages via `i18next`, with content fetched from Supabase filtered by locale.

## GitHub API Fields Used

Repository data comes from the GitHub REST API and the UI relies on the following fields:

- `name`: Repository name (display + title)
- `description`: Short description shown on cards and detail pages
- `language`: Primary language label
- `topics`: Tags displayed as chips
- `html_url`: Canonical GitHub URL used for links
- `updated_at`: Last updated timestamp used for sorting and "Updated" labels
- `stargazers_count`: Number of stars
- `forks_count`: Number of forks
- `open_issues_count`: Number of open issues
- `homepage`: Project's homepage URL (if available)
- `owner.login`: GitHub username of the owner
- `owner.avatar_url`: Avatar URL of the owner
- `owner.html_url`: GitHub profile URL of the owner

## Extending The Project

- Update the imagery and copywriting in `src/pages/Home.tsx`, `About.tsx`, and `Contact.tsx` to match your brand voice.
- Explore additional React Bits-inspired components inside `src/components/reactbits/` to enrich future sections.
- Add new blog posts, exhibitions, experiences, skills, or legal pages via the Admin Dashboard or directly through the Supabase Table Editor. See `docs/CONTENT_MANAGEMENT.md` for details.

## License

This project is open-source and available under the MIT License.