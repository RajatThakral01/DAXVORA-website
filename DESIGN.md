---
project: DAXVORA Website (DAXVORA-RAJAT-2026-08-A01)
version: 3.0-confirmed — targeted amendment over 2.1-confirmed.
  Loosens elevation (§6), motion (§7), and adds an explicit imagery/
  diagram system (§11, new) plus section-background variation (§5).
  Typography (§3) stays Arial-only per AGENTS.md hard constraint — the
  v3 proposal to add a heading webfont was rejected during drafting as
  a conflict with "Documents/UI text is Arial" and is NOT included.
status: confirmed — supersedes 2.1-confirmed; human-confirmed before
  implementation (frontmatter corrected from draft status at
  confirmation time)
authoritative-tokens: brand-assets/06_Brand_Tokens/daxvora.css,
  daxvora-brand-tokens.json
scope: marketing/content pages and shared visual language, plus the
  demo visual addendum rules. No change to demo state logic — see Demo
  scope note at the end.
changelog-from-2.1:
  - §3 Typography — UNCHANGED except one clarifying note (see below).
    No webfont added.
  - §5 Layout — added explicit hero/body weight alternation and
    full-bleed section-background guidance.
  - §6 Elevation — extended earned-shadow use to functionally-elevated
    demo surfaces (context panels, active/focused states, receipt
    views). Static marketing content stays flat.
  - §7 Motion — added a second, narrower motion allowance for
    sequential/comparative content (Method, Services, Operating-domain)
    on top of the existing L1 baseline. Framed as structural, not
    decorative, to stay inside AGENTS.md's "motion is functional" rule.
  - §11 Imagery & diagram system — NEW. Previously unspecified; this
    was the biggest actual gap, not a banned-thing problem.
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

**What changed in v3:** the site should no longer read as *plain* —
restraint and richness aren't opposites. §11 gives the site a visual
system beyond type and rules (line-diagrams, not photography or
AI-brain art); §6 and §7 let state and sequence carry earned depth and
motion. Every one of the "what this site is not" items above still
holds — nothing added here is a gradient, a stock image, or a
decorative flourish unconnected to real content structure.

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

**UNCHANGED from 2.1.** No new colors, no new tokens. Restated in full
below only so this file stays a complete standalone spec.

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

