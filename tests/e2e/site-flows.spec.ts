import { expect, test, type Page } from '@playwright/test';

async function skipIntro(page: Page) {
  await page.goto('/');
  await page.getByRole('button', { name: /Pular Intro/i }).click();
  await expect(page.getByRole('heading', { name: /MONYNHA/i })).toBeVisible();
}

async function openProjectsFromAbout(page: Page) {
  await page.getByRole('button', { name: /Nossos Labs|Conhecer a Monynha/i }).click();
  await expect(page.getByRole('heading', { name: /ENGENHARIA\s+ENCONTRA\s+A/i }).first()).toBeVisible();

  const viewAllButton = page.getByRole('button', { name: /Ver Todos/i }).first();
  await viewAllButton.evaluate((element) => (element as HTMLButtonElement).click());
  await expect(page.getByRole('heading', { name: /Criaturas do/i })).toBeVisible();
}

test('landing can open about view and start wizard', async ({ page }) => {
  await skipIntro(page);

  await page.getByRole('button', { name: /Nossos Labs|Conhecer a Monynha/i }).click();
  await expect(page.getByRole('heading', { name: /ENGENHARIA\s+ENCONTRA\s+A/i }).first()).toBeVisible();

  await page.getByRole('button', { name: /Iniciar Wizard/i }).click();
  await expect(page.getByLabel(/Seu melhor e-mail/i)).toBeVisible();
});

test('about view can open projects and show product cards', async ({ page }) => {
  await skipIntro(page);

  await openProjectsFromAbout(page);

  await expect(page.getByRole('heading', { name: 'Boteco PRO', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'FACODI', exact: true })).toBeVisible();
});

test('projects view can start the diagnostic wizard', async ({ page }) => {
  await skipIntro(page);

  await openProjectsFromAbout(page);

  await page.getByRole('button', { name: /Iniciar Projeto/i }).first().click();
  await expect(page.getByRole('heading', { name: /Diz-me o teu melhor e-mail/i })).toBeVisible();
});
