# DESIGN.md — DAXVORA Website

Status: draft, awaiting confirmation before Phase C (code generation).
Scope: marketing/content pages and shared visual language only. The
three interactive demos (Halo Agent, Data & Context Foundation,
Demand-to-Revenue) inherit these tokens but get their own thin visual
spec once their state logic exists — see `## Demo scope note` at the end.

---

## 1. Brand foundation

**Authoritative sources — use these files, don't retype values:**
- Color/type tokens: `brand-assets/06_Brand_Tokens/daxvora-brand-tokens.json`
  and `brand-assets/06_Brand_Tokens/daxvora.css` (CSS custom properties,
  e.g. `--dx-carbon`, `--dx-bone`, `--dx-signal`, `--dx-graphite`,
  `--dx-mist`, `--dx-white` — use these variable names directly, don't
  rename them).
- Wordmark: `brand-assets/01_Logos/DAXVORA_Wordmark_Carbon.svg` (on
  Bone/light backgrounds) and `DAXVORA_Wordmark_White.svg` (on Carbon/
  dark backgrounds). PNG fallbacks exist alongside each if SVG isn't
  usable in a given context.
- Monogram (DX mark, for small sizes only per brand kit rule):
  `brand-assets/02_Icons/DAXVORA_Monogram_Dark.svg` and
  `_Monogram_Light.svg`.
- Favicon/touch icons: `brand-assets/02_Icons/DAXVORA_Favicon.ico` and
  the `DAXVORA_Icon_*.png` set (16/32/48/180/512) — use these directly
  for `<link rel="icon">` / manifest entries rather than regenerating.

Do not regenerate the wordmark, monogram, or icons from scratch — use
the supplied files. If a needed size/format genuinely doesn't exist in
`brand-assets/`, derive it from the closest SVG rather than
freehand-recreating the mark.

**Core idea:** Data first. Agents next. DAXVORA builds the trusted data
foundation, then adds the agentic operating layer.