**UNCHANGED from 2.1 — kept strictly Arial per AGENTS.md's hard
constraint** ("Wordmark is Arial Black, uppercase, no effects.
Documents/UI text is Arial"). A draft v3 proposal to add a self-hosted
display webfont for headings was considered and rejected: the "no
webfont" line in 2.1 was framed as a Lighthouse-budget decision, but
the underlying rule is a brand-kit content constraint, not a
performance one — it doesn't get reopened by fixing the performance
argument. Typographic distinctiveness in v3 comes from more deliberate
use of the existing Arial weight range (see the new note below), not a
second typeface.

- Wordmark: Arial Black, uppercase, modest tracking — logo lockup only.
  Uses the `.dx-wordmark` rule from `daxvora.css`:
  `font: 900 1em/1 'Arial Black', Arial, sans-serif; letter-spacing: .035em`.
- All document/UI text: Arial (`Arial, Helvetica, sans-serif`), Bold
  for hierarchy. No serif pairing. No Inter/system-sans swap-in as the
  default face.
- **No webfont import.** Arial is a system font; loading a webfont
  would add a network dependency against the Lighthouse ≥ 90 mobile
  budget for zero brand gain — and would conflict with the Arial-only
  content rule regardless. Fallback stack is defined above and is the
  entire font payload.

Scale (base 16px, ratio ~1.25; rem values assume root 16px):

| Level | Desktop | Mobile | Weight | Notes |
|---|---|---|---|---|
| Display | 48/56 (3rem) | 32/38 | 900 | Home hero statement only |
| H1 | 36/44 (2.25rem) | 28/34 | 700 | One per page |
| H2 | 28/36 (1.75rem) | 22/28 | 700 | |
| H3 | 20/28 (1.25rem) | 19/26 | 700 | |
| Body | 16/26 (1rem) | 16/26 | 400 | Cap line length at ~68ch |
| Small/meta | 13/18 (0.8125rem) | 13/18 | 700, uppercase, tracked | Graphite; labels/eyebrows only where they carry real information ("STATUS", "MODE") — not decoration |

**New in v3 — expressive-but-compliant note:** where a page needs one
moment of real typographic weight (Home Display line, section-opening
statements on Method/Halo Agent), use Arial Black (900) at the top of
the scale with tighter negative tracking (-0.01em to -0.02em at
Display/H1 sizes only) rather than reaching for a second face. This is
allowed by the existing scale/weight table as written — it's a
usage discipline, not a new rule, and stays entirely inside Arial.

- Titles are sentence-style statements, not category labels.
- No text shadows, no gradient text, no letterpress effects anywhere
  (wordmark included — "no effects" is a brand-kit rule).

## 4. Component stylings

**UNCHANGED from 2.1**, except the elevation cross-reference in
Buttons/Tables/Cards now points to the expanded §6 below — no styling
values changed here.

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
1px Mist border, no shadow by default (an active/focused card may earn
Elevation 1 — see §6).

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

12-column grid, spacing scale, and radius scale are **unchanged from
2.1**. Two additions below (marked NEW).

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

**NEW — hero/body weight alternation.** Every content page should
read as heavy → light → heavy, not uniform gray-scale scrolling:
- The page's opening section (hero/lead statement) gets full visual
  weight: Display or H1 at Arial Black, plus one diagram or motif from
  §11 where the page has one (Method, Halo Agent, Operating-domain,
  Demand-to-Revenue's host page). Pages without an assigned diagram
  (About, Contact) stay typographic-only by design — that restraint is
  intentional for those two, not a gap.
- Body sections (explanatory prose, table rows) stay quieter —
  Body/Small-meta scale, Elevation 0, Bone or Mist background.
- This alternation is achieved with type scale, spacing, and the
  background rule below — never with a new color or a shadow on static
  content.

**NEW — full-bleed section backgrounds.** Previously, Carbon/Mist
appeared only as text-reversal (dark sections) or hairlines. v3 makes
explicit that a **full-bleed Bone, Mist, or Carbon background** may be
used for 1–2 sections per page to create rhythm — e.g. a Mist-bleed
band behind the Method sequence, or a Carbon-bleed closing section
before the footer with Bone/White reversed text and the discovery CTA.
Still zero new colors, still governed by the §2 token table and
contrast pairs; this is a usage-frequency change, not a palette change.

## 6. Depth & elevation

**Extended from 2.1.** Static marketing content stays flat — that
principle is unchanged. What's new is a second earned-elevation
category for surfaces that are *functionally* active/elevated, not
decorative.

- **Elevation 0 (default, unchanged):** no shadow on any static
  content — sections, cards-at-rest, tables. Borders and rules do the
  separation work.
- **Elevation 1** (`0 2px 8px rgb(11 13 16 / 0.08)`) — unchanged
  triggers (mobile menu panel, demo restart confirmation if modal,
  optional sticky header), **plus, new in v3:**
  - A demo's active context panel (Halo Agent context panel, the
    governed-context-record view in Data & Context Foundation) while a
    run is in progress — signals "this is the live decision surface,"
    which is a real state, not decoration.
  - A card or table row in an explicit focused/selected state (e.g. a
    selected persona/scenario before a demo run starts).
  - The receipt/dashboard end-state in Demand-to-Revenue — it's the
    one surface on the site meant to look like a discrete artifact
    handed back to the visitor.
- **Elevation 2** (new, narrow): `0 4px 16px rgb(11 13 16 / 0.12)` —
  reserved exclusively for the observability/trace panel (PRD §7.3)
  while actively logging a run, so the audit evidence reads as the
  most "real" surface in any demo. Not used anywhere else.
- No multi-layer shadows, no colored shadows, no hover-lift on static
  content cards — unchanged. Elevation still maps to actual state, the
  same discipline §4's Signal rule already enforces for color.

## 7. Animation & interaction

**Baseline (unchanged from 2.1):** Interaction tier L1 — refined
static, functionally animated — remains the default for all static
marketing content, and the full L1 vocabulary/restrictions below still
apply everywhere unless the new §7.1 exception applies.

- Motion exists to show state transitions: agent handoff, panel
  updates, menu disclosure, form feedback. Not entrance animation for
  its own sake.
- Allowed vocabulary: opacity fades (150–250ms), transform translateY
  ≤ 8px, border/color transitions. Ease-out curves. No parallax, no
  autoplay, no looping background animation, no scroll-jacking, no
  pinning.
- Hero exception: one cursor/typing motif tied to the Signal token is
  permitted on the home hero only, pausable and reduced-motion-safe.
- **`prefers-reduced-motion`: globally respected** — all transitions
  collapse to instant or fade-only; the hero motif renders as static
  text. This applies to §7.1 below too, without exception.
- Demo handoffs MUST announce state changes to screen readers via an
  `aria-live="polite"` region carrying the handoff reason text.

### 7.1 NEW — structural reveal, for sequential/comparative content only

A narrow, second allowance — **not** a general upgrade to L2/L3. Scope
is limited to exactly three places: the Method 7-stage sequence, the
Services comparison table rows, and the Operating-domain grid. These
are the site's clearest cases of content whose *order* is part of its
meaning, so motion that reinforces sequence is functional, in the same
sense §7's baseline already treats handoff/panel motion as functional
— it is not entrance animation for its own sake.

- Allowed: a single, non-repeating staggered reveal (opacity + ≤8px
  translateY, same easing/timing budget as baseline) as each stage/row/
  cell enters the viewport, stagger delay ≤60ms per item, total
  sequence ≤600ms. Fires once per page load — no re-triggering on
  scroll-back-up, no looping.
  - Content is always present in the DOM and accessibility tree at
  render time — the reveal is a CSS opacity/transform animation on
  already-mounted elements only. It must never be implemented as a
  mount-on-scroll / IntersectionObserver-triggered render pattern,
  since that would delay DOM presence and violate §10's DOM-presence
  rule. The trigger (viewport entry) may gate *when the animation
  plays*, never *when the content exists*.
- Still no parallax, no pinning, no scroll-jacking (the page scrolls
  at the browser's normal rate throughout — motion decorates arrival,
  it never controls scroll).
- Under `prefers-reduced-motion`, this collapses to instant appearance
  exactly like every other transition in this document — no exception.
- Nowhere else on the site. Home, Halo Agent detail (outside its
  demo), About, and Contact stay strictly L1 baseline — no reveal
  motion, because nothing on those pages is sequential/comparative in
  this sense.

## 8. Do's and don'ts

Do:
- Lead every page with one strong, specific statement.
- Label every demo state LIVE/TEST/MOCKED/SIMULATED, visibly.
- Keep tables as the comparison surface for Services/domains.
- Mark vision language with the "Direction of travel" marker.
- Use Mist hairlines and whitespace instead of boxes and shadows on
  static content — elevation is earned per §6, not default.
- **New:** use the §11 diagram system, not prose alone, to explain
  structure (Method, Halo Agent routing, Operating-domain, the
  Demand-to-Revenue pipeline).

Don'ts (anti-slop checklist — none of these may appear):
- AI-purple/generic gradients, or any gradient at all.
- Default centered hero + subhead + two buttons.
- Generic 3-column icon-card "Features" grid as default section shape.
- Fake screenshots or invented product UI outside demo scope.
- Decorative status dots unconnected to real state.
- Unnecessary section numbering or decorative eyebrow labels.
- Inter, or any webfont, or another default sans swapped in over
  Arial — including for headings (see §3).
- Unmotivated scroll/entrance animation, parallax, autoplay anything
  — §7.1's reveal is the one narrow, scoped exception; it is not a
  license to add motion elsewhere.
- Stock photography, AI-brain/circuit imagery, or any illustration
  outside the §11 diagram system.

## 9. Responsive behavior

**Unchanged from 2.1.**

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
- Diagrams (§11) get an explicit mobile rule: simplify to a vertical
  flow at ≤768px rather than shrinking a wide diagram until it's
  unreadable — same "never silent overflow" discipline as tables.

---

## 10. Accessibility (binding)

**Unchanged from 2.1** — all binding, all still gate the verification
pass in AGENTS.md. One addition (marked NEW) to cover the new §11
diagrams and §7.1 motion.

- **Semantic structure:** headings and landmarks throughout
  (`header`, `nav`, `main`, `footer`, sections labeled by their
  headings). Exactly one H1 per page.
- **Imagery:** alt text on all meaningful imagery; purely decorative
  graphics marked `aria-hidden="true"` so they leave the
  accessibility tree entirely.
- **NEW — Diagrams specifically:** every §11 diagram must either carry
  a text alternative (visible caption/summary, not just an `alt`
  attribute, since these are structural/informational, not
  decorative) or have its information fully duplicated in adjacent
  text content — a diagram may never be the *only* place a required
  piece of information (e.g. a Method stage's output, a Halo Agent
  element) appears.
- **Contrast:** body text and UI labels meet WCAG AA minimum against
  their background. The verified pairings in §2's contrast table are
  the approved combinations; any pairing not listed there must be
  computed and pass before it ships. This includes text placed on the
  new full-bleed Mist/Carbon section backgrounds from §5 — check
  against §2's table, don't assume.
- **Visible focus state on every interactive element, including
  inside demos** — see §4's global focus rule (never removed, never
  recolored to a low-contrast value).
