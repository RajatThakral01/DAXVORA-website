import { chromium } from 'playwright';
async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/method', { waitUntil: 'networkidle' });
  const before = await page.evaluate(() => document.body.innerHTML.includes('Awaiting normalization'));
  console.log('Before select Awaiting present:', before);
  await page.locator('.data-context-scenario-button').first().click();
  await page.waitForTimeout(600);
  const after = await page.evaluate(() => {
    const html = document.body.innerHTML;
    return {
      awaiting: html.includes('Awaiting normalization'),
      included: html.includes('Included'),
      excluded: html.includes('Excluded:'),
      sourcesLi: document.querySelectorAll('.data-context-demo ul li').length
    };
  });
  console.log('After select:', after);
  // Now governance
  await page.locator('button:has-text("Confirm governance")').click();
  await page.waitForTimeout(600);
  const panel = await page.locator('.data-context-panel').evaluate(el => {
    const cs = getComputedStyle(el);
    return { bg: cs.backgroundColor, padding: cs.padding, boxShadow: cs.boxShadow, borderLeft: cs.borderLeft };
  }).catch(e => ({error:e.message}));
  console.log('Panel after governance:', panel);
  const dtCount = await page.locator('.data-context-panel dt').count();
  console.log('Panel dt count:', dtCount);
  await browser.close();
}
run().catch(e => { console.error(e); process.exit(1); });
