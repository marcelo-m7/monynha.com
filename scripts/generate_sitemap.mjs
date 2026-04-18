import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const siteUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://open2.tech').replace(/\/$/, '');

const routes = [
  { path: '/', priority: '1.0' },
  { path: '/solutions', priority: '0.9' },
  { path: '/partnerships', priority: '0.9' },
  { path: '/open-source', priority: '0.8' },
  { path: '/contact', priority: '0.8' },
];

const now = new Date().toISOString();

const urls = routes
  .map((route) => {
    const loc = `${siteUrl}${route.path}`;
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${now}</lastmod>`,
      '    <changefreq>weekly</changefreq>',
      `    <priority>${route.priority}</priority>`,
      '  </url>',
    ].join('\n');
  })
  .join('\n');

const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

const robots = [
  'User-agent: *',
  'Allow: /',
  '',
  `Sitemap: ${siteUrl}/sitemap.xml`,
  '',
].join('\n');

await fs.mkdir(distDir, { recursive: true });
await fs.writeFile(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8');
await fs.writeFile(path.join(distDir, 'robots.txt'), robots, 'utf8');

if (!process.env.SITE_URL && !process.env.VITE_SITE_URL) {
  console.warn('Sitemap generated with default site URL. Set SITE_URL or VITE_SITE_URL to your production domain.');
}
