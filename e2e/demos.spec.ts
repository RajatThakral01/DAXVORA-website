import { test, expect } from '@playwright/test';

test.describe('Demos', () => {
  test('Halo Agent demo should render', async ({ page }) => {
    await page.goto('/halo-agent');
    await expect(page.locator('.demo-container, .halo-demo, [data-demo]')).toBeVisible();
  });

  test('Data Context demo should render', async ({ page }) => {
    await page.goto('/method');
    await expect(page.locator('.demo-container, .data-context-demo, [data-demo]')).toBeVisible();
  });

  test('Demand Signal demo should render', async ({ page }) => {
    await page.goto('/services');
    await expect(page.locator('.demo-container, .demand-signal-demo, [data-demo]')).toBeVisible();
  });
});
