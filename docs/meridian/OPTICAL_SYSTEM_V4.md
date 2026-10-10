# Meridian Optical System v4 - Design and release contract

## Scope

Meridian Talent Operations is an AI-assisted Recruiting CRM demonstration, not an instance of LUMA. The source checked into this portfolio contains the **compiled Vite application** at `public/recruiting-demo/assets/index-DV0VSLRm.js` rather than editable React application sources. The original bundle is unchanged. Existing recruiter flows, synthetic data, and human decision boundaries remain authoritative.

The optical upgrade uses two source-controlled CSS layers, plus DOM progressive enhancement where appropriate. It does **not** add Glass-HQ/WebGPU globally, install a replacement runtime, or change API and screening behavior.

## Architecture and material placement

| Material | Tokens/implementation | Application | Never apply to |
| --- | --- | --- | --- |
| Content (solid) | `--meridian-content-fill`, legacy `.glass-panel`, `.auth-card`, `.meridian-review-dialog` | Dashboard KPIs, candidate evidence, job details, reports, automation data, login and hiring decisions | Refracted overlays and background blur |
| Functional / regular glass | `--meridian-regular-fill`, `--meridian-optical-blur`, `.glass-chrome` | Mobile navigation and Copilot control | Full-height sidebar and tabular information |
| Clear glass | `--meridian-clear-fill`, Optics Lab opt-in | Bounded display above an intentionally visual scene | Recruiting records, forms and scored evidence |
| Optical lens | SVG `feDisplacementMap` with geometry-cached local DOM clone | `/recruiting-demo/optical-lab.html` only | Production scoring flows, large data panels |
| Solid chrome | sidebar with no backdrop filter | Primary navigation, dark navy structural anchor | Scroll-heavy compositor surfaces |

The light and dark themes explicitly define optical fills, blur, rim and keyboard focus. Existing `.glass-panel` is maintained for compatibility with compiled React; `data-meridian-material` annotations provide semantic instrumentation for audits without rewriting its bundle.

### UX principles

- **Aesthetic-usability and visual hierarchy:** content contrast precedes lens intensity. A recruiter must read evidence and policy text without background interference.
- **Jakob's law and recognition:** existing navigation and data layout stay familiar; avoid replacing operational actions with a decorative showcase.
- **Hick's law:** a single visible material selector belongs in the experiment, not in daily hiring workflows.
- **Fitts's law:** controls preserve usable targets; mobile Copilot collapses to a 50px action rather than covering metric labels.
- **Ethical automation:** screening scores remain advisory. Human review before advancing/rejecting a candidate stays in place. No AI-driven hiring status transitions are introduced.

## Optical Lab

`public/recruiting-demo/optical-lab.html` is a standalone, non-indexed experiment. It does not import the compiled CRM bundle. Regular, Clear and Content change the specimen material directly; a bounded, static SVG lens refracts duplicated local DOM. The displacement texture is regenerated only when lens geometry changes (ResizeObserver), never on every frame. Meaningful text is outside the refracted scene.

WebGPU status is capability detection only. A supported adapter is **not** equivalent to having a WebGPU optical engine implemented. On reduced transparency, map generation and the SVG filter are disabled. The lab uses native buttons, `aria-pressed`, live status descriptions and visible focus.

## Verification matrix

- Chromium: 2 themes x 2 viewports x 7 application routes (Dashboard, Candidates, Jobs, Automations, Reports, Candidate detail, Job detail) = 28 route scenarios.
- Per theme/viewport: recruiter decision dialog, Optical Lab, reduced transparency, increased contrast and JavaScript error collection = 20 additional gates. Expected total = **48 Chromium checks**.
- Optional WebKit optical demo check: `MERIDIAN_TEST_WEBKIT=1`, requiring the matching Playwright browser binary. WebKit engine testing is not the same as a physical iPhone Safari test.
- `npm test` covers static assets, human-review safety and optical-contract controls.
- CI workflow `.github/workflows/meridian-optical-v4.yml` installs Chromium/WebKit and runs the browser gate on pull requests affecting Meridian assets.

Use `npm install --no-save playwright@1.63.0` and `node scripts/meridian-optical-audit.mjs` for local reproduction; the runner uses a loopback static HTTP server and never calls external ATS services. A JSON summary is written to `evidence/meridian/optical-v4-browser.json`.

## Operational limitations and blockers

1. **Compiled-only frontend:** real refactoring, accessible component semantics, testable application state and optimized bundling require the original editable React source. CSS overlays and a small DOM enhancer are interim, not a scalable production design system.
2. **WebKit:** a workstation without the WebKit binary cannot claim Safari validation; the CI workflow must provide that evidence and the final release gate must inspect its results.
3. **Accessibility:** reduced motion/transparency and focus CSS are covered, but these tests are not a full WCAG AA audit or substitute for assisted-technology review.
4. **Performance:** fewer backdrop-filtered information panels is a structural improvement; it is not a measured FPS, battery or memory benefit until profiling confirms it.
5. **HR production security:** this portfolio demo has synthetic data and client-side state. Real candidate data would require server-side auth/RBAC, audit logs, human oversight and privacy controls before any production deployment.

## Graph release decision

Producer -> Adversarial Critic -> Fixer -> Independent Browser Verifier -> Evidence -> Release Gate -> PR.

Release disposition: **REVIEW_REQUIRED** until the isolated PR passes GitHub CI and WebKit/contrast checks, and the merged site has been inspected. Do not merge or deploy solely on a successful source-level smoke test.

## Adversarial review and corrections (2026-10-09)

- The original dashboard 12px muted labels were 3.68:1 on white, below WCAG AA. Stronger ink tokens corrected them. Sidebar avatar initials and Copilot's keyboard shortcut needed separate contrast correction.
- Dark-mode recruiter Approve labels had insufficient contrast on bright blue; a deeper action blue fixed that.
- Uniform white cards exposed light-on-dark typography in Candidate timeline and Job matching/quality asides (some headings around 1.22:1); these now use SOLID INVERSE navy information surfaces.
- Chromium functional/optical matrix: 48/48 PASS in the verified local run, including seven routes, two themes, two sizes, recruiter decisions, and accessibility preferences.
- Independent Chromium axe-core A/AA matrix after fixes: 36/36 scans with zero automatically detected violations; evidence includes predecessor-script provenance. A committed portable CI runner must reproduce it independently.
- WebKit is UNVERIFIED locally because the browser executable is absent. CI is configured to install it; do not merge on Chromium evidence alone.
