# Database Schema Documentation

This document describes the database structure for the Monynha Softwares corporate website.

## Overview

The database uses PostgreSQL on Supabase with Row Level Security (RLS) enabled on all tables.
Application-specific types are centralized in `src/integrations/supabase/supabase.types.ts`.

## Tables

### `blog_posts`

Blog posts for the Thoughts section.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| slug | text | No | - | URL-friendly identifier |
| title | text | No | - | Blog post title |
| date | timestamptz | No | - | Publication date |
| author | text | No | - | Author's name |
| tags | text[] | Yes | `{}` | Array of tags |
| excerpt | text | No | - | Short summary |
| content_html | text | No | - | Full content in HTML/Markdown |
| status | `content_status` enum | Yes | `draft` | `published`, `draft`, or `archived` |
| locale | text | Yes | `en` | Language code |
| created_at | timestamptz | Yes | now() | Creation timestamp |
| updated_at | timestamptz | Yes | now() | Last update timestamp |

**RLS Policies**:
- Public can SELECT where `status = 'published'`
- Admins can SELECT, INSERT, UPDATE, DELETE all

---

### `brand_identity`

Global brand information for the website.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| name | text | No | - | Brand name (e.g., `Monynha Softwares`) |
| tagline | text | Yes | - | Brand tagline |
| description | text | Yes | - | Long description/mission statement |
| logo_url | text | Yes | - | URL to main logo |
| favicon_url | text | Yes | - | URL to favicon |
| og_image_url | text | Yes | - | URL to OpenGraph image for social sharing |
| theme_color | text | Yes | - | Browser theme color (e.g., `#111827`) |
| created_at | timestamptz | Yes | now() | Creation timestamp |
| updated_at | timestamptz | Yes | now() | Last update timestamp |

**RLS Policies**:
- Public can SELECT all
- Admins can SELECT, INSERT, UPDATE, DELETE all

---

### `contact_messages`

Form submissions from the Contact page.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| name | text | No | - | Sender name |
| email | text | No | - | Sender email |
| message | text | No | - | Message content |
| status | text | Yes | `unread` | "unread" or "read" |
| created_at | timestamptz | Yes | now() | Submission timestamp |

**RLS Policies**:
- Public can INSERT (anonymous submissions)
- Only admins can SELECT, UPDATE
- No DELETE allowed (preserve records)

**Security**: Email addresses are protected from public view.

---

### `cultural_context`

Cultural context entries for the About page.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| brand_id | uuid | Yes | - | Foreign key to `brand_identity` (optional) |
| title | text | No | - | Title of the cultural context point |
| description | text | Yes | - | Detailed description |
| category | text | Yes | - | Category for grouping (optional) |
| locale | text | Yes | `en` | Language code |
| created_at | timestamptz | Yes | now() | Creation timestamp |
| updated_at | timestamptz | Yes | now() | Last update timestamp |

**RLS Policies**:
- Public can SELECT where `locale = current_setting('app.current_locale')`
- Admins can SELECT, INSERT, UPDATE, DELETE all

---

### `exhibitions`

Timeline events for the About page.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| title | text | No | - | Exhibition title |
| location | text | Yes | - | Venue location |
| date | text | Yes | - | Display date (flexible format) |
| year | integer | No | - | Year for sorting |
| type | text | Yes | `group` | "solo" or "group" |
| description | text | Yes | - | Event description |
| display_order | integer | Yes | 0 | Manual sort order |
| created_at | timestamptz | Yes | now() | Creation timestamp |
| updated_at | timestamptz | Yes | now() | Last update timestamp |

**RLS Policies**:
- Public can SELECT all
- Only admins can INSERT, UPDATE, DELETE

---

### `experiences`

Professional experience entries for the About page.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| role | text | No | - | Your role/position |
| organization | text | No | - | Company or organization name |
| location | text | No | - | City, Country |
| start_date | text | No | - | Start date of the experience |
| end_date | text | Yes | - | End date of the experience (optional) |
| highlights | text[] | Yes | - | Key achievements/responsibilities |
| display_order | integer | Yes | 0 | Manual sort order |
| created_at | timestamptz | Yes | now() | Creation timestamp |
| updated_at | timestamptz | Yes | now() | Last update timestamp |

**RLS Policies**:
- Public can SELECT all
- Only admins can INSERT, UPDATE, DELETE

---

### `legal_pages`

CMS pages for legal documents (Privacy Policy, Terms of Service).

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| slug | text | No | - | Page identifier (e.g., "privacy-policy") |
| title | text | No | - | Page title |
| content | text | No | - | Full content in HTML/Markdown |
| created_at | timestamptz | Yes | now() | Creation timestamp |
| updated_at | timestamptz | Yes | now() | Last update timestamp |

