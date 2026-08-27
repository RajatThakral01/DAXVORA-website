# DAXVORA Website — Project 03

**Evaluation ID:** DAXVORA-RAJAT-2026-08-A01

## Overview

A public marketing website that explains DAXVORA's services and demonstrates its three core systems via fully interactive, simulated demos. Built with Next.js 15 / React 19, statically exported, and verified against Lighthouse ≥ 90 across all pages on mobile.

DAXVORA builds data and agentic operating systems for founder-led businesses of 2–20 people. This site communicates:
- The founder-first atomic workflow method (7 stages)
- The full-business operating vision vs. current service reality
- Six concrete services available today
- Halo Agent, DAXVORA's signature coordination system

It demonstrates — not just describes — how the systems behave via three interactive, deterministic, SIMULATED demos embedded inline on the relevant pages.

---

## Interactive Simulated Demos

The website features three core interactive demos. All state is held exclusively client-side via React `useReducer`. No backend, database, or API calls are used, and no state is persisted to `localStorage` (refreshing resets the demos).

### 1. Halo Agent Demo (Located on `/halo-agent`)
Simulates the core routing and context aggregation system of the Halo Agent.
- **Features:** Select one of four inbound personas (e.g. "Invoice doesn't match what we were quoted"), trigger a route decision, and observe the context panel updates, handoff reasoning, and specialist assignment.
- **Failure Path:** Click *Simulate provider failure* during the routing process to trigger the error alert state.

### 2. Data & Context Foundation Demo (Located on `/method`)
Simulates the governance, ingestion, and data normalization workflow.
- **Features:** Select a data scenario (e.g., "Unified customer profile"), confirm governance policies, and decide action in sequence. Expand the *Run trace* panel to see the granular observability log.
- **Failure Path:** Click *Simulate source failure* while normalizing to view the system's error handling and trace output.

### 3. Demand-to-Revenue Demo (Located on `/services`)
Simulates the lead processing and attribution pipeline.
- **Features:** Step through the entire pipeline: Validate → Classify → Score → Attribute → Route for a selected signal. View a detailed routing receipt upon completion.
- **Failure Path:** Click *Simulate pipeline failure* while at any mid-run step, or submit a "Form submission with no identifying email" to see the rejection path.

---

## Clean File Structure

The repository is structured as a standard, modular Next.js 15 App Router project.

```text
.
├── app/                  # Next.js App Router root & routes
│   ├── about/            # About page: Principles + success items
│   ├── contact/          # Contact page: mailto intake form
│   ├── halo-agent/       # Halo Agent feature page
│   ├── method/           # Method page
│   ├── operating-domains/# Operating Domains reference grid
│   ├── services/         # Services page
│   ├── layout.tsx        # Global layout, SiteHeader, SiteFooter
│   ├── loading.tsx       # Global UI skeleton loader for Suspense
│   └── globals.css       # Global stylesheet & design tokens
├── src/
│   ├── components/       # Shared UI components (Hero, Nav, Footer, Diagrams)
│   └── demos/            # Interactive state-machine demos
│       ├── data-context/ # Data Context reducer, UI, & 10 unit tests
│       ├── demand-signal/# Demand Signal reducer, UI, & 11 unit tests
│       ├── halo-agent/   # Halo Agent reducer, UI, & 10 unit tests
│       └── shared/       # Shared observability trace panel
├── e2e/                  # Playwright End-to-End & Smoke Tests
├── docs/                 # Detailed documentation (Architecture, Plan, AI Usage)
└── public/               # Static assets & icons
```

---

## Environment Setup & Commands

**Prerequisites:** Node.js ≥ 18 (tested on Node 20), and npm.

There are **no environment variables** required to run this project. There is no backend, no API keys, and no third-party service connections required.

### 1. Installation

```bash
# Clone the repository
git clone <repo-url>
cd my-website

# Install dependencies
npm install
```

### 2. Development

```bash
# Start the development server with hot-reload
npm run dev
# The site will be available at http://localhost:3000
```

### 3. Testing & Validation

The project includes a comprehensive suite of static analysis, unit, and end-to-end tests.

```bash
# Run ESLint to verify code quality
npm run lint

# Run TypeScript compiler checks
npm run typecheck

# Run Vitest unit tests (with coverage reports)
npm run test

# Run Playwright End-to-End smoke tests
npx playwright install chromium  # Ensure browser binaries are installed
npm run test:e2e
```

### 4. Production Build

```bash
# Compile a production-optimized build
npm run build

# Start the production server
npx next start
```

---

## Documentation

Additional detailed documentation has been moved to the `docs/` folder:
- [Architecture Details](./docs/ARCHITECTURE.md)
- [Test Report](./docs/TEST_REPORT.md)
- [Plan vs Built](./docs/PLAN_VS_BUILT.md)
- [Deployment Info](./docs/DEPLOYMENT_INFO.md)
- [AI Usage Disclosure](./docs/AI_USAGE.md)

---

## Known Limitations

- **No persistent state**: Demos reset on page reload; no session storage used by design (avoids giving the appearance of a real backend).
- **Contact form is mailto only**: No backend form processor; the email client must be configured for the form to send.
- **Demos are SIMULATED throughout**: No live integrations, no real CRM/routing/data connections. This is by design and clearly labeled everywhere.
- **No dark mode**: The site uses the DAXVORA brand's single-theme token system (Carbon, Bone, Graphite, Signal, Mist, White).
- **No multi-language support**: English only.
