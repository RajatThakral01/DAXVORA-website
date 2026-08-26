import { chromium } from 'playwright';

async function checkHome() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Check at 1440, 768, 360
  for (const width of [1440, 768, 360]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

    console.log(`\n=== Viewport ${width}px ===`);

    // Hero headline
    const h1Rect = await page.locator('.home-hero h1').evaluate(el => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return { width: r.width, height: r.height, fontSize: cs.fontSize, lineHeight: cs.lineHeight, fontWeight: cs.fontWeight };
    });
    console.log('Home H1 rect:', h1Rect);

    // Diagram - check actual rendered size
    const diagramRect = await page.locator('.home-overview-diagram').evaluate(el => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return { width: r.width, height: r.height, display: cs.display };
    }).catch(e => ({ error: e.message }));
    console.log('Home diagram rect:', diagramRect);

    // Also check SVG inside
    const svgRect = await page.locator('.home-overview-diagram svg.diagram-horizontal').evaluate(el => {
      const r = el.getBoundingClientRect();
      return { width: r.width, height: r.height, viewBox: el.getAttribute('viewBox') };
    }).catch(e => ({ error: 'horizontal not visible at this width: ' + e.message }));
    console.log('Home SVG horizontal rect:', svgRect);

    const svgVertRect = await page.locator('.home-overview-diagram svg.diagram-vertical').evaluate(el => {
      const r = el.getBoundingClientRect();
      return { width: r.width, height: r.height };
    }).catch(e => ({ error: e.message }));
    console.log('Home SVG vertical rect:', svgVertRect);

    // Cards
    const homeScopeRect = await page.locator('.home-scope').evaluate(el => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return { padding: cs.padding, border: cs.border, width: r.width, height: r.height };
    });
    console.log('Home scope card:', homeScopeRect);

    const nextStepsLiRect = await page.locator('.home-next-steps li').first().evaluate(el => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return { padding: cs.padding, border: cs.border, width: r.width, height: r.height, boxShadow: cs.boxShadow };
    });
    console.log('Home next-steps li card:', nextStepsLiRect);

    // Section gaps - distance between scope and next-steps
    const gap = await page.evaluate(() => {
      const scope = document.querySelector('.home-scope');
      const next = document.querySelector('.home-next-steps');
      if (!scope || !next) return null;
      const r1 = scope.getBoundingClientRect();
      const r2 = next.getBoundingClientRect();
      return { distance: r2.top - r1.bottom, r1Bottom: r1.bottom, r2Top: r2.top };
    });
    console.log('Section gap (scope -> next-steps):', gap);

    // Check that 4 type sizes are applied
    const typeChecks = await page.evaluate(() => {
      const h1 = getComputedStyle(document.querySelector('.home-hero h1'));
      const h2 = getComputedStyle(document.querySelector('.home-scope h2'));
      const bodyLg = getComputedStyle(document.querySelector('.home-scope p'));
      const pill = getComputedStyle(document.querySelector('.hero-status'));
      return {
        h1: { fontSize: h1.fontSize, fontWeight: h1.fontWeight, lineHeight: h1.lineHeight },
        h2: { fontSize: h2.fontSize, fontWeight: h2.fontWeight },
        bodyLg: { fontSize: bodyLg.fontSize, lineHeight: bodyLg.lineHeight },
        pill: { fontSize: pill.fontSize, fontWeight: pill.fontWeight }
      };
    });
    console.log('Type sizes:', typeChecks);

    // Screenshot
    await page.screenshot({ path: `/tmp/screenshots-home-${width}.png`, fullPage: true });
    console.log(`Screenshot saved to /tmp/screenshots-home-${width}.png`);
  }

  await browser.close();
}

checkHome().catch(e => { console.error(e); process.exit(1); });
