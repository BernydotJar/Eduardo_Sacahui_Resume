import type { Project } from '@/lib/types';

export const constructHubProject: Project = {
  id: 'constructhub-ai-procurement-platform',
  aliases: ['constructhub', 'construct-hub', 'construction-suppliers-agent'],
  title: 'ConstructHub — AWS Deployment Validation Demo',
  when: '2026',
  client: 'Independent construction marketplace concept',
  category: 'enterprise-transformation',
  maturity: 'Staging infrastructure validated · Product UX rebuild required',
  industry: 'Construction procurement',
  skills: [
    'architecture',
    'productownership',
    'typescript',
    'react',
    'next',
    'apidesign',
    'docker',
    'cicd',
    'monitoring',
    'securetoken'
  ],
  stack: 'Next.js, TypeScript, PostgreSQL/Prisma, Docker, Amazon ECR, ECS Fargate, RDS, Secrets Manager, ALB, CloudWatch, AWS Budgets',
  summary: 'Validated a gated local-to-AWS deployment path for a construction marketplace concept, including container delivery, managed data, secret injection, smoke tests, cost controls, and controlled shutdown.',
  primaryUsers: ['Future contractor, supplier, and platform operations users'],
  buyerOrStakeholder: ['Future marketplace operators'],
  customerProblem: 'The underlying marketplace concept targets fragmented supplier and quote coordination, but current public evidence validates deployment operations rather than a finished customer product.',
  productSurface: ['Functional deployment-validation frontend', 'AWS staging environment, currently scaled to zero'],
  myRole: 'Architecture and gated deployment workflow design across application packaging, managed infrastructure, migrations, review evidence, and cost controls.',
  teamContext: 'Independent staging/demo project executed through a spec-driven SDLC harness.',
  productDecisions: [
    'Separated deployment validation from product-readiness claims.',
    'Ran database migration as an ECS one-off task inside the target IAM, network, runtime, and secret boundary.',
    'Added explicit staged shutdown controls and a low-cost AWS Budget guard.'
  ],
  tradeoffs: [
    'Staging is intentionally off to reduce compute cost, so the ALB may return 503.',
    'The public frontend is a validation surface and requires a dedicated product/UX rebuild before user-facing claims are appropriate.'
  ],
  architectureSummary: 'Container images are published to ECR and run on ECS Fargate with RDS PostgreSQL, Secrets Manager, ALB routing, CloudWatch logs, controlled Prisma migrations, and staged cost controls.',
  safetyAndHumanControl: [
    'Sensitive infrastructure actions were separated into explicit approval and evidence gates.',
    'Database credentials were not printed during migration execution.',
    'Staging can be scaled to zero while preserving infrastructure state.'
  ],
  delivery: ['AWS staging path validated through gated preflight, deploy, migration, smoke-test, and Go/No-Go steps'],
  technicalOutcome: ['Demo/staging/deployment path validated', 'Production readiness remains NO-GO', 'Staging currently OFF'],
  evidence: [{ label: 'Public repository status', kind: 'repository', publiclySafe: true }],
  nextStage: 'Define real customer workflows and rebuild the frontend before production hardening or marketplace claims.',
  outcomes: [
    'ECR, ECS Fargate, RDS, Secrets Manager, ALB, CloudWatch, and AWS Budgets validated',
    'Controlled database migration completed inside the runtime boundary',
    'Staging cost guard and explicit on/off controls established'
  ],
  caseStudy: {
    useCase: [
      'ConstructHub currently proves an operational deployment path, not a production marketplace. The public frontend is functional only as a deployment-validation surface.',
      'The work validates how a containerized Next.js/PostgreSQL application can move through ECR, ECS Fargate, RDS, Secrets Manager, ALB, migration, smoke testing, and Go/No-Go gates.',
      'The environment is intentionally scaled down to zero to reduce compute cost. Production readiness remains NO-GO.'
    ],
    statusMatrix: [
      {
        key: 'CH-01',
        functionality: 'AWS staging deployment path',
        status: 'Validated',
        currentState: 'ECR, ECS Fargate, RDS, Secrets Manager, ALB, CloudWatch, migration, and smoke-test gates were exercised.',
        next: 'Preserve the evidence while separating future product and production work.'
      },
      {
        key: 'CH-02',
        functionality: 'Cost control and staged shutdown',
        status: 'Validated',
        currentState: 'AWS Budget alerts exist and ECS desired/running counts are intentionally zero.',
        next: 'Add stronger automated cost and environment lifecycle policy if staging resumes.'
      },
      {
        key: 'CH-03',
        functionality: 'Customer-facing product experience',
        status: 'Not ready',
        currentState: 'Public README describes the frontend as a deployment-validation surface requiring a dedicated product/UX rebuild.',
        next: 'Define customer workflows, connect real API/database behavior, and build a credible demo path.'
      },
      {
        key: 'CH-04',
        functionality: 'Production readiness',
        status: 'NO-GO',
        currentState: 'HTTPS/domain, CI/CD deployment, environment separation, WAF, autoscaling, SLOs, performance, and backup drills remain incomplete.',
        next: 'Address each production gate only after product scope is validated.'
      }
    ],
    implementationHighlights: [
      'Container image delivery through Amazon ECR and ECS Fargate.',
      'Managed PostgreSQL through RDS with Secrets Manager runtime injection.',
      'One-off ECS migration task kept database operations inside the target runtime boundary.',
      'ALB routing, CloudWatch logging, smoke testing, and explicit Go/No-Go review.',
      'Staging budget alerts and scale-to-zero controls.'
    ],
    validationProof: [
      'Public README records demo-ready, staging-ready, and deployment-ready as GO while production-ready remains NO-GO.',
      'Public README records the current staging state as OFF with zero desired and running ECS tasks.',
      'Public README lists the validated AWS services, migration approach, cost guard, and remaining production gaps.'
    ],
    knownLimitations: [
      'No finished customer-facing product experience is claimed.',
      'Staging may return HTTP 503 because the ECS service is intentionally scaled to zero.',
      'No HTTPS/custom domain, automated deployment pipeline, autoscaling, WAF, formal SLOs, load testing, or backup/restore drill is complete.',
      'The repository should not be used as primary public product proof until the frontend and workflow behavior are rebuilt.'
    ]
  }
};
