import { expect, test, type Page } from '@playwright/test';

async function acceptCookieConsentIfVisible(page: Page) {
  const acceptButton = page.getByRole('button', { name: /Aceitar tudo/i }).first();
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }
}

async function openWizard(page: Page) {
  await page.goto('/');
  await page.getByRole('button', { name: /Pular Intro/i }).click();
  await expect(page.getByRole('heading', { name: /MONYNHA/i })).toBeVisible();
  await acceptCookieConsentIfVisible(page);
  await page.getByRole('button', { name: /Iniciar Diagnóstico/i }).click();
  await expect(page.getByLabel(/Seu melhor e-mail/i)).toBeVisible();
}

async function fillWizardUntilSubmit(page: Page) {
  await page.getByLabel(/Seu melhor e-mail/i).fill('qa@monynha.com');
  await page.getByRole('button', { name: /Começar/i }).click();

  await page.getByLabel(/Nome da Empresa ou Projeto/i).fill('Monynha QA');
  await page.getByRole('button', { name: /Próximo Passo/i }).click();

  await page.getByRole('button', { name: /Produto/i }).first().click();
  await page.getByRole('button', { name: /Próximo Passo/i }).click();

  await page.getByRole('button', { name: /Prefiro contratar alguém para fazer/i }).first().click();
  await page.getByRole('button', { name: /Próximo Passo/i }).click();

  await page.locator('textarea').first().fill('Tenho dificuldade para organizar atendimento, funil e operação entre marketing e vendas.');
  await page.getByRole('button', { name: /Próximo Passo/i }).click();

  await page.getByPlaceholder('https://suaempresa.com').fill('https://monynha.com');
}

test('wizard validates required fields before advancing', async ({ page }) => {
  await openWizard(page);

  await expect(page.getByRole('button', { name: /Começar/i })).toBeDisabled();

  await page.getByLabel(/Seu melhor e-mail/i).fill('email-invalido');
  await expect(page.getByRole('button', { name: /Começar/i })).toBeDisabled();

  await page.getByLabel(/Seu melhor e-mail/i).fill('valid@monynha.com');
  await expect(page.getByRole('button', { name: /Começar/i })).toBeEnabled();
  await page.getByRole('button', { name: /Começar/i }).click();

  await expect(page.getByRole('heading', { name: /Qual é a tua/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Próximo Passo/i })).toBeDisabled();

  await page.getByLabel(/Ainda não tenho nome/i).check();
  await expect(page.getByRole('button', { name: /Próximo Passo/i })).toBeEnabled();
});

test('wizard submits and shows diagnosis report when Supabase APIs succeed', async ({ page }) => {
  await page.route('**/functions/v1/send-contact-confirmation', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, confirmationSent: true, internalSent: true }),
    });
  });

  await page.route('**/functions/v1/generate-diagnosis', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        data: {
          title: 'Operação pronta para escala',
          description: 'Existe demanda validada, mas ainda faltam automações para garantir previsibilidade de crescimento.',
          scores: { visibility: 72, conversion: 61, processes: 49 },
          recommendations: [
            'Mapear e padronizar o funil de atendimento',
            'Automatizar qualificação e follow-up de leads',
            'Integrar CRM e canais de aquisição em um painel único',
          ],
          sources: [],
        },
      }),
    });
  });

  await page.route('**/rest/v1/rpc/save_lead_with_diagnosis*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([{ lead_id: '00000000-0000-0000-0000-000000000001', diagnosis_id: '00000000-0000-0000-0000-000000000002' }]),
    });
  });

  await page.route('**/functions/v1/send-diagnostic-email', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, message: 'ok' }),
    });
  });

  await openWizard(page);
  await fillWizardUntilSubmit(page);

  await page.getByRole('button', { name: /Gerar Diagnóstico/i }).click();
  await expect(page.getByText('Operação pronta para escala')).toBeVisible({ timeout: 15000 });
});

test('wizard shows fallback diagnosis when diagnosis API fails', async ({ page }) => {
  await page.route('**/functions/v1/send-contact-confirmation', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, confirmationSent: true, internalSent: true }),
    });
  });

  await page.route('**/functions/v1/generate-diagnosis', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ success: false, error: 'OPENAI_API_KEY not configured' }),
    });
  });

  await page.route('**/rest/v1/rpc/save_lead_with_diagnosis*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([{ lead_id: '00000000-0000-0000-0000-000000000011', diagnosis_id: '00000000-0000-0000-0000-000000000012' }]),
    });
  });

  await page.route('**/functions/v1/send-diagnostic-email', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, message: 'ok' }),
    });
  });

  await openWizard(page);
  await fillWizardUntilSubmit(page);

  await page.getByRole('button', { name: /Gerar Diagnóstico/i }).click();

  await expect(page.getByText(/Mona, o sistema deu uma piscada!/i)).toBeVisible({ timeout: 15000 });
});
