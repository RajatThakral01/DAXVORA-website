# DAXVORA Website — Project 03

**Evaluation ID:** DAXVORA-RAJAT-2026-08-A01

A public marketing website that explains DAXVORA's services and demonstrates its three core systems via fully interactive, simulated demos. Built with Next.js 15 / React 19, statically exported, and verified against Lighthouse ≥ 90 across all pages on mobile.

---

## Purpose

DAXVORA builds data and agentic operating systems for founder-led businesses of 2–20 people. This site communicates:

- The founder-first atomic workflow method (7 stages)
- The full-business operating vision vs. current service reality
- Six concrete services available today
- Halo Agent, DAXVORA's signature coordination system

It demonstrates — not just describes — how the systems behave via three interactive, deterministic, SIMULATED demos embedded inline on the relevant pages.

---

## Architecture

```
┌─────────────────── Next.js 15 (App Router, Static Export) ───────────────────┐
│                                                                                │
│  Content pages (Server Components, no data-fetching dependencies)             │
│  ├── /            Home + HomeOverviewDiagram + DiscoveryCtaStrip              │
│  ├── /method      MethodDiagram + DataContextDiagram + DataContextDemo        │
│  ├── /services    ServiceCard grid + DemandPipelineDiagram + DemandSignalDemo │
│  ├── /halo-agent  HaloSchematic + 8-element grid + HaloAgentDemo              │
│  ├── /operating-domains  12-domain DomainTile grid                            │
│  ├── /about       Principles + success items                                  │
│  └── /contact     mailto: intake form (client component, no backend)          │
│                                                                                │
│  Three interactive demos (Client Components, state machine architecture)      │
│  ├── HaloAgentDemo     — useReducer + haloAgentReducer (10 unit tests)        │
│  ├── DataContextDemo   — useReducer + dataContextReducer (10 unit tests)      │
│  └── DemandSignalDemo  — useReducer + demandSignalReducer (11 unit tests)     │
│                                                                                │
│  Shared demo infrastructure                                                   │
│  ├── TracePanel  — visible in-page observability / event log                  │
│  ├── observability.ts  — ObservabilityEvent schema (8 fields per event)       │
│  └── fixtures.ts per demo  — seeded deterministic test scenarios              │
│                                                                                │
│  State is held exclusively client-side (useReducer, no backend, no DB)       │
│  No API calls, no network requests after initial page load                    │
└────────────────────────────────────────────────────────────────────────────────┘
```

**Where state lives:** exclusively in browser memory via React `useReducer`. No server, no database, no localStorage persistence. Demos reset on page refresh.

**Failure paths:**
- Simulated provider failure: dispatchable via an explicit button in each demo (`SIMULATE_PROVIDER_FAILURE` / `SIMULATE_SOURCE_FAILURE` / `SIMULATE_PIPELINE_FAILURE`) — renders a distinct failure state with `role="alert"` error region.
- Malformed/missing input: signal validation in Demand-to-Revenue rejects signals with missing required fields and transitions to `signal_rejected` without proceeding further.
- JavaScript failure: a global `<noscript>` banner explains that demos require JS; all content pages remain fully readable as static HTML.

---

## Setup & Run

**Prerequisites:** Node.js ≥ 18 (tested on Node 20), npm.

```bash
# 1. Clone
git clone <repo-url>
cd my-website

# 2. Install dependencies
npm install

# 3. Development server (hot reload)
npm run dev
# → http://localhost:3000

# 4. Run tests
npm run test

# 5. Type-check
npm run typecheck

# 6. Production build
npm run build
npx next start
# → http://localhost:3000
```

---

## Configuration & Environment Variables

This project has **no required environment variables.** There is no backend, no API keys, and no third-party service connections.

A `.env.example` is provided to confirm this:

```
# No environment variables are required for this project.
# All demos are SIMULATED with no external connections.
```

The contact form uses a `mailto:` link. The displayed address (`hello@daxvora.com`) is illustrative for this assessment — it has no active DNS/MX records. With JavaScript enabled, submitting the form opens the visitor's email client with the inquiry pre-filled.

---

## Usage

### Navigating content pages

| Route | What it shows |
|---|---|
| `/` | Home: value proposition, today vs. vision, scope tiles, nav cards |
| `/method` | 7 stages + Data & Context Foundation demo |
| `/services` | 6 services + Demand-to-Revenue demo |
| `/halo-agent` | 8 system elements + Halo Agent demo |
| `/operating-domains` | 12-domain reference grid |
| `/about` | Founding intent + operating principles |
| `/contact` | Discovery intake form |

### Running each demo

**Halo Agent** (on `/halo-agent`):
1. Select one of 4 inbound personas (e.g. "Invoice doesn't match what we were quoted")
2. Click **Continue routing** to trigger the route decision
3. Observe the context panel, handoff reason, and specialist assignment
4. Click **Simulate provider failure** (while routing) to trigger the failure path
5. Click **Restart** to reset

**Data & Context Foundation** (on `/method`):
1. Select one of 3 scenarios (e.g. "Unified customer profile")
2. Click **Confirm governance** → **Decide action** in sequence
3. Expand the **Run trace** panel to see the observability log
4. Click **Simulate source failure** (while normalizing) to trigger the failure path
5. Click **Restart** to reset

**Demand-to-Revenue** (on `/services`):
1. Select one of 5 signals (e.g. "Webinar signup asking for a demo")
2. Step through: **Validate → Classify → Score → Attribute → Route**
3. View the routing receipt with classification, score, attribution, and destination
4. Click **Simulate pipeline failure** (while at any mid-run step) to trigger failure
5. Try "Form submission with no identifying email" to see the rejection path
6. Click **Restart** to reset

---

## Known Limitations

- **No persistent state**: demos reset on page reload; no session storage used by design (avoids giving the appearance of a real backend).
- **Contact form is mailto only**: no backend form processor; email client must be configured for the form to send.
- **Demos are SIMULATED throughout**: no live integrations, no real CRM/routing/data connections. This is by design and clearly labeled everywhere.
- **No dark mode**: the site uses the DAXVORA brand's single-theme token system (Carbon, Bone, Graphite, Signal, Mist, White).
- **No multi-language support**: English only.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Demo buttons don't respond | JavaScript blocked or failed | Check browser console; a `<noscript>` banner will appear if JS is disabled |
| Contact form "Send inquiry" is greyed out | All three fields (name, email, message) must be non-empty | Fill all fields |
| Contact form click does nothing | No email client configured on device | Use a device with a default email client, or copy the field content manually |
| Build fails with type errors | TypeScript mismatch | Run `npm run typecheck` for details; ensure Node ≥ 18 |
| Lighthouse scores differ from documented | Local vs. deployed server; network throttling | Run against the production build (`npm run build && npx next start`), not dev server |

---

## Plan vs. Built

See [PLAN_VS_BUILT.md](./PLAN_VS_BUILT.md).

## Test Report

See [TEST_REPORT.md](./TEST_REPORT.md).

## Architecture View (detailed)

See [ARCHITECTURE.md](./ARCHITECTURE.md).

## AI Usage Disclosure

See [AI_USAGE.md](./AI_USAGE.md) and [ai-usage.json](./ai-usage.json).
