import { chromium } from 'playwright';
async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/method', { waitUntil: 'networkidle' });
  // Data & Context demo is hosted on /method under "Stage 04 in action"
  const pill = await page.locator('.data-context-demo__sim-label').evaluate(el => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return { fontSize: cs.fontSize, padding: cs.padding, border: cs.border, bg: cs.backgroundColor, text: el.textContent.trim().slice(0,60), width: r.width, height: r.height };
  });
  console.log('DataContext pill:', pill);
  const traceTh = await page.locator('.halo-trace-panel th').first().evaluate(el => {
    const cs = getComputedStyle(el);
    return { fontSize: cs.fontSize, lineHeight: cs.lineHeight, padding: cs.padding, fontVariant: cs.fontVariantNumeric };
  });
  console.log('Trace th (shared):', traceTh);
  const sourceStates = await page.evaluate(() => {
    const el = document.querySelector('.data-context-demo');
    return el ? el.innerHTML.includes('Awaiting normalization') && el.innerHTML.includes('Included') && el.innerHTML.includes('Excluded') : false;
  });
  console.log('Source states text still present:', sourceStates);
  const ariaLive = await page.locator('.data-context-live-region').evaluate(el => el.textContent.trim().slice(0,80));
  console.log('aria-live:', ariaLive);
  const verbatim = await page.evaluate(() => document.body.innerHTML.includes('Not connected to client systems'));
  console.log('verbatim present:', verbatim);
  const panel = await page.locator('.data-context-panel').first().evaluate(el => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return { bg: cs.backgroundColor, padding: cs.padding, width: r.width, height: r.height, lineHeight: cs.lineHeight };
  }).catch(e => ({error:e.message}));
  console.log('DataContext panel (first, if rendered):', panel);
  await page.screenshot({ path: '/tmp/screenshots-datacontext-demo-1440.png', fullPage: true });
  console.log('screenshot /tmp/screenshots-datacontext-demo-1440.png');
  await browser.close();
}
run().catch(e => { console.error(e); process.exit(1); });
