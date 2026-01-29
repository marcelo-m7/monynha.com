# Setup Guide

This guide will help you set up the Monynha Softwares corporate website locally and in production. The project is fully self-managed—no external builder accounts are required.

## Prerequisites

- Node.js 18+ and npm
- Supabase project (database + auth already provisioned)
- Supabase CLI installed locally

## Local Development Setup

### 1. Clone and Install

```bash
git clone <repository-url>
cd monynha-softwares-website
npm install
```

### 2. Environment Variables

Create a `.env` file at the project root with the following variables:

```env
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_PUBLISHABLE_KEY=<your-anon-key>
VITE_SUPABASE_PROJECT_ID=<your-project-id>
VITE_GITHUB_API_TOKEN=<your-github-personal-access-token> # Optional, for higher GitHub API rate limits
```

**Important**: Never commit the `.env` file to version control.

### 3. Database Setup

Migrations live in `supabase/migrations/` and can be applied via the Supabase CLI:

```bash
# Resets local database and applies all migrations and seeds
supabase db reset
```

**Regenerate Supabase Types:**
After any schema changes or `supabase db reset`, ensure your TypeScript types are up-to-date by running:
```bash
npx supabase gen types typescript --schema public > src/integrations/supabase/types_db.ts
```

### 4. Create First Admin User

After signing up through the `/auth` page, manually assign the admin role:

1. Sign up with your email at `/auth`
2. Find your user ID from the `profiles` table (or `auth.users` table in Supabase dashboard)
3. Run this SQL in the Supabase SQL Editor:

```sql
-- Replace 'YOUR_USER_ID' with the ID from the profiles table
INSERT INTO user_roles (user_id, role)
VALUES ('YOUR_USER_ID', 'admin');
```

### 5. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` and log in with your test account.

## Configuration

### Authentication Settings

Configure auth settings via the Supabase dashboard:

1. Authentication → Settings
2. Enable the Email provider
3. Set **Site URL**: `https://yourdomain.com`
4. Add Redirect URLs:
   - `http://localhost:5173` (development)
   - `https://yourdomain.com` (production)
   - `https://yourdomain.com/#/reset-password` (for password reset flow, note the hash)
5. Optional: Enable email confirmations for production

### Storage Buckets

Two storage buckets are pre-configured:

- `artwork-images`: Public bucket for legacy images (use `general-media` for new uploads)
- `general-media`: Public bucket for project thumbnails and other media files

Upload images via the Supabase dashboard or the Supabase CLI. Ensure Storage policies grant public read access where needed.

## Troubleshooting

### "VITE_SUPABASE_URL is missing" or "VITE_SUPABASE_PUBLISHABLE_KEY is missing"

Ensure your `.env` file is correctly set up at the project root with the required `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` variables.

### "Requested path is invalid" error on login

Check that Site URL and Redirect URLs are configured correctly in Authentication settings. Remember to include the hash (`#/reset-password`) for the reset password redirect if using `HashRouter`.

### Can't see data after inserting

Ensure Row Level Security policies allow access for your role, or mark content as `published` for public visibility.

### Images not loading

1. Verify the bucket is public
2. Confirm image URLs follow `<SUPABASE_URL>/storage/v1/object/public/<bucket>/<path>`
3. Ensure `storage.objects` policies permit `SELECT`

### Database connection errors

Verify `.env` contains the correct credentials. Restart the dev server after env changes.

## Next Steps

- Read [DATABASE.md](./DATABASE.md) for schema details
- Review [DEPLOYMENT.md](./DEPLOYMENT.md) for hosting instructions