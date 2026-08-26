# DAXVORA Website — Test Report

This document satisfies PRD §7.4 and §7.5. It provides build evidence, verification of acceptance criteria, and manual testing results for the DAXVORA marketing website.

## 1. Automated Test Suite

A suite of 31 automated unit tests ensures the deterministic state-machine behavior of the three core demos. The tests verify that reducers transition states correctly, handle valid/invalid payloads, and emit the correct structured observability events.

**Run command:** `npm run test`
**Framework:** Vitest
**Coverage:** 100% pass rate (31/31)

### Halo Agent Tests (`src/demos/halo-agent/reducer.test.ts`) — 10 tests
- `initializes cleanly`
- `SELECT_PERSONA sets routing status and resets context`
- `ROUTE_DECISION transitions to specialist_a with context`
- `ROUTE_DECISION transitions to human_escalation`
- `SIMULATE_PROVIDER_FAILURE transitions to route_failed`
- `RESTART resets to initial state`
- `maintains context and updates handoff reason on multiple transfers`
- `emits observability event on SELECT_PERSONA`
- `emits observability event on ROUTE_DECISION`
- `emits observability event on SIMULATE_PROVIDER_FAILURE`

### Data Context Tests (`src/demos/data-context/reducer.test.ts`) — 10 tests
- `initializes cleanly`
- `SELECT_SCENARIO sets normalizing status`
- `CONFIRM_GOVERNANCE transitions to governed status`
- `DECIDE_ACTION transitions to action_taken status`
- `SIMULATE_SOURCE_FAILURE transitions to source_failed`
- `RESTART resets to initial state`
- `emits observability event on SELECT_SCENARIO`
- `emits observability event on CONFIRM_GOVERNANCE`
- `emits observability event on DECIDE_ACTION`
- `emits observability event on SIMULATE_SOURCE_FAILURE`

### Demand Signal Tests (`src/demos/demand-signal/reducer.test.ts`) — 11 tests
- `initializes cleanly`
- `SELECT_SIGNAL sets validating status`
- `VALIDATE_SIGNAL transitions to classifying if valid`
- `VALIDATE_SIGNAL transitions to signal_rejected if invalid`
- `CLASSIFY_SIGNAL transitions to scoring`
- `SCORE_SIGNAL transitions to attributing`
- `ATTRIBUTE_SIGNAL transitions to routing`
- `ROUTE_SIGNAL transitions to routed`
- `SIMULATE_PIPELINE_FAILURE transitions to pipeline_failed`
- `RESTART resets to initial state`
- `emits correct observability events for full pipeline run`

## 2. Build Evidence (Demo Fixtures)

Per PRD §7.5, every demo runs entirely on deterministic seeded fixtures. No free-text input is permitted, allowing for strict testing against expected outputs.

### 2.1 Halo Agent Fixtures
Located in `src/demos/halo-agent/fixtures.ts`.
- **`persona-invoice-mismatch`**: Expected to route to `specialist_a` (revenue operations) due to a billing variance.
- **`persona-pipeline-question`**: Expected to route to `specialist_b` (demand generation) due to a channel-attribution question.
- **`persona-ask-for-human`**: Expected to explicitly escalate to `human_escalation`. Terminal state.
- **`persona-vague-inquiry`**: Expected to hit the fallback route (`specialist_b`) due to ambiguous signaling.

### 2.2 Data Context Fixtures
Located in `src/demos/data-context/fixtures.ts`.
- **`scenario-unified-profile`**: Pulls 3 sources (marketing, billing, support) into a single identity profile.
- **`scenario-churn-risk`**: Pulls 2 sources (usage drop, open ticket) into a risk assessment.
- **`scenario-intent-surge`**: Pulls 3 sources (web visits, webinar, linkedin) into an intent score.

### 2.3 Demand Signal Fixtures
Located in `src/demos/demand-signal/fixtures.ts`.
- **`signal-webinar-demo`**: Valid, multi-touch paid campaign. Reaches `routed` with a 'hot' score band.
- **`signal-newsletter-pricing`**: Valid, single-touch owned media. Reaches `routed` with a 'warm' score band.
- **`signal-missing-email`**: Invalid (missing required 'email' field). MUST be rejected at the validation stage. Reaches `signal_rejected`.
- **`signal-community-mention`**: Valid, neutral sentiment. Reaches `routed` with a 'cold' score band.
- **`signal-edge-threshold`**: Valid, sits exactly on a boundary threshold. Tests tie-breaking logic.

## 3. Manual Verification Checklist

The following items were verified manually during Phase 7 (see `phase7_verification.md` for full details):

- [x] **Lighthouse Mobile:** ≥90 across Performance (93-100), Accessibility (96-97), and Best Practices (96-100) on all pages.
- [x] **Responsiveness:** Verified layouts at 360px (mobile single-column), 768px (tablet), and 1440px (desktop max-width).
- [x] **Accessibility (Keyboard):** Full site is navigable via Tab/Shift+Tab, with visible focus rings (`outline: 2px solid var(--dx-carbon)`). Skip-to-main link present.
- [x] **Accessibility (Motion):** `prefers-reduced-motion` media query successfully sets all transition durations to 0ms and disables transforms.
- [x] **Accessibility (Screen Reader):** `aria-live="polite"` regions announce status changes and handoffs during demo interactions.
- [x] **Resilience (Slow Network):** Content pages load instantly due to static HTML export. Demos initialize cleanly once JS hydrates.
- [x] **Resilience (No JS):** `<noscript>` banner displays globally. Content remains readable. Demos are inert but not visually broken.
- [x] **Resilience (Console Errors):** Zero runtime or hydration errors across all pages and demo states.
- [x] **Truthfulness:** Zero instances of fabricated client data, testimonials, or "LIVE" badges. All demos explicitly marked as "SIMULATED".
