# Deployment Guide

This guide covers deploying the Monynha Softwares corporate website to production. The project is decoupled from external site builders—deployment relies on standard Vite static hosting workflows.

## Prerequisites

- Supabase project (for database + auth)
- Domain name (optional)
- Git repository hosting (GitHub, GitLab, etc.)

---

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel offers frictionless builds for Vite + React projects.

1.  **Push the repository**
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git remote add origin <your-repo-url>
    git push -u origin main
    ```

2.  **Import the project**
    - Visit [vercel.com](https://vercel.com)
    - Click **Import Project**
    - Select your Git repository

3.  **Configure build settings**
    - Framework Preset: **Vite**
    - Build Command: `npm run build`
    - Output Directory: `dist`
    - Install Command: `npm install`

4.  **Add environment variables**

    Navigate to **Settings → Environment Variables** and add:

    ```env
    VITE_SUPABASE_URL=<your-supabase-url>
    VITE_SUPABASE_PUBLISHABLE_KEY=<your-anon-key>
    VITE_SUPABASE_PROJECT_ID=<your-project-id>
    VITE_GITHUB_API_TOKEN=<your-github-personal-access-token> # Optional, for higher GitHub API rate limits
    ```

5.  **Deploy**
    - Click **Deploy**
    - Vercel builds and deploys automatically (Vercel automatically handles history fallback for SPAs)
    - Access the site at `<project>.vercel.app`

6.  **Custom domain (optional)**
    - Settings → Domains
    - Add your domain and follow Vercel’s DNS instructions

---

### Option 2: Netlify

1.  **Connect repository**
    - Visit [app.netlify.com](https://app.netlify.com)
    - Click **Add new site → Import an existing project**
    - Authorize Git provider and pick the repository

2.  **Configure build settings**
    - Build command: `npm run build`
    - Publish directory: `dist`

3.  **Add environment variables**
    Under **Site settings → Build & deploy → Environment**, add Supabase keys identical to the Vercel example above.

4.  **Deploy**
    - Trigger a deploy from the UI or push to the default branch
    - Netlify serves the static build from its CDN (Netlify automatically handles history fallback for SPAs)

5.  **Domain management**
    - Use Netlify DNS or configure external DNS for a custom domain

---

### Option 3: Static File Hosting (Any CDN / Nginx)

1. Run `npm run build`
2. Upload the generated `dist/` directory to your preferred static host.
3. **Note**: Since `HashRouter` is used, no special server configuration is required for routing.

---

## Post-Deployment Checklist

- ✅ `npm run build` completes without warnings
- ✅ Environment variables are present in production
- ✅ Supabase database and Storage policies permit your domain
- ✅ Lighthouse reports no missing favicon/manifest warnings
- ✅ Routing works correctly using hash URLs (e.g., `/index.html#/about`)

---

**Project note:** Monynha Softwares website uses `HashRouter` for compatibility with simple static hosting environments.