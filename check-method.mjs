import { chromium } from 'playwright';
async function check() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const width of [1440, 768, 360]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('http://localhost:3000/method', { waitUntil: 'networkidle' });
    console.log(`\n=== Method ${width}px ===`);
    const h1 = await page.locator('h1').evaluate(el => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return { fontSize: cs.fontSize, lineHeight: cs.lineHeight, fontWeight: cs.fontWeight, width: r.width, height: r.height };
    });
    console.log('H1:', h1);
    const diagram = await page.locator('.diagram-flow.diagram-horizontal').first().evaluate(el => {
      const r = el.getBoundingClientRect();
      return { width: r.width, height: r.height, viewBox: el.getAttribute('viewBox') };
    }).catch(e => ({ error: e.message }));
    console.log('Method diagram horizontal:', diagram);
    const diagramVert = await page.locator('.diagram-flow.diagram-vertical').first().evaluate(el => {
      const r = el.getBoundingClientRect();
      return { width: r.width, height: r.height };
    }).catch(e => ({ error: e.message }));
    console.log('Method diagram vertical rect:', diagramVert);
    const stageCount = await page.locator('.method-stages li').count();
    console.log('Stage count:', stageCount);
    const firstStage = await page.locator('.method-stages li').first().evaluate(el => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return { padding: cs.padding, border: cs.border, background: cs.backgroundColor, width: r.width, height: r.height, boxShadow: cs.boxShadow };
    });
    console.log('First stage card:', firstStage);
    const gap = await page.evaluate(() => {
      const stages = document.querySelector('.method-stages');
      const cs = getComputedStyle(stages);
      return { gap: cs.gap, display: cs.display, gridTemplateColumns: cs.gridTemplateColumns };
    });
    console.log('Method stages container:', gap);
    const sectionBand = await page.locator('.section-band').evaluate(el => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return { paddingTop: cs.paddingTop, paddingBottom: cs.paddingBottom, borderTop: cs.borderTop, borderBottom: cs.borderBottom, height: r.height };
    });
    console.log('Section band:', sectionBand);
    await page.screenshot({ path: `/tmp/screenshots-method-${width}.png`, fullPage: true });
    console.log(`Screenshot /tmp/screenshots-method-${width}.png`);
  }
  await browser.close();
}
check().catch(e => { console.error(e); process.exit(1); });