- **No color-only meaning:** status must pair a label or icon with
  color — never rely on Signal/Graphite alone to carry state.
- **Screen-reader announcements** for demo handoff state changes
  (`aria-live="polite"`) — part of this spec's contract.
- **NEW — §7.1 reveal motion:** the staggered reveal must not delay
  content from being present in the DOM/accessibility tree — it's a
  visual entrance only; a screen reader or reduced-motion user gets
  the content immediately, never gated behind the animation completing.
- **No autoplay audio** anywhere on the site.

---

## 11. Imagery & diagram system (NEW)

This section didn't exist in 2.1, and its absence was the single
biggest cause of the site reading as plain — with no visual material
specified beyond type/rules/tables, implementation defaulted to
text-only pages. This section closes that gap with a bounded system,
not an open license to add imagery freely.

**What's allowed — exactly one category:** custom line-diagrams and
schematics, built from the existing token set only (Carbon strokes on
Bone, Mist fills, Signal used only where it marks an actual live/
active state within the diagram — same rule as everywhere else on the
site). No photography, no stock illustration, no icon packs beyond the
supplied monogram, no AI-generated imagery of any kind. This is a
direct extension of AGENTS.md's existing "no AI-brain/circuit imagery"
rule — line-diagrams in the brand's own visual language are the
positive alternative, not a loophole around the prohibition.

