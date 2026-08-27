import { test, expect } from '@playwright/test';

const ROUTES = [
  '/',
  '/method',
  '/services',
  '/halo-agent',
  '/operating-domains',
  '/about',
  '/contact'
];

test.describe('Smoke Tests', () => {
  for (const route of ROUTES) {
    test(`Route ${route} should render without crashing`, async ({ page }) => {
      await page.goto(route);
      
      // Check that the page has a title
      await expect(page).toHaveTitle(/DAXVORA/);
      
      // Ensure the main h1 exists and is visible
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
    });
  }
});
