# Meridian Optical System v4 — Graph Engineering Gate

## Producer
Refined Meridian Experience 2.0 into a Liquid Glass v4 system without changing the original compiled React app, synthetic ATS data, or recruiter-owned hiring workflows. Added two-theme material tokens, opaque evidence content, functional optical controls, a standalone experimental lens, accessibility fallbacks, and browser test infrastructure.

## Adversarial Critic: observed findings
1. **Glass everywhere**: dashboard KPIs, candidate details and review cards inherited 20px backdrop blur. Fixed by opaque content-material styling; full-height sidebar no longer consumes a compositor blur layer.
2. **Text contrast**: muted KPI labels, light sidebar avatar, Copilot shortcut, and dark-theme approval buttons failed WCAG A/AA axe checks. Fixed by stronger ink, inverse badge, and darker approval blue.
3. **Inverse content**: candidate Timeline and job-details matched candidate/quality asides contain light-on-dark typography, which became unreadable on white (observed headings as low as ~1.22:1). Fixed with SOLID navy information surfaces, not backdrop blur.
4. **Mobile obstruction**: the Copilot button obscured mobile KPI content. Fixed with compact 50px safe-area-aware button and explicit accessible label.
5. **Hiring ethics**: screening scores remain advisory; suggested automatic advance based solely on score is disabled and dashboard Approve/Reject requires a confirmation dialog with evidence path.
6. **Cross-browser**: WebKit binary unavailable on workstation; cannot claim Safari verification.
7. **WebGPU**: Glass-HQ treated as a design reference. Lab uses local SVG displacement; WebGPU adapter detection is only capability observation.

## Fixer
Applied targeted CSS and changed Playwright acceptance checks to await async data hydration and computed preference style transitions. Did not alter original bundle or backend. Accessible reduced-transparency mode completely skips lens-map computation.

## Independent Verifier: recorded evidence
- Node tests: 16/16 PASS.
- Browser script and standalone lens JS syntax: PASS.
- Chromium functional/optical gate: 48/48 PASS; structured evidence in optical-v4-browser.json.
- Chromium axe-core A/AA matrix: 36/36 scans with zero violations automatically detected after fixes. Evidence in optical-v4-wcag.json, reconstructed from an independently completed temporary runner log. CI runner must repeat independently; a portable local rerun was interrupted by shared workstation resource pressure.
- Screenshots inspected: desktop light and mobile dark dashboard; Optical Lab light/dark.
- No demonstrated FPS/battery savings; removing backdrop blur is a structural change only.

## Open release gates
- Full clean GitHub Actions CI with Chromium, WebKit, independent WCAG matrix, and unchanged portfolio build.
- Physical-device Safari and human assistive-technology testing.
- Rebuilding from original editable React source is unavailable: current optical layer is progressive enhancement of a tracked static bundle.
- No real candidate records or production ATS connections; server-side authorization/auditing would be necessary for such use.

## Release decision
REVIEW_REQUIRED: draft PR; no automatic merge or deployment.
Graph: Producer -> Critic -> Fixer -> Independent Verifier -> Evidence -> Release gate.
