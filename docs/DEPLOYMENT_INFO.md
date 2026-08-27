# DAXVORA Website — Deployment & Submission Info

This document satisfies PRD §7.7 and §7.9 (Deployment).

## Version Information
**Commit Hash:** `408424d9c66fc6fb02e7e54a3130c6329b6c370e`

## Cost & Limits

**Hosting Cost:** $0/month.
The site is built as a static export (`output: "export"` in `next.config.mjs`) and can be hosted on the free tier of any static file host (e.g., Vercel, Netlify, Cloudflare Pages, GitHub Pages). 

**API/Service Limits:** N/A.
There are no third-party integrations, databases, or API keys used in this project. The contact form utilizes a standard `mailto:` link which has no associated service costs or rate limits.

**Dependencies:**
No paid dependencies were used. All packages are standard open-source MIT-licensed packages (React, Next.js).

## Asset Provenance

1. **Brand Kit & Tokens:** Supplied via `README.md` and DAXVORA design specification. 
2. **Typography:** Standard system `Arial` and `Arial Black` only. No custom webfonts were loaded, ensuring zero external font requests.
3. **Icons & Favicons:** Provided DAXVORA icons used in `/public/icons`. 
4. **Imagery:** No stock photography or external generated images were used. All visual elements (Halo Schematic, Demand Pipeline Diagram, Data Context Diagram) were implemented as pure HTML/CSS/SVG components directly within the codebase.

## Demo Recording & Transcript

*(This section should be appended by the evaluator/submitter once the final walkthrough video is recorded, per PRD §7.8)*

**Video Link:** `[Link to recording]`

### Transcript / Scenario List:
1. `0:00` - Homepage overview, vision vs current state.
2. `0:45` - **Halo Agent Demo:** Selecting "Invoice doesn't match" persona -> routes to Revenue Ops.
3. `1:15` - **Halo Agent Demo:** Selecting "I want to talk to a person" persona -> Human Escalation.
4. `1:45` - **Data & Context Demo:** Selecting "Unified customer profile" scenario -> Normalization & Governance.
5. `2:20` - **Data & Context Demo:** Triggering "Simulate source failure" mid-run.
6. `2:45` - **Demand-to-Revenue Demo:** Running "Webinar signup" signal through full pipeline.
7. `3:30` - **Demand-to-Revenue Demo:** Running "Missing email" signal -> validation rejection.
8. `4:00` - No-JS environment demonstration showing static HTML readability and `<noscript>` banner.
