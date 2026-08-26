import { chromium } from 'playwright';
async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/services', { waitUntil: 'networkidle' });
  const pill = await page.locator('.demand-signal-demo__sim-label').evaluate(el => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return { fontSize: cs.fontSize, padding: cs.padding, border: cs.border, bg: cs.backgroundColor, text: el.textContent.trim().slice(0,60), width: r.width, height: r.height };
  });
  console.log('Demand pill:', pill);
  const traceTh = await page.locator('.halo-trace-panel th').first().evaluate(el => {
    const cs = getComputedStyle(el);
    return { fontSize: cs.fontSize, lineHeight: cs.lineHeight, padding: cs.padding, fontVariant: cs.fontVariantNumeric };
  });
  console.log('Trace th:', traceTh);
  const verbatim = await page.evaluate(() => document.body.innerHTML.includes('Not connected to client systems'));
  console.log('verbatim present:', verbatim);
  const receiptCount = await page.locator('.demand-signal-receipt').count();
  console.log('Receipt count at idle (should be 0):', receiptCount);
  const ariaLive = await page.locator('.demand-signal-live-region').evaluate(el => el.textContent.trim().slice(0,80));
  console.log('aria-live idle:', ariaLive);
  // Drive to routed: select first signal, then Validating -> classified -> scored -> attributed -> routed
  await page.locator('.demand-signal-button').first().click();
  await page.waitForTimeout(400);
  await page.locator('button:has-text("Validate")').click();
  await page.waitForTimeout(300);
  await page.locator('button:has-text("Classify")').click();
  await page.waitForTimeout(300);
  await page.locator('button:has-text("Score")').click();
  await page.waitForTimeout(300);
  await page.locator('button:has-text("Attribute")').click();
  await page.waitForTimeout(600);
  const receipt = await page.locator('.demand-signal-receipt').evaluate(el => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return { bg: cs.backgroundColor, padding: cs.padding, width: r.width, height: r.height, boxShadow: cs.boxShadow, border: cs.border };
  }).catch(e => ({error:e.message}));
  console.log('Receipt after routed:', receipt);
  const receiptDtCount = await page.locator('.demand-signal-receipt dt').count();
  console.log('Receipt dt count:', receiptDtCount);
  const error = await page.locator('.demand-signal-error').count();
  console.log('Error count at routed (should be 0):', error);
  await page.screenshot({ path: '/tmp/screenshots-demand-demo-1440.png', fullPage: true });
  console.log('screenshot /tmp/screenshots-demand-demo-1440.png');
  // Now test signal_rejected: restart, select missing-email, validate
  await page.locator('button:has-text("Restart")').click();
  await page.waitForTimeout(400);
  await page.locator('.demand-signal-button').evaluate(els => {
    // Find button with text containing missing-email signal label? Use second signal? Instead find by order: missing-email is second? Check fixtures: signals[1] is missing-email
    const btns = document.querySelectorAll('.demand-signal-button');
    // Click second button (index 1) which should be signal-missing-email
    if (btns[1]) btns[1].click();
  });
  await page.waitForTimeout(400);
  await page.locator('button:has-text("Validate")').click();
  await page.waitForTimeout(400);
  const rejectedPanel = await page.locator('.demand-signal-panel--failed').evaluate(el => {
    const cs = getComputedStyle(el);
    return { borderLeft: cs.borderLeft, bg: cs.backgroundColor };
  }).catch(e => ({error:e.message}));
  console.log('Rejected panel (signal_rejected):', rejectedPanel);
  const rejectedAlert = await page.locator('[role="alert"]').evaluate(el => el.textContent.trim().slice(0,80)).catch(() => 'none');
  console.log('role=alert after rejected:', rejectedAlert);
  const ariaLiveRejected = await page.locator('.demand-signal-live-region').evaluate(el => el.textContent.trim().slice(0,100));
  console.log('aria-live rejected:', ariaLiveRejected);
  await browser.close();
}
run().catch(e => { console.error(e); process.exit(1); });
