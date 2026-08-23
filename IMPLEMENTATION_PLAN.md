# Implementation Plan — DAXVORA Website (Project 03)

This plan sequences *work*, not *design*. Visual and layout decisions
belong to the `web-design` → `design-taste-frontend` pipeline and get
recorded in `DESIGN.md` — this document only says what gets built in
what order, what gate must pass before the next phase starts, and who
verifies what. Where a step says "agent decides," that decision is
owned by the skills/DESIGN.md, not prescribed here.

Inputs this plan assumes exist: `PRD.md`, `AGENTS.md`, brand kit
(`README.md` brand-kit doc), the two source docs (vision/positioning,
capability assessment brief).

---

## Phase 0 — Environment verification
**Goal:** confirm the tooling actually works before it's load-bearing.

1. Start OpenCode in `~/my-website`, confirm both skills are discovered
   (`web-design`, `design-taste-frontend`).
2. Configure and smoke-test Ox Alpha access (whichever provider) with a
   trivial prompt — confirm it responds and skills are being invoked,
   not silently ignored.
3. Run one throwaway stateful component through Ox Alpha (e.g. a
   3-state toggle with persisted context) to sanity-check it can
   handle state logic, not just static markup. Discard the output —
   this is a capability check, not real work.
4. Commit `AGENTS.md`, `PRD.md`, and this plan to the repo.

**Exit criteria:** skills confirmed discovered and invoked; Ox Alpha
produces working state logic on the throwaway test; docs committed.

---

## Phase 1 — Resolve open questions
**Goal:** no ambiguous requirements enter the design phase.

1. Review `PRD.md` §9 (resolved decisions) — already closed; confirm
   nothing new has come up since.
2. Confirm the deployment target placeholder in `AGENTS.md` is filled
   in.
3. Confirm scope boundaries in `PRD.md` §3.3 are still accurate.

**Exit criteria:** `PRD.md` has zero unresolved open questions;
`AGENTS.md` deployment target is filled in.

---

## Phase 2 — Design specification (web-design skill)
**Goal:** produce a confirmed `DESIGN.md` before any real code is
written. The agent owns every visual decision inside this phase.

1. Feed `web-design` the requirements: `PRD.md` (what must exist),
   `AGENTS.md` (hard constraints), the brand-kit doc, and point it at
   `.opencode/design-references/` for inspiration only.
2. Let Phase A (requirements understanding) and Phase B (DESIGN.md
   generation) run — do not pre-decide layout, type scale, or
   component patterns yourself; that's the skill's job.
3. **Human review gate:** read the generated `DESIGN.md` against
   `AGENTS.md`'s hard constraints (brand-kit-only colors, Arial only,
   Signal used sparingly, no invented claims, current-vs-vision
   separation). Reject and re-run Phase B if any hard constraint is
   violated — do not hand-edit the agent's design decisions unless a
   constraint was actually broken.
4. Confirm `DESIGN.md`. From this point it is binding per
   `AGENTS.md`'s source-of-truth order.

**Exit criteria:** `DESIGN.md` exists, satisfies every hard constraint
in `AGENTS.md`, and is explicitly confirmed (commit it as confirmed,
not draft).

---

## Phase 3 — Demo state logic, observability, and tests
**Goal:** each demo behaves correctly as a state machine, is fully
tested (not just happy-path), and emits the structured events the
brief requires — all before any visual work touches it, per
`AGENTS.md`.

Do this per-demo, one at a time, in this order: Halo Agent → Data &
Context Foundation → Demand-to-Revenue (Halo Agent first since it has
the richest state and the other two build on similar patterns).

