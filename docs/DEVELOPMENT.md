# Development Setup Guide

This guide explains how to properly set up and run Monynha Softwares in development mode with all features working, including the contact form API.

## Environment Setup

1. **Create `.env.local` file** in the project root:
   ```bash
   cp .env.example .env.local
   ```

2. **Configure environment variables** in `.env.local`:
   ```env
   RESEND_API_KEY=your_resend_api_key
   GEMINI_API_KEY=your_gemini_api_key
   PORT=8080
   NODE_ENV=development
   ```

   - Get `RESEND_API_KEY` from [Resend.com](https://resend.com)
   - Get `GEMINI_API_KEY` from [Google AI Studio](https://aistudio.google.com)

## Running in Development

### Option 1: Two-Terminal Setup (Recommended for full functionality)

**Terminal 1 - Start the API Server:**
```bash
npm run start
# or with pnpm
pnpm start
```
The server will run on `http://localhost:8080` and handle `/api/*` requests.

**Terminal 2 - Start the Vite Dev Server:**
```bash
npm run dev
# or with pnpm
pnpm dev
```
The Vite dev server will run on `http://localhost:3000` and proxy API requests to the backend.

### Option 2: Single-Terminal Setup (API calls won't work)

If you only run:
```bash
npm run dev
```

The frontend will work, but API calls (like the contact form) will fail with 404 errors because there's no backend server running. Use Option 1 if you need to test the contact form.

## What's Fixed

✅ **Tailwind CSS Production-Ready**
- Removed CDN dependency (`cdn.tailwindcss.com`)
- Installed `tailwindcss`, `postcss`, and `autoprefixer` as dev dependencies
- Created `tailwind.config.js` with brand colors
- Created `postcss.config.js` for PostCSS processing
- CSS is now compiled during build for production

✅ **API Proxy for Development**
- Vite dev server now proxies `/api/*` requests to the backend
- No more 404 errors when testing contact form
- Automatic logging of proxy requests

✅ **Better Error Handling**
- ContactView now gracefully handles invalid JSON responses
- Improved error messages for users
- Better console logging for debugging

## Tailwind CSS Changes

The project now uses:
- **PostCSS** to compile Tailwind CSS
- **tailwind.config.js** for configuration (instead of inline in HTML)
- **index.css** for Tailwind directives (`@tailwind base; components; utilities;`)

All custom styles (text-outline, glass, scrollbar) are defined in `index.css`.

## Building for Production

```bash
npm run build
```

This will:
1. Compile Tailwind CSS to optimized CSS
2. Build React components with Vite
3. Generate sitemap

Then serve with:
```bash
npm run start
```

## Troubleshooting

### Contact Form Returns 404
- Make sure the API server is running on port 8080
- Check that `RESEND_API_KEY` is set in `.env.local`
- Check browser DevTools Network tab to confirm proxy is working

### Tailwind Classes Not Applying
- Run `pnpm install` to ensure PostCSS plugins are installed
- Restart the dev server after installing dependencies
- Check that `index.css` is imported in `index.tsx`

### API Endpoint Not Working
- Verify Express server is running: `npm run start`
- Check logs in terminal running the server
- Ensure `RESEND_API_KEY` is correctly set

## Development Scripts

- `npm run dev` - Start Vite dev server (port 3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run start` - Run Express production server
