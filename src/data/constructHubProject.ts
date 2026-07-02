import type { Project } from '@/lib/types';

export const constructHubProject: Project = {
  id: 'constructhub-ai-procurement-platform',
  aliases: ['constructhub', 'construct-hub', 'construction-suppliers-agent'],
  title: 'ConstructHub — AI Procurement Platform for Construction Suppliers',
  when: '2026',
  client: 'Construction procurement and supplier operations platform',
  skills: [
    'architecture',
    'productownership',
    'llmprod',
    'prompteng',
    'typescript',
    'react',
    'next',
    'apidesign',
    'jsonschema',
    'docker',
    'cicd',
    'monitoring',
    'securetoken',
    'accessibility'
  ],
  stack: 'Next.js, TypeScript, agentic supplier workflows, PostgreSQL/Prisma, Docker, AWS deployment path, CI/CD, structured product specs, admin UX, quote/order workflow automation',
  summary: 'Designed and built an AI-native construction procurement platform that helps contractors discover suppliers, manage RFQs, compare quotes, and move supplier workflows through a controlled marketplace-style experience.',
  outcomes: [
    'Defined the product architecture for contractor, supplier, and admin workflows',
    'Built a modern marketplace-style frontend for supplier discovery and procurement flow control',
    'Structured the system around RFQs, quote comparison, supplier profiles, admin review, and operational traceability',
    'Prepared the platform for cloud deployment with containerization, database migrations, and phased production gates'
  ],
  caseStudy: {
    useCase: [
      'Construction procurement is fragmented: contractors often coordinate suppliers, quotes, materials, approvals, and delivery updates through manual messages, spreadsheets, and disconnected vendor lists. ConstructHub centralizes those interactions into a platform workflow.',
      'The product is designed as an AI-assisted marketplace and operations layer for construction suppliers. Contractors can discover providers, issue RFQs, compare responses, and keep procurement decisions traceable instead of relying only on informal communication.',
      'The architecture separates customer-facing marketplace flows from administrative controls, supplier onboarding, quote lifecycle management, and deployment readiness so the platform can evolve from MVP to production without losing operational discipline.'
    ],
    statusMatrix: [
      {
        key: 'CH-01',
        functionality: 'Marketplace frontend and UX system',
        status: 'Implemented',
        currentState: 'Modern web frontend defines supplier discovery, platform positioning, responsive layout, and conversion-oriented entry points.',
        next: 'Continue refining the front-end flow for RFQ creation, supplier details, and quote comparison.'
      },
      {
        key: 'CH-02',
        functionality: 'Supplier and contractor workflow model',
        status: 'Implemented',
        currentState: 'Core product model separates contractors, suppliers, admin controls, RFQs, quote responses, and operational statuses.',
        next: 'Add deeper supplier verification, ratings, service regions, and category-specific attributes.'
      },
      {
        key: 'CH-03',
        functionality: 'Admin management layer',
        status: 'In progress',
        currentState: 'Administrator flow has been adjusted to support platform oversight, data control, and operational governance.',
        next: 'Expand admin dashboards for supplier approval, RFQ monitoring, exceptions, and marketplace quality controls.'
      },
      {
        key: 'CH-04',
        functionality: 'AI-assisted procurement workflows',
        status: 'Designed',
        currentState: 'Agentic workflow direction is defined around supplier matching, RFQ summarization, quote comparison, and decision support.',
        next: 'Implement grounded AI recommendations with source evidence, deterministic fallbacks, and human approval points.'
      },
      {
        key: 'CH-05',
        functionality: 'Database and backend readiness',
        status: 'Implemented / evolving',
        currentState: 'Platform uses a structured backend/data model suitable for marketplace entities and deployment migrations.',
        next: 'Harden migrations, seed flows, production environment separation, and data lifecycle policies.'
      },
      {
        key: 'CH-06',
        functionality: 'Cloud deployment path',
        status: 'In progress',
        currentState: 'Docker and AWS deployment path have been explored, including registry push concerns and gated infrastructure execution.',
        next: 'Complete production deployment with secret management, managed database, observability, rollback strategy, and phase gates.'
      }
    ],
    implementationPlan: [
      'Define contractor, supplier, and admin personas with clear procurement jobs-to-be-done.',
      'Build the first marketplace-style frontend around supplier discovery, trust, and RFQ conversion.',
      'Model RFQs, supplier responses, quote comparison, statuses, and administrative review as first-class platform entities.',
      'Add AI-assisted workflows for RFQ generation, supplier matching, quote summarization, and procurement decision support.',
      'Containerize the application and prepare the deployment path with environment separation and production gates.',
      'Harden the admin experience so platform operations can review suppliers, monitor workflow quality, and control marketplace data.',
      'Add observability, auditability, and deployment discipline before enabling sensitive production infrastructure changes.'
    ],
    implementationHighlights: [
      'Designed ConstructHub as a marketplace plus workflow platform rather than a static supplier directory.',
      'Used Next.js and TypeScript to build a modern front-end experience for construction procurement users.',
      'Structured product scope around contractors, suppliers, RFQs, quotes, admin workflows, and marketplace governance.',
      'Applied an AI-native SDLC approach with explicit phase gates, deployment discipline, and evidence-based review of agent work.',
      'Identified production reliability needs around command-level mutexes, clear polling states, output discipline, and hard stops before sensitive infrastructure operations.',
      'Prepared the product for AWS-oriented deployment through Docker, registry flow, database readiness, and cloud architecture decisions.'
    ],
    localCommands: [
      'npm install',
      'npm run typecheck',
      'npm run build',
      'docker build -t constructhub .',
      'Run database migrations and seed scripts only against the intended environment'
    ],
    testChecklist: [
      'Verify the landing page clearly communicates the construction supplier marketplace value proposition.',
      'Verify contractor flows can move from discovery to RFQ intent without ambiguity.',
      'Verify supplier data, quote states, and admin actions are traceable and do not silently mutate production-like data.',
      'Verify AI-assisted recommendations remain draft/decision-support outputs unless explicitly approved by a human.',
      'Verify deployment scripts cannot duplicate long-running Docker, registry, migration, or infrastructure commands.',
      'Verify production gates exist before secrets, managed database resources, ECS, ALB, or other sensitive AWS resources are touched.'
    ],
    validationProof: [
      'The project has an active frontend implementation and ongoing admin workflow adjustments.',
      'The architecture has been evaluated for Docker/AWS deployment and agentic SDLC reliability concerns.',
      'The platform direction has been refined around supplier procurement, quote workflows, admin control, and AI-assisted operations.'
    ],
    knownLimitations: [
      'The case study reflects an actively evolving product, not a fully mature production marketplace snapshot.',
      'AI supplier matching and quote comparison require careful grounding, evaluation, and business-rule validation before production use.',
      'Production deployment still requires finalized secrets management, observability, rollback strategy, and infrastructure approval gates.',
      'Supplier trust features such as verification, ratings, dispute handling, and service-area validation should be expanded before broad marketplace launch.'
    ]
  }
};
