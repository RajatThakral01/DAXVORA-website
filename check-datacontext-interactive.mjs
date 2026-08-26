import { chromium } from 'playwright';
async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/method', { waitUntil: 'networkidle' });
  // Click first scenario button
  await page.locator('.data-context-scenario-button').first().click();
  await page.waitForTimeout(500);
  const panel = await page.locator('.data-context-panel').first().evaluate(el => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return { bg: cs.backgroundColor, padding: cs.padding, width: r.width, height: r.height, lineHeight: cs.lineHeight, fontSize: cs.fontSize, border: cs.border, boxShadow: cs.boxShadow };
  });
  console.log('DataContext panel after select:', panel);
  const sources = await page.evaluate(() => {
    const html = document.body.innerHTML;
    return {
      awaiting: html.includes('Awaiting normalization'),
      included: html.includes('Included'),
      excluded: html.includes('Excluded'),
      completeness: html.includes('Completeness:'),
      dtdd: document.querySelectorAll('.data-context-panel dt').length
    };
  });
  console.log('Source states after select:', sources);
  const error = await page.locator('.data-context-error').count();
  console.log('Error count (should be 0 at normalizing):', error);
  // Now click Simulate source failure to test failed panel
  await page.locator('button:has-text("Simulate source failure")').click();
  await page.waitForTimeout(500);
  const failedPanel = await page.locator('.data-context-panel--failed').evaluate(el => {
    const cs = getComputedStyle(el);
    return { borderLeft: cs.borderLeft, bg: cs.backgroundColor };
  }).catch(e => ({error:e.message}));
  console.log('Failed panel:', failedPanel);
  const alert = await page.locator('[role="alert"]').evaluate(el => el.textContent.trim().slice(0,80)).catch(() => 'none');
  console.log('role=alert:', alert);
  const ariaLive = await page.locator('.data-context-live-region').evaluate(el => el.textContent.trim().slice(0,100));
  console.log('aria-live after failure:', ariaLive);
  await browser.close();
}
run().catch(e => { console.error(e); process.exit(1); });
