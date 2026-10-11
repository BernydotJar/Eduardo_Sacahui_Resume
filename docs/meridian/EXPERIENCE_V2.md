# Meridian Experience 2.0 - UI/CX release

## Purpose
Improve Meridian's recruiter workspace without replacing functional flows or introducing additional uncontrolled AI actions.

## Verified starting point (October 9, 2026)
- Published static portfolio demo at `/Eduardo_Sacahui_Resume/recruiting-demo/`.
- Dashboard, Candidates, Jobs, Automations, Reports, candidate details, and report panels in the legacy Vite bundle.
- Synthetic recruiter/candidate data; browser-only demo state; **not an employer production system**.
- Original TSX application sources are not checked into the portfolio repository. The deployed Vite output is tracked.
- Baseline behavior has been inspected with Chromium and Playwright, without manipulating real applicant records.

## Experience changes
1. A restrained liquid-glass material language with real blur and high-contrast surface fallbacks.
2. A deep-ink fixed sidebar, consistent workspace hierarchy, and toned-down auth treatment.
3. Typographic hierarchy, coherent control radii, consistent table styling, and denser information layout.
4. Responsiveness for narrow devices, dark mode, reduced-motion and forced-colors support.
5. More precise dashboard, candidate and job descriptions.
6. Explicit recruiter confirmation before **dashboard** Approve/Reject actions; dialog exposes a link to full evidence.
7. Automatic advancement based solely on a score is disabled as a suggested automation recipe.
8. Document title and current page context reflect the HashRouter route.

## Safety
- The enhancement script contains no fetch/API calls, authentication changes or storage access.
- It leaves all screening/model behavior and source data in the existing demo bundle unchanged.
- The decision confirmation intercepts the current dashboard action before handing control to the original React handler on human confirmation.
- Scores are explicitly presented as advisory; no automated hiring action is added.

## Known technical debt and release boundaries
- This is **source-controlled progressive enhancement over a compiled bundle**, not reconstruction of the missing React/TypeScript source.
- To turn Meridian into a production CRM, restore/rewrite the original editable React source, add auth/RBAC, server-owned records, consent/data retention, integrations, test fixtures, AI evals, and an auditable decision log.
- The simulated automation engine may still parse arbitrary user-entered rules; blocking one unsafe preset is not server-side policy enforcement. Implement policy enforcement before connecting to real ATS.
- Dashboard text and reports reflect a synthetic June 2026 scenario. They are not live company metrics.
- The feature does not make any automated high-stakes decision in this public demo.

## Verification
- Node tests: `npm test`.
- Browser smoke: login; navigation through all five surfaces; guarded approve/cancel/confirm; desktop and mobile widths; dark theme; no console errors.
- Deploy via existing GitHub Pages workflow after merge to main.