**RLS Policies**:
- Public can SELECT all
- Admins can SELECT, INSERT, UPDATE, DELETE all

---

### `mission_statements`

Mission statements for the About page.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| brand_id | uuid | Yes | - | Foreign key to `brand_identity` (optional) |
| statement | text | No | - | The mission statement text |
| locale | text | Yes | `en` | Language code |
| display_order | integer | Yes | 0 | Manual sort order |
| created_at | timestamptz | Yes | now() | Creation timestamp |
| updated_at | timestamptz | Yes | now() | Last update timestamp |

**RLS Policies**:
- Public can SELECT where `locale = current_setting('app.current_locale')`
- Admins can SELECT, INSERT, UPDATE, DELETE all

---

### `narrative_blocks`

Reusable text blocks for various pages, supporting internationalization.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| brand_id | uuid | Yes | - | Foreign key to `brand_identity` (optional) |
| key | text | No | - | Unique identifier for the block (e.g., `home_hero_description`) |
| content | text | No | - | The text content of the block |
| locale | text | Yes | `en` | Language code |
| created_at | timestamptz | Yes | now() | Creation timestamp |
| updated_at | timestamptz | Yes | now() | Last update timestamp |

**RLS Policies**:
- Public can SELECT where `locale = current_setting('app.current_locale')`
- Admins can SELECT, INSERT, UPDATE, DELETE all

---

### `pages`

CMS pages (home, about, etc.).

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | uuid_generate_v4() | Primary key |
| slug | text | No | - | Page identifier (e.g., "home") |
| title | text | No | - | Page title |
| content | jsonb | No | - | Flexible content structure |
| meta_title | text | Yes | - | SEO title |
| meta_description | text | Yes | - | SEO description |
| status | `content_status` enum | Yes | `published` | Published or draft |
| locale | text | Yes | `en` | Language code |
| created_at | timestamptz | Yes | now() | Creation timestamp |
| updated_at | timestamptz | Yes | now() | Last update timestamp |

**RLS Policies**:
- Public can SELECT where `status = 'published'` AND `locale = current_setting('app.current_locale')`
- Only admins can INSERT, UPDATE, DELETE

**Indexes**:
- Unique on `slug`

---

### `profiles`

Extended user information.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | - | Foreign key to auth.users |
| email | text | Yes | - | User email (copied from auth) |
| full_name | text | Yes | - | Display name |
| avatar_url | text | Yes | - | Profile picture URL |
| headline | text | Yes | - | User's headline/tagline |
| location | text | Yes | - | User's location |
| bio | text | Yes | - | User's biography |
| created_at | timestamptz | Yes | now() | Profile creation |
| updated_at | timestamptz | Yes | now() | Last update |

**RLS Policies**:
- Public can SELECT all (for public profiles)
- Users can SELECT own profile
- Users can UPDATE own profile
- Users can INSERT own profile (via trigger)
- Admins can SELECT all profiles

**Trigger**: `handle_new_user()` automatically creates profile when new user signs up.

---

### `projects`

Project entries (formerly `artworks`).

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| slug | text | No | - | URL-friendly identifier |
| name | text | No | - | Project name |
| summary | text | Yes | - | Short summary |
| full_description | text | Yes | - | Detailed description |
| stack | text[] | Yes | `{}` | Technologies used |
| url | text | Yes | - | Live demo URL |
| domain | text | Yes | - | Project domain |
| repo_url | text | Yes | - | GitHub repository URL |
| thumbnail | text | Yes | - | Thumbnail image URL |
| category | text | Yes | - | Project category |
| status | `content_status` enum | Yes | `published` | `published`, `draft`, or `archived` |
| visibility | text | Yes | `Public` | `Public` or `Private` |
| year | integer | Yes | - | Year of project completion |
| created_at | timestamptz | Yes | now() | Creation timestamp |
| updated_at | timestamptz | Yes | now() | Last update timestamp |

**RLS Policies**:
- Public can SELECT all
- Only admins can INSERT, UPDATE, DELETE

---

### `settings`

Global site configuration.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| key | text | No | - | Setting identifier |
| value | jsonb | No | - | Setting value (any type) |
| description | text | Yes | - | Human-readable description |
| is_public | boolean | Yes | `false` | **SECURITY**: Public visibility |
| updated_at | timestamptz | Yes | now() | Last update timestamp |

**RLS Policies**:
- Public can SELECT where `is_public = true`
- Admins can SELECT all
- Only admins can INSERT, UPDATE, DELETE

**Security Note**: Sensitive settings (API keys, private config) must have `is_public = false`.

**Indexes**:
- Unique on `key`

---

### `skills`

