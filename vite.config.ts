import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import viteSitemap from 'vite-plugin-sitemap';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const siteUrl = (env.VITE_SITE_URL || 'https://monynha.com').replace(/\/$/, '');
  const seoRoutes = ['/', '/solutions', '/partnerships', '/open-source', '/contact'];
  const ViteSitemap = viteSitemap as unknown as (options: Record<string, unknown>) => any;

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
        },
      },
    },
    plugins: [
      react(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: 'Monynha Softwares | Democratizing Technology, Empowering People',
            description:
              'Custom Odoo solutions, bespoke software and AI-powered automation built by Monynha Softwares.',
            siteUrl,
          },
        },
      }),
      ViteSitemap({
        hostname: siteUrl,
        dynamicRoutes: seoRoutes,
        generateRobotsTxt: true,
      }),
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
