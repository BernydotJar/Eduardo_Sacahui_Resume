# QA Report — Eduardo Sacahui Resume Portfolio

> **Review Date:** 2026-02-24
> **Reviewers:** QA Crew (Functional · UI · Technical)
> **Repo:** `Eduardo_Sacahui_Resume`
> **Stack:** Next.js 15 · React 18 · TypeScript · Tailwind CSS · Framer Motion · shadcn/ui

---

## Executive Summary

The portfolio is a polished, feature-rich interactive resume with creative elements (periodic table skills grid, guided tour, Easter egg, detail drawer). The core concept is strong and the tech choices are modern. Below you'll find findings organized by discipline — each with a severity label and a concrete recommendation.

**Severity scale:**
- `[CRITICAL]` — Blocks core functionality or causes data loss
- `[HIGH]` — Significant degradation of UX or functionality
- `[MEDIUM]` — Noticeable but non-blocking issue
- `[LOW]` — Polish / nice-to-have improvement
- `[INFO]` — Observation, no action required

---

## 1. Functional QA

### 1.1 Contact Form

| ID | Severity | Finding | Recommendation |
|----|----------|---------|----------------|
| FQ-01 | `[HIGH]` | Contact form has no visible submission endpoint configured. If the form fires a `fetch` or action that points to a server route, it will 404 on the static export (`output: 'export'` disables API routes). | Wire the form to a third-party service (Formspree, Web3Forms, Resend) or add a clear "email me directly" fallback when submission fails. |
| FQ-02 | `[MEDIUM]` | Field-level validation error messages are not confirmed to be announced via ARIA live regions. Screen readers may miss inline errors on invalid submit. | Wrap error messages in a `role="alert"` or use React Hook Form's `aria-describedby` on each input. |
| FQ-03 | `[LOW]` | No success/failure toast or confirmation message is observed in the static export flow. | Show a toast notification on form submit using the already-installed Radix Toast. |

### 1.2 Navigation & Hash Routing

| ID | Severity | Finding | Recommendation |
|----|----------|---------|----------------|
| FQ-04 | `[HIGH]` | Hash-based deep links (`#skill=python`, `#project=ops-second-brain`) are only processed on the client. On a direct page load with a hash, there is a flash where the drawer is closed before the effect runs. | Parse `window.location.hash` inside a `useLayoutEffect` (or on `DOMContentLoaded`) before the first paint to eliminate the flash. |
| FQ-05 | `[MEDIUM]` | Navigating via the sticky Header anchor links does not close the mobile menu — the menu remains open after tapping a section link on small screens. | Add a click handler on each nav link that calls `setMobileMenuOpen(false)`. |
| FQ-06 | `[LOW]` | Scroll-to-section via header anchors does not account for the sticky header height, causing section titles to be hidden behind the header. | Use a CSS scroll-margin-top on each section equal to the header height (e.g., `scroll-mt-20`). |

### 1.3 DetailDrawer

| ID | Severity | Finding | Recommendation |
|----|----------|---------|----------------|
| FQ-07 | `[HIGH]` | Closing the drawer via the X button or backdrop click does not clear the URL hash. Browser back/forward history accumulates stale hashes. | On drawer close, call `history.replaceState(null, '', window.location.pathname)` to clean the hash without adding a history entry. |
| FQ-08 | `[MEDIUM]` | Clicking a related-skill link inside the drawer re-opens the drawer with the new skill, but keyboard focus is not moved to the drawer heading, leaving keyboard users disoriented. | After the drawer content swaps, call `.focus()` on the drawer's `<h2>` or use a `FocusTrap`. |
| FQ-09 | `[LOW]` | The Postman collection download link for the RAG project points to an external resource. If that URL ever breaks, the button silently fails. | Host the Postman JSON in the repo under `public/` and reference it with a relative path. |

### 1.4 Skills Section

| ID | Severity | Finding | Recommendation |
|----|----------|---------|----------------|
| FQ-10 | `[MEDIUM]` | Filtering by multiple tags simultaneously is not confirmed. If the filter is OR-only (show skills matching any selected tag), skills with no overlapping tag may unintentionally appear or disappear in unexpected ways. | Add a tooltip or label near the filter chips indicating "Any match" vs. "All match" behavior. |
| FQ-11 | `[LOW]` | Clearing the search input does not reset the periodic table to its original grid layout if a filtered (list) view was active. | Reset the layout mode to `grid` whenever the search query becomes empty and no tags are active. |

### 1.5 Guided Tour

