import type { Project } from '@/lib/types';

export const timeEstimatorProject: Project = {
  id: 'time-estimator',
  aliases: ['timeestimator', 'rpa-time-estimator'],
  title: 'TimeEstimator — Cinematic RPA Command Center',
  when: '2026',
  client: 'Independent product',
  skills: [
    'architecture',
    'productownership',
    'next',
    'typescript',
    'react',
    'n8n',
    'llmops',
    'jsonschema',
    'apidesign',
    'accessibility',
    'cicd'
  ],
  stack: 'Next.js App Router, TypeScript, React, Tailwind CSS, Radix UI, Jest, n8n webhooks, GitHub Pages',
  summary: 'Built a cinematic RPA estimation workspace that turns discovery inputs into consistent effort totals, defensible assumptions, and stakeholder-ready reports.',
  outcomes: [
    'One workspace for discovery, estimation, risk, and reporting',
    'Deterministic calculations with two-decimal precision',
    'AI-assisted workflows with safe local fallbacks',
    'Static, portable deployment with browser-local persistence'
  ],
  liveUrl: 'https://bernydotjar.github.io/TimeEstimator/',
  sourceUrl: 'https://github.com/BernydotJar/TimeEstimator',
  caseStudy: {
    useCase: [
      'RPA discovery teams often estimate work in disconnected spreadsheets, making assumptions difficult to audit and totals hard to defend. TimeEstimator centralizes the workshop flow in a focused command-center workspace.',
      'Architects can create browser-local projects, capture activity-level effort, configure overhead, review risk and assumptions, and produce a polished estimate summary without introducing a backend dependency.',
      'Optional n8n webhooks support AI-assisted analysis, defaults, summaries, and step parsing. When an integration is unavailable, deterministic local fallbacks preserve the core estimation workflow.'
    ],
    statusMatrix: [
      {
        key: 'TE-01',
        functionality: 'Project estimation workspace',
        status: 'Live',
        currentState: 'Projects and estimate activities are managed in a responsive browser-local workspace.',
        next: 'Extend guided discovery and reusable project templates.'
      },
      {
        key: 'TE-02',
        functionality: 'Effort and overhead calculations',
        status: 'Live',
        currentState: 'Typed calculation flows produce consistent totals with configurable overhead and two-decimal precision.',
        next: 'Add governed organization-level estimation matrices.'
      },
      {
        key: 'TE-03',
        functionality: 'Risk, assumptions, and reports',
        status: 'Live',
        currentState: 'Estimate context and stakeholder-ready summaries are presented alongside the activity ledger.',
        next: 'Expand export formats and executive comparison views.'
      },
      {
        key: 'TE-04',
        functionality: 'n8n AI integration',
        status: 'Live',
        currentState: 'Versioned webhook contracts cover analysis, defaults, summaries, and step parsing with deterministic fallbacks.',
        next: 'Place protected workflows behind a server-side gateway for credentialed production use.'
      },
      {
        key: 'TE-05',
        functionality: 'Static delivery pipeline',
        status: 'Live',
        currentState: 'Typecheck, lint, Jest, audit, static export, and GitHub Pages deployment run through GitHub Actions.',
        next: 'Add automated visual regression coverage.'
      }
    ],
    implementationHighlights: [
      'A typed domain model separates estimation inputs, calculations, and UI presentation.',
      'Browser-local persistence keeps the public demo useful without collecting user project data on a server.',
      'The command-center interface prioritizes totals, activity intake, risk, assumptions, and reporting over decorative motion.',
      'Public n8n integration uses versioned request envelopes and validated response shapes while keeping secrets out of the static frontend.',
      'Deterministic heuristic fallbacks make AI-assisted actions fail soft instead of blocking the estimation workflow.',
      'GitHub Pages deployment keeps the product easy to inspect, share, and run as a live portfolio artifact.'
    ],
    testChecklist: [
      'Create a project and verify it remains available after a browser refresh.',
      'Add activities and confirm totals update with two-decimal precision.',
      'Change overhead configuration and confirm the estimate summary is recalculated.',
      'Open the report experience and verify the estimate remains readable in presentation and print contexts.',
      'Run an AI-assisted action without a configured webhook and confirm the local fallback preserves the workflow.',
      'Navigate the primary project flow with keyboard-only controls and reduced motion enabled.'
    ],
    validationProof: [
      'Live GitHub Pages application is publicly available.',
      'Repository includes focused Jest coverage for estimation UI, n8n transport/configuration, domain services, persistence operations, and project migrations.',
      'CI validates TypeScript, ESLint, tests, production dependency audit, static export, and Pages deployment.'
    ],
    knownLimitations: [
      'Browser-local projects do not sync across devices or users.',
      'Public static deployments cannot safely hold API keys or privileged n8n credentials.',
      'AI assistance is optional; production-protected workflows require a server-side gateway or edge function.'
    ]
  }
};