Technical skills for the About page.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| name | text | No | - | Skill name |
| category | text | No | - | Category (e.g., `Frontend`) |
| level | text | No | - | Proficiency level (e.g., `Expert`) |
| display_order | integer | Yes | 0 | Manual sort order |
| created_at | timestamptz | Yes | now() | Creation timestamp |
| updated_at | timestamptz | Yes | now() | Last update timestamp |

**RLS Policies**:
- Public can SELECT all
- Only admins can INSERT, UPDATE, DELETE

---

### `user_roles`

Role-based access control.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| user_id | uuid | No | - | Foreign key to auth.users |
| role | `app_role` enum | No | - | Enum: `admin`, `editor`, `user` |

**RLS Policies**:
- Users can SELECT own role
- Admins can SELECT all roles
- Only admins can INSERT, UPDATE, DELETE

**Security**: Prevents privilege escalation. Roles can only be assigned via admin SQL access.

---

### `values`

Core values for the website.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| brand_id | uuid | Yes | - | Foreign key to `brand_identity` (optional) |
| title | text | No | - | Value title |
| description | text | Yes | - | Detailed description of the value |
| icon | text | Yes | - | Lucide icon name (e.g., `Sparkles`) |
| display_order | integer | Yes | 0 | Manual sort order |
| created_at | timestamptz | Yes | now() | Creation timestamp |
| updated_at | timestamptz | Yes | now() | Last update timestamp |

**RLS Policies**:
- Public can SELECT all
- Admins can SELECT, INSERT, UPDATE, DELETE all

---

## Enums

### `content_status`

```sql
'published' | 'draft' | 'archived'
```

### `app_role`

```sql
'admin' | 'editor' | 'user'
```

---

## Functions

### `column_exists(table_name text, column_name text) RETURNS boolean`

Checks if a column exists in a given table.

### `has_role(_user_id uuid, _role app_role) RETURNS boolean`

Security definer function to check user roles without triggering recursive RLS.

```sql
SELECT has_role(auth.uid(), 'admin'); -- true if user is admin
```

### `handle_new_user() RETURNS trigger`

Creates profile entry when new user signs up via auth.

### `handle_updated_at() RETURNS trigger`

Automatically updates `updated_at` timestamp on row modification.

### `set_current_locale(locale_code text) RETURNS void`

Sets the session variable for the current locale, used by RLS policies for multilingual content filtering.

---

## Storage Buckets

### `artwork-images`

- **Public**: Yes
- **Purpose**: Legacy bucket for creative works cover images and galleries (consider migrating to `general-media`)
- **RLS**: Public SELECT, admin-only INSERT/UPDATE/DELETE

### `general-media`

- **Public**: Yes
- **Purpose**: Site assets and media (icons, backgrounds, project thumbnails, etc.)
- **RLS**: Public SELECT, admin-only INSERT/UPDATE/DELETE

---

## Security Summary

✅ **All tables have RLS enabled**
✅ **Email addresses protected** (profiles table secured)
✅ **Contact messages admin-only**
✅ **Settings separated by public/private flag**
✅ **Role-based access control** via dedicated table
✅ **Security definer functions** prevent RLS recursion

---

## Migrations

All schema changes are tracked in `supabase/migrations/`. Never modify production schema directly.

To create a new migration:

1. Use the Supabase CLI migration tooling (`supabase db push` or `supabase db reset`)
2. Test locally first
3. Apply to production via backend dashboard

To regenerate TypeScript types after schema changes:
```bash
npx supabase gen types typescript --schema public > src/integrations/supabase/types_db.ts
```

---

## Entity Relationship Diagram

```text
auth.users (Supabase managed)
    ↓ (1:1)
profiles (id FK to auth.users)
    ↓ (1:many)
user_roles (user_id FK to auth.users)

brand_identity (standalone)
    ↓ (1:many, optional)
    cultural_context (brand_id FK to brand_identity)
    mission_statements (brand_id FK to brand_identity)
    narrative_blocks (brand_id FK to brand_identity)
    values (brand_id FK to brand_identity)

blog_posts (standalone)
contact_messages (standalone)
exhibitions (standalone)
experiences (standalone)
legal_pages (standalone)
pages (standalone)
projects (standalone)
settings (standalone)
skills (standalone)
```

---

## Indexes & Performance

Current indexes:

- All primary keys (automatic)
- Unique constraints on `pages.slug`
- Unique on `settings.key`

**Future optimization opportunities**:

- Index on `exhibitions.year` for timeline sorting
- Index on `experiences.start_date` for timeline sorting
- Index on `skills.category` for filtering
- Index on `blog_posts.date` for sorting
- Index on `narrative_blocks.key` and `narrative_blocks.locale` for faster lookup
- Index on `pages.slug` and `pages.locale` for faster lookup