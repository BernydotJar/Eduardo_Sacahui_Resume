# Portfolio Repositioning Audit

Baseline captured: 2026-07-15
Branch: `feat/ai-product-portfolio-repositioning`

## Positioning

- Current headline is “AI Solution Architect & Technical Product Owner (Hands-on)”. It stacks functions rather than establishing the requested leadership identity.
- The supporting paragraph contains credible AI architecture and product-delivery language, but the opening page hierarchy makes skills and migrations more prominent than product evidence.
- RPA and historical transformation evidence is valuable, but it currently controls too much of the first-view narrative through metrics, migrations, certifications, and TimeEstimator.

## Page hierarchy and navigation

Current homepage order:

1. Hero
2. Skills
3. Signature Migrations
4. Experience
5. Featured Case Studies
6. Education
7. Contact

Current desktop navigation prioritizes Skills, Migrations, Experience, Case Studies, Education, plus an unusually prominent external Harness SDLC link. This contradicts the requested product-first hierarchy.

## Hero

- The name treatment and chemistry tiles are distinctive and worth preserving.
- The first viewport includes a long summary, six mixed-context metrics, location, email, languages, three awards, five certifications, and two secondary CTAs.
- There is no “Explore Products” CTA and no direct product proof in the first action hierarchy.
- The metrics combine career tenure, recent AI product count, automation ROI, license savings, availability, and transaction volume without enough context to prevent misattribution.

## Product portfolio

- TimeEstimator is currently the single oversized spotlight and is labeled “RPA · AI · Product”. It is a credible live developer product, but not the strongest evidence for the target AI product/platform leadership identity.
- The current primary grid contains nine additional projects, including migrations already shown in Signature Migrations.
- Rice Command Center / executive assistant, LAURA, RAG Made Easy, and AI Recruiting Copilot have detailed local case-study content.
- ConstructHub portfolio claims conflict with its public README. The public repository says the frontend is only a deployment-validation surface and requires a product/UX rebuild; it is not production-ready and staging is off.
- Harness SDLC portfolio wording implies an implemented delivery system, while the public README says the initial feature is `spec_ready` and implementation has not started. The case study needs a status-safe rewrite.

## Experience structure

- `experience.json` mixes formal employment, independent business ownership, consulting organizations, fixed-term roles, end-client engagements, and concurrent work in one timeline.
- Overlapping dates are legitimate but unexplained, creating chronology ambiguity.
- Strong leadership evidence exists: platform ownership, teams of 12, enterprise portfolios, governance, delivery management, and independent product work.

## Customer-facing evidence

- Several projects explain technical architecture and delivery state but do not consistently expose primary users, buyer/stakeholder, job to be done, product surface, feedback, human control, maturity, and proof.
- The modal begins with stack/outcomes and technical status matrices. Product narrative and user value are not normalized.
- There are no dedicated, shareable project routes.

## Leadership and Human Systems

- Leadership evidence exists in experience data but is not presented as its own narrative.
- The Business Psychology MSc is listed as education but not connected to adoption, trust, cognitive load, change readiness, or human-in-the-loop product design.

## Claims and metrics

- Historical impact metrics have source context in `experience.json`, but the hero removes that context.
- “3+ AI products” is present in translations but needs a project-level evidence mapping before reuse.
- ConstructHub claims about marketplace UX, active frontend implementation, AI workflows, and deployment readiness exceed or conflict with its current public README.
- Harness SDLC status claims conflict with its public README.
- No public testimonials, adoption statistics, revenue, or usage metrics were found for personal AI products; none should be introduced.

## GitHub consistency

- The `BernydotJar` public profile has no name, bio, location, website, or pinned repositories.
- Portfolio repository description is “a geeky CV for the technical folks out there”, which does not match the new positioning.
- LA_muni_RAG, TimeEstimator, ConstructHub, harness-sdlc, and the portfolio are public.
- ConstructHub and TimeEstimator lack GitHub repository descriptions. No repositories are pinned.
- Other repositories must not be mutated in this task; recommendations belong in `github-profile-plan.md`.

## SEO and sharing

- Metadata headline and description use the old positioning.
- Fallback canonical URL incorrectly uses `eduardosacahui.github.io`; the actual Pages URL is `https://bernydotjar.github.io/Eduardo_Sacahui_Resume/`.
- The workflow injects the same incorrect `NEXT_PUBLIC_SITE_URL`.
- Open Graph declares the SVG app icon as a 1200×630 image; it is not a true social card.
- Sitemap contains only the homepage because dedicated project routes do not exist.
- No JSON-LD was found.

## Accessibility and responsive design

- Existing strengths: semantic sections, visible focus rules, reduced-motion CSS, accessible button labels, and keyboard-addressable controls.
- Modal focus is moved to its title and Escape closes it, but focus restoration and focus trapping need verification.
- Wide technical tables use horizontal scrolling; this is functional but too dominant on small screens.
- Browser runtime was unavailable in the baseline session, so 1440×900, 1024×768, and 390×844 visual checks remain unverified.

## Performance and assets

- Baseline homepage: 140 kB route size, 262 kB first-load JavaScript.
- Static export succeeds.
- Existing local demo bundles are substantial and should remain progressively linked rather than loaded into the homepage.
- The CV exists, but production base-path behavior must be verified after link normalization.

## Build and quality gates

Baseline commands:

| Command | Result | Evidence |
| --- | --- | --- |
| `npm run typecheck` | pass | TypeScript exited 0 |
| `npm run lint` | pass | ESLint exited 0 |
| `npm test` | fail | No `test` script exists |
| `npm run build` | pass with hidden gates | Next explicitly skipped type validation and lint |

`next.config.ts` sets both `typescript.ignoreBuildErrors` and `eslint.ignoreDuringBuilds`. These must be removed.

## Broken or misleading links

- The actual site is live at `https://bernydotjar.github.io/Eduardo_Sacahui_Resume/`; metadata and workflow use a different owner.
- Root-relative CV and demo links need a base-path-safe helper or Next `Link` handling for GitHub Pages.
- ConstructHub should not receive a source/live CTA until the case-study wording matches the public repository evidence; the source repository itself is public but currently weak product proof.
- TimeEstimator live URL returned HTTP 200 during the prior deployment check.

## Completion addendum — 2026-07-15

- The homepage now presents product impact and customer-facing products before skills and migrations.
- ConstructHub and Harness SDLC maturity claims now match their public README evidence; recruiting remains explicitly a mock-data demo.
- Dedicated static routes exist for seven selected projects, with product-specific metadata and evidence/limitations sections.
- Employment, leadership, and concurrent engagements are separated and explained.
- Human Systems and AI adoption are now an explicit, bounded differentiator.
- Production metadata, sitemap, robots, social image, CV, demo links, and GitHub Pages base path use the actual `BernydotJar` URL.
- Hidden TypeScript/ESLint build bypasses were removed. Focused tests and an export integrity verifier were added to CI.
- The modal now traps focus, closes with Escape, and restores focus to its invoking control.
- The malformed blank CV was replaced with a valid two-page, text-extractable PDF and visually reviewed after Poppler rendering.
- Browser runtime remained unavailable, so automated screenshots and console/hydration capture at the requested viewports could not be completed. No severe issue was found through responsive-source review, semantic inspection, successful static rendering, or link/asset checks.
