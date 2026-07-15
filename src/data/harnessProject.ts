import type { Project } from '@/lib/types';

export const harnessSdlcProject: Project = {
  id: 'harness-sdlc-agentic-delivery',
  aliases: ['ai-harness', 'harness-sdlc'],
  title: 'Harness SDLC — Spec-Driven Agent Delivery Framework',
  when: '2026',
  client: 'Open-source framework repository',
  category: 'ai-platform',
  maturity: 'Framework draft · First workflow spec_ready',
  industry: 'AI-assisted software delivery',
  skills: [
    'architecture',
    'productownership',
    'prompteng',
    'multiagent',
    'llmops',
    'jsonschema',
    'techstrategy',
    'automationgovernance',
    'cicd',
    'monitoring',
    'accessibility'
  ],
  stack: 'AGENTS.md, role definitions, command contracts, reusable skills, specs, ADRs, verification gates, review artifacts, MVP/SHIP policy',
  summary: 'Authored an open framework for constraining AI-assisted delivery through specs, human approval, file boundaries, role separation, verification, and mode-specific release criteria.',
  primaryUsers: ['Engineering teams using coding agents', 'Technical leads governing AI-assisted delivery'],
  buyerOrStakeholder: ['Engineering leaders', 'Platform and developer-experience teams'],
  customerProblem: 'Coding agents can drift, overbuild, or change scope when teams lack explicit lifecycle, permission, verification, and review controls.',
  productSurface: ['Repository operating model', 'Agent role definitions', 'Command contracts', 'Reusable templates and examples'],
  myRole: 'Framework author and product architect.',
  teamContext: 'Open-source framework draft. The public README states the first workflow is specified and `spec_ready`; implementation has not started.',
  discovery: ['Synthesized recurring failure modes in AI-assisted delivery: scope drift, weak approval boundaries, self-review, and unproven production readiness.'],
  productDecisions: [
    'Separate specification, implementation, review, and production-review responsibilities.',
    'Make human approval and declared file boundaries first-class workflow gates.',
    'Define MVP and SHIP modes so prototype speed does not silently imply production readiness.'
  ],
  tradeoffs: ['The repository currently defines the control system and bootstrap workflow; it does not yet prove adoption or completed implementation.'],
  architectureSummary: 'A repository-native control plane combines instructions, lifecycle state, role definitions, command contracts, skills, templates, ADRs, progress records, and mode-specific gates.',
  aiBehavior: ['Constrains coding-agent scope and role', 'Requires evidence before review/closure', 'Separates authoring from approval and production review'],
  evaluation: ['Current public evidence is documentation and repository structure; no adoption benchmark or completed reference implementation is claimed.'],
  safetyAndHumanControl: ['Human approval before implementation', 'File-bound execution', 'Independent review roles', 'Explicit blocked and production-readiness states'],
  delivery: ['Framework repository and first workflow specification published'],
  adoptionOrFeedback: ['No public adoption metric is claimed.'],
  technicalOutcome: ['Core framework structure published', 'First workflow at spec_ready'],
  evidence: [{ label: 'Public framework repository', href: 'https://github.com/BernydotJar/harness-sdlc', kind: 'source', publiclySafe: true }],
  sourceUrl: 'https://github.com/BernydotJar/harness-sdlc',
  nextStage: 'Obtain human approval, implement the first workflow, and publish a verified reference adoption.',
  outcomes: [
    'Documented spec → approval → build → verify → review lifecycle',
    'Defined MVP and SHIP policy gates',
    'Published reusable repository structure and bootstrap specification'
  ],
  caseStudy: {
    useCase: [
      'Harness SDLC is a proposed control system for teams that want coding agents to operate inside explicit scope, approval, verification, and review boundaries.',
      'The repository combines role definitions, command contracts, reusable skills, templates, ADRs, specs, progress records, and two delivery modes.',
      'Its current public status is intentionally limited: the first workflow is specified and marked `spec_ready`; implementation has not started and requires human approval.'
    ],
    statusMatrix: [
      {
        key: 'HSDLC-01',
        functionality: 'Framework structure and documentation',
        status: 'Published',
        currentState: 'Repository contains the documented lifecycle, roles, modes, skills, templates, commands, ADRs, examples, specs, and progress structure.',
        next: 'Validate the structure through a completed reference workflow.'
      },
      {
        key: 'HSDLC-02',
        functionality: 'First bootstrap workflow',
        status: 'spec_ready',
        currentState: 'The first workflow is specified and awaits human approval.',
        next: 'Approve, implement, independently review, and publish verification evidence.'
      },
      {
        key: 'HSDLC-03',
        functionality: 'External adoption evidence',
        status: 'Not yet proven',
        currentState: 'No public adoption metric or completed external reference implementation is claimed.',
        next: 'Document a real adoption with before/after delivery evidence.'
      }
    ],
    implementationHighlights: [
      'Repository-native lifecycle from pending through spec_ready, approved, in_progress, review, done, or blocked.',
      'Role separation for leadership, specification, implementation, review, and production review.',
      'MVP and SHIP modes with different production-readiness expectations.',
      'Human approval and file boundaries documented as control mechanisms.',
      'Reusable commands, skills, templates, examples, ADRs, and progress artifacts.'
    ],
    validationProof: [
      'Public README documents the framework goals, lifecycle, modes, roles, gate stack, and repository structure.',
      'Public README states that the first feature is specified, `spec_ready`, and not yet implemented.',
      'Public repository exposes the framework artifacts for inspection.'
    ],
    knownLimitations: [
      'The current repository is a framework draft, not a proven production platform.',
      'The first workflow still requires approval and implementation.',
      'No public adoption, throughput, quality, or delivery-cycle metric is claimed.'
    ]
  }
};
