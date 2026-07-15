# Claim Register

## CR-001

Claim: Eduardo’s primary positioning is AI Product & Platform Engineering Leader.
Type: positioning synthesis
Project or role: portfolio-wide
Evidence source: Rice AI Center, current AI product case studies, architecture/product ownership skills, enterprise leadership history
Confidence: high
Publicly safe: yes
Status: verified
Current wording: AI Solution Architect & Technical Product Owner
Required action: replace headline and align metadata/navigation.

## CR-002

Claim: Built a 0→1 executive AI assistant across six Google Workspace surfaces with approval-gated AI actions.
Type: product delivery
Project or role: Rice AI Center / Rice Command Center
Evidence source: `src/data/experience.json`, `src/data/projects.json`
Confidence: medium-high; local resume source only
Publicly safe: yes as currently published
Status: verified
Current wording: “0→1 production executive AI assistant”; “6 Google Workspace surfaces”; “100% approval-gated AI actions”
Required action: preserve exact context; use pilot terminology where project status says pilot/demo mode.

## CR-003

Claim: ConstructHub is an AI-native customer-facing procurement platform with implemented marketplace UX and AI-assisted workflows.
Type: product maturity
Project or role: ConstructHub
Evidence source: public `BernydotJar/ConstructHub` README
Confidence: high contradiction
Publicly safe: no in current wording
Status: rejected
Current wording: built marketplace frontend; AI-native platform; implemented/evolving product functions
Required action: rewrite as infrastructure-validated demo/staging concept; remove unproven product and AI behavior claims.

## CR-004

Claim: Harness SDLC is an implemented reusable agentic delivery system.
Type: platform maturity
Project or role: Harness SDLC
Evidence source: public `BernydotJar/harness-sdlc` README
Confidence: high contradiction
Publicly safe: only with status qualifier
Status: needs verification
Current wording: implemented lifecycle, roles, commands, modes, and review artifacts
Required action: align with public README: framework/repository structure exists; first workflow is `spec_ready`; implementation has not started.

## CR-005

Claim: TimeEstimator is a live RPA estimation product with local persistence, deterministic calculations, optional n8n webhooks, and local fallbacks.
Type: public developer product
Project or role: TimeEstimator
Evidence source: public README, repository source, live GitHub Pages response
Confidence: high
Publicly safe: yes
Status: verified
Current wording: live cinematic RPA command center
Required action: retain as a secondary live developer preview; avoid making it the primary AI leadership proof.

## CR-006

Claim: Historical $120K+ annual license savings, 99.9% uptime, $50M+ annual transactions, and 300% client ROI demonstrate enterprise transformation impact.
Type: historical business/platform impact
Project or role: Edwards Lifesciences, Team International, UiPath
Evidence source: `src/data/experience.json`
Confidence: medium-high; resume record
Publicly safe: yes as currently published
Status: verified
Current wording: context-free hero metrics
Required action: move to contextual transformation/leadership section and preserve role/source labels.

## CR-007

Claim: Business Psychology strengthens human-centered AI adoption work.
Type: education-based differentiation
Project or role: MSc Business Psychology
Evidence source: `src/data/education.json` and product/leadership practice
Confidence: high for perspective, insufficient for measured people-analytics outcomes
Publicly safe: yes with careful wording
Status: verified
Current wording: degree listed without narrative connection
Required action: add Human Systems section focused on trust, cognitive load, change readiness, human control, and adoption; do not claim clinical expertise.

## CR-008

Claim: The public GitHub profile currently reinforces AI product leadership.
Type: external coherence
Project or role: GitHub profile
Evidence source: GitHub API, 2026-07-15
Confidence: high
Publicly safe: yes
Status: rejected
Current wording: no bio/name/site/pins; several key repositories have no description
Required action: document recommendations only; do not mutate profile or other repos.

## CR-009

Claim: LA Muni RAG has a completed Procedure Workflow Advisor MVP and active domain-pack foundation.
Type: public product maturity
Project or role: LA Muni RAG
Evidence source: public README, public repository tree, live GitHub Pages deployment
Confidence: high
Publicly safe: yes
Status: verified
Current wording: evidence-first procedural advisor with citations, workflow steps, documents, confidence, gaps, warnings, feedback, and source boundaries
Required action: feature with explicit MVP/developer-demo language and documented admin-library limitations.

## CR-010

Claim: AI Recruiting Copilot demonstrates a production recruiting AI system.
Type: product maturity
Project or role: AI Recruiting Copilot
Evidence source: browser-bundled static demo and local case-study record
Confidence: high contradiction for production status
Publicly safe: only as a mock-data interactive demo
Status: verified with qualification
Current wording: agentic hiring operations prototype/demo
Required action: label mock data, simulated automation, browser drafts, and recruiter-controlled decisions everywhere it is featured.

## CR-011

Claim: Public portfolio and product links resolve.
Type: external evidence
Project or role: portfolio-wide
Evidence source: HTTP checks on 2026-07-15
Confidence: high
Publicly safe: yes
Status: verified
Current wording: portfolio, LA Muni RAG, TimeEstimator, public source repositories, and workflow links returned HTTP 200; LinkedIn returned anti-bot 999 and was not treated as broken
Required action: keep export-level local link verification in CI and recheck external links before release.
