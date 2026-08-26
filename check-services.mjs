import { chromium } from 'playwright';
async function check() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const width of [1440, 768, 360]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('http://localhost:3000/services', { waitUntil: 'networkidle' });
    console.log(`\n=== Services ${width}px ===`);
    const h1 = await page.locator('h1').evaluate(el => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return { fontSize: cs.fontSize, lineHeight: cs.lineHeight, fontWeight: cs.fontWeight, width: r.width };
    });
    console.log('H1:', h1);
    const h2Count = await page.locator('h2').count();
    console.log('H2 count:', h2Count);
    const h2 = await page.locator('section h2').first().evaluate(el => {
      const cs = getComputedStyle(el);
      return { fontSize: cs.fontSize, lineHeight: cs.lineHeight };
    }).catch(e => ({error:e.message}));
    console.log('First H2:', h2);
    const tableHeader = await page.locator('table thead th').first().evaluate(el => {
      const cs = getComputedStyle(el);
      return { fontSize: cs.fontSize, background: cs.backgroundColor, borderBottom: cs.borderBottom, padding: cs.padding };
    });
    console.log('Table header:', tableHeader);
    const td = await page.locator('table tbody td').first().evaluate(el => {
      const cs = getComputedStyle(el);
      return { fontSize: cs.fontSize, lineHeight: cs.lineHeight, padding: cs.padding };
    });
    console.log('Table td:', td);
    const diagram = await page.locator('.diagram-flow.diagram-horizontal').first().evaluate(el => {
      const r = el.getBoundingClientRect();
      return { width: r.width, height: r.height };
    }).catch(e => ({error:e.message}));
    console.log('Services diagram horizontal:', diagram);
    const sectionGap = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      const table = document.querySelector('.table-scroll');
      if (!h1 || !table) return null;
      return table.getBoundingClientRect().top - h1.getBoundingClientRect().bottom;
    });
    console.log('Section gap H1->table:', sectionGap);
    await page.screenshot({ path: `/tmp/screenshots-services-${width}.png`, fullPage: true });
    console.log(`Screenshot /tmp/screenshots-services-${width}.png`);
  }
  await browser.close();
}
check().catch(e => { console.error(e); process.exit(1); });
