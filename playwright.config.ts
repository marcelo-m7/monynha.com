import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  use: { baseURL: 'http://127.0.0.1:4173', trace: 'on-first-retry', browserName: 'chromium' },
  webServer: {
    command: 'pnpm dev --host 0.0.0.0 --port 4173',
    port: 4173,
    reuseExistingServer: true,
    timeout: 120_000
  },
  projects: [
    { name: 'desktop-chromium', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'mobile-chromium', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } }
  ]
});
