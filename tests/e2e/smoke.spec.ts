import { test, expect } from '@playwright/test';

test('head metadata is present', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Monynha Softwares/);
  await expect(page.locator('meta[name="description"]')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /monynha\.com/);
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
});

test('robots and sitemap endpoints are reachable', async ({ page, request }) => {
  await page.goto('/');
  const robots = await request.get('/robots.txt');
  const sitemap = await request.get('/sitemap.xml');
  expect(robots.ok()).toBeTruthy();
  expect(sitemap.ok()).toBeTruthy();
});

test('mobile viewport does not overflow horizontally', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3500);
  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(hasOverflow).toBeFalsy();
});
