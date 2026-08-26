import { chromium } from 'playwright';
async function checkPage(path, width) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width, height: 900 });
  await page.goto(`http://localhost:3000${path}`, { waitUntil: 'networkidle' });
  const h1 = await page.locator('h1').evaluate(el => {
    const cs = getComputedStyle(el);
    return { fontSize: cs.fontSize, lineHeight: cs.lineHeight, fontWeight: cs.fontWeight };
  });
  const h2Count = await page.locator('h2').count();
  let h2 = null;
  if (h2Count > 0) {
    h2 = await page.locator('h2').first().evaluate(el => {
      const cs = getComputedStyle(el);
      return { fontSize: cs.fontSize, lineHeight: cs.lineHeight };
    });
  }
  const bodyLg = await page.locator('.body-lg').first().evaluate(el => {
    const cs = getComputedStyle(el);
    return { fontSize: cs.fontSize, lineHeight: cs.lineHeight };
  }).catch(() => null);
  const diagramH = await page.locator('.diagram-flow.diagram-horizontal, .diagram-schematic').first().evaluate(el => {
    const r = el.getBoundingClientRect();
    return { width: r.width, height: r.height, viewBox: el.getAttribute('viewBox') };
  }).catch(() => null);
  const cards = await page.evaluate(() => {
    const els = document.querySelectorAll('.halo-elements > div, .about-principle-card, .home-scope');
    if (els.length === 0) return null;
    const cs = getComputedStyle(els[0]);
    const r = els[0].getBoundingClientRect();
    return { count: els.length, padding: cs.padding, border: cs.border, background: cs.backgroundColor, width: r.width, height: r.height, boxShadow: cs.boxShadow };
  });
  console.log(`\n=== ${path} ${width}px === H1:${JSON.stringify(h1)} H2:${JSON.stringify(h2)} BodyLg:${JSON.stringify(bodyLg)} Diagram:${JSON.stringify(diagramH)} Cards:${JSON.stringify(cards)} h2Count:${h2Count}`);
  await browser.close();
}
const pages = ['/halo-agent', '/operating-domains', '/about', '/contact'];
for (const p of pages) {
  for (const w of [1440, 360]) {
    await checkPage(p, w);
  }
}
