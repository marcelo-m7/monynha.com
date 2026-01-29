# Content Management Guide

This guide explains how to manage content for the Monynha Softwares website. The project is now fully self-hosted—no external page builders or embedded dashboards are required.

## Access Methods

### Option 1: Supabase Dashboard (Recommended)

The easiest way to manage content is through the Supabase dashboard interface:

1. Visit the [Supabase project dashboard](https://supabase.com/dashboard/project/hkkgfebdhevcdurpcdgu) for your workspace.
2. Open **Table Editor** to browse and edit content tables.
3. Ensure your database role has access to read/write the relevant tables.

### Option 2: Custom Admin Panel (In-App)

The application includes an in-app admin panel for managing most content types directly:

1.  Navigate to `/auth` and sign in with an admin account.
2.  Go to `/admin` to access the dashboard.
3.  Use the dedicated managers for Blog Posts, Exhibitions, Experiences, Skills, Legal Pages, Contact Messages, and Settings.

---

## Managing Content Types

### `Blog Posts`

Manage blog posts via the Admin Dashboard (`/admin/blog-posts`) or directly in the Supabase `blog_posts` table.

| Field | Type | Description |
|-------|------|-------------|
| `title` | text | Title of the blog post |
| `slug` | text | URL-friendly identifier (e.g., `my-first-post`) |
| `date` | date | Publication date |
| `author` | text | Author's name |
| `tags` | text[] | Array of tags (e.g., `["tech", "design"]`) |
| `excerpt` | text | Short summary for listings |
| `content_html` | text | Full content in HTML or Markdown (will be rendered as HTML) |
| `status` | `content_status` enum | `published`, `draft`, or `archived` |
| `locale` | text | Language code (e.g., `en`, `pt-BR`) |

**Workflow:**
1.  Create a new post with `status = 'draft'`.
2.  Preview locally.
3.  Set `status = 'published'` when ready.

---

### `Exhibitions`

Manage exhibition events via the Admin Dashboard (`/admin/exhibitions`) or directly in the Supabase `exhibitions` table.

| Field | Type | Description |
|-------|------|-------------|
| `title` | text | Exhibition name |
| `location` | text | Venue location (optional) |
| `date` | text | Display date (flexible text, e.g., `March 2024`) |
| `year` | integer | Year for sorting (required) |
| `type` | text | "solo" or "group" |
| `description` | text | Event details (optional) |
| `display_order` | integer | Manual sort order (lower number appears first) |

**Sorting:** Exhibitions are sorted by `year` (descending) then `display_order` (ascending).

---

### `Experiences`

Manage professional experience entries via the Admin Dashboard (`/admin/experiences`) or directly in the Supabase `experiences` table.

| Field | Type | Description |
|-------|------|-------------|
| `role` | text | Your role/position |
| `organization` | text | Company or organization name |
| `location` | text | City, Country |
| `start_date` | date | Start date of the experience |
| `end_date` | date | End date of the experience (optional, use empty for "Present") |
| `highlights` | text[] | Key achievements/responsibilities (array of strings) |
| `display_order` | integer | Manual sort order (lower number appears first) |

**Sorting:** Experiences are sorted by `start_date` (descending) then `display_order` (ascending).

---

### `Skills`

Manage technical skills via the Admin Dashboard (`/admin/skills`) or directly in the Supabase `skills` table.

| Field | Type | Description |
|-------|------|-------------|
| `name` | text | Skill name (e.g., `React`, `Tailwind CSS`) |
| `category` | text | Category (e.g., `Frontend`, `Backend`, `DevOps`) |
| `level` | text | Proficiency level (e.g., `Beginner`, `Intermediate`, `Advanced`, `Expert`) |
| `display_order` | integer | Manual sort order (lower number appears first) |

**Sorting:** Skills are sorted by `display_order` (ascending) then `name` (ascending).

---

### `Legal Pages`

Manage legal documents (Privacy Policy, Terms of Service) via the Admin Dashboard (`/admin/legal-pages`) or directly in the Supabase `legal_pages` table.

| Field | Type | Description |
|-------|------|-------------|
| `title` | text | Page title (e.g., `Privacy Policy`) |
| `slug` | text | URL-friendly identifier (e.g., `privacy-policy`) |
| `content` | text | Full content in HTML or Markdown (will be rendered as HTML) |

---

### `Settings`

Manage global site configuration via the Admin Dashboard (`/admin/settings`) or directly in the Supabase `settings` table.

| Field | Type | Nullable | Default | Description |
|-------|------|----------|---------|-------------|
| `key` | text | No | - | Unique setting identifier (lowercase_underscore) |
| `value` | jsonb | No | - | Setting value (string, number, object, array) |
| `description` | text | Yes | - | Human-readable description |
| `is_public` | boolean | Yes | `false` | **SECURITY**: `true` if safe for public, `false` for sensitive data |

**Security warning**: Never set `is_public = true` for API keys, secrets, or private configuration.

---

### `Contact Messages`

View form submissions from the Contact page via the Admin Dashboard (`/admin/messages`) or directly in the Supabase `contact_messages` table.

| Field | Type | Description |
|-------|------|-------------|
| `name` | text | Sender name |
| `email` | text | Sender email |
| `message` | text | Message content |
| `status` | text | "unread" or "read" |
| `created_at` | timestamptz | Submission timestamp |

**Note**: Contact messages cannot be deleted from the admin panel (data retention policy). Update `status` to `read` after reviewing.

---

### `Pages` (Home, About)

These are general content pages. While some content can be managed via narrative blocks, core page structure and SEO metadata are here.

| Field | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `slug` | text | No | - | Page identifier (e.g., "home", "about") |
| `title` | text | No | - | Page title |
| `content` | jsonb | No | - | Flexible content structure (e.g., for hero section data) |
| `meta_title` | text | Yes | - | SEO title |
| `meta_description` | text | Yes | - | SEO description |
| `locale` | text | Yes | `en` | Language code |
| `status` | `content_status` enum | Yes | `published` | Published or draft |

**Example `content` for `home` page:**
```json
{
  "hero": {
    "title": "Monynha Softwares",
    "subtitle": "Inclusive tech that empowers",
    "description": "We build accessible, human-centered digital experiences so every person can participate, create, and thrive.",
    "tagline": "Software & Digital Experiences"
  }
}
```

---

### `Brand Identity`

Manages global brand information.

| Field | Type | Nullable | Default | Description |
|-------|------|----------|---------|-------------|
| `name` | text | No | - | Brand name (e.g., `Monynha Softwares`) |
| `tagline` | text | Yes | - | Brand tagline |
| `description` | text | Yes | - | Long description/mission statement |
| `logo_url` | text | Yes | - | URL to main logo |
| `favicon_url` | text | Yes | - | URL to favicon |
| `og_image_url` | text | Yes | - | URL to OpenGraph image for social sharing |
| `theme_color` | text | Yes | - | Browser theme color (e.g., `#111827`) |

---

### `Cultural Context`

Manages cultural context entries for the About page.

| Field | Type | Nullable | Default | Description |
|-------|------|----------|---------|-------------|
| `title` | text | No | - | Title of the cultural context point |
| `description` | text | Yes | - | Detailed description |
| `category` | text | Yes | - | Category for grouping (optional) |
| `locale` | text | Yes | `en` | Language code |

---

### `Mission Statements`

Manages mission statements for the About page.

| Field | Type | Nullable | Default | Description |
|-------|------|-------------|---------|-------------|
| `statement` | text | No | - | The mission statement text |
| `locale` | text | Yes | `en` | Language code |
| `display_order` | integer | Yes | 0 | Manual sort order |

---

### `Narrative Blocks`

Manages reusable text blocks for various pages, supporting internationalization.

| Field | Type | Nullable | Default | Description |
|-------|------|-------------|---------|-------------|
| `key` | text | No | - | Unique identifier for the block (e.g., `home_hero_description`) |
| `content` | text | No | - | The text content of the block |
| `locale` | text | Yes | `en` | Language code |

---

### `Values`

Manages core values for the About page or other sections.

| Field | Type | Nullable | Default | Description |
|-------|------|----------|---------|-------------|
| `title` | text | No | - | Value title (e.g., `Inclusivity`) |
| `description` | text | Yes | - | Detailed description of the value |
| `icon` | text | Yes | - | Lucide icon name (e.g., `Sparkles`) |
| `display_order` | integer | Yes | 0 | Manual sort order |

---

## User Management

### Assign Admin Role

Only admins can assign roles. From the SQL Editor in your Supabase dashboard:

```sql
-- Find user ID from profiles table first
SELECT id, email FROM profiles WHERE email = 'user@example.com';

-- Assign admin role
INSERT INTO user_roles (user_id, role)
VALUES ('<user-id-here>', 'admin');
```

### Remove Admin Role

```sql
DELETE FROM user_roles
WHERE user_id = '<user-id>' AND role = 'admin';
```

---

**Project note:** Monynha Softwares is now decoupled from third-party site builders—content changes flow entirely through Supabase tables or the in-app admin panel.