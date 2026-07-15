export type Locale = 'en' | 'es' | 'pt';

export const defaultLocale: Locale = 'en';
export const supportedLocales: Locale[] = ['en', 'es', 'pt'];

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
};

export const isLocale = (value: string): value is Locale =>
  supportedLocales.includes(value as Locale);

export type TranslationDictionary = {
  app: {
    language: string;
    languageSelector: string;
  };
  header: {
    nav: {
      products: string;
      platforms: string;
      approach: string;
      leadership: string;
      engagements: string;
      contact: string;
      skills: string;
      migrations: string;
      experience: string;
      caseStudies: string;
      education: string;
      aiHarness: string;
      aiHarnessAria: string;
    };
    tourTech: string;
    brandTagline: string;
    primaryNavLabel: string;
    mobileNavLabel: string;
    contactMe: string;
    goToTop: string;
    menuToggle: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    differentiator: string;
    exploreProducts: string;
    viewLeadership: string;
    downloadResume: string;
    proofLabel: string;
    proofItems: string[];
    proofStatus: string;
    proofTags: { products: string; control: string; delivery: string };
    pillars: {
      products: string;
      platforms: string;
      transformation: string;
    };
    summaryHeading: string;
    summary: string;
    statsHeading: string;
    stats: {
      years: string;
      ai: string;
      roi: string;
      savings: string;
      uptime: string;
      transactions: string;
    };
    location: string;
    languages: string[];
    downloadCv: string;
    awardsAndCertifications: string;
    contactMe: string;
  };
  portfolio: {
    impactEyebrow: string;
    impactTitle: string;
    impactSubtitle: string;
    impactItems: {
      products: { value: string; label: string; context: string };
      surfaces: { value: string; label: string; context: string };
      controls: { value: string; label: string; context: string };
      leadership: { value: string; label: string; context: string };
    };
    customerEyebrow: string;
    customerTitle: string;
    customerSubtitle: string;
    platformEyebrow: string;
    platformTitle: string;
    platformSubtitle: string;
    labels: {
      maturity: string;
      users: string;
      problem: string;
      role: string;
      proof: string;
      details: string;
      liveDemo: string;
      source: string;
    };
    cards: Record<'rice' | 'laMuni' | 'recruiting' | 'harness' | 'rag' | 'timeEstimator' | 'constructHub', {
      summary: string;
      users: string;
      problem: string;
      role: string;
      maturity: string;
    }>;
  };
  approach: {
    eyebrow: string;
    title: string;
    subtitle: string;
    stages: Array<{ name: string; responsibilities: string }>;
  };
  skills: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    filterBehavior: string;
    legend: {
      expert: string;
      advanced: string;
      intermediate: string;
    };
    noSkillsFound: string;
    clearFilters: string;
    ariaViewSkillDetails: string;
  };
  migrations: {
    title: string;
    subtitle: string;
  };
  caseStudies: {
    title: string;
    subtitle: string;
    viewDetails: string;
    featuredLabel: string;
    liveApp: string;
    viewSource: string;
    instrumentLabel: string;
    metricHours: string;
    metricRisk: string;
    metricConfidence: string;
    riskValue: string;
    confidenceValue: string;
    capabilities: {
      discovery: string;
      estimation: string;
      assumptions: string;
      reports: string;
    };
  };
  experience: {
    title: string;
    subtitle: string;
    leadershipTitle: string;
    leadershipSubtitle: string;
    engagementsTitle: string;
    engagementsSubtitle: string;
    overlapNote: string;
    recentHeading: string;
    earlyHeading: string;
    impact: string;
    highlights: string;
    clientProjects: string;
    techUsed: string;
  };
  humanSystems: {
    eyebrow: string;
    title: string;
    summary: string;
    degreeLabel: string;
    degreeStatus: string;
    themes: Array<{ title: string; description: string }>;
    boundary: string;
  };
  projectPage: {
    back: string;
    maturity: string;
    users: string;
    stakeholders: string;
    problem: string;
    surface: string;
    role: string;
    team: string;
    discovery: string;
    decisions: string;
    tradeoffs: string;
    architecture: string;
    aiBehavior: string;
    evaluation: string;
    safety: string;
    delivery: string;
    feedback: string;
    outcomes: string;
    evidence: string;
    limitations: string;
    nextStage: string;
    live: string;
    source: string;
    technicalDetails: string;
    openFullCaseStudy: string;
    useCase: string;
    deliveryStatus: string;
    implementationPlan: string;
    howToTest: string;
    apiChecks: string;
    validationProof: string;
    localCommands: string;
    table: { key: string; functionality: string; status: string; current: string; next: string };
  };
  education: {
    title: string;
    subtitle: string;
    certifications: string;
    awards: string;
  };
  contact: {
    title: string;
    subtitle: string;
    staticSiteNote: string;
    name: string;
    email: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    sending: string;
    sendMessage: string;
    preferDirectEmail: string;
    toastSuccessTitle: string;
    toastSuccessDescription: string;
    toastErrorTitle: string;
    toastErrorDescription: string;
    validation: {
      nameMin: string;
      emailInvalid: string;
      messageMin: string;
    };
  };
  footer: {
    rightsReserved: string;
    easterEgg: string;
    animations: string;
  };
  drawer: {
    skillRelatedDescription: string;
    projectDetails: string;
    client: string;
    when: string;
    stack: string;
    methodology: string;
    outcomes: string;
    skills: string;
    relatedProjects: string;
    relatedExperience: string;
    experienceAt: string;
      downloadPostmanCollection: string;
      medallionArchitecture: string;
      launchInteractivePlayground: string;
      interactiveDemoPlayground: string;
      interactiveDemoPlaygroundDesc: string;
      liveProduct: string;
      liveProductDesc: string;
      viewSource: string;
    };
  tour: {
    prev: string;
    next: string;
    finish: string;
    steps: Record<string, { title: string; content: string }>;
  };
};

