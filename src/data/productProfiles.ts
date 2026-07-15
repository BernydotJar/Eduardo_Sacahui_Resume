import type { Project } from '@/lib/types';

export const laMuniRagProject: Project = {
  id: 'la-muni-procedure-workflow-advisor',
  aliases: ['la-muni-rag', 'procedure-workflow-advisor'],
  title: 'LA Muni RAG — Evidence-First Procedure Workflow Advisor',
  when: '2026',
  client: 'Municipal procedure assistant / reusable domain-pack MVP',
  category: 'customer-ai-product',
  maturity: 'MVP complete · Public developer demo',
  industry: 'Civic services and knowledge operations',
  skills: [
    'architecture',
    'productownership',
    'typescript',
    'node',
    'llmprod',
    'llmops',
    'jsonschema',
    'apidesign',
    'securetoken',
    'accessibility',
    'cicd'
  ],
  stack: 'TypeScript, Node.js, PostgreSQL, evidence-first RAG, hybrid retrieval, domain packs, authenticated feedback API, GitHub Pages demo',
  summary: 'Built an evidence-first procedural advisor that turns municipal source material into cited answers, step-by-step workflows, document checklists, confidence, gaps, and validation warnings.',
  primaryUsers: ['Residents and municipal service users', 'Procedure reviewers and domain administrators'],
  buyerOrStakeholder: ['Municipal operations leaders', 'Knowledge and service-delivery owners'],
  customerProblem: 'Procedural information is distributed across documents and policies, making it difficult to know which steps, documents, and sources apply to a municipal request.',
  productSurface: ['Public evidence-backed assistant', 'Procedure Workflow Advisor', 'Feedback review dashboard', 'Retrieval “Glass Wall”'],
  myRole: 'Product architect and hands-on engineer across retrieval, workflow behavior, domain configuration, security boundaries, feedback, and public demo delivery.',
  teamContext: 'Independent product and engineering implementation using a spec-driven delivery harness.',
  discovery: [
    'Mapped procedure questions beyond simple Q&A: steps, required documents, outputs, gaps, and source authority.',
    'Separated official Antigua evidence from external municipal references to avoid false authority.'
  ],
  productDecisions: [
    'Made citations, confidence, gaps, and validation warnings part of the customer-facing answer contract.',
    'Separated user feedback from municipal evidence so product signals cannot silently become source truth.',
    'Introduced validated domain packs so the core can support other procedural domains without claiming deployed customer corpora.'
  ],
  tradeoffs: [
    'Kept document administration script-driven while the public admin library remains incomplete.',
    'Uses an Antigua-first public experience while reusable starter packs remain templates, not deployed policy corpora.'
  ],
  architectureSummary: 'A TypeScript/Node service combines PostgreSQL document/version registries, hybrid retrieval, evidence contracts, deterministic workflow composition, domain-pack validation, feedback APIs, and static public product surfaces.',
  aiBehavior: [
    'Retrieves and cites evidence before composing procedural answers.',
    'Classifies procedure types and produces structured workflows with steps, inputs, outputs, confidence, gaps, and warnings.',
    'Fails closed for unsupported domain packs and preserves source-authority distinctions.'
  ],
  evaluation: [
    'Domain evaluation harness and repository test suite cover retrieval, evidence composition, domain packs, feedback, and responsive product surfaces.'
  ],
  safetyAndHumanControl: [
    'External references are never presented as official Antigua procedure without corroboration.',
    'Feedback remains reviewable product signal and requires an authenticated backend API for controlled persistence.'
  ],
  delivery: ['Static public demo plus local/API runtime', 'Spec-driven feature history and CI verification commands'],
  adoptionOrFeedback: ['A feedback capture and review path exists; no public adoption metric is claimed.'],
  technicalOutcome: ['Procedure Workflow Advisor MVP complete', 'Reusable domain-pack foundation active'],
  evidence: [
    { label: 'Live public demo', href: 'https://bernydotjar.github.io/LA_muni_RAG/', kind: 'live-demo', publiclySafe: true },
    { label: 'Public source repository', href: 'https://github.com/BernydotJar/LA_muni_RAG', kind: 'source', publiclySafe: true }
  ],
  liveUrl: 'https://bernydotjar.github.io/LA_muni_RAG/',
  sourceUrl: 'https://github.com/BernydotJar/LA_muni_RAG',
  nextStage: 'Build the pack-aware document library and feedback analytics while preserving evidence boundaries.',
  outcomes: [
    'Procedure Workflow Advisor MVP complete',
    'Cited workflows expose missing documents and validation gaps',
    'Feedback is separated from authoritative evidence'
  ],
  caseStudy: {
    useCase: [
      'People navigating municipal procedures need more than a chatbot answer: they need the right steps, required documents, expected outputs, gaps, and the source authority behind each instruction.',
      'The product is configured for La Antigua Guatemala and exposes a reusable domain-pack contract without implying that starter HR, finance, sales, or custom templates are deployed customer knowledge bases.',
      'Public surfaces include an assistant, a structured Procedure Workflow Advisor, local intake preparation, a feedback review dashboard, and a retrieval Glass Wall.'
    ],
    implementationHighlights: [
      'PostgreSQL-backed document registry, versions, citable sections, and hybrid retrieval.',
      'Structured procedural workflow contract with confidence, citations, gaps, and validation warnings.',
      'Validated domain-pack registry with fail-closed configuration behavior.',
      'Authenticated feedback API and explicit separation between product feedback and municipal evidence.',
      'Static GitHub Pages demo with security guards and artifact verification.'
    ],
    validationProof: [
      'Public repository documents the completed Procedure Workflow Advisor MVP and active domain-pack foundation.',
      'Public GitHub Pages deployment exposes the customer-facing assistant and procedure surfaces.',
      'Repository includes tests for retrieval, evidence, domain packs, feedback, localization, responsive layout, and Pages artifacts.'
    ],
    knownLimitations: [
      'The public document-library/admin experience is not complete.',
      'Starter non-municipal domain packs are templates rather than deployed customer policy corpora.',
      'The public Pages experience cannot expose protected backend credentials or privileged write actions.'
    ]
  }
};

