# Adversarial QA: Resume / AI Product Portfolio

**Date:** 2026-10-09  
**Repository:** `BernydotJar/Eduardo_Sacahui_Resume`  
**Baseline:** `main` at `2cdb40c`  
**Change strategy:** targeted changes only; no product redesign or invented maturity claims.

## Review method and evidence

Independent source inspection targeted recruiter/customer journeys, accessible controls, motion/battery impact, and browser storage failures. Existing portfolio claim register and product maturity boundaries were preserved.

**Granite availability:** Local Ollama exposed `ibm/granite3.3:2b` and `ibm/granite4:1b`. Two actual attempts to invoke the Granite 3.3 model returned HTTP 500: `llama-server process has terminated: signal: killed`. The second used a very small prompt and a 1,024-token context. The shared workstation had significant RAM/swap pressure. **No Granite critic/verifier completion was produced**; therefore these findings are independently reproduced source findings, not model-certified judgments. See `granite-smoke-result.json` for the second raw failure and `scripts/granite-adversarial.mjs` for a reproducible review runner when sufficient capacity is available.

## Confirmed findings and corrective actions

| Priority | Area | Evidence at baseline | Change | Status |
| --- | --- | --- | --- | --- |
| P1 | Trust / CX | Contact `mailto:` path returned a synthetic success, displayed “Message Sent!”, and cleared the form without any delivery confirmation. | Neutral email-draft CTA and confirmation; no form reset; explicit instruction to press Send in email client, translated EN/ES/PT. | Fixed in code |
| P2 | Inclusive CX | Header's theme toggle exposed hardcoded English accessible names regardless of selected locale. | Translation keys for both theme states across all three languages. | Fixed in code |
| P2 | Motion / accessibility | Theme view transition ran for keyboard activation and did not respect reduced-motion setting; rejected `transition.ready` could be unhandled. | Keyboard/reduced-motion short circuit and rejection handler. | Fixed in code |
| P2 | Client performance | Canvas kept a requestAnimationFrame loop active while out of viewport and in background tabs; reduced-motion was checked only on mount. | Intersection/visibility/motion listeners with idempotent start/stop and cleanup. | Fixed in code |
| P3 | Resilience | Theme and locale effects assumed `localStorage` never throws. | Guarded reads/writes; UI remains functional without persistence. | Fixed in code |

## Checks and release status

- `node --test tests/*.test.mjs`: **11/11 PASS** (6 existing + 5 focused regression tests).
- `git diff --check`: PASS.
- TypeScript syntax/transpile diagnostics: **0 errors in 6 modified TS/TSX modules** (syntax-only; not a full typecheck).
- End-to-end browser accessibility, device screenshots, and post-deployment link verification: **not yet demonstrated**.
- Complete local `npm ci` exited **137** under shared-memory pressure; the partial `node_modules` tree caused missing-module errors in local typecheck/lint. **Do not describe these as product failures or as passing quality gates.** CI still must run `typecheck`, `lint`, `test`, `build`, and `verify:export` on a clean runner before production confidence is claimed.

**Decision:** Code fixes are suitable for a GitHub CI attempt, **not yet independently production-verified**. Keep any failing CI run visible and repair it before considering the release complete.

## Unverified and deferred

1. Re-check link targets and evidence maturity against current public case-study repositories before making additional claims.
2. Verify recruitment journey on 390px, tablet and desktop viewports, including real email-client handoff.
3. Repeat Granite critic + independent verifier in an environment with enough resources; inspect each suggested finding against source/runtime evidence rather than accepting model output at face value.

## Reproduction

```bash
npm ci
npm run typecheck
npm run lint
npm test
npm run build
npm run verify:export
node scripts/granite-adversarial.mjs baseline
```