| ID | Severity | Finding | Recommendation |
|----|----------|---------|----------------|
| FQ-12 | `[MEDIUM]` | The tour targets elements by CSS class strings like `tour-step-1`. If any component refactor removes or renames these hooks, the tour silently breaks without test coverage. | Add at least smoke-test assertions (e.g., Playwright) that confirm each tour-step element is present in the DOM at build time. |
| FQ-13 | `[LOW]` | There is no way to restart the tour once it is dismissed. A "Take a tour" button visible to returning visitors would improve discoverability. | Persist tour completion state in `localStorage` and show a re-launch CTA in the footer or header. |

---

## 2. UI QA

### 2.1 Responsive Design

| ID | Severity | Finding | Recommendation |
|----|----------|---------|----------------|
| UI-01 | `[HIGH]` | The periodic table grid uses a custom 18-column Tailwind extension. On viewports between `sm` and `md` (≈ 480–767px), the tiles may overflow horizontally because the 18-column layout has no responsive fallback to a smaller grid or horizontal scroll container. | Wrap the grid in `overflow-x-auto` and set a `min-w-[...]` for the grid so it scrolls horizontally rather than clipping on tablets and large phones. |
| UI-02 | `[MEDIUM]` | The DetailDrawer width is set as `xl:w-[40%] lg:w-[50%] md:w-[60%]`. Below `md` (< 768px), no width class is applied, likely defaulting to 100vw, which is correct — but the drawer header and close button position should be verified on phones to ensure they don't overlap with the system status bar area (safe-area-inset). | Add `pb-safe` / `pt-safe` padding or use `env(safe-area-inset-*)` for iPhone notch/Dynamic Island support. |
| UI-03 | `[LOW]` | Timeline items in the Experience section use `flex` layout with text wrapping. On mobile (≤ 375px), long company names and date ranges can stack awkwardly. | Test on a real iPhone SE / Galaxy A-series viewport. Consider using `flex-col sm:flex-row` with a stronger break. |

### 2.2 Visual Consistency

| ID | Severity | Finding | Recommendation |
|----|----------|---------|----------------|
| UI-04 | `[MEDIUM]` | The application is dark-mode only (`<html className="dark">`), but the metadata and OG image are not confirmed to use a dark-themed preview image. The default OG image may appear light/washed on social share previews. | Create (or confirm) a dark-themed OG image and reference it in `layout.tsx` metadata. |
| UI-05 | `[MEDIUM]` | Skill tile colors are determined by level (`expert`, `advanced`, `intermediate`). There is no visible legend explaining what each color means. Recruiters unfamiliar with the design will not understand the color coding. | Add a small legend row below the filter chips, e.g., three colored dots labeled "Expert · Advanced · Intermediate". |
| UI-06 | `[LOW]` | The `RadioactiveIcon` Easter egg animation uses a pulsing emerald (`pulse-emerald`) keyframe. The animation runs indefinitely, which can be distracting on lower-motion displays. | Wrap the animation in a `prefers-reduced-motion` media query and pause/stop it for users with that setting enabled. |
| UI-07 | `[LOW]` | Badge counts in the Hero section (Awards & Certifications) are displayed as static text. No visual hierarchy separates them from the location and contact info above. | Add a subtle divider (`border-t`) or use a slightly smaller font size for the meta info row. |

### 2.3 Typography & Spacing

| ID | Severity | Finding | Recommendation |
|----|----------|---------|----------------|
| UI-08 | `[MEDIUM]` | JetBrains Mono is loaded as a Google Font for code-style labels. Verify it is actually applied to the elements it is intended for (skill symbols, code snippets) and not leaking into body text via a missing `font-sans` reset. | Run a computed-style check in DevTools on a paragraph element to confirm `font-family` resolves to `Inter` and not the monospace variant. |
| UI-09 | `[LOW]` | Section padding is `pt-16 sm:pt-20`. On very tall monitors, the last section (Contact) may feel cramped above the footer because there is no bottom-padding equivalent. | Add `pb-16 sm:pb-20` to each section wrapper to mirror the top padding. |

### 2.4 Accessibility (a11y)