**Where diagrams appear (one per assigned page/section, not
decorative repetition):**
- **Method:** the 7-stage sequence itself rendered as a connected
  horizontal flow (desktop) / vertical flow (mobile, per §9) — stage
  boxes as Mist-bordered rects joined by thin Carbon connector lines,
  not just a styled list. This is the page's hero visual, replacing
  a generic hero image.
- **Halo Agent (detail):** a routing/handoff schematic — shared
  context at the center, channels/specialists as connected nodes,
  human escalation as a distinct terminal node. This is separate from
  the live Halo Agent demo (§ Demo scope note) — a static schematic
  explaining the concept, sitting above the interactive demo on the
  same page.
- **Operating-domain view:** the 12 domains as a structured grid/map
  (already speced as a dense table in §5) — the diagram treatment here
  is the table itself rendered with clear grouping/connector lines
  rather than a separate illustration; no second graphic needed.
- **Demand-to-Revenue (wherever PRD/DESIGN assigns its host section):**
  a pipeline diagram — validate → classify → score → attribute →
  route — as connected stages, mirroring the demo's own step sequence
  so the static diagram and the interactive demo visually agree.

**Supporting motif (extends the existing hero cursor allowance):** a
near-zero-opacity Carbon-on-Bone dot-grid or ruled-grid texture (think
graph paper / control-panel backing, opacity ≤0.04) may sit behind the
Home hero and full-bleed Carbon section backgrounds from §5 —
reinforces "control panel/ledger" atmosphere without being a gradient,
a photo, or a new color. Must be `aria-hidden="true"` (pure decoration,
no informational content) and must not reduce text contrast below the
§2 table's verified pairs.

**Explicitly still forbidden (unchanged from AGENTS.md):** stock
photography, AI-brain/circuit iconography, gradients, invented product
screenshots outside actual demo UI, any new color introduced via an
image asset (diagrams render in SVG using CSS custom properties, same
as every other component — never a rasterized image with hardcoded
hex values).

## Demo scope note

**Unchanged in principle from 2.1**, updated only to reference the
extended elevation/motion rules above. The three interactive demos are
still not fully speced visually here. Build their state logic first
(states, transitions, persistence/reset, LIVE/TEST/MOCKED/SIMULATED
labeling) as functioning, testable components. Once that logic works,
extend this document with a short addendum per demo covering: context-
panel layout (may use the new §6 Elevation 1 while a run is active),
transition motion (still governed by §7's baseline vocabulary — §7.1's
reveal allowance does NOT extend to demo internals, which stay
strictly functional/state-driven motion), and error/empty states —
inheriting the color, type, and component rules above rather than
introducing new ones.