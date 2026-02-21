import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const siteUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

const routes = [
  '/',
];

const urls = routes
  .map((route) => {
    const loc = `${siteUrl}${route}`;
    return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
  })
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

await fs.mkdir(distDir, { recursive: true });
await fs.writeFile(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8');

if (!process.env.SITE_URL && !process.env.VITE_SITE_URL) {
  console.warn('Sitemap generated with default SITE_URL. Set SITE_URL to your production domain.');
}