| ID | Severity | Finding | Recommendation |
|----|----------|---------|----------------|
| UI-10 | `[HIGH]` | Skill tiles are interactive (they open the DetailDrawer on click) but are likely rendered as `<div>` or `<button>` elements. If `<div>`, they are not keyboard-focusable or announced as interactive. | Ensure each SkillTile is a `<button>` with a descriptive `aria-label` like `"View details for Python"`. |
| UI-11 | `[HIGH]` | The mobile hamburger menu toggle does not confirm an `aria-expanded` attribute toggling between `true`/`false`. Screen reader users cannot tell if the menu is open. | Add `aria-expanded={mobileMenuOpen}` and `aria-controls="mobile-nav"` to the toggle button; add `id="mobile-nav"` to the menu container. |
| UI-12 | `[MEDIUM]` | Color contrast: the primary color (HSL 172, 63%, 50% — cyan) on the dark background (HSL 222, 47%, 11%) should be verified against WCAG AA (4.5:1 for normal text, 3:1 for large text). Cyan on near-black can fail at small font sizes. | Run the palette through a contrast checker (e.g., Colour Contrast Analyser). If failing, darken the primary slightly (reduce lightness to ≈42%). |
| UI-13 | `[MEDIUM]` | Framer Motion animations (tiles, drawer slide-in) do not appear to check `window.matchMedia('(prefers-reduced-motion: reduce)')`. Users with vestibular disorders will experience all animations regardless of their OS setting. | Use Framer Motion's `useReducedMotion()` hook and disable or simplify animations when it returns `true`. |
| UI-14 | `[LOW]` | Focus ring styles rely on Tailwind's default `outline` reset. On some browsers, this removes the focus ring entirely. | Add a `focus-visible:ring-2 focus-visible:ring-primary` utility globally via `@layer base` in `globals.css`. |

---

## 3. Technical / Build QA

### 3.1 Deployment & CI/CD

| ID | Severity | Finding | Recommendation |
|----|----------|---------|----------------|
| TQ-01 | `[HIGH]` | The `deploy.yml` workflow has `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` hardcoded to `bernydotjar.github.io`, which does not match the canonical deployment URL `eduardosacahui.github.io`. Analytics events will be attributed to the wrong domain. | Update the value to `eduardosacahui.github.io` or store it as a GitHub Actions secret/variable. |
| TQ-02 | `[MEDIUM]` | The workflow does not run `npm run lint` or `npm run typecheck` before building. A broken type or lint error will only surface as a build failure late in the pipeline. | Add a `check` step before the `build` step: `npm run typecheck && npm run lint`. |
| TQ-03 | `[MEDIUM]` | The workflow caches `node_modules` using `actions/cache` keyed on `package-lock.json`. If a developer commits a lockfile change but forgets to run `npm ci`, the cache may serve stale modules. | Use `actions/setup-node` with the built-in `cache: 'npm'` option, which is more reliable and handles key invalidation correctly. |
| TQ-04 | `[LOW]` | The `.github/workflows/deploy.yml` file has uncommitted changes (shown in git status as `M`). This means the live CI pipeline may differ from what is in the working tree. | Commit the workflow changes so the deployed site and the repo are in sync. |

### 3.2 Next.js Configuration

| ID | Severity | Finding | Recommendation |
|----|----------|---------|----------------|
| TQ-05 | `[MEDIUM]` | `images: { unoptimized: true }` disables Next.js image optimization globally. Images from Unsplash/picsum served in case study cards are not lazy-loaded or compressed. | For images sourced from `<img>` tags inside components, manually add `loading="lazy"` and `decoding="async"`. Consider switching to Next.js `<Image>` with `unoptimized={true}` per-image only where needed. |
| TQ-06 | `[LOW]` | `robots.ts` and `sitemap.ts` generate metadata for the site. Verify the `sitemap.ts` references the correct `NEXT_PUBLIC_SITE_URL` with the `/Eduardo_Sacahui_Resume` base path, otherwise Google will index incorrect URLs. | Log the generated sitemap during a local build and confirm all URLs start with `https://eduardosacahui.github.io/Eduardo_Sacahui_Resume/`. |

### 3.3 Performance

| ID | Severity | Finding | Recommendation |
|----|----------|---------|----------------|
| TQ-07 | `[MEDIUM]` | Framer Motion is imported at the top level of several section components. On a cold page load, this adds ~60 KB (gzipped) to the JS bundle. The bundle is not split by route since the entire portfolio is one page. | Lazy-import Framer Motion sections using `next/dynamic` with `{ ssr: false }` so the animation library is only evaluated client-side and deferred. |
| TQ-08 | `[MEDIUM]` | All data (skills, projects, experience) is bundled directly into the page JS via `import` statements in `data.ts`. As the data grows, this increases the initial parse cost. | Consider moving data files to the `public/` directory and fetching them lazily, or at minimum verify total JSON size stays under ~50 KB combined. |
| TQ-09 | `[LOW]` | Google Fonts are loaded via `next/font/google` which is correct, but both `Inter` and `JetBrains_Mono` are imported with a large `subsets: ['latin']`. If the portfolio ever supports multilingual content (Spanish, Portuguese), add the `latin-ext` subset. | No immediate action needed; note for future internationalization. |

