import { expect, test } from '@playwright/test';

test('homepage navigation routes to products', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Produtos' }).click();
  await expect(page).toHaveURL(/\/produtos$/);
  await expect(page.getByRole('heading', { name: /Produtos com estrutura real/i })).toBeVisible();
});

test('product navigation presents status cards', async ({ page }) => {
  await page.goto('/produtos');
  await expect(page.getByText('Boteco PRO')).toBeVisible();
  await expect(page.getByText('Ativo')).toBeVisible();
  await expect(page.getByText('FACODI')).toBeVisible();
});

test('contact flow shows success feedback', async ({ page }) => {
  await page.goto('/contato');
  await page.getByLabel('Nome').fill('Alex');
  await page.getByLabel('E-mail').fill('alex@example.com');
  await page.getByLabel('Contexto').fill('Quero um diagnóstico de produto e operação.');
  await page.getByRole('button', { name: 'Get a diagnosis' }).click();
  await expect(page.getByRole('status')).toContainText('Mensagem recebida');
});