**Voice:** Direct, operational, evidence-led. Titles are statements, not
labels ("Halo Agent keeps context across every handoff," not "Our
Solution"). No generic startup copy, no unearned superlatives, no
invented metrics.

**What this site is not:** A generic SaaS dashboard template. Not
AI-brain iconography, not circuit patterns, not gradient hero
backgrounds, not a stock 3-column "Features" grid repeated on every
page.

## 2. Color

Use the CSS custom properties from `brand-assets/06_Brand_Tokens/daxvora.css`
directly — don't hardcode hex values in components.

| Token | Variable | Hex | Use |
|---|---|---|---|
| Carbon | `--dx-carbon` | `#0B0D10` | Primary type, dark backgrounds |
| Bone | `--dx-bone` | `#F4F2EC` | Primary document/page background |
| Signal | `--dx-signal` | `#C8FF3D` | Status, cursor, one key rule, sparing emphasis only |
| Graphite | `--dx-graphite` | `#343941` | Secondary text |
| Mist | `--dx-mist` | `#E6E9ED` | Rules, dividers, quiet fills |
| White | `--dx-white` | `#FFFFFF` | Reversed wordmark, clean surfaces |

Rules:
- Signal is a **functional status color** (live/active/success-adjacent
  states, cursor blink, one emphasis mark per view max). It is never a
  decorative accent, button-fill default, or gradient stop.
- No colors outside this table. No gradients anywhere.
- Dark sections (if used) run Carbon background / Bone or White text —
  not a separate dark-mode palette.

## 3. Typography

- Wordmark: Arial Black, uppercase, modest tracking — logo lockup only.
- All document/UI text: Arial (Bold for hierarchy). No serif pairing, no
  Inter-as-default swap-in.
- Scale (base 16px, ratio ~1.25):
  - Display: 48/56 (desktop), 32/38 (mobile) — home hero statement only
  - H1: 36/44, 28/34 mobile
  - H2: 28/36, 22/28 mobile
  - H3: 20/28
  - Body: 16/26
  - Small/meta: 13/18, Graphite, uppercase tracking for labels/eyebrows
    only where they carry real information (e.g. "STATUS", "MODE") —
    not as decoration.
- Line length: cap body text at ~68 characters.

## 4. Layout & grid

- 12-column grid, 1440px max content width, 24px gutter desktop / 16px
  mobile.
- Section rhythm: generous whitespace between sections (min 96px
  desktop / 56px mobile) — per brand kit rule "one page, one job."
  Each page section should read as a single decision point, not a
  scroll-filler.
- No default centered-hero-plus-3-cards template. Vary section
  structure page to page based on content shape:
  - Home hero: asymmetric — statement + a live-feeling status/context
    fragment (e.g. a small Signal-highlighted line), not a centered
    headline + subhead + two buttons.
  - Method: horizontal stepped sequence (7 stages), not a vertical
    icon-list.
  - Services: comparison-table treatment (per brand kit: "tables are
    for comparison and status, not for packaging paragraphs") rather
    than icon cards.
  - Operating-domain view: dense reference table/grid — this is the one
    place a denser, more "system" feeling layout is appropriate,
    contrasted against the airier marketing sections.

## 5. Components

- **Buttons:** Carbon-on-Bone primary, Graphite-outline secondary. No
  Signal-filled buttons (Signal stays a status color, not a CTA color).
- **Tables:** thin Mist rules, no zebra striping, no shadow. Used for
  Services and the Operating-domain view per brand kit rule.
- **Status/state labels:** LIVE / TEST / MOCKED / SIMULATED — small caps
  tag, Signal dot only for LIVE, neutral Graphite tag otherwise. Every
  demo entry point on the site must carry one of these visibly, not in
  a tooltip.
- **Cards:** allowed but not as the default content-packaging pattern —
  reserve for genuinely discrete, comparable items (e.g. the 6 service
  offers), not as a catch-all layout escape hatch.
- **Navigation:** persistent thin header, Carbon wordmark on Bone, plain
  text nav links (no pill/button nav), visible focus ring on every
  interactive element.

## 6. Motion

- Motion is functional, not decorative: state transitions (agent
  handoff, panel updates), not entrance animations on scroll for their
  own sake.
- Respect `prefers-reduced-motion` globally — transitions collapse to
  instant or fade-only.
- No autoplay, no looping background animation, no parallax.
- A supporting animation (e.g. a subtle cursor/typing motif tied to the
  "Signal" token) is permitted on the home hero only, and must be
  pausable/reduced-motion-safe.

## 7. Responsive behavior

Checked at 360px, 768px, 1440px:
- 360px: single column, nav collapses to a disclosed menu (not a
  hamburger icon alone — include a visible "Menu" label for clarity).
- 768px: two-column where content supports it (e.g. Method steps pair
  up), single column otherwise.
- 1440px: full grid as specified above.
- Tables (Services, Operating-domain) must have a defined mobile
  behavior — horizontal scroll with a visible affordance, not silent
  overflow.

## 8. Accessibility (binding, not aspirational)

- Semantic headings/landmarks throughout; one H1 per page.
- Visible focus state on every interactive element, including inside
  demos.
- Alt text on all meaningful imagery; decorative graphics marked
  `aria-hidden`.
- No color-only meaning — status must pair a label/icon with color,
  not rely on Signal/Graphite alone.
- Contrast: body text and UI labels meet WCAG AA against their
  background at minimum.
- Screen-reader announcements required specifically for agent handoff
  state changes in the Halo Agent demo (see demo scope note).

## 9. Content architecture (pages)

1. **Home** — value prop for 2–20 person, six-to-seven-figure
   founder-led businesses. Asymmetric hero, not centered.
2. **Method** — 7-stage sequence: discovery → atomic workflow
   decomposition → opportunity design → data/context foundation →
   agent coordination → phased rollout → measurement.
3. **Services** — table-style comparison: operating-system discovery,
   data/context foundations, Halo Agent, demand generation/revenue
   operations, business-process automation, decision intelligence.
4. **Halo Agent (detail)** — shared context, channels, routing,
   specialist transfer, retained history, action layer, controls, human
   escalation. Hosts the Halo Agent demo.
5. **Operating-domain view** — dense reference grid of full-business
   coverage, with a clear "start with one vertical" path.
6. **About** — founder intent, truthful experience positioning
   (no invented history/credentials).
7. **Contact/discovery CTA** — intake path, appears as a persistent
   secondary CTA site-wide, not only on its own page.

Content rule: every page must clearly separate **current service
positioning** from the **long-term high-autonomy vision** — use a
distinct, consistent visual marker (e.g. a small "Direction of travel"
label in Graphite) wherever the vision/north-star language appears, so
it never reads as a present-tense claim.

## 10. Anti-slop checklist (pre-flight reference)

Before implementation is considered done, confirm none of the
following appear anywhere on the site:
- AI-purple/generic gradients
- Default centered hero + subhead + two buttons
- Generic 3-column icon-card "Features" grid used as the default for
  every section
- Fake screenshots or invented product UI not covered by the demo
  scope
- Decorative status dots unconnected to real state
- Unnecessary section numbering or excessive "eyebrow" labels
- Inter or another default sans swapped in over Arial
- Unmotivated scroll/entrance animation

---

## Demo scope note

The three interactive demos are **not** speced visually here. Build
their state logic first (states, transitions, persistence/reset
behavior, LIVE/TEST/MOCKED/SIMULATED labeling) as functioning,
testable components. Once that logic works, extend this document with
a short addendum per demo covering only: layout of the context panel,
transition motion (must respect reduced-motion), and error/empty
states — inheriting the color, type, and component rules above rather
than introducing new ones.