export const translations: Record<Locale, TranslationDictionary> = {
  en: {
    app: {
      language: 'Language',
      languageSelector: 'Language selector',
    },
    header: {
      nav: {
        products: 'Products',
        platforms: 'Platforms',
        approach: 'Approach',
        leadership: 'Leadership',
        engagements: 'Experience',
        contact: 'Contact',
        skills: 'Skills',
        migrations: 'Migrations',
        experience: 'Experience',
        caseStudies: 'Case Studies',
        education: 'Education',
        aiHarness: 'AI-Harness',
        aiHarnessAria: 'Open AI-Harness project on GitHub',
      },
      tourTech: 'Tour the Tech',
      brandTagline: 'AI Product & Platform',
      primaryNavLabel: 'Primary navigation',
      mobileNavLabel: 'Mobile navigation',
      contactMe: 'Contact Me',
      goToTop: 'Go to top',
      menuToggle: 'Toggle menu',
    },
    hero: {
      eyebrow: 'Build AI products · Engineer platforms · Lead transformation',
      title: 'AI Product & Platform Engineering Leader',
      differentiator: 'Hands-on product leadership across customer experience, agent behavior, platform architecture, delivery systems, and the human work of adoption.',
      exploreProducts: 'Explore Products',
      viewLeadership: 'View Leadership & Impact',
      downloadResume: 'Download Resume',
      proofLabel: 'Evidence, not slogans',
      proofItems: ['Multi-surface executive AI pilot', 'Public procedure-workflow MVP', 'Approval-gated agent actions'],
      proofStatus: 'Verified scope',
      proofTags: { products: 'Products', control: 'Control', delivery: 'Delivery' },
      pillars: {
        products: 'Build AI Products',
        platforms: 'Engineer AI Platforms',
        transformation: 'Lead Transformation',
      },
      summaryHeading: 'Professional Summary',
      summary:
        'I build customer-facing AI products, agentic platforms, and AI-native delivery systems—from product discovery and architecture through evaluation, production, and adoption.',
      statsHeading: 'Proven Impact — By the Numbers',
      stats: {
        years: 'years in enterprise automation',
        ai: 'years shipping production LLM/RAG systems',
        roi: 'average client ROI in year one',
        savings: 'annual platform savings delivered',
        uptime: 'uptime SLA on cloud RPA infrastructure',
        transactions: 'annual transactions automated',
      },
      location: 'Remote — Colombia / Guatemala (AMER)',
      languages: ['English (Default)', 'Spanish', 'Portuguese'],
      downloadCv: 'Download CV',
      awardsAndCertifications: 'AWARDS & CERTIFICATIONS',
      contactMe: 'Contact Me',
    },
    portfolio: {
      impactEyebrow: 'Selected product impact',
      impactTitle: 'Product ownership backed by working systems',
      impactSubtitle: 'Recent AI delivery evidence is separated from historical automation outcomes so each claim keeps its real context.',
      impactItems: {
        products: { value: '0→1', label: 'Executive AI pilot', context: 'Product, architecture, and hands-on delivery' },
        surfaces: { value: '6', label: 'Workspace surfaces', context: 'Integrated for executive workflows' },
        controls: { value: '100%', label: 'Approval-gated actions', context: 'Human control in the pilot scope' },
        leadership: { value: '12', label: 'Engineers led', context: 'Historical enterprise delivery team' },
      },
      customerEyebrow: 'Customer-facing AI products',
      customerTitle: 'AI experiences designed around real user decisions',
      customerSubtitle: 'Three products at different maturity levels, each explicit about users, human control, evidence, and what remains unproven.',
      platformEyebrow: 'AI platforms & developer tooling',
      platformTitle: 'The systems behind reliable product delivery',
      platformSubtitle: 'Reusable retrieval, estimation, evaluation, and delivery-control foundations—without pretending every framework is already production-proven.',
      labels: {
        maturity: 'Maturity',
        users: 'Primary users',
        problem: 'Problem',
        role: 'My role',
        proof: 'Public proof',
        details: 'View case study',
        liveDemo: 'Open live demo',
        source: 'View source',
      },
      cards: {
        rice: {
          summary: 'A multi-surface executive assistant pilot that connects briefings, calendar intelligence, meeting prep, and action follow-up with read-only safety controls.',
          users: 'Executives and executive assistants',
          problem: 'Critical context is fragmented across calendars, briefings, and follow-up workflows.',
          role: 'AI Solution Architect and Technical Product Owner; hands-on across product, architecture, security, integrations, and release readiness.',
          maturity: 'Pilot · Multi-surface demo mode',
        },
        laMuni: {
          summary: 'An evidence-first procedural advisor that produces cited answers, structured workflows, document checklists, confidence, gaps, and warnings.',
          users: 'Residents, municipal service users, and procedure reviewers',
          problem: 'Procedural guidance is distributed across documents and source authorities.',
          role: 'Product architect and hands-on engineer for retrieval, workflow behavior, governance, feedback, and public delivery.',
          maturity: 'MVP complete · Public developer demo',
        },
        recruiting: {
          summary: 'A static recruiting-operations demo that makes candidate evidence, fit signals, human review, and workflow actions visible.',
          users: 'Recruiters and hiring operations teams',
          problem: 'Screening evidence, matching, communications, and approval decisions are fragmented.',
          role: 'Independent product designer and frontend engineer.',
          maturity: 'Interactive portfolio demo · Mock data',
        },
        harness: {
          summary: 'A repository-native framework for specs, approval, file boundaries, role separation, verification, and release criteria.',
          users: 'Engineering teams using coding agents',
          problem: 'Unconstrained agents can drift, overbuild, and close work without sufficient evidence.',
          role: 'Framework author and product architect.',
          maturity: 'Framework draft · First workflow spec_ready',
        },
        rag: {
          summary: 'An interactive learning surface that exposes chunking, retrieval, grounding, and quality signals.',
          users: 'Developers and technical learners',
          problem: 'RAG behavior is hard to understand when the pipeline remains hidden behind an API.',
          role: 'Independent product designer and engineer.',
          maturity: 'Interactive learning demo',
        },
        timeEstimator: {
          summary: 'A live RPA estimation workspace with deterministic calculations and optional fail-soft AI assistance.',
          users: 'Automation architects and discovery teams',
          problem: 'Spreadsheet estimates make assumptions, overhead, and totals difficult to defend.',
          role: 'Independent product architect and hands-on engineer.',
          maturity: 'Live developer preview',
        },
        constructHub: {
          summary: 'A gated AWS deployment-validation demo for a future construction marketplace—not a finished customer product.',
          users: 'Future contractor, supplier, and platform operations users',
          problem: 'Current evidence validates infrastructure delivery, not customer product behavior.',
          role: 'Architecture and gated deployment workflow design.',
          maturity: 'Staging validated · UX rebuild required',
        },
      },
    },
    approach: {
      eyebrow: 'How I build and lead AI products',
      title: 'One operating model from discovery to adoption',
      subtitle: 'I connect product decisions, agent behavior, platform architecture, delivery controls, and human change instead of handing them off as separate problems.',
      stages: [
        { name: 'Discover', responsibilities: 'Map user workflows, pain points, constraints, source truth, and business outcomes.' },
        { name: 'Define', responsibilities: 'Write behavior contracts, product scope, architecture decisions, acceptance criteria, and safety boundaries.' },
        { name: 'Prototype', responsibilities: 'Build real product surfaces and integration paths early enough to test the workflow—not just the model.' },
        { name: 'Evaluate', responsibilities: 'Test groundedness, failure modes, human control, UX clarity, accessibility, and operational risk.' },
        { name: 'Ship', responsibilities: 'Use CI/CD, security controls, observability, release gates, rollback paths, and evidence-based review.' },
        { name: 'Operate', responsibilities: 'Monitor quality, reliability, cost, incidents, data boundaries, and changing source systems.' },
        { name: 'Adopt', responsibilities: 'Design trust, training, workflow change, ownership, and feedback into the product experience.' },
        { name: 'Improve', responsibilities: 'Turn telemetry, user signals, defects, and field learning into roadmap decisions.' },
      ],
    },
    skills: {
      title: 'Core Skills',
      subtitle: 'ATS-aligned technical capabilities and delivery strengths.',
      searchPlaceholder: 'Search skills...',
      filterBehavior: 'Filter behavior: all selected tags must match.',
      legend: {
        expert: 'Expert',
        advanced: 'Advanced',
        intermediate: 'Intermediate',
      },
      noSkillsFound: 'No skills found. Try adjusting your search or filters.',
      clearFilters: 'Clear filters',
      ariaViewSkillDetails: 'View details for',
    },
    migrations: {
      title: 'Signature Migrations',
      subtitle: 'Proven experience in re-platforming and modernization.',
    },
    caseStudies: {
      title: 'Featured Case Studies',
      subtitle: 'Deep dives into impactful projects.',
      viewDetails: 'View Details',
      featuredLabel: 'Featured build · Live product',
      liveApp: 'Launch live app',
      viewSource: 'View source',
      instrumentLabel: 'Estimate pulse',
      metricHours: 'Estimated hours',
      metricRisk: 'Delivery risk',
      metricConfidence: 'Confidence',
      riskValue: 'Moderate',
      confidenceValue: 'High',
      capabilities: {
        discovery: 'Discovery',
        estimation: 'Estimation',
        assumptions: 'Assumptions',
        reports: 'Reports',
      },
    },
    experience: {
      title: 'Experience Timeline',
      subtitle: 'A journey through my professional career.',
      leadershipTitle: 'Leadership & Employment',
      leadershipSubtitle: 'Formal roles, platform ownership, team leadership, and long-term career progression.',
      engagementsTitle: 'Selected Product & Client Engagements',
      engagementsSubtitle: 'Focused product builds, consulting delivery, and fixed-term work shown separately from the employment narrative.',
      overlapNote: 'Some engagements overlap because they were delivered through consulting organizations, independent practice, or fixed-term assignments. Dates show delivery context, not simultaneous full-time employment claims.',
      recentHeading: 'Recent Experience (2020–Present)',
      earlyHeading: 'Early Career (2014–2020)',
      impact: 'Impact',
      highlights: 'Highlights',
      clientProjects: 'Client Projects',
      techUsed: 'Tech Used',
    },
    humanSystems: {
      eyebrow: 'Human systems & AI adoption',
      title: 'Engineering the conditions for people to trust and use AI',
      summary: 'My Business Psychology studies complement product and engineering practice with a practical lens on cognitive load, team dynamics, change readiness, and human-controlled decisions.',
      degreeLabel: 'Master of Business Psychology · Franklin University',
      degreeStatus: 'In progress · Expected 2026',
      themes: [
        { title: 'Trust by design', description: 'Make sources, uncertainty, approvals, and system boundaries visible at the moment of decision.' },
        { title: 'Cognitive load', description: 'Reduce fragmented context and design AI assistance around the user’s actual workflow and attention.' },
        { title: 'Change readiness', description: 'Treat training, ownership, role clarity, and feedback loops as part of product delivery.' },
        { title: 'Human control', description: 'Keep consequential actions reviewable, approval-gated, reversible, and auditable.' },
      ],
      boundary: 'This is an organizational and product-adoption perspective—not a claim of clinical psychology practice or unsupported people-analytics outcomes.',
    },
    projectPage: {
      back: 'Back to products', maturity: 'Maturity', users: 'Primary users', stakeholders: 'Buyer or stakeholder', problem: 'The customer problem', surface: 'Customer-facing experience', role: 'My ownership', team: 'Team context', discovery: 'Discovery and product strategy', decisions: 'Key product decisions', tradeoffs: 'Tradeoffs', architecture: 'Architecture', aiBehavior: 'AI behavior and orchestration', evaluation: 'Evaluation and quality', safety: 'Guardrails and human control', delivery: 'Delivery and release approach', feedback: 'Adoption and feedback', outcomes: 'Outcomes', evidence: 'Evidence', limitations: 'Known limitations', nextStage: 'Next product stage', live: 'Open live experience', source: 'View public source', technicalDetails: 'Technical implementation detail', openFullCaseStudy: 'Open full case study', useCase: 'Use case', deliveryStatus: 'Delivery status', implementationPlan: 'Implementation plan', howToTest: 'How to test', apiChecks: 'API quick checks', validationProof: 'Validation proof', localCommands: 'Local commands', table: { key: 'Key', functionality: 'Functionality', status: 'Status', current: 'Current state', next: 'Next' },
    },
    education: {
      title: 'Education & Credentials',
      subtitle: 'My academic background and professional qualifications.',
      certifications: 'Certifications',
      awards: 'Awards',
    },
    contact: {
      title: 'Contact Me',
      subtitle: 'Have a question or want to work together?',
      staticSiteNote:
        'This static site opens your email client to send your message.',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'your.email@example.com',
      messagePlaceholder: 'Tell me how I can help',
      sending: 'Sending...',
      sendMessage: 'Send Message',
      preferDirectEmail: 'Prefer direct email?',
      toastSuccessTitle: 'Message Sent!',
      toastSuccessDescription:
        'Your email client should open shortly to send the message.',
      toastErrorTitle: 'Uh oh! Something went wrong.',
      toastErrorDescription: 'There was a problem with your request.',
      validation: {
        nameMin: 'Name must be at least 2 characters.',
        emailInvalid: 'Invalid email address.',
        messageMin: 'Message must be at least 10 characters.',
      },
    },
    footer: {
      rightsReserved: 'All Rights Reserved.',
      easterEgg: 'Yeah, Science!',
      animations: 'Animations',
    },
    drawer: {
      skillRelatedDescription: 'Projects and experience related to',
      projectDetails: 'Project Details',
      client: 'Client',
      when: 'When',
      stack: 'Stack',
      methodology: 'Methodology',
      outcomes: 'Outcomes',
      skills: 'Skills',
      relatedProjects: 'Related Projects',
      relatedExperience: 'Related Experience',
      experienceAt: 'at',
      downloadPostmanCollection: 'Download Postman Collection',
      medallionArchitecture: 'Medallion Architecture',
      launchInteractivePlayground: 'Launch Interactive Playground',
      interactiveDemoPlayground: 'Interactive Demo Playground',
      interactiveDemoPlaygroundDesc: 'Launch the live, hands-on RAG learning application directly in your browser.',
      liveProduct: 'Live Product Experience',
      liveProductDesc: 'Open the production demo and explore the RPA estimation workflow directly in your browser.',
      viewSource: 'View Source on GitHub',
    },
    tour: {
      prev: 'Prev',
      next: 'Next',
      finish: 'Finish',
      steps: {
        intro: {
          title: 'Welcome to the Tech Tour!',
          content:
            "This portfolio is built with Next.js (App Router), TypeScript, and ShadCN UI. All data is managed in simple JSON files. Let's see how it works.",
        },
        'skills-grid': {
          title: '1. The Periodic Table of Skills',
          content:
            "This isn't a static image. It's a responsive CSS Grid layout where each skill's position is defined in skills.json. It uses Framer Motion for layout animations and Tailwind CSS for styling.",
        },
        'deep-linking': {
          title: '2. Deep-Linking and State',
          content:
            "Clicking a skill or project updates the URL hash (e.g., #skill=python). A useEffect hook listens for hash changes to open the detail drawer, making the app's state shareable and bookmarkable.",
        },
        'dynamic-timeline': {
          title: '3. Dynamic Timeline Component',
          content:
            "The experience timeline is dynamically generated from experience.json. It uses Radix UI's Accordion component (via ShadCN) to create expandable sections for each role.",
        },
        'server-actions': {
          title: '4. Contact Flow on a Static Site',
          content:
            'The contact form builds a mailto link to open your email client with prefilled details, so it works reliably on static hosting.',
        },
        'easter-egg': {
          title: '5. Context for Fun',
          content:
            "Click the beaker icon! The 'science' animation is managed globally using React Context, avoiding prop-drilling and keeping state centralized.",
        },
      },
    },
  },
  es: {
    app: {
      language: 'Idioma',
      languageSelector: 'Selector de idioma',
    },
    header: {
      nav: {
        products: 'Productos',
        platforms: 'Plataformas',
        approach: 'Enfoque',
        leadership: 'Liderazgo',
        engagements: 'Experiencia',
        contact: 'Contacto',
        skills: 'Habilidades',
        migrations: 'Migraciones',
        experience: 'Experiencia',
        caseStudies: 'Casos de Estudio',
        education: 'Educación',
        aiHarness: 'AI-Harness',
        aiHarnessAria: 'Abrir el proyecto AI-Harness en GitHub',
      },
      tourTech: 'Recorrido Técnico',
      brandTagline: 'Productos y Plataformas AI',
      primaryNavLabel: 'Navegación principal',
      mobileNavLabel: 'Navegación móvil',
      contactMe: 'Contáctame',
      goToTop: 'Ir al inicio',
      menuToggle: 'Abrir o cerrar menú',
    },
    hero: {
      eyebrow: 'Construyo productos AI · Diseño plataformas · Lidero transformación',
      title: 'Líder de Ingeniería de Productos y Plataformas AI',
      differentiator: 'Liderazgo hands-on que conecta experiencia de usuario, comportamiento del agente, arquitectura de plataforma, sistemas de entrega y el trabajo humano de adopción.',
      exploreProducts: 'Explorar Productos',
      viewLeadership: 'Ver Liderazgo e Impacto',
      downloadResume: 'Descargar CV',
      proofLabel: 'Evidencia, no eslóganes',
      proofItems: ['Piloto ejecutivo AI multicanal', 'MVP público de flujos procedimentales', 'Acciones de agentes con aprobación'],
      proofStatus: 'Alcance verificado',
      proofTags: { products: 'Productos', control: 'Control', delivery: 'Entrega' },
      pillars: {
        products: 'Construir Productos AI',
        platforms: 'Diseñar Plataformas AI',
        transformation: 'Liderar Transformación',
      },
      summaryHeading: 'Resumen Profesional',
      summary:
        'Construyo productos AI orientados a usuarios, plataformas de agentes y sistemas de entrega AI-native: desde descubrimiento y arquitectura hasta evaluación, producción y adopción.',
      statsHeading: 'Impacto Comprobado — En Números',
      stats: {
        years: 'años en automatización enterprise',
        ai: 'años entregando sistemas LLM/RAG en producción',
        roi: 'ROI promedio de clientes en el primer año',
        savings: 'ahorros anuales de plataforma entregados',
        uptime: 'SLA de uptime en infraestructura RPA cloud',
        transactions: 'transacciones anuales automatizadas',
      },
      location: 'Remoto — Colombia / Guatemala (AMER)',
      languages: ['Inglés (Predeterminado)', 'Español', 'Portugués'],
      downloadCv: 'Descargar CV',
      awardsAndCertifications: 'PREMIOS Y CERTIFICACIONES',
      contactMe: 'Contáctame',
    },
    portfolio: {
      impactEyebrow: 'Impacto de producto seleccionado',
      impactTitle: 'Ownership de producto respaldado por sistemas funcionales',
      impactSubtitle: 'La evidencia reciente de productos AI se separa del impacto histórico de automatización para conservar el contexto real de cada claim.',
      impactItems: {
        products: { value: '0→1', label: 'Piloto ejecutivo AI', context: 'Producto, arquitectura y entrega hands-on' },
        surfaces: { value: '6', label: 'Superficies Workspace', context: 'Integradas para flujos ejecutivos' },
        controls: { value: '100%', label: 'Acciones con aprobación', context: 'Control humano en el alcance piloto' },
        leadership: { value: '12', label: 'Ingenieros liderados', context: 'Equipo histórico de entrega enterprise' },
      },
      customerEyebrow: 'Productos AI orientados al usuario',
      customerTitle: 'Experiencias AI diseñadas alrededor de decisiones reales',
      customerSubtitle: 'Tres productos en diferentes niveles de madurez, explícitos sobre usuarios, control humano, evidencia y lo que aún no está probado.',
      platformEyebrow: 'Plataformas AI y herramientas para desarrolladores',
      platformTitle: 'Los sistemas detrás de una entrega confiable',
      platformSubtitle: 'Fundamentos reutilizables de retrieval, estimación, evaluación y control de entrega, sin presentar cada framework como probado en producción.',
      labels: {
        maturity: 'Madurez',
        users: 'Usuarios principales',
        problem: 'Problema',
        role: 'Mi rol',
        proof: 'Evidencia pública',
        details: 'Ver caso de estudio',
        liveDemo: 'Abrir demo',
        source: 'Ver código',
      },
      cards: {
        rice: {
          summary: 'Piloto de asistente ejecutivo multicanal que conecta briefs, calendario, preparación de reuniones y seguimiento con controles de solo lectura.',
          users: 'Ejecutivos y asistentes ejecutivos',
          problem: 'El contexto crítico está fragmentado entre calendarios, briefs y flujos de seguimiento.',
          role: 'Arquitecto de Soluciones AI y Product Owner Técnico; hands-on en producto, arquitectura, seguridad, integraciones y releases.',
          maturity: 'Piloto · Demo multicanal',
        },
        laMuni: {
          summary: 'Asesor procedimental evidence-first que produce respuestas citadas, flujos estructurados, documentos, confianza, brechas y advertencias.',
          users: 'Residentes, usuarios municipales y revisores de procedimientos',
          problem: 'La guía procedimental está distribuida entre documentos y autoridades de fuente.',
          role: 'Arquitecto de producto e ingeniero hands-on en retrieval, flujos, gobernanza, feedback y entrega pública.',
          maturity: 'MVP completo · Demo pública para desarrolladores',
        },
        recruiting: {
          summary: 'Demo estática de operaciones de reclutamiento que hace visibles evidencia, señales de fit, revisión humana y acciones.',
          users: 'Recruiters y equipos de operaciones de contratación',
          problem: 'La evidencia, matching, comunicación y decisiones están fragmentadas.',
          role: 'Diseñador de producto e ingeniero frontend independiente.',
          maturity: 'Demo interactiva · Datos simulados',
        },
        harness: {
          summary: 'Framework nativo de repositorio para specs, aprobación, límites de archivos, separación de roles, verificación y releases.',
          users: 'Equipos de ingeniería que usan agentes de código',
          problem: 'Agentes sin controles pueden desviarse, sobredesarrollar y cerrar sin evidencia suficiente.',
          role: 'Autor del framework y arquitecto de producto.',
          maturity: 'Borrador de framework · Primer flujo spec_ready',
        },
        rag: {
          summary: 'Experiencia interactiva que expone chunking, retrieval, grounding y señales de calidad.',
          users: 'Desarrolladores y aprendices técnicos',
          problem: 'RAG es difícil de comprender cuando el pipeline queda oculto tras una API.',
          role: 'Diseñador de producto e ingeniero independiente.',
          maturity: 'Demo educativa interactiva',
        },
        timeEstimator: {
          summary: 'Workspace RPA en vivo con cálculos deterministas y asistencia AI opcional con fallback.',
          users: 'Arquitectos de automatización y equipos de discovery',
          problem: 'Las estimaciones en hojas de cálculo dificultan defender supuestos, overhead y totales.',
          role: 'Arquitecto de producto e ingeniero hands-on independiente.',
          maturity: 'Developer preview en vivo',
        },
        constructHub: {
          summary: 'Demo de validación de despliegue AWS para un futuro marketplace de construcción; no es un producto terminado.',
          users: 'Futuros contratistas, proveedores y operadores',
          problem: 'La evidencia actual valida infraestructura, no comportamiento de producto.',
          role: 'Arquitectura y diseño del flujo de despliegue gobernado.',
          maturity: 'Staging validado · Requiere rediseño UX',
        },
      },
    },
    approach: {
      eyebrow: 'Cómo construyo y lidero productos AI',
      title: 'Un solo modelo operativo desde discovery hasta adopción',
      subtitle: 'Conecto decisiones de producto, comportamiento del agente, arquitectura, controles de entrega y cambio humano en lugar de tratarlos como problemas separados.',
      stages: [
        { name: 'Descubrir', responsibilities: 'Mapear flujos, fricciones, restricciones, fuentes de verdad y resultados de negocio.' },
        { name: 'Definir', responsibilities: 'Escribir contratos de comportamiento, alcance, decisiones de arquitectura, criterios y límites de seguridad.' },
        { name: 'Prototipar', responsibilities: 'Construir superficies reales e integraciones temprano para probar el flujo, no solo el modelo.' },
        { name: 'Evaluar', responsibilities: 'Probar grounding, fallos, control humano, claridad UX, accesibilidad y riesgo operativo.' },
        { name: 'Entregar', responsibilities: 'Usar CI/CD, seguridad, observabilidad, gates, rollback y revisión basada en evidencia.' },
        { name: 'Operar', responsibilities: 'Monitorear calidad, confiabilidad, costo, incidentes, datos y cambios en fuentes.' },
        { name: 'Adoptar', responsibilities: 'Diseñar confianza, entrenamiento, cambio de flujo, ownership y feedback dentro del producto.' },
        { name: 'Mejorar', responsibilities: 'Convertir telemetría, señales de usuario, defectos y aprendizaje de campo en roadmap.' },
      ],
    },
    skills: {
      title: 'Habilidades Clave',
      subtitle: 'Capacidades técnicas y fortalezas de entrega alineadas a ATS.',
      searchPlaceholder: 'Buscar habilidades...',
      filterBehavior:
        'Comportamiento del filtro: todas las etiquetas seleccionadas deben coincidir.',
      legend: {
        expert: 'Experto',
        advanced: 'Avanzado',
        intermediate: 'Intermedio',
      },
      noSkillsFound:
        'No se encontraron habilidades. Ajusta la búsqueda o los filtros.',
      clearFilters: 'Limpiar filtros',
      ariaViewSkillDetails: 'Ver detalles de',
    },
    migrations: {
      title: 'Migraciones Destacadas',
      subtitle: 'Experiencia comprobada en modernización y re-plataformado.',
    },
    caseStudies: {
      title: 'Casos de Estudio Destacados',
      subtitle: 'Análisis profundos de proyectos de alto impacto.',
      viewDetails: 'Ver Detalles',
      featuredLabel: 'Producto destacado · Demo en vivo',
      liveApp: 'Abrir app en vivo',
      viewSource: 'Ver código',
      instrumentLabel: 'Pulso de estimación',
      metricHours: 'Horas estimadas',
      metricRisk: 'Riesgo de entrega',
      metricConfidence: 'Confianza',
      riskValue: 'Moderado',
      confidenceValue: 'Alta',
      capabilities: {
        discovery: 'Descubrimiento',
        estimation: 'Estimación',
        assumptions: 'Supuestos',
        reports: 'Reportes',
      },
    },
    experience: {
      title: 'Línea de Tiempo Profesional',
      subtitle: 'Un recorrido por mi carrera profesional.',
      leadershipTitle: 'Liderazgo y Empleo',
      leadershipSubtitle: 'Roles formales, ownership de plataformas, liderazgo de equipos y progresión profesional.',
      engagementsTitle: 'Engagements Seleccionados de Producto y Clientes',
      engagementsSubtitle: 'Productos, consultoría y trabajo de duración definida separados de la narrativa de empleo.',
      overlapNote: 'Algunos engagements se superponen porque fueron entregados mediante firmas de consultoría, práctica independiente o asignaciones de duración definida. Las fechas muestran contexto de entrega, no múltiples empleos full-time simultáneos.',
      recentHeading: 'Experiencia Reciente (2020–Actualidad)',
      earlyHeading: 'Etapa Inicial (2014–2020)',
      impact: 'Impacto',
      highlights: 'Logros',
      clientProjects: 'Proyectos de Cliente',
      techUsed: 'Tecnología Usada',
    },
    humanSystems: {
      eyebrow: 'Sistemas humanos y adopción de AI',
      title: 'Diseñar las condiciones para que las personas confíen y usen AI',
      summary: 'Mis estudios de Psicología Empresarial complementan producto e ingeniería con una perspectiva práctica sobre carga cognitiva, dinámica de equipos, preparación para el cambio y decisiones bajo control humano.',
      degreeLabel: 'Maestría en Psicología Empresarial · Franklin University',
      degreeStatus: 'En curso · Prevista para 2026',
      themes: [
        { title: 'Confianza por diseño', description: 'Hacer visibles fuentes, incertidumbre, aprobaciones y límites en el momento de decisión.' },
        { title: 'Carga cognitiva', description: 'Reducir contexto fragmentado y diseñar asistencia alrededor del flujo y la atención reales.' },
        { title: 'Preparación para el cambio', description: 'Tratar entrenamiento, ownership, claridad de roles y feedback como parte del producto.' },
        { title: 'Control humano', description: 'Mantener acciones importantes revisables, aprobables, reversibles y auditables.' },
      ],
      boundary: 'Esta es una perspectiva organizacional y de adopción de producto; no implica práctica de psicología clínica ni resultados de people analytics sin evidencia.',
    },
    projectPage: {
      back: 'Volver a productos', maturity: 'Madurez', users: 'Usuarios principales', stakeholders: 'Comprador o stakeholder', problem: 'El problema del cliente', surface: 'Experiencia orientada al usuario', role: 'Mi ownership', team: 'Contexto del equipo', discovery: 'Discovery y estrategia de producto', decisions: 'Decisiones clave de producto', tradeoffs: 'Tradeoffs', architecture: 'Arquitectura', aiBehavior: 'Comportamiento AI y orquestación', evaluation: 'Evaluación y calidad', safety: 'Guardrails y control humano', delivery: 'Entrega y releases', feedback: 'Adopción y feedback', outcomes: 'Resultados', evidence: 'Evidencia', limitations: 'Limitaciones conocidas', nextStage: 'Siguiente etapa del producto', live: 'Abrir experiencia en vivo', source: 'Ver código público', technicalDetails: 'Detalle técnico de implementación', openFullCaseStudy: 'Abrir caso de estudio completo', useCase: 'Caso de uso', deliveryStatus: 'Estado de entrega', implementationPlan: 'Plan de implementación', howToTest: 'Cómo probar', apiChecks: 'Verificaciones rápidas de API', validationProof: 'Evidencia de validación', localCommands: 'Comandos locales', table: { key: 'Clave', functionality: 'Funcionalidad', status: 'Estado', current: 'Estado actual', next: 'Siguiente' },
    },
    education: {
      title: 'Educación y Credenciales',
      subtitle: 'Mi formación académica y certificaciones profesionales.',
      certifications: 'Certificaciones',
      awards: 'Premios',
    },
    contact: {
      title: 'Contáctame',
      subtitle: '¿Tienes una pregunta o quieres trabajar conmigo?',
      staticSiteNote:
        'Este sitio estático abre tu cliente de correo para enviar el mensaje.',
      name: 'Nombre',
      email: 'Correo',
      message: 'Mensaje',
      namePlaceholder: 'Tu Nombre',
      emailPlaceholder: 'tu.correo@ejemplo.com',
      messagePlaceholder: 'Cuéntame cómo puedo ayudarte',
      sending: 'Enviando...',
      sendMessage: 'Enviar Mensaje',
      preferDirectEmail: '¿Prefieres correo directo?',
      toastSuccessTitle: '¡Mensaje enviado!',
      toastSuccessDescription:
        'Tu cliente de correo debería abrirse en breve para enviar el mensaje.',
      toastErrorTitle: 'Algo salió mal.',
      toastErrorDescription: 'Hubo un problema con tu solicitud.',
      validation: {
        nameMin: 'El nombre debe tener al menos 2 caracteres.',
        emailInvalid: 'Correo electrónico inválido.',
        messageMin: 'El mensaje debe tener al menos 10 caracteres.',
      },
    },
    footer: {
      rightsReserved: 'Todos los derechos reservados.',
      easterEgg: '¡Sí, ciencia!',
      animations: 'Animaciones',
    },
    drawer: {
      skillRelatedDescription: 'Proyectos y experiencia relacionados con',
      projectDetails: 'Detalles del Proyecto',
      client: 'Cliente',
      when: 'Cuándo',
      stack: 'Stack',
      methodology: 'Metodología',
      outcomes: 'Resultados',
      skills: 'Habilidades',
      relatedProjects: 'Proyectos Relacionados',
      relatedExperience: 'Experiencia Relacionada',
      experienceAt: 'en',
      downloadPostmanCollection: 'Descargar colección de Postman',
      medallionArchitecture: 'Arquitectura Medallion',
      launchInteractivePlayground: 'Iniciar Demo Interactiva',
      interactiveDemoPlayground: 'Demo Interactiva Playground',
      interactiveDemoPlaygroundDesc: 'Inicia la aplicación de aprendizaje de RAG interactiva directamente en tu navegador.',
      liveProduct: 'Experiencia de Producto en Vivo',
      liveProductDesc: 'Abre la demo publicada y explora el flujo de estimación RPA directamente en tu navegador.',
      viewSource: 'Ver Código en GitHub',
    },
    tour: {
      prev: 'Anterior',
      next: 'Siguiente',
      finish: 'Finalizar',
      steps: {
        intro: {
          title: '¡Bienvenido al recorrido técnico!',
          content:
            'Este portafolio está construido con Next.js (App Router), TypeScript y ShadCN UI. Toda la información vive en archivos JSON simples. Veamos cómo funciona.',
        },
        'skills-grid': {
          title: '1. La tabla periódica de habilidades',
          content:
            'No es una imagen estática. Es una cuadrícula CSS responsive donde la posición de cada habilidad se define en skills.json. Usa Framer Motion para animaciones y Tailwind CSS para estilos.',
        },
        'deep-linking': {
          title: '2. Deep-linking y estado',
          content:
            'Al hacer clic en una habilidad o proyecto se actualiza el hash de la URL (ej. #skill=python). Un useEffect escucha cambios del hash y abre el panel de detalle para compartir y guardar estado.',
        },
        'dynamic-timeline': {
          title: '3. Línea de tiempo dinámica',
          content:
            'La línea de experiencia se genera dinámicamente desde experience.json. Usa Accordion de Radix UI (vía ShadCN) para secciones expandibles por rol.',
        },
        'server-actions': {
          title: '4. Flujo de contacto en sitio estático',
          content:
            'El formulario de contacto genera un enlace mailto para abrir tu cliente de correo con la información precargada, compatible con hosting estático.',
        },
        'easter-egg': {
          title: '5. Context para diversión',
          content:
            'Haz clic en el icono de matraz. La animación "science" se gestiona globalmente con React Context, evitando prop-drilling y manteniendo el estado centralizado.',
        },
      },
    },
  },
  pt: {
    app: {
      language: 'Idioma',
      languageSelector: 'Seletor de idioma',
    },
    header: {
      nav: {
        products: 'Produtos',
        platforms: 'Plataformas',
        approach: 'Abordagem',
        leadership: 'Liderança',
        engagements: 'Experiência',
        contact: 'Contato',
        skills: 'Habilidades',
        migrations: 'Migrações',
        experience: 'Experiência',
        caseStudies: 'Estudos de Caso',
        education: 'Educação',
        aiHarness: 'AI-Harness',
        aiHarnessAria: 'Abrir o projeto AI-Harness no GitHub',
      },
      tourTech: 'Tour Técnico',
      brandTagline: 'Produtos e Plataformas de IA',
      primaryNavLabel: 'Navegação principal',
      mobileNavLabel: 'Navegação móvel',
      contactMe: 'Contato',
      goToTop: 'Voltar ao topo',
      menuToggle: 'Abrir ou fechar menu',
    },
    hero: {
      eyebrow: 'Construo produtos de IA · Projeto plataformas · Lidero transformação',
      title: 'Líder de Engenharia de Produtos e Plataformas de IA',
      differentiator: 'Liderança hands-on conectando experiência do usuário, comportamento do agente, arquitetura de plataforma, sistemas de entrega e o trabalho humano da adoção.',
      exploreProducts: 'Explorar Produtos',
      viewLeadership: 'Ver Liderança e Impacto',
      downloadResume: 'Baixar Currículo',
      proofLabel: 'Evidência, não slogans',
      proofItems: ['Piloto executivo de IA multissuperfície', 'MVP público de fluxos procedimentais', 'Ações de agentes com aprovação'],
      proofStatus: 'Escopo verificado',
      proofTags: { products: 'Produtos', control: 'Controle', delivery: 'Entrega' },
      pillars: {
        products: 'Construir Produtos de IA',
        platforms: 'Projetar Plataformas de IA',
        transformation: 'Liderar Transformação',
      },
      summaryHeading: 'Resumo Profissional',
      summary:
        'Construo produtos de IA voltados ao cliente, plataformas de agentes e sistemas de entrega AI-native — da descoberta e arquitetura à avaliação, produção e adoção.',
      statsHeading: 'Impacto Comprovado — Em Números',
      stats: {
        years: 'anos em automação enterprise',
        ai: 'anos entregando sistemas LLM/RAG em produção',
        roi: 'ROI médio de clientes no primeiro ano',
        savings: 'economia anual de plataforma entregue',
        uptime: 'SLA de uptime em infraestrutura RPA cloud',
        transactions: 'transações anuais automatizadas',
      },
      location: 'Remoto — Colômbia / Guatemala (AMER)',
      languages: ['Inglês (Padrão)', 'Espanhol', 'Português'],
      downloadCv: 'Baixar CV',
      awardsAndCertifications: 'PRÊMIOS E CERTIFICAÇÕES',
      contactMe: 'Contato',
    },
    portfolio: {
      impactEyebrow: 'Impacto de produto selecionado',
      impactTitle: 'Ownership de produto apoiado por sistemas funcionais',
      impactSubtitle: 'A evidência recente de produtos de IA fica separada do impacto histórico de automação para preservar o contexto real de cada afirmação.',
      impactItems: {
        products: { value: '0→1', label: 'Piloto executivo de IA', context: 'Produto, arquitetura e entrega hands-on' },
        surfaces: { value: '6', label: 'Superfícies Workspace', context: 'Integradas para fluxos executivos' },
        controls: { value: '100%', label: 'Ações com aprovação', context: 'Controle humano no escopo piloto' },
        leadership: { value: '12', label: 'Engenheiros liderados', context: 'Equipe histórica de entrega enterprise' },
      },
      customerEyebrow: 'Produtos de IA voltados ao cliente',
      customerTitle: 'Experiências de IA projetadas para decisões reais',
      customerSubtitle: 'Três produtos em diferentes níveis de maturidade, explícitos sobre usuários, controle humano, evidência e o que ainda não foi comprovado.',
      platformEyebrow: 'Plataformas de IA e ferramentas para desenvolvedores',
      platformTitle: 'Os sistemas por trás de uma entrega confiável',
      platformSubtitle: 'Fundamentos reutilizáveis de retrieval, estimativa, avaliação e controle de entrega, sem tratar todo framework como comprovado em produção.',
      labels: {
        maturity: 'Maturidade',
        users: 'Usuários principais',
        problem: 'Problema',
        role: 'Meu papel',
        proof: 'Evidência pública',
        details: 'Ver estudo de caso',
        liveDemo: 'Abrir demo',
        source: 'Ver código',
      },
      cards: {
        rice: {
          summary: 'Piloto de assistente executivo multissuperfície conectando briefs, calendário, preparação de reuniões e acompanhamento com controles somente leitura.',
          users: 'Executivos e assistentes executivos',
          problem: 'O contexto crítico está fragmentado entre calendários, briefs e fluxos de acompanhamento.',
          role: 'Arquiteto de Soluções de IA e Product Owner Técnico; hands-on em produto, arquitetura, segurança, integrações e releases.',
          maturity: 'Piloto · Demo multissuperfície',
        },
        laMuni: {
          summary: 'Advisor procedimental evidence-first com respostas citadas, fluxos estruturados, documentos, confiança, lacunas e avisos.',
          users: 'Residentes, usuários municipais e revisores de procedimentos',
          problem: 'A orientação procedimental está distribuída entre documentos e autoridades de fonte.',
          role: 'Arquiteto de produto e engenheiro hands-on em retrieval, fluxos, governança, feedback e entrega pública.',
          maturity: 'MVP completo · Demo pública para desenvolvedores',
        },
        recruiting: {
          summary: 'Demo estática de operações de recrutamento que torna visíveis evidências, sinais de fit, revisão humana e ações.',
          users: 'Recrutadores e equipes de operações de contratação',
          problem: 'Evidência, matching, comunicação e decisões estão fragmentados.',
          role: 'Designer de produto e engenheiro frontend independente.',
          maturity: 'Demo interativa · Dados simulados',
        },
        harness: {
          summary: 'Framework nativo de repositório para specs, aprovação, limites de arquivos, separação de papéis, verificação e releases.',
          users: 'Equipes de engenharia que usam agentes de código',
          problem: 'Agentes sem controles podem desviar, construir demais e fechar sem evidência suficiente.',
          role: 'Autor do framework e arquiteto de produto.',
          maturity: 'Rascunho de framework · Primeiro fluxo spec_ready',
        },
        rag: {
          summary: 'Experiência interativa que expõe chunking, retrieval, grounding e sinais de qualidade.',
          users: 'Desenvolvedores e aprendizes técnicos',
          problem: 'RAG é difícil de entender quando o pipeline fica oculto atrás de uma API.',
          role: 'Designer de produto e engenheiro independente.',
          maturity: 'Demo educacional interativa',
        },
        timeEstimator: {
          summary: 'Workspace RPA ao vivo com cálculos determinísticos e assistência de IA opcional com fallback.',
          users: 'Arquitetos de automação e equipes de discovery',
          problem: 'Estimativas em planilhas dificultam defender premissas, overhead e totais.',
          role: 'Arquiteto de produto e engenheiro hands-on independente.',
          maturity: 'Developer preview ao vivo',
        },
        constructHub: {
          summary: 'Demo de validação de deploy AWS para um futuro marketplace de construção; não é um produto finalizado.',
          users: 'Futuros contratantes, fornecedores e operadores',
          problem: 'A evidência atual valida infraestrutura, não comportamento de produto.',
          role: 'Arquitetura e desenho do fluxo de deploy governado.',
          maturity: 'Staging validado · Requer reconstrução UX',
        },
      },
    },
    approach: {
      eyebrow: 'Como construo e lidero produtos de IA',
      title: 'Um modelo operacional da descoberta à adoção',
      subtitle: 'Conecto decisões de produto, comportamento do agente, arquitetura, controles de entrega e mudança humana em vez de tratá-los como problemas separados.',
      stages: [
        { name: 'Descobrir', responsibilities: 'Mapear fluxos, dores, restrições, fontes de verdade e resultados de negócio.' },
        { name: 'Definir', responsibilities: 'Escrever contratos de comportamento, escopo, decisões de arquitetura, critérios e limites de segurança.' },
        { name: 'Prototipar', responsibilities: 'Construir superfícies reais e integrações cedo para testar o fluxo, não apenas o modelo.' },
        { name: 'Avaliar', responsibilities: 'Testar grounding, falhas, controle humano, clareza UX, acessibilidade e risco operacional.' },
        { name: 'Entregar', responsibilities: 'Usar CI/CD, segurança, observabilidade, gates, rollback e revisão baseada em evidências.' },
        { name: 'Operar', responsibilities: 'Monitorar qualidade, confiabilidade, custo, incidentes, dados e mudanças nas fontes.' },
        { name: 'Adotar', responsibilities: 'Projetar confiança, treinamento, mudança de fluxo, ownership e feedback no produto.' },
        { name: 'Melhorar', responsibilities: 'Transformar telemetria, sinais de usuários, defeitos e aprendizado em roadmap.' },
      ],
    },
    skills: {
      title: 'Competências Principais',
      subtitle: 'Capacidades técnicas e força de entrega alinhadas a ATS.',
      searchPlaceholder: 'Buscar habilidades...',
      filterBehavior:
        'Comportamento do filtro: todas as tags selecionadas devem corresponder.',
      legend: {
        expert: 'Especialista',
        advanced: 'Avançado',
        intermediate: 'Intermediário',
      },
      noSkillsFound:
        'Nenhuma habilidade encontrada. Ajuste sua busca ou filtros.',
      clearFilters: 'Limpar filtros',
      ariaViewSkillDetails: 'Ver detalhes de',
    },
    migrations: {
      title: 'Migrações de Destaque',
      subtitle:
        'Experiência comprovada em replatforming e modernização tecnológica.',
    },
    caseStudies: {
      title: 'Estudos de Caso em Destaque',
      subtitle: 'Análises profundas de projetos com alto impacto.',
      viewDetails: 'Ver Detalhes',
      featuredLabel: 'Produto em destaque · Demo ao vivo',
      liveApp: 'Abrir app ao vivo',
      viewSource: 'Ver código',
      instrumentLabel: 'Pulso da estimativa',
      metricHours: 'Horas estimadas',
      metricRisk: 'Risco de entrega',
      metricConfidence: 'Confiança',
      riskValue: 'Moderado',
      confidenceValue: 'Alta',
      capabilities: {
        discovery: 'Descoberta',
        estimation: 'Estimativa',
        assumptions: 'Premissas',
        reports: 'Relatórios',
      },
    },
    experience: {
      title: 'Linha do Tempo Profissional',
      subtitle: 'Uma jornada pela minha carreira profissional.',
      leadershipTitle: 'Liderança e Emprego',
      leadershipSubtitle: 'Papéis formais, ownership de plataformas, liderança de equipes e progressão profissional.',
      engagementsTitle: 'Engajamentos Selecionados de Produto e Clientes',
      engagementsSubtitle: 'Produtos, consultoria e trabalhos de duração definida separados da narrativa de emprego.',
      overlapNote: 'Alguns engajamentos se sobrepõem porque foram entregues por consultorias, prática independente ou atribuições de duração definida. As datas mostram contexto de entrega, não múltiplos empregos full-time simultâneos.',
      recentHeading: 'Experiência Recente (2020–Atual)',
      earlyHeading: 'Início de Carreira (2014–2020)',
      impact: 'Impacto',
      highlights: 'Destaques',
      clientProjects: 'Projetos de Cliente',
      techUsed: 'Tecnologias Utilizadas',
    },
    humanSystems: {
      eyebrow: 'Sistemas humanos e adoção de IA',
      title: 'Projetar as condições para as pessoas confiarem e usarem IA',
      summary: 'Meus estudos em Psicologia Empresarial complementam produto e engenharia com uma visão prática sobre carga cognitiva, dinâmica de equipes, prontidão para mudança e decisões sob controle humano.',
      degreeLabel: 'Mestrado em Psicologia Empresarial · Franklin University',
      degreeStatus: 'Em andamento · Previsão 2026',
      themes: [
        { title: 'Confiança por design', description: 'Tornar fontes, incerteza, aprovações e limites visíveis no momento da decisão.' },
        { title: 'Carga cognitiva', description: 'Reduzir contexto fragmentado e projetar assistência em torno do fluxo e da atenção reais.' },
        { title: 'Prontidão para mudança', description: 'Tratar treinamento, ownership, clareza de papéis e feedback como parte do produto.' },
        { title: 'Controle humano', description: 'Manter ações importantes revisáveis, aprováveis, reversíveis e auditáveis.' },
      ],
      boundary: 'Esta é uma perspectiva organizacional e de adoção de produto — não uma alegação de prática clínica ou resultados de people analytics sem evidência.',
    },
    projectPage: {
      back: 'Voltar aos produtos', maturity: 'Maturidade', users: 'Usuários principais', stakeholders: 'Comprador ou stakeholder', problem: 'O problema do cliente', surface: 'Experiência voltada ao usuário', role: 'Meu ownership', team: 'Contexto da equipe', discovery: 'Descoberta e estratégia de produto', decisions: 'Decisões-chave de produto', tradeoffs: 'Tradeoffs', architecture: 'Arquitetura', aiBehavior: 'Comportamento de IA e orquestração', evaluation: 'Avaliação e qualidade', safety: 'Guardrails e controle humano', delivery: 'Entrega e releases', feedback: 'Adoção e feedback', outcomes: 'Resultados', evidence: 'Evidência', limitations: 'Limitações conhecidas', nextStage: 'Próxima etapa do produto', live: 'Abrir experiência ao vivo', source: 'Ver código público', technicalDetails: 'Detalhe técnico de implementação', openFullCaseStudy: 'Abrir estudo de caso completo', useCase: 'Caso de uso', deliveryStatus: 'Estado da entrega', implementationPlan: 'Plano de implementação', howToTest: 'Como testar', apiChecks: 'Verificações rápidas de API', validationProof: 'Evidência de validação', localCommands: 'Comandos locais', table: { key: 'Chave', functionality: 'Funcionalidade', status: 'Status', current: 'Estado atual', next: 'Próximo' },
    },
    education: {
      title: 'Educação e Credenciais',
      subtitle: 'Minha formação acadêmica e qualificações profissionais.',
      certifications: 'Certificações',
      awards: 'Prêmios',
    },
    contact: {
      title: 'Contato',
      subtitle: 'Tem uma pergunta ou quer trabalhar comigo?',
      staticSiteNote:
        'Este site estático abre seu cliente de e-mail para enviar a mensagem.',
      name: 'Nome',
      email: 'E-mail',
      message: 'Mensagem',
      namePlaceholder: 'Seu Nome',
      emailPlaceholder: 'seu.email@exemplo.com',
      messagePlaceholder: 'Conte como posso ajudar',
      sending: 'Enviando...',
      sendMessage: 'Enviar Mensagem',
      preferDirectEmail: 'Prefere e-mail direto?',
      toastSuccessTitle: 'Mensagem enviada!',
      toastSuccessDescription:
        'Seu cliente de e-mail deve abrir em instantes para enviar a mensagem.',
      toastErrorTitle: 'Algo deu errado.',
      toastErrorDescription: 'Houve um problema com sua solicitação.',
      validation: {
        nameMin: 'O nome deve ter pelo menos 2 caracteres.',
        emailInvalid: 'Endereço de e-mail inválido.',
        messageMin: 'A mensagem deve ter pelo menos 10 caracteres.',
      },
    },
    footer: {
      rightsReserved: 'Todos os direitos reservados.',
      easterEgg: 'Yeah, Science!',
      animations: 'Animações',
    },
    drawer: {
      skillRelatedDescription: 'Projetos e experiências relacionados a',
      projectDetails: 'Detalhes do Projeto',
      client: 'Cliente',
      when: 'Quando',
      stack: 'Stack',
      methodology: 'Metodologia',
      outcomes: 'Resultados',
      skills: 'Habilidades',
      relatedProjects: 'Projetos Relacionados',
      relatedExperience: 'Experiência Relacionada',
      experienceAt: 'na',
      downloadPostmanCollection: 'Baixar coleção do Postman',
      medallionArchitecture: 'Arquitetura Medallion',
      launchInteractivePlayground: 'Iniciar Demo Interativa',
      interactiveDemoPlayground: 'Demo Interativa Playground',
      interactiveDemoPlaygroundDesc: 'Inicie o aplicativo de aprendizado de RAG interativo diretamente no seu navegador.',
      liveProduct: 'Experiência de Produto ao Vivo',
      liveProductDesc: 'Abra a demo publicada e explore o fluxo de estimativa RPA diretamente no navegador.',
      viewSource: 'Ver Código no GitHub',
    },
    tour: {
      prev: 'Anterior',
      next: 'Próximo',
      finish: 'Finalizar',
      steps: {
        intro: {
          title: 'Bem-vindo ao tour técnico!',
          content:
            'Este portfólio foi construído com Next.js (App Router), TypeScript e ShadCN UI. Todos os dados são gerenciados em arquivos JSON simples. Vamos ver como funciona.',
        },
        'skills-grid': {
          title: '1. A tabela periódica de habilidades',
          content:
            'Não é uma imagem estática. É um layout responsivo em CSS Grid onde a posição de cada habilidade é definida no skills.json. Usa Framer Motion para animações e Tailwind CSS para estilização.',
        },
        'deep-linking': {
          title: '2. Deep-linking e estado',
          content:
            'Ao clicar em uma habilidade ou projeto, o hash da URL é atualizado (ex.: #skill=python). Um useEffect escuta as mudanças e abre o painel de detalhes, tornando o estado compartilhável e favoritado.',
        },
        'dynamic-timeline': {
          title: '3. Componente de timeline dinâmico',
          content:
            'A timeline de experiência é gerada dinamicamente a partir de experience.json. Ela usa o componente Accordion do Radix UI (via ShadCN) para seções expansíveis por função.',
        },
        'server-actions': {
          title: '4. Fluxo de contato em site estático',
          content:
            'O formulário de contato monta um link mailto para abrir seu cliente de e-mail com dados pré-preenchidos, funcionando bem em hospedagem estática.',
        },
        'easter-egg': {
          title: '5. Context para diversão',
          content:
            'Clique no ícone de béquer. A animação "science" é gerenciada globalmente com React Context, evitando prop-drilling e mantendo o estado centralizado.',
        },
      },
    },
  },
};