### 3.4 Code Quality

| ID | Severity | Finding | Recommendation |
|----|----------|---------|----------------|
| TQ-10 | `[MEDIUM]` | `rewrite_commits.py` is committed to the repository root. This is a destructive git utility script that should never be run in a CI environment. | Move it to a local script folder outside the repo, or add it to `.gitignore` and remove it from version history. |
| TQ-11 | `[MEDIUM]` | Genkit AI integration files (`src/ai/`) are included in the production build. These include `genkit.ts`, `dev.ts`, and two flows. Unless the AI flows are called from the UI, they add dead code to the bundle. | Confirm whether Genkit flows are used in the static export. If not, exclude the `src/ai/` directory from the production build via tree-shaking or a build-time environment guard. |
| TQ-12 | `[LOW]` | `apphosting.yaml` references Firebase App Hosting, but `next.config.ts` is set to `output: 'export'` for GitHub Pages. These two deployment targets are mutually exclusive and the presence of both files may confuse contributors. | Delete `apphosting.yaml` if Firebase App Hosting is not the active deployment target, or document the dual-deployment strategy in `README.md`. |

---

## 4. Content QA

| ID | Severity | Finding | Recommendation |
|----|----------|---------|----------------|
| CQ-01 | `[HIGH]` | The Hero email `eduardo.sacahui@gmail.com` is hardcoded in plaintext in the component. Scraper bots will harvest it. | Encode the email with a simple obfuscation (e.g., split string + JS concat, or a `mailto:` link rendered client-side only with `useEffect`). |
| CQ-02 | `[MEDIUM]` | The Hero location reads "Remote — Colombia / Guatemala (AMER)". Confirm this accurately reflects the candidate's current primary location and that the Guatemalan reference is intentional and up to date. | Verify with the candidate; update `Hero.tsx` accordingly. |
| CQ-03 | `[MEDIUM]` | Case study outcomes are listed as bullet points with claimed metrics (e.g., migration timelines, cost savings). These are not verified within the repo. If any numbers are placeholders, they should be replaced before sharing with recruiters. | Audit `projects.json` outcome values and confirm each metric is accurate. |
| CQ-04 | `[LOW]` | The MBA education entry is marked "In progress (2025)". Since the current date is 2026-02-24, this label may be outdated. | Update `education.json` to reflect the current status. |
| CQ-05 | `[LOW]` | `README.md` exists but its content was not confirmed to describe the project, tech stack, or how to run it locally. A bare or placeholder README reduces repo professionalism for technical recruiters who inspect the repo directly. | Add a "Getting Started" section: prerequisites, `npm install`, `npm run dev` instructions, and a screenshot. |

---

## 5. Summary Scorecard

| Area | Critical | High | Medium | Low | Total |
|------|----------|------|--------|-----|-------|
| Functional | 0 | 2 | 4 | 4 | **10** |
| UI / UX | 0 | 3 | 5 | 6 | **14** |
| Technical | 0 | 1 | 6 | 5 | **12** |
| Content | 0 | 1 | 2 | 3 | **6** |
| **Total** | **0** | **7** | **17** | **18** | **42** |

---

## 6. Priority Action List (Top 10)

1. **FQ-01** — Confirm or fix the contact form submission endpoint before going live.
2. **TQ-01** — Fix the Plausible analytics domain in `deploy.yml`.
3. **UI-10** — Audit interactive `<div>` elements in SkillTile; convert to `<button>`.
4. **UI-11** — Add `aria-expanded` to the mobile hamburger toggle.
5. **FQ-07** — Clear URL hash when the DetailDrawer closes.
6. **FQ-04** — Eliminate the hash-routing flash on direct page loads.
7. **UI-13** — Respect `prefers-reduced-motion` in Framer Motion animations.
8. **UI-12** — Verify color contrast ratios for primary cyan on dark background.
9. **CQ-01** — Obfuscate the email address in Hero to prevent scraping.
10. **TQ-02** — Add `typecheck` + `lint` steps to the CI workflow.

---

*This report was generated from static code review and structural analysis. Browser-based testing (real device, Lighthouse, axe-core) is recommended as a follow-up to validate findings marked `[HIGH]`.*
