# Project Instructions

## What this project is

A public, responsive website for DAXVORA — a data/agentic operating-system
studio for founder-led businesses. This is one of three deliverables in a
capability assessment (DAXVORA-RAJAT-2026-08-A01). The site must feel
designed specifically for DAXVORA, not like a generic SaaS template or
"AI slop" landing page.

## Source of truth, in order

1. This file (AGENTS.md) — hard constraints from the assessment brief.
2. `DESIGN.md` — visual direction, layout, typography, color, motion,
   responsive behavior, once approved.
3. The two design skills below — process, not content decisions.

If a skill's default behavior conflicts with a rule in this file, this
file wins. Do not let a skill silently override a brand-kit or content
rule below.

## Brand asset locations (use these files, don't regenerate)

- Color/type tokens (authoritative): `brand-assets/06_Brand_Tokens/`
  — `daxvora-brand-tokens.json` and `daxvora.css`. Use the CSS custom
  properties (`--dx-carbon`, `--dx-bone`, `--dx-signal`, `--dx-graphite`,
  `--dx-mist`, `--dx-white`) directly rather than hardcoding hex values.
- Wordmark: `brand-assets/01_Logos/DAXVORA_Wordmark_Carbon.svg` (light
  backgrounds) / `DAXVORA_Wordmark_White.svg` (dark backgrounds).
- Monogram: `brand-assets/02_Icons/DAXVORA_Monogram_Dark.svg` /
  `_Light.svg` — small sizes only, per brand kit rule.
- Favicon/touch icons: `brand-assets/02_Icons/DAXVORA_Favicon.ico` and
  the `DAXVORA_Icon_*.png` set.
- Do not regenerate the wordmark, monogram, or icons from scratch —
  use the supplied files as-is or derive missing sizes from the
  closest SVG.
- `reference-docs/daxvora_company-vision-positioning-and-services_v01.docx`
  is source material for content decisions, not something to quote
  verbatim or publish as a downloadable file on the site.

## Hard content constraints (non-negotiable)

- Use only the supplied DAXVORA brand kit (Carbon `#0B0D10`, Bone
  `#F4F2EC`, Signal `#C8FF3D`, Graphite `#343941`, Mist `#E6E9ED`, White).
  Do not invent a new color, gradient, logo treatment, or AI-brain/circuit
  imagery. Signal is a functional status color — use it sparingly, never
  as a decorative accent.
- Wordmark is Arial Black, uppercase, no effects. Documents/UI text is
  Arial. Voice is direct, operational, evidence-led — no generic startup
  copy, no invented superlatives.
- Never invent clients, testimonials, ROI numbers, certifications, or
  integrations. If an example is needed, it must be clearly hypothetical
  or anonymized, and labeled as such.
- Clearly separate **current service positioning** (what DAXVORA offers
  today) from the **long-term high-autonomy vision** (the "auto mode"
  north star). Do not blend these into one claim.
- Every demo/integration state must be labeled LIVE, TEST, MOCKED, or
  SIMULATED. Simulated demos must show "Not connected to client systems"
  next to them.

## Required pages/sections

- Home — value prop for 2–20 person, six-to-seven-figure founder-led
  businesses.
- Method — discovery → atomic workflow decomposition → opportunity
  design → data/context foundation → agent coordination → phased
  rollout → measurement.
- Services — operating-system discovery, data/context foundations, Halo
  Agent, demand generation/revenue operations, business-process
  automation, decision intelligence.
- Halo Agent (detail) — shared context, channels, routing, specialist
  transfer, retained history, action layer, controls, human escalation.
- Operating-domain view — full-business coverage, with the option to
  build one vertical first.
- About/founder intent, discovery CTA, contact/intake path.

## The three demos are a separate build track

Taste-skill (`design-taste-frontend`) is explicitly out of scope for
dashboards, multi-step forms, and stateful product UI. The three demos
below are exactly that, so build their *logic* first as plain,
testable state machines — before any visual-design pass touches them.

1. **Halo Agent demo** — visitor selects a persona/scenario → router/
   qualifier → at least 2 specialist states (or 1 specialist + human
   escalation). A context panel shows a customer tag, a profile field,
   a conversation-history excerpt, and a handoff reason. Context must
   persist across transfer and reset cleanly on restart.
2. **Data & context foundation demo** — multiple sources normalize into
   a governed context layer → routed to a decision/action → recorded
   for audit/observability.
3. **Demand-to-revenue demo** — a signal is validated → classified →
   scored → attributed → routed → shown in a receipt/dashboard state.

Rules for all three:
- Interactive, not a video or animated illustration (a supporting
  animation is fine, not a substitute).
- Deterministic enough to step through and evaluate, restartable, with
  a static/failure fallback state.
- No real client or personal data.

Once the state logic works and is testable, run a taste-skill pass
limited to *visual* treatment of the demo (panel styling, transition
motion, empty/error states) — do not let it redesign the state logic.

## Design workflow

1. Understand requirements (this file + the assignment brief).
2. Inspect `.opencode/design-references/` when useful — extract
   principles, never copy a reference site directly.
3. Use `web-design` to establish direction → produce `DESIGN.md`.
4. Human confirms `DESIGN.md`.
5. Treat `DESIGN.md` as source of truth for marketing pages.
6. Build demo state machines separately (see above).
7. Use `design-taste-frontend` to validate/improve marketing-page
   visuals and demo visual treatment.
8. Implement.
9. Run the Taste Skill pre-flight audit.
10. Run the verification pass below — do not skip even if the
    pre-flight audit passed.

### Conflict resolution

1. Prefer explicit rules in this file.
2. Prefer decisions already documented in `DESIGN.md`.
3. Do not independently redesign an already-approved direction.
4. Use `design-taste-frontend` as a quality constraint, not a
   replacement for the established direction.

## Verification pass (required before calling anything done)

Do not rely on the taste-skill pre-flight alone for these — they have
specific numeric/behavioral bars the design skill doesn't check:

- Run Lighthouse (CLI, not eyeballed) — mobile scores ≥ 90 for
  performance, accessibility, and best practices. No critical
  console/runtime errors.
- Manually check layout at 360px, 768px, and 1440px widths.
- Full keyboard-only pass: all controls reachable, visible focus
  states, no keyboard traps.
- Reduced-motion pass: `prefers-reduced-motion` respected everywhere
  animation is used.
- Screen-reader pass on agent handoff states specifically (status
  updates must announce, not just visually update).
- No autoplay audio anywhere.

## Deployment

Target: Vercel. Public HTTPS preview
required. Document exact environment variables and the commit/version
ID shipped for evaluation.

## Implementation

- Don't add dependencies blindly — check `package.json` first; prefer
  whatever `DESIGN.md` already selected.
- Don't mix incompatible design systems in the same project.
- Don't modify `.opencode/skills/*/SKILL.md` — project-specific rules
  live here and in `DESIGN.md`, not patched into the skills.

## AI usage disclosure

Update `AI_USAGE.md` after every prompt/session (agent-maintained, per
project convention) — model/provider/version, skills/tools invoked,
what was generated vs. human-modified, and verification performed.
Do not omit a session because it "didn't produce visible output."
