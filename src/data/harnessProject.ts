import type { Project } from '@/lib/types';

export const harnessSdlcProject: Project = {
  id: 'harness-sdlc-agentic-delivery',
  aliases: ['ai-harness', 'harness-sdlc'],
  title: 'Harness SDLC — Spec-Driven Agentic Delivery System',
  when: '2026',
  client: 'Open-source AI-native SDLC framework',
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
  stack: 'AGENTS.md, Claude agents, OpenCode command contracts, reusable skills, specs, ADRs, verification gates, production-readiness reviews',
  summary: 'Designed a reusable SDLC harness that turns AI-assisted development into a controlled, spec-first delivery workflow with role separation, approval gates, verification, and production review.',
  outcomes: [
    'Converted AI coding from ad hoc prompting into a governed delivery lifecycle',
    'Separated Leader, Spec Author, Implementer, Reviewer, and Production Reviewer responsibilities',
    'Added MVP and SHIP modes with explicit quality, security, accessibility, and observability gates',
    'Packaged reusable commands, skills, templates, ADRs, and examples for portable adoption'
  ],
  caseStudy: {
    useCase: [
      'AI agents can accelerate software delivery, but without a control system they can drift, overbuild, repeat work, or silently change scope. Harness SDLC defines the operating model around the agent: context, permissions, roles, command contracts, verification, and review artifacts.',
      'The framework is designed for teams that want to use Claude, Codex, OpenCode, or similar tools inside a disciplined delivery lifecycle rather than treating agents as free-form chatbots editing the repository.',
      'The central idea is simple: spec first, approve second, build inside file boundaries, verify with evidence, review before closure, and only ship when the mode-specific gates are satisfied.'
    ],
    statusMatrix: [
      {
        key: 'HSDLC-01',
        functionality: 'Spec-driven feature lifecycle',
        status: 'Implemented',
        currentState: 'Feature registry supports pending, spec_ready, approved, in_progress, review, done, and blocked states.',
        next: 'Add richer dashboards for cross-feature delivery visibility.'
      },
      {
        key: 'HSDLC-02',
        functionality: 'Agent role separation',
        status: 'Implemented',
        currentState: 'Leader, Spec Author, Implementer, Reviewer, and Production Reviewer roles are documented and separated through instructions and workflows.',
        next: 'Add more reference implementations for multi-agent handoffs.'
      },
      {
        key: 'HSDLC-03',
        functionality: 'Command contracts',
        status: 'Implemented',
        currentState: 'OpenCode commands define repeatable actions for spec, approval, implementation, review, close, status, verify, and documentation checkpoints.',
        next: 'Add provider-specific variants for additional agent runtimes.'
      },
      {
        key: 'HSDLC-04',
        functionality: 'MVP and SHIP modes',
        status: 'Implemented',
        currentState: 'MVP mode keeps velocity high while SHIP mode adds security, data correctness, performance, failure modes, accessibility, observability, tests, and operations gates.',
        next: 'Add team-level policy profiles for stricter enterprise adoption.'
      },
      {
        key: 'HSDLC-05',
        functionality: 'Review and production-readiness artifacts',
        status: 'Implemented',
        currentState: 'The harness requires review artifacts, decision records, documented technical debt, and explicit verification evidence before closure.',
        next: 'Add generated release notes and stakeholder-facing status summaries.'
      },
      {
        key: 'HSDLC-06',
        functionality: 'Reusable skill and template packaging',
        status: 'Implemented',
        currentState: 'Repository includes reusable skills, templates, examples, ADRs, progress tracking, and bootstrap instructions.',
        next: 'Add more domain-specific skill packs for frontend, backend, QA, data, and RPA delivery.'
      }
    ],
    implementationPlan: [
      'Define the lifecycle states and feature registry as the source of truth for agentic delivery.',
      'Write AGENTS.md, RTK.md, and CLAUDE.md as the core operating instructions for agent behavior.',
      'Create role-specific Claude agents for leadership, specification, implementation, review, and production review.',
      'Define OpenCode command contracts so common delivery actions are repeatable and auditable.',
      'Add MVP and SHIP execution modes to separate fast prototype validation from production-grade delivery.',
      'Package reusable skills, templates, examples, ADRs, and progress records so the harness can be copied into other repositories.',
      'Document human approval gates, file-bound execution, verification requirements, and review criteria.'
    ],
    implementationHighlights: [
      'AGENTS.md, RTK.md, and CLAUDE.md establish the core agent operating model and repository rules.',
      '.claude/agents defines specialized delivery roles instead of relying on a single general-purpose coding agent.',
      '.opencode/commands packages repeatable command contracts for spec, approval, implementation, verification, review, status, close, and Context7 checkpoints.',
      'feature_list.json acts as the feature registry and lifecycle control surface.',
      'skills, templates, examples, docs, ADRs, progress, and specs make the harness reusable across projects.',
      'MVP and SHIP modes make production-readiness explicit rather than relying on prompt discipline alone.'
    ],
    localCommands: [
      'git clone https://github.com/BernydotJar/harness-sdlc.git',
      'cd harness-sdlc',
      './init.sh',
      'Review feature_list.json before approving implementation work'
    ],
    testChecklist: [
      'Confirm every feature has requirements, design, and tasks before implementation.',
      'Confirm human approval is required before moving a feature from spec_ready to approved.',
      'Confirm implementation work is restricted to declared file boundaries.',
      'Confirm review artifacts include evidence, findings, and closure status.',
      'Confirm SHIP mode checks security, data correctness, performance, failure modes, accessibility, observability readiness, tests, and operations constraints.'
    ],
    validationProof: [
      'Repository published as BernydotJar/harness-sdlc.',
      'Initial harness includes command contracts, role definitions, skills, specs, templates, ADRs, examples, and progress tracking.',
      'The README documents the control-system philosophy: spec first, build second, ship clean.'
    ],
    knownLimitations: [
      'The harness is an operating model and repository template, not a replacement for engineering judgment.',
      'Teams still need to connect project-specific CI, test suites, secret management, deployment rules, and compliance controls.',
      'Adoption quality depends on enforcing approval gates and preventing agents from bypassing file boundaries or review states.'
    ]
  }
};
