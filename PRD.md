# PRD — DAXVORA Website (Project 03)

Evaluation ID: DAXVORA-RAJAT-2026-08-A01
Project weight: 30% of overall build score
Status: draft, for review before DESIGN.md Phase A / implementation begins

---

## 1. Problem & goal

DAXVORA needs a public website that explains the company to a
**skeptical founder** — someone running a 2–20 person, six-to-seven-
figure business who has heard AI/automation pitches before and is
evaluating whether this one is real. The site must communicate:

- the founder-first atomic workflow method
- the full-business operating vision
- the focused vertical offers available today
- Halo Agent, DAXVORA's signature system

and must **demonstrate**, not just describe, how the systems behave —
via working, interactive demos.

**Success looks like:** a visitor can leave understanding what DAXVORA
does today vs. where it's headed, trust that the demos reflect real
system behavior (because they're honestly labeled), and have a clear
next step (discovery CTA).

## 2. Audience

Primary: a founder/owner at a 2–20 person, six-to-seven-figure business
— time-constrained, skeptical of AI hype, cares about concrete
mechanics (what data moves where, who stays in control) more than
buzzwords.

Secondary: the assessment evaluator, who will read this PRD, DESIGN.md,
AGENTS.md, and the code together to judge planning quality, not just
the finished UI — and who will also apply the brief's project-wide
delivery standard (README, architecture view, tests, observability,
build evidence, plan-vs-built, cost/limits) to this project, not only
to Projects 01/02.

## 3. Scope

### 3.1 In scope — content pages
1. Home
2. Method
3. Services
4. Halo Agent (detail)
5. Operating-domain view
6. About / founder intent
7. Contact / discovery CTA (persistent secondary CTA site-wide)

### 3.2 In scope — interactive demos
1. Halo Agent demo
2. Data & context foundation demo
3. Demand-to-revenue demo

### 3.3 Explicitly out of scope
- Any live integration to a real Reddit, CRM, or messaging account
  (that's Projects 01/02 — this project's demos are TEST/MOCKED/
  SIMULATED only, never LIVE).
- Real client names, testimonials, logos, ROI figures, or
  certifications — none exist and none may be invented.
- A CMS/admin backend — content is static/build-time.
- Multi-language support.
- Payment/checkout flows.

## 4. Requirements by page

Each requirement below is what must be **true of the shipped page**,
not a design instruction (that's DESIGN.md's job).

### Home
- States the value proposition specifically for 2–20 person,
  six-to-seven-figure founder-led businesses (not a generic "any
  business" pitch).
- Distinguishes current service positioning from the long-term
  high-autonomy vision within the first screen or two — a skeptical
  founder shouldn't have to dig to find out what's real today.
- Links to Method, Services, Halo Agent, and the discovery CTA.

### Method
- Shows all 7 stages in order: discovery → atomic workflow
  decomposition → opportunity design → data/context foundation →
  agent coordination → phased rollout → measurement.
- Each stage states what DAXVORA does and what output the client
  receives (per the vision doc's stage/output pairing) — not just a
  stage name.

### Services
- Lists all 6: operating-system discovery, data/context foundations,
  Halo Agent, demand generation/revenue operations, business-process
  automation, decision intelligence.
- Each service states what it's best for and what a client actually
  receives — comparable across services (table-style per brand kit,
  not disconnected paragraphs).

### Halo Agent (detail)
- Covers all required elements: shared context, channels, routing,
  specialist transfer, retained history, action layer, controls, human
  escalation.
- Hosts the Halo Agent demo (see 5.1) inline, not just a link to it.

### Operating-domain view
- Shows full-business coverage (the 12 domains from the vision doc)
  as a reference view.
- Makes clear a client can start with one vertical rather than needing
  the whole system — this must be readable as an actual option, not
  buried text.

### About / founder intent
- States founder intent truthfully, based only on the provided vision
  doc's founder-intent section — no invented backstory, credentials,
  or prior-company claims.

### Contact / discovery CTA
- A working intake path (form or equivalent) that captures at minimum
  a way to follow up — no backend integration required, but the
  submission path must be real and testable, not decorative.
- Present as a persistent secondary CTA across all pages, not just its
  own page.

## 5. Demo requirements

Each demo must be: interactive (not video), deterministic enough to
evaluate, restartable, with a static/failure fallback, and clearly
labeled LIVE/TEST/MOCKED/SIMULATED (all three will be TEST or
SIMULATED — never LIVE, since there's no real backend). Simulated
demos must show "Not connected to client systems."

Every demo also needs, per the brief's project-wide delivery standard
(not just the Project-03-specific demo section):
- **Structured observability events** on every run — see section 7.2
  for the required schema.
- **A full test set**, not just a happy path — positive, negative,
  duplicate/retry, malformed input, simulated provider failure, and
  boundary-condition cases. See each demo's expanded acceptance
  criteria below.

### 5.1 Halo Agent demo
**User flow:**
1. Visitor selects an inbound scenario/persona from a defined set
   (minimum 2 personas — see PRD §9 resolved decisions).
2. System shows a router/qualifier step evaluating the scenario.
3. System transitions to at least 2 specialist states, OR 1 specialist
   state + a human-escalation state.
4. A context panel is visible throughout, showing: a customer tag, a
   profile field, a conversation-history excerpt, and the handoff
   reason for the current transition.

**Acceptance criteria:**
- *Positive:* each seeded persona routes to its expected specialist/
  escalation state, deterministically.
- *Negative:* a persona with ambiguous/insufficient signal routes to a
  defined fallback (e.g. a default specialist or escalation), not an
  undefined/broken state.
- Context panel contents persist unchanged across a transfer (the
  customer tag/profile/history don't reset or blank between states).
- Handoff reason updates to reflect the actual transition that just
  happened, not a static string.
- *Duplicate/retry:* selecting the same persona twice in a row, or
  re-triggering a transition, does not corrupt context or produce a
  duplicate handoff log entry.
- *Malformed/edge input:* if persona selection is driven by any
  user-adjustable field, an empty/invalid selection is handled
  without a crash or blank state.
- *Boundary:* the last specialist state in the chain still exhibits
  correct human-escalation behavior (doesn't silently loop or dead-end).
- A visible "Restart" control resets the demo to its initial state
  cleanly — no leftover state from the previous run.
- Screen readers announce the state change when a handoff occurs (not
  just a visual update).
- Reachable and operable via keyboard only.

### 5.2 Data & context foundation demo
**User flow:**
1. Visitor sees several distinct source inputs (e.g. form submission,
   support message, CRM note — mocked, clearly labeled).
2. Demo shows these being normalized into one governed context record.
3. Demo shows that record being routed to a decision/action.
4. Demo shows the result recorded in a visible audit/observability
   trail (timestamp, source, decision, result).

**Acceptance criteria:**
- *Positive:* each seeded source-set normalizes correctly and produces
  the expected context record.
- *Negative:* a source with missing/empty fields is normalized without
  crashing, and is visibly flagged rather than silently dropped.
- Each source is individually attributable in the final context
  record — a visitor can trace which field came from which source.
- The audit trail entry is generated for every run, including runs
  that end in "no action" — silence is not an acceptable outcome.
- *Duplicate/retry:* re-running the same seeded scenario does not
  create a second, conflicting context record — it's either idempotent
  or clearly shows a "repeat run" state.
- *Simulated provider failure:* at least one seeded scenario triggers
  a simulated source failure (e.g. a source marked unavailable), and
  the demo shows the defined fallback behavior rather than hanging or
  silently omitting that source.
- *Boundary:* a scenario with the maximum number of sources the demo
  supports still normalizes and audits correctly.
- Restart returns to a clean initial state.

### 5.3 Demand-to-revenue demo
**User flow:**
1. Visitor triggers or selects a demand signal (mocked).
2. Demo shows it validated, classified, scored, attributed, and
   routed, in that order, with each step visible.
3. Final state is a receipt/dashboard view showing the outcome.

**Acceptance criteria:**
- *Positive:* a clean seeded signal passes validation, classification,
  scoring, attribution, and routing, ending in a correct receipt.
- *Negative:* a signal that fails validation (e.g. missing a required
  field) is rejected with a visible reason, not silently dropped or
  passed through.
- Score and classification include a visible reason, not just a
  number/label (matches the brief's "explainable" requirement from
  Project 02's logic, applied here as a demo).
- Attribution (source/campaign) is visible in the final receipt.
- *Duplicate/retry:* submitting the same seeded signal twice does not
  create two receipts/routes — the second is recognized as a repeat.
- *Boundary:* a signal that scores exactly at a threshold is handled
  by a documented tie-breaking rule, not arbitrarily.
- An "insufficient data" / low-confidence path exists and is
  reachable in the demo, not just a happy path.
- Restart returns to a clean initial state.

## 6. Cross-cutting requirements

- **Responsive:** verified at 360px, 768px, 1440px.
- **Accessibility:** keyboard-usable, visible focus states, semantic
  headings/landmarks, sufficient contrast, alt text, no color-only
  meaning, reduced-motion support, no autoplay audio.
- **Performance:** Lighthouse mobile ≥ 90 on performance, accessibility,
  best practices; no critical console/runtime errors.
- **Truthfulness:** every demo/integration state labeled LIVE/TEST/
  MOCKED/SIMULATED; no fabricated screenshots, metrics, or claims
  anywhere on the site.
- **Deployment:** public HTTPS preview, reproducible build, documented
  environment variables, exact commit/version ID recorded at submission.
- **Website-conditions test group** (from the brief's evaluator test
  pack — applies specifically to this project):
  - Keyboard only — covered above.
  - Reduced motion — covered above.
  - Small screen — covered by the 360px check above.
  - **Slow network** — the site and each demo must remain usable (no
    broken/blank states) under throttled network conditions.
  - **Demo reset** — every demo's Restart control returns to a clean
    initial state (already required per-demo in section 5).
  - **Fallback** — every demo's static/failure fallback state is
    actually reachable and reviewed, not just theoretically specified.
  - **No JavaScript / error state** — the site degrades to a defined,
    non-broken state if JavaScript fails to load (at minimum: content
    pages remain readable; demos show a clear "requires JavaScript"
    notice rather than a blank or broken UI).

## 7. Delivery & evidence requirements

The brief's "what every project must include" table applies to every
project, including this one. These are requirements on the
**deliverable package**, not the website's UI — but several depend on
things the website must expose (observability, labeled states), so
they're specified here rather than left implicit.

### 7.1 README (project-level)
Must cover, specifically for this site: purpose, architecture (see
7.2), setup (clone → install → run, one command where possible),
configuration and environment variables (names only, `.env.example`
provided), usage (how to navigate content pages and run each demo),
known limitations, and troubleshooting (e.g. what to do if a demo
doesn't load, what "SIMULATED" means on this site).

### 7.2 Architecture view
A single diagram or flow showing, for the whole site: inputs (visitor
interactions, seeded demo data), decisions (router/qualifier logic in
Halo Agent, scoring logic in Demand-to-Revenue, normalization logic in
Data & Context Foundation), the "agents/automations" each demo
simulates, where state/context is held (client-side only vs. any
backend), actions taken (state transitions, receipt generation), and
failure paths (what happens on simulated provider failure, malformed
input, or JS failure).

### 7.3 Observability
Every demo run emits a structured event log (visible in-page, e.g. a
"trace" or "audit" panel — not just browser console) containing, at
minimum: an input/run ID, the decision made, the reason for that
decision, the action taken, the result, any error, timing, and a note
on what (if anything) required redaction (not expected to be much,
given no real client data — state this explicitly rather than
omitting the field).

### 7.4 Tests
Beyond the demo-level acceptance criteria in section 5 (which already
include positive, negative, duplicate/retry, malformed input,
simulated-provider-failure, and boundary cases per demo), maintain an
actual test report — automated where practical (e.g. component/unit
tests for each demo's state machine), manually documented where not
(e.g. the Lighthouse/keyboard/reduced-motion passes from section 6).

### 7.5 Build evidence
For each demo: the fixture inputs used (the seeded scenarios/personas
themselves), the expected output for each fixture (what the receipt/
context record/handoff should look like), and a test report showing
actual vs. expected for each.

### 7.6 Plan vs. built
A short document (or a section of the final README) stating: what was
planned (this PRD), what was actually completed, what changed and why,
known gaps, and what would come next if this continued past the
assessment.

### 7.7 Cost and limits
State explicitly: hosting cost (expected to be $0 on the chosen
platform's free tier — name the platform and its relevant limits),
the intake-form service's free-tier limits (if a static form service
is used per the resolved decision in section 9), and confirmation that
no paid dependency was used without written approval.

### 7.8 Demo recording & walkthrough
A short recording (video or equivalent local/live walkthrough) that
exercises the site's demos using the seeded fixtures from section 5,
with the environment state (TEST/MOCKED/SIMULATED) clearly visible
throughout — required as its own top-level deliverable, distinct from
the Lighthouse/accessibility evidence in section 6. Accompanied by a
concise transcript or scenario list naming which seeded fixture is
shown at each point in the recording, so the evaluator can match what
they see to a specific test case.

## 8. Success metrics (self-evaluation, before submission)

- [ ] Every required page exists and contains its required content
  (section 4).
- [ ] All 3 demos pass their full acceptance criteria (section 5),
  including duplicate/retry, malformed input, simulated provider
  failure, boundary conditions, and restart/reset behavior — not just
  the happy path.
- [ ] Lighthouse mobile ≥ 90 across performance/accessibility/best
  practices, screenshotted as evidence.
- [ ] Manual keyboard-only pass completed across all pages and demos.
- [ ] Manual reduced-motion pass completed.
- [ ] Slow-network and no-JavaScript/error-state checks completed.
- [ ] Every demo's failure/static fallback state verified reachable.
- [ ] No invented clients/metrics/testimonials/integrations anywhere —
  reviewed line by line before submission.
- [ ] Current-state vs. vision language is visually distinguishable
  everywhere the vision is mentioned.
- [ ] AI_USAGE.md and ai-usage.json are current as of the final commit.
- [ ] README, architecture view, observability logs, test report,
  build evidence, plan-vs-built, cost/limits, and the demo recording +
  transcript are all present (section 7).

## 9. Resolved decisions (previously open questions)

These were identified as ambiguous during planning and resolved
internally rather than sent for external clarification, since each has
a clear answer once weighed against the brief's own constraints.

- **Intake-form backend:** mailto link or a free-tier static form
  service (e.g. Formspree). Never a non-functional/decorative submit —
  a visitor clicking submit with nothing real happening is
  functionally equivalent to the "fabricated results" the brief
  prohibits, even if unintentional. No paid service, per the shared
  rule requiring written approval before any paid dependency.
- **Demo input model (Data & Context Foundation, Demand-to-Revenue):**
  fixed set of seeded scenarios (3–5 each), visitor selects among them.
  Not visitor-editable/free-text input. The brief requires demos to be
  "deterministic enough to evaluate" and explicitly expects "seeded
  test cases" as required evidence — free input works against both.
- **Halo Agent persona count:** minimum 2 personas, each routing to a
  different specialist state (or one to a specialist, one to human
  escalation). A single persona can't demonstrate the router making a
  real, differentiated decision — it would look hardcoded regardless
  of the underlying logic. A 3rd persona is a nice-to-have if it
  cleanly separates the escalation path from the 2-specialist path.

---

## 10. Relationship to other project docs

- **AGENTS.md** — binding rules for the coding agent (brand kit,
  content constraints, demo build-order, verification steps).
- **DESIGN.md** — visual specification for pages and shared component
  language; informed by this PRD's page/demo requirements, not a
  replacement for them.
- **Implementation plan** — milestone sequencing and the acceptance
  checks referenced in sections 7–8, expanded into a schedule.
