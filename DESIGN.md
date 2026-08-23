---
project: DAXVORA Website (DAXVORA-RAJAT-2026-08-A01)
version: 2.1-confirmed — Phase B output + binding a11y section (§10)
  and page-structure additions (§5: Halo Agent, About, Contact/CTA);
  human-approved
status: confirmed — binding per AGENTS.md source-of-truth order
authoritative-tokens: brand-assets/06_Brand_Tokens/daxvora.css,
  daxvora-brand-tokens.json
scope: marketing/content pages and shared visual language only. The
  three demos inherit these tokens and get a thin visual addendum once
  their state logic exists (see Demo scope note).
---

# DESIGN.md — DAXVORA Website

## 1. Visual theme & atmosphere

**Core idea:** Data first. Agents next. DAXVORA builds the trusted data
foundation, then adds the agentic operating layer.

**Atmosphere keywords:** operational document, ledger, control panel,
evidence, receipt. The site should feel like a well-run operations
binder — ruled lines, fixed labels, everything accounted for — not a
product-launch page.

**Voice:** Direct, operational, evidence-led. Titles are statements, not
labels ("Halo Agent keeps context across every handoff," not "Our
Solution"). No generic startup copy, no unearned superlatives, no
invented metrics.

**What this site is not:** A generic SaaS dashboard template. Not
AI-brain iconography, not circuit patterns, not gradient hero
backgrounds, not a stock 3-column "Features" grid repeated on every
page.

**Brand assets (use files as-is):**
- Wordmark: `brand-assets/01_Logos/DAXVORA_Wordmark_Carbon.svg` (on
  Bone/light) / `DAXVORA_Wordmark_White.svg` (on Carbon/dark).
- Monogram (small sizes only): `DAXVORA_Monogram_Dark.svg` /
  `_Monogram_Light.svg`.
- Favicon/touch icons: `DAXVORA_Favicon.ico` + `DAXVORA_Icon_*.png`
  set (16/32/48/180/512) used directly for `<link rel="icon">` /
  manifest entries.
- Never regenerate marks from scratch; derive missing sizes from the
  closest supplied SVG.

## 2. Color palette & roles

Authoritative definitions live in
`brand-assets/06_Brand_Tokens/daxvora.css`. Components reference the
CSS custom properties by these exact names — never retype hex values
into component code.

```css
/* Source of truth: brand-assets/06_Brand_Tokens/daxvora.css */
:root {
  --dx-carbon:   #0B0D10; /* rgb(11, 13, 16)    */
  --dx-bone:     #F4F2EC; /* rgb(244, 242, 236) */
  --dx-signal:   #C8FF3D; /* rgb(200, 255, 61)  */
  --dx-graphite: #343941; /* rgb(52, 57, 65)    */
  --dx-mist:     #E6E9ED; /* rgb(230, 233, 237) */
  --dx-white:    #FFFFFF; /* rgb(255, 255, 255) */
}
```

The RGB triplets exist so alpha variants compose from approved colors
only — e.g. `rgb(11 13 16 / 0.72)` for softened Carbon text, or
`rgb(200 255 61 / 0.16)` as a quiet Signal tint behind a status dot.
Alpha tints are opacity math on approved tokens, not new colors.

| Role | Variable | Use |
|---|---|---|
| Ink / dark surface | `--dx-carbon` | Primary type, dark sections, primary button fill |
| Page canvas | `--dx-bone` | Primary document/page background |
| Status only | `--dx-signal` | LIVE dot, cursor blink, active-chip background — rules below |
| Secondary text | `--dx-graphite` | Secondary text, meta labels, outline buttons |
| Hairlines / fills | `--dx-mist` | 1px rules, dividers, quiet fills |
| Reversed surface/text | `--dx-white` | Text on Carbon/Graphite, clean surfaces |


**Verified contrast pairs** (WCAG 2.x ratios computed from the hex
values, not estimated):

| Pair | Ratio | Verdict |
|---|---|---|
| Carbon text on Bone | 17.38 | AAA |
| Graphite text on Bone | 10.38 | AAA |
| Bone text on Carbon | 17.38 | AAA |
| White text on Carbon | 19.46 | AAA |
| White text on Graphite | 11.62 | AAA |
| Carbon text/icon ON Signal chip | 16.52 | AAA — approved Signal pairing |
| Signal as TEXT on Bone | 1.05 | FAIL — forbidden |
| Mist on Bone | 1.09 | Rules/dividers only, never text |

Signal rules (binding):
- Signal is a **functional status color** (live/active states, cursor
  blink, one emphasis mark per view max). Never a decorative accent,
  never a button fill or CTA color, never a gradient stop, and never a
  text color on light backgrounds (1.05:1).
- Approved pairings only: dot/chip background with Carbon content on
  top; a 2px status underline/border; the hero cursor motif.
- Every Signal element maps to an actual system state. No decorative
  status dots.
- Dark sections run Carbon background with Bone or White text — not a
  separate dark-mode palette.
- No colors outside this table. No gradients anywhere.

## 3. Typography rules

- Wordmark: Arial Black, uppercase, modest tracking — logo lockup only.
  Uses the `.dx-wordmark` rule from `daxvora.css`:
  `font: 900 1em/1 'Arial Black', Arial, sans-serif; letter-spacing: .035em`.
- All document/UI text: Arial (`Arial, Helvetica, sans-serif`), Bold
  for hierarchy. No serif pairing. No Inter/system-sans swap-in as the
  default face.
- **No webfont import.** Arial is a system font; loading a webfont
  would add a network dependency against the Lighthouse ≥ 90 mobile
  budget for zero brand gain. Fallback stack is defined above and is
  the entire font payload.

Scale (base 16px, ratio ~1.25; rem values assume root 16px):

| Level | Desktop | Mobile | Weight | Notes |
|---|---|---|---|---|
| Display | 48/56 (3rem) | 32/38 | 900 | Home hero statement only |
| H1 | 36/44 (2.25rem) | 28/34 | 700 | One per page |
| H2 | 28/36 (1.75rem) | 22/28 | 700 | |
| H3 | 20/28 (1.25rem) | 19/26 | 700 | |
| Body | 16/26 (1rem) | 16/26 | 400 | Cap line length at ~68ch |
| Small/meta | 13/18 (0.8125rem) | 13/18 | 700, uppercase, tracked | Graphite; labels/eyebrows only where they carry real information ("STATUS", "MODE") — not decoration |

- Titles are sentence-style statements, not category labels.
- No text shadows, no gradient text, no letterpress effects anywhere
  (wordmark included — "no effects" is a brand-kit rule).

## 4. Component stylings

Every interactive component below must implement all listed states.
Global focus rule: `outline: 2px solid var(--dx-carbon);
outline-offset: 2px` on light surfaces, Bone outline on dark surfaces.
The focus ring is never removed and never recolored to a low-contrast
value.

**Buttons** (no Signal fills — Signal stays a status color):
- Primary: Carbon fill, White text, radius 2px, padding 12px 24px,
  min-height 44px.
- Secondary: transparent, 1px Graphite border, Graphite text.
- States: default / hover (primary → Graphite fill; secondary → Mist
  background tint) / active (translateY(1px)) / focus-visible (global
  focus rule) / disabled (Mist border, Graphite text at 0.5 opacity,
  cursor not-allowed).

**Status/state labels (LIVE / TEST / MOCKED / SIMULATED):**
- Small-caps tag, 1px border, radius 2px, min touch target 44px if
  interactive. LIVE: Signal dot + Carbon text on Signal-tint chip.
  TEST/MOCKED/SIMULATED: neutral Graphite tag on transparent.
- Every demo entry point carries its label visibly in the layout —
  never tooltip-only.
- Simulated demos must show **"Not connected to client systems"**
  adjacent to the demo surface (binding AGENTS.md rule; the string is
  specified verbatim here so implementation can't paraphrase it).

**Vision marker ("Direction of travel"):**
- Reusable component wherever long-term/high-autonomy vision language
  appears: Graphite uppercase micro-label with a Mist left-rule,
  visually distinct from present-tense service claims. Current-vs-
  vision separation is a hard content constraint, not a styling choice.

**Tables:**
- Thin Mist rules (`1px solid var(--dx-mist)`), no zebra striping, no
  shadow. Header row: Small/meta style, Carbon. Used for Services and
  the Operating-domain view — tables are for comparison and status,
  not packaging paragraphs.

**Cards:** allowed but not the default packaging pattern; reserved for
genuinely discrete, comparable items (e.g. the 6 services). Radius 2px,
1px Mist border, no shadow by default.

**Navigation:**
- Persistent thin header, Bone background, Carbon wordmark, plain text
  links (no pill/button nav). Hover: Graphite underline offset 4px.
  Active page link: underlined. Focus: global ring.
- Mobile: disclosed menu with a visible "Menu" label (not an unlabeled
  hamburger icon). Menu panel is one of the only shadowed surfaces.

**Links (inline):** Carbon text, 1px underline offset 3px; hover →
Graphite text. Visited state intentionally identical (document model,
not web-forum model).

**Form inputs (contact/intake):**
- 1px Graphite border on White/Bone surface, radius 2px, padding
  12px, min-height 44px, labels always visible above the field (no
  placeholder-as-label).
- States: default / hover (border darkens to Carbon) / focus-visible
  (global ring) / error (2px Carbon-left-accent + visible message
  text — error state must not rely on red, since red isn't in the kit;
  pair icon+text) / disabled (Mist border, 0.5 opacity text).

## 5. Layout principles

- 12-column grid, 1440px max content width, 24px gutter desktop /
  16px mobile.
- Spacing scale (4px base): 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96
  / 128. Section rhythm uses the top of the scale — min 96px desktop /
  56px mobile between sections. One page, one job: each section reads
  as a single decision point, not scroll-filler.
- Radius scale: 0 (tables/rules) → 2px (buttons, inputs, tags, cards)
  → 4px max for any floating panel. Nothing rounder; pill shapes are
  off-brand.
- No default centered-hero-plus-3-cards template. Vary section
  structure by content shape:
  - Home hero: asymmetric — statement + a live-feeling status/context
    fragment (e.g. one Signal-highlighted line), not centered headline
    + subhead + two buttons.
  - Method: horizontal stepped sequence (7 stages), not a vertical
    icon list.
  - Services: comparison-table treatment, comparable across services.
  - Operating-domain view: dense reference table/grid — deliberately
    denser than marketing sections; includes a clearly readable
    "start with one vertical" path.
  - Halo Agent (detail): element-reference treatment — each of the
    eight required elements (shared context, channels, routing,
    specialist transfer, retained history, action layer, controls,
    human escalation) gets a consistent term/statement row rather than
    freeform prose blocks, followed by the inline demo surface (demo
    hosted on this page per PRD §4, not linked out).
  - About / founder intent: single-column document treatment — one
    lead statement, then short ruled subsections. No timeline
    graphics, credential walls, or backstory decoration (nothing may
    be invented; see §1 voice rules).
  - Contact / discovery CTA: its own page hosts the full intake form
    (speced in §4 Form inputs); **in addition, a compact discovery-CTA
    strip appears as a persistent secondary CTA on every page**
    site-wide — nav-adjacent or pre-footer — not only on the contact
    page. This placement rule comes from PRD.md §4 and AGENTS.md; it
    is a structural requirement, not an optional module.

## 6. Depth & elevation

Flat-first. The document metaphor means depth is earned, not applied:

- Elevation 0 (default): no shadow anywhere — borders and rules do
  the separation work.
- Elevation 1: `0 2px 8px rgb(11 13 16 / 0.08)` — reserved for
  genuinely floating layers only: mobile menu panel, demo restart
  confirmation if modal, sticky header on scroll (optional).
- No multi-layer shadows, no colored shadows, no hover-lift effects
  on static content cards.

## 7. Animation & interaction

Interaction tier: **L1 — refined static, functionally animated** (per
AGENTS.md: motion is functional, not decorative; this overrides any
skill-default push toward L2/L3 scroll spectacle on marketing pages).

- Motion exists to show state transitions: agent handoff, panel
  updates, menu disclosure, form feedback. Not entrance animation for
  its own sake.
- Allowed vocabulary: opacity fades (150–250ms), transform translateY
  ≤ 8px, border/color transitions. Ease-out curves. No parallax, no
  autoplay, no looping background animation, no scroll-jacking, no
  pinning.
- Hero exception: one cursor/typing motif tied to the Signal token is
  permitted on the home hero only, pausable and reduced-motion-safe.
- **`prefers-reduced-motion`: globally respected — all transitions
  collapse to instant or fade-only; the hero motif renders as static
  text.**
- Demo handoffs MUST announce state changes to screen readers via an
  `aria-live="polite"` region carrying the handoff reason text — the
  announcement is part of the visual spec's contract, not an optional
  a11y extra (PRD §5.1, AGENTS.md verification pass).
- Demos inherit these rules; their addenda may specify transition
  motion between states but may not introduce new vocabulary.

## 8. Do's and don'ts

Do:
- Lead every page with one strong, specific statement.
- Label every demo state LIVE/TEST/MOCKED/SIMULATED, visibly.
- Keep tables as the comparison surface for Services/domains.
- Mark vision language with the "Direction of travel" marker.
- Use Mist hairlines and whitespace instead of boxes and shadows.

Don'ts (anti-slop checklist — none of these may appear):
- AI-purple/generic gradients, or any gradient at all.
- Default centered hero + subhead + two buttons.
- Generic 3-column icon-card "Features" grid as default section shape.
- Fake screenshots or invented product UI outside demo scope.
- Decorative status dots unconnected to real state.
- Unnecessary section numbering or decorative eyebrow labels.
- Inter or another default sans swapped in over Arial.
- Unmotivated scroll/entrance animation, parallax, autoplay anything.

## 9. Responsive behavior

Verified at 360px, 768px, 1440px (PRD §6):

| Width | Behavior |
|---|---|
| 360px | Single column; nav collapses to disclosed "Menu" panel; Display drops to 32/38; section rhythm 56px |
| 768px | Two-column where content supports it (Method steps pair up); single column otherwise |
| 1440px | Full 12-col grid, max content width |

- Tables (Services, Operating-domain) get a defined mobile behavior:
  horizontal scroll with a visible affordance (edge fade + scroll
  hint), never silent overflow.
- Touch targets: minimum 44×44px on all interactive elements.
- No horizontal page overflow at any width.

---

## 10. Accessibility (binding)

These are binding rules, not aspirations — they gate the verification
pass in AGENTS.md:

- **Semantic structure:** headings and landmarks throughout
  (`header`, `nav`, `main`, `footer`, sections labeled by their
  headings). Exactly one H1 per page.
- **Imagery:** alt text on all meaningful imagery; purely decorative
  graphics marked `aria-hidden="true"` so they leave the
  accessibility tree entirely.
- **Contrast:** body text and UI labels meet WCAG AA minimum against
  their background. The verified pairings in §2's contrast table are
  the approved combinations; any pairing not listed there must be
  computed and pass before it ships.
- **Visible focus state on every interactive element, including
  inside demos** — see §4's global focus rule (never removed, never
  recolored to a low-contrast value).
- **No color-only meaning:** status must pair a label or icon with
  color — never rely on Signal/Graphite alone to carry state.
  Compliance cross-reference: the §4 status-label spec already
  satisfies this rule — every LIVE/TEST/MOCKED/SIMULATED tag carries
  its state as visible text, with the Signal dot as reinforcement
  only; color is never the sole carrier. The same text+icon pairing
  requirement applies to form error states in §4.
- **Screen-reader announcements** for demo handoff state changes are
  specified in §7 (`aria-live="polite"` region) and are part of this
  spec's contract, not an implementation afterthought.
- **No autoplay audio** anywhere on the site.

---

## Demo scope note

The three interactive demos are **not** fully speced visually here.
Build their state logic first (states, transitions, persistence/reset,
LIVE/TEST/MOCKED/SIMULATED labeling) as functioning, testable
components. Once that logic works, extend this document with a short
addendum per demo covering only: context-panel layout, transition
motion (reduced-motion-safe), and error/empty states — inheriting the
color, type, and component rules above rather than introducing new
ones.