export const productProfileEnhancements: Record<string, Partial<Project>> = {
  'rice-command-center-demo-mode': {
    category: 'customer-ai-product',
    maturity: 'Pilot · Multi-surface demo mode',
    industry: 'Executive decision support',
    primaryUsers: ['Executives', 'Executive assistants'],
    buyerOrStakeholder: ['Executive leadership', 'Enterprise IT and security owners'],
    customerProblem: 'Executive context is fragmented across calendar, briefings, meeting preparation, and action follow-up, while AI actions need clear control and auditability.',
    productSurface: ['Next.js executive brief', 'Mobile PWA digest', 'Chrome extension companion', 'Node/Express API'],
    myRole: 'AI Solution Architect and Technical Product Owner, hands-on across product requirements, architecture, backend security, Google Workspace integration, guardrails, QA, and release readiness.',
    teamContext: 'Cross-functional 0→1 pilot delivery; public portfolio evidence is limited to the project record and does not expose confidential source.',
    discovery: [
      'Translated executive and product requirements into a guided morning-brief, meeting-prep, and action-center storyline.',
      'Separated live data from clearly labeled demo data to make pilot behavior inspectable.'
    ],
    productDecisions: [
      'Used explicit Live Data / Demo Mode truth labels and read-only behavior.',
      'Kept tokens backend-owned and required approval gates for AI actions.',
      'Designed web, PWA, and extension surfaces around the same executive workflow rather than treating them as separate demos.'
    ],
    tradeoffs: [
      'The mobile experience is a PWA, not a native iOS application.',
      'The pilot prioritizes read-only intelligence and auditable drafts over write-back automation.'
    ],
    architectureSummary: 'Next.js product surfaces and a Chrome companion connect to a Node/Express API with backend-owned OAuth, encrypted tokens, structured LLM contracts, Google Calendar reads, audit export, and controlled demo fallbacks.',
    aiBehavior: ['Generates structured executive summaries and preparation context', 'Constrains outputs through schemas, repair paths, source traceability, and escalation rules'],
    evaluation: ['Functional, visual, accessibility, and release-readiness governance is documented in the role record; no public benchmark score is claimed.'],
    safetyAndHumanControl: ['All AI actions are approval-gated', 'No write-back is allowed in the published pilot scope', 'Demo data and drafts are explicitly labeled'],
    delivery: ['0→1 pilot delivered across web, PWA, extension, and API surfaces'],
    adoptionOrFeedback: ['Pilot scope and guided storyline are documented; no public user-count or adoption metric is claimed.'],
    technicalOutcome: ['Six Google Workspace surfaces integrated', 'Pilot APIs, RBAC-lite, and audit export implemented'],
    evidence: [{ label: 'Portfolio project record', kind: 'portfolio-record', publiclySafe: true }],
    nextStage: 'Expand live-data reliability, evaluation evidence, and admin controls before broader production adoption.'
  },
  'ai-recruiting-copilot': {
    category: 'customer-ai-product',
    maturity: 'Interactive portfolio demo',
    industry: 'Recruiting operations',
    primaryUsers: ['Recruiters', 'Hiring operations teams'],
    buyerOrStakeholder: ['Talent acquisition leaders', 'Hiring managers'],
    customerProblem: 'Candidate intake, evidence review, job matching, communication, and approval decisions are fragmented across recruiting workflows.',
    productSurface: ['Recruiting dashboard', 'Candidate evidence cards', 'Human review actions', 'Workflow builder', 'Hiring funnel reports'],
    myRole: 'Independent product designer and hands-on frontend engineer for the static product demo.',
    teamContext: 'Personal product prototype using browser-bundled demo data; no live applicant or employer data is processed.',
    discovery: ['Modeled the experience around recruiter review, fit evidence, approval decisions, and follow-up communication.'],
    productDecisions: [
      'Expose screening evidence and interview questions instead of presenting an opaque ranking.',
      'Keep approve, reject, and request-review decisions with the recruiter.',
      'Label simulated automation and browser-local demo behavior honestly.'
    ],
    tradeoffs: ['Static demo data enables a safe public experience but does not prove production integrations or model performance.'],
    architectureSummary: 'A static React/TypeScript product demo combines recruiting dashboards, deterministic fit presentation, human review controls, workflow visualization, and browser-generated communication drafts.',
    aiBehavior: ['Presents candidate/job fit evidence and suggested interview questions', 'Drafts follow-up communication for human review'],
    evaluation: ['No public model benchmark is claimed; demo behavior is evaluated through deterministic UI scenarios.'],
    safetyAndHumanControl: ['Final hiring actions remain recruiter-controlled', 'No real candidate data or outbound messaging is used'],
    delivery: ['Browser-based interactive demo exported with the portfolio'],
    adoptionOrFeedback: ['No public adoption metric is claimed.'],
    evidence: [{ label: 'Interactive product demo', href: '/recruiting-demo/', kind: 'artifact', publiclySafe: true }],
    nextStage: 'Replace mock inputs with consented integrations, validated scoring, bias review, and collaborative audit workflows.'
  },
  'rag-made-easy': {
    category: 'ai-platform',
    maturity: 'Interactive learning demo',
    industry: 'Developer education',
    primaryUsers: ['Developers and technical learners'],
    customerProblem: 'RAG concepts are difficult to understand when retrieval, grounding, and quality signals remain hidden behind an API.',
    productSurface: ['Interactive browser playground', 'Pipeline visualization', 'Source and quality panels'],
    myRole: 'Independent product designer and engineer.',
    productDecisions: ['Expose chunking, retrieval mode, cited chunks, and quality indicators as manipulable product controls.'],
    safetyAndHumanControl: ['Source grounding remains visible', 'Optional model keys are user supplied; default flow runs offline'],
    evidence: [{ label: 'Interactive RAG demo', href: '/rag-demo/', kind: 'artifact', publiclySafe: true }],
    nextStage: 'Add safe user-document ingestion and stronger semantic evaluation.'
  },
  'time-estimator': {
    category: 'ai-platform',
    maturity: 'Live developer preview',
    industry: 'RPA delivery operations',
    primaryUsers: ['Automation architects', 'RPA discovery teams'],
    buyerOrStakeholder: ['Automation program leaders'],
    customerProblem: 'RPA estimates are often fragmented across spreadsheets, making assumptions, overhead, and totals difficult to defend.',
    productSurface: ['Project dashboard', 'Activity ledger', 'Risk and assumptions panels', 'Report experience'],
    myRole: 'Independent product architect and hands-on engineer.',
    teamContext: 'Public static product with browser-local persistence.',
    productDecisions: ['Keep the core calculation workflow deterministic', 'Use optional n8n assistance with fail-soft local fallbacks'],
    tradeoffs: ['Local persistence avoids collecting project data but does not sync across devices or teams.'],
    architectureSummary: 'Next.js static application with typed domain services, local persistence, deterministic calculations, reports, and public n8n webhook adapters.',
    evidence: [
      { label: 'Live product', href: 'https://bernydotjar.github.io/TimeEstimator/', kind: 'live-demo', publiclySafe: true },
      { label: 'Public source', href: 'https://github.com/BernydotJar/TimeEstimator', kind: 'source', publiclySafe: true }
    ],
    nextStage: 'Add governed team-level matrices and a protected integration gateway.'
  }
};
