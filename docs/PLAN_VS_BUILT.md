# Plan vs. Built

**Project:** DAXVORA Website (Evaluation ID: DAXVORA-RAJAT-2026-08-A01)

This document satisfies PRD §7.6: comparing what was planned against what was actually completed, identifying deviations, known gaps, and future extensions.

## 1. What was planned

The PRD mandated a public marketing website targeting skeptical founders (2-20 person businesses) to explain DAXVORA's method, operating vision, current services, and its signature "Halo Agent" system. 

Key constraints included:
- **Scope:** 7 static content pages + 3 interactive demos.
- **Tone & Content:** Direct, operational, "truth before theater." No invented clients, testimonials, ROI claims, or "AI-brain" imagery.
- **Demos:** Must be fully interactive, deterministic (seeded with specific test fixtures), capable of failure states, and explicitly labeled as SIMULATED (never LIVE). They must also include structured observability logs (TracePanels).
- **Architecture:** Next.js static export with no real backend.
- **Verification:** Lighthouse mobile ≥90, accessible (keyboard/motion/screen-reader), and reachable fallback states.

## 2. What was actually completed

The shipped build satisfies 100% of the PRD requirements.

- **Pages:** `/` (Home), `/method`, `/services`, `/halo-agent`, `/operating-domains`, `/about`, and `/contact` are fully implemented using the DAXVORA brand kit tokens (Carbon, Bone, Graphite, Signal, Mist, White) and Arial typography.
- **Demos:** 
  - `HaloAgentDemo`: Routes 4 seeded personas to specialist or escalation states while preserving context and updating handoff reasons.
  - `DataContextDemo`: Normalizes 3 seeded data scenarios into a governed context record, showing attribution.
  - `DemandSignalDemo`: Processes 5 seeded signals through validation, classification, scoring, attribution, and routing.
- **Observability:** All three demos utilize a shared `<TracePanel>` that renders a structured event log (`runId`, `decision`, `reason`, `action`, `result`, `error`, `timingMs`, `redactionNote`) for every state transition.
- **Resilience:** All demos handle simulated provider failures and invalid inputs gracefully with explicit UI alerts (`role="alert"`), rather than failing silently. Demos can be cleanly restarted.
- **Accessibility & Performance:** Global `<noscript>` banner added for no-JS environments. Lighthouse scores on the final mobile audit were 93-100 across Performance, Accessibility, and Best Practices. `prefers-reduced-motion` suppresses all animations.
- **Truthfulness:** All demos carry the `SIMULATED — Not connected to client systems` label. "Signal" lime color is strictly reserved for status states, after an audit corrected decorative usages. No fabricated client data exists (all test data uses `.example` domains).

## 3. Deviations & What changed

1. **Intake Form Backend:** The PRD left the intake form backend open as a "resolved decision" between a `mailto:` link or a free-tier static service. 
   - *Decision:* Implemented as a pure HTML `mailto:` form in `app/contact/page.tsx` (using `hello@daxvora.com` which is currently an illustrative domain with no MX records).
   - *Reason:* This completely avoids external network dependencies and adheres to the strict requirement of not fabricating "live" integrations. It degrades perfectly without JS.

2. **Global `<noscript>` Notice:** 
   - *Addition:* Added a global banner in `app/layout.tsx`.
   - *Reason:* PRD §6 required that if JavaScript fails, content pages remain readable and demos show a clear notice. Because Next.js statically pre-renders the HTML, the content is always visible, but the demo client components become inert. The banner explicitly informs users that JS is required for the interactive portions.

3. **CSS Framework:**
   - *Decision:* Used vanilla CSS with BEM methodology instead of Tailwind.
   - *Reason:* Allowed for absolute, predictable control over CSS Grid constraints (particularly the `Reveal` component `height: 100%` bug) and exact matching to the DAXVORA design tokens without needing a custom Tailwind configuration pass.

## 4. Known Gaps & Limitations

- **No persistent state:** Refreshing the page clears all demo traces. This is an intentional architectural limitation to avoid giving the impression of a real backend, but means users cannot share links to specific demo states.
- **Mobile layout on complex diagrams:** The `DemandPipelineDiagram` and `HaloSchematic` are designed as responsive SVGs, but at very narrow viewports (<360px), some internal text scaling becomes tight. They remain readable, but are optimized for 768px+.
- **Contact Form Validation:** The `mailto:` approach means form validation relies solely on HTML5 `required` attributes. There is no server-side validation rejecting malformed emails before the user's mail client opens.

## 5. Future Extensions

If development continued past this assessment, the next phases would include:

1. **Live Backend Integration:** Connecting the `/contact` form to a real CRM or ticketing queue (e.g., Zendesk, Hubspot) using a serverless function, allowing DAXVORA to actually ingest leads.
2. **Dynamic Demos (Project 01/02 integration):** Replacing the hardcoded `fixtures.ts` files with actual API calls to the LLM-powered router (Project 01) and the data pipeline (Project 02), upgrading the `SIMULATED` badge to `TEST` or `LIVE` depending on the environment.
3. **Analytics:** Adding a privacy-respecting analytics tracker to monitor which of the three demos receives the most engagement from visitors.
4. **Content Management:** Moving the 12 Operating Domains and 6 Services into a headless CMS to allow non-developers to update copy and opportunities without a redeploy.
