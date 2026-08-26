import { chromium } from 'playwright';
async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/halo-agent', { waitUntil: 'networkidle' });
  const pill = await page.locator('.halo-demo__sim-label').evaluate(el => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return { fontSize: cs.fontSize, padding: cs.padding, border: cs.border, bg: cs.backgroundColor, text: el.textContent.trim().slice(0,60), width: r.width, height: r.height };
  });
  console.log('Halo pill:', pill);
  const traceTh = await page.locator('.halo-trace-panel th').first().evaluate(el => {
    const cs = getComputedStyle(el);
    return { fontSize: cs.fontSize, lineHeight: cs.lineHeight, padding: cs.padding, fontVariant: cs.fontVariantNumeric };
  });
  console.log('Trace th:', traceTh);
  const tracePanel = await page.locator('.halo-trace-panel').evaluate(el => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return { bg: cs.backgroundColor, padding: cs.padding, width: r.width, height: r.height };
  });
  console.log('Trace panel:', tracePanel);
  const ariaLive = await page.locator('[aria-live="polite"]').first().evaluate(el => el.textContent.trim().slice(0,80));
  console.log('aria-live:', ariaLive);
  const verbatim = await page.evaluate(() => document.body.innerHTML.includes('Not connected to client systems'));
  console.log('verbatim present:', verbatim);
  await page.screenshot({ path: '/tmp/screenshots-halo-demo-1440.png', fullPage: true });
  console.log('screenshot /tmp/screenshots-halo-demo-1440.png');
  await browser.close();
}
run().catch(e => { console.error(e); process.exit(1); });