For each demo:
1. Implement the state machine per its `PRD.md` §5 user flow — states,
   transitions, and the specific data that must persist across
   transitions (e.g. Halo Agent's context panel contents).
2. Implement restart/reset to a clean initial state.
3. Implement the required LIVE/TEST/MOCKED/SIMULATED label and, for
   simulated demos, the "Not connected to client systems" notice.
4. **Implement structured observability logging** per `PRD.md` §7.3 —
   an in-page trace/audit panel emitting, per run: input/run ID,
   decision, reason, action, result, error (if any), timing, and a
   redaction note. This is required evidence, not a nice-to-have —
   build it alongside the state machine, not bolted on later.
5. Build the seeded fixtures for this demo (3–5 scenarios/personas per
   the resolved decision in `PRD.md` §9) and record, per fixture, the
   expected output — this fixture/expected-output pairing is the
   "build evidence" required by `PRD.md` §7.5.
6. Write and run the full test set from `PRD.md` §5's expanded
   acceptance criteria for this demo: positive, negative, duplicate/
   retry, malformed input, simulated provider failure, and boundary
   conditions. Automate what's practical (state-machine unit tests);
   document manual steps for the rest.
7. Verify keyboard-only operability of the raw (unstyled) interaction —
   confirm this before visual design is layered on, since it's easier
   to fix in plain markup than after styling.

**Exit criteria:** all 3 demos pass their full `PRD.md` §5 acceptance
criteria (including the non-happy-path cases) in an unstyled or
minimally-styled state; each demo emits structured observability
events; fixtures + expected outputs exist for each; no demo claims
LIVE.

---

## Phase 4 — Marketing pages (design-taste-frontend implementation)
**Goal:** build the 7 content pages per `DESIGN.md`, with the agent
handling implementation quality and anti-slop constraints.

1. Build pages in an order that surfaces shared components early:
   Home → Services (introduces the table component) → Method → Halo
   Agent (detail, without the demo yet) → Operating-domain view →
   About → Contact/CTA.
2. For each page, implementation follows `DESIGN.md` exactly — no new
   layout/type/color decisions at this stage. If a page's content
   doesn't fit what `DESIGN.md` specified, that's a signal to go back
   to Phase 2, not to improvise.
3. Confirm each page against its specific `PRD.md` §4 requirement
   before moving to the next (e.g. Method actually shows all 7 stages
   with stage + output, not just stage names).

**Exit criteria:** all 7 pages exist, each satisfies its `PRD.md` §4
requirement, and each matches `DESIGN.md`'s component/layout rules.

---

## Phase 5 — Demo integration (visual pass, scoped)
**Goal:** give the working demos from Phase 3 the site's visual
language, without touching their logic or observability output.

1. Embed each demo into its page (Halo Agent demo → Halo Agent detail
   page; the other two demos onto whichever pages `PRD.md`/`DESIGN.md`
   assign them — Data & Context Foundation likely on Method or Home,
   Demand-to-Revenue likely on Services or a dedicated section).
2. Run `design-taste-frontend` scoped only to visual treatment: context
   panel layout, transition motion, empty/error state styling, and the
   observability/trace panel's presentation — per the demo-scope-note
   boundary in `DESIGN.md`.
3. Re-run each demo's Phase 3 test suite after the visual pass — the
   integration must not have changed behavior or observability output,
   only appearance.

**Exit criteria:** demos visually match the rest of the site; Phase 3
tests still pass unchanged; observability events still emit correctly.

---

## Phase 6 — Taste-skill pre-flight audit
**Goal:** catch generic/AI-slop patterns across the whole site, per
`AGENTS.md` and `DESIGN.md` §10.

1. Run the `design-taste-frontend` pre-flight audit across all pages.
2. Manually check the anti-slop checklist in `DESIGN.md` §10 item by
   item — the agent's own audit is a first pass, not the final word.
3. Fix anything flagged; re-audit if changes were non-trivial.

**Exit criteria:** pre-flight audit passes; manual checklist review
complete with no unresolved items.

---

## Phase 7 — Verification pass (not covered by the design skills)
**Goal:** hit the assessment's specific numeric/behavioral bars,
including the brief's "website conditions" evaluator test-pack group —
per `AGENTS.md`, do not treat the taste-skill audit as covering these.

1. Run Lighthouse (CLI) against the built site — mobile scores ≥ 90
   for performance, accessibility, best practices. Record scores as
   evidence.
2. Manual layout check at 360px, 768px, 1440px on every page and every
   demo.
3. Full keyboard-only pass across the whole site, including all three
   demos — not just the marketing pages checked in Phase 3.
4. Reduced-motion pass — confirm `prefers-reduced-motion` is respected
   everywhere motion appears.
5. Screen-reader pass specifically on Halo Agent handoff state changes
   — confirm they announce, not just visually update.
6. **Slow-network pass** — throttle network (e.g. browser devtools
   "Slow 3G") and confirm the site and each demo remain usable, with
   no broken/blank states while assets load.
7. **No-JavaScript / error-state pass** — disable JavaScript and
   confirm content pages remain readable and each demo shows its
   defined "requires JavaScript" notice rather than a blank/broken UI.
8. **Fallback reachability** — for each demo, deliberately trigger its
   static/failure fallback state (via the simulated-provider-failure
   fixture from Phase 3) and confirm it's actually reachable and
   renders correctly, not just specified on paper.
9. Confirm no autoplay audio anywhere.
10. Console/runtime error check across all pages and demo interactions.

**Exit criteria:** every item in `PRD.md` §8 (success metrics) is
checked off with evidence (screenshots/recordings), not just eyeballed.

---

## Phase 8 — Truthfulness & content audit
**Goal:** the specific automatic-failure conditions in the assessment
brief cannot be triggered by an oversight.

1. Line-by-line review of every page and demo for: invented clients,
   ROI figures, certifications, testimonials, or integrations.
2. Confirm every demo/integration state is labeled LIVE/TEST/MOCKED/
   SIMULATED, and that none claims LIVE.
3. Confirm current-state vs. long-term-vision language is visually
   distinguishable everywhere the vision appears (per `DESIGN.md` §9
   content rule).
4. Confirm no secrets, tokens, or real personal/client data appear
   anywhere in code, content, or committed history.

**Exit criteria:** all `PRD.md` §8 truthfulness items checked off.

---

## Phase 9 — Deployment
**Goal:** a reproducible, publicly reachable build.

1. Deploy to the target decided in `AGENTS.md`.
2. Confirm the public HTTPS preview URL loads correctly and matches
   what was verified in Phase 7.
3. Document environment variables (names only, no values) and the
   exact commit/version ID being submitted.
4. Re-run the Phase 7 Lighthouse check against the deployed URL, not
   just local build — hosting can change scores.

**Exit criteria:** public HTTPS URL live and matches local verification
results; commit ID recorded.

---

## Phase 10 — Documentation & evidence packaging
**Goal:** satisfy the brief's project-wide delivery standard
(`PRD.md` §7) and AI-use disclosure requirements — these apply to this
project the same as Projects 01/02, not just to the website's UI.

1. **README (project-level):** write per `PRD.md` §7.1 — purpose,
   architecture, setup/run instructions, configuration/env vars
   (names only, `.env.example` included), usage (navigating pages,
   running each demo), limitations, troubleshooting.
2. **Architecture view:** produce the diagram/flow specified in
   `PRD.md` §7.2 — inputs, decisions, the simulated agents/automations
   per demo, where state is held, actions, and failure paths.
3. **Test report:** consolidate the Phase 3 automated tests and Phase
   7 manual verification results into one report per `PRD.md` §7.4.
4. **Build evidence:** compile each demo's fixtures and expected
   outputs (already produced in Phase 3) alongside the test report,
   per `PRD.md` §7.5.
5. **Plan vs. built:** write the short summary required by `PRD.md`
   §7.6 — what was planned, what was completed, what changed, known
   gaps, next steps. Write this honestly against what actually
   happened, not against the original plan's aspirations.
6. **Cost and limits:** document per `PRD.md` §7.7 — hosting platform
   and free-tier limits, intake-form service limits if used, and an
   explicit confirmation that no paid dependency was used without
   written approval.
7. **Demo recording & transcript:** record a short walkthrough of all
   three demos using the seeded fixtures from Phase 3, with
   TEST/MOCKED/SIMULATED state clearly visible throughout, per
   `PRD.md` §7.8. Write the accompanying transcript/scenario list
   naming which fixture is shown at each point.
8. **AI_USAGE.md:** confirm it's been updated after every session
   throughout (per your agent-maintained convention) — do a final
   read-through for completeness rather than generating it
   retroactively.
9. **ai-usage.json:** generate/update with evaluation ID
   `DAXVORA-RAJAT-2026-08-A01`, sessions, model/provider/version,
   prompts or prompt-hashes, tools/skills used, generated vs.
   human-modified files, and timestamps.
10. **Evidence export:** export conversation/session logs sufficient
    to verify the disclosed workflow; strip secrets and unrelated
    personal info.
11. **Asset provenance:** record brand kit source (supplied), any
    fonts/icons/images used and their license, any generated media.

**Exit criteria:** README, architecture view, test report, build
evidence, plan-vs-built, cost/limits, demo recording + transcript,
`AI_USAGE.md`, `ai-usage.json`, evidence export, and asset provenance
are all present and current as of the final commit.

---

## Phase 11 — Final submission checklist
Directly from the assessment brief's "Before you send" section —
confirm each before packaging the submission:

1. Every documented command run from a clean checkout/fresh
   environment — confirms the README's setup instructions actually
   work.
2. LIVE/TEST/MOCKED/SIMULATED labels re-verified; all secrets and
   personal/client data confirmed absent.
3. Duplicate/replay behavior, fallback states, and audit/observability
   evidence confirmed working end-to-end (not just present in code).
4. Site re-opened at 360/768/1440 and keyboard/reduced-motion/slow-
   network/no-JavaScript checks re-run one final time post-deployment.
5. AI disclosure reviewed against actual work history; correct any
   gaps found.
6. Package: repo link + commit ID, public preview URL, project README,
   `PRD.md`, `DESIGN.md`, `AGENTS.md`, architecture view, test report,
   build evidence, plan-vs-built, cost/limits, demo recording +
   transcript, `AI_USAGE.md`, `ai-usage.json`, evidence export,
   Lighthouse results, and this implementation plan.

**Exit criteria:** ready to send to work.krishnam9988@gmail.com with
subject "DAXVORA Assessment — Rajat — DAXVORA-RAJAT-2026-08-A01".
