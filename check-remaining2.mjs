import { chromium } from 'playwright';
async function run() {
  const browser = await chromium.launch();
  const pages = ['/halo-agent', '/operating-domains', '/about', '/contact'];
  for (const path of pages) {
    const page = await browser.newPage();
    for (const width of [1440, 360]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`http://localhost:3000${path}`, { waitUntil: 'networkidle' });
      const h1 = await page.locator('h1').evaluate(el => {
        const cs = getComputedStyle(el);
        return { fontSize: cs.fontSize, lineHeight: cs.lineHeight };
      });
      const h2Count = await page.locator('h2').count();
      let h2 = null;
      if (h2Count > 0) h2 = await page.locator('h2').first().evaluate(el => {
        const cs = getComputedStyle(el);
        return { fontSize: cs.fontSize };
      });
      const diagram = await page.locator('.diagram-flow.diagram-horizontal, .diagram-schematic').first().evaluate(el => {
        const r = el.getBoundingClientRect();
        return { w: Math.round(r.width), h: Math.round(r.height) };
      }).catch(() => ({ w:0, h:0 }));
      const card = await page.evaluate(() => {
        const el = document.querySelector('.halo-elements > div, .about-principle-card');
        if (!el) return null;
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return { padding: cs.padding, border: cs.border, bg: cs.backgroundColor, w: Math.round(r.width), h: Math.round(r.height) };
      });
      console.log(`${path} ${width}px => H1:${h1.fontSize}/${h1.lineHeight} H2:${h2?h2.fontSize:'-'} diagram:${diagram.w}x${diagram.h} card:${card?card.padding:'-'} ${card?card.border:'-'}`);
      await page.screenshot({ path: `/tmp/screenshots-${path.replace(/\//g,'-')}-${width}.png`, fullPage: true });
    }
    await page.close();
  }
  await browser.close();
}
run().catch(e => { console.error(e); process.exit(1); });
