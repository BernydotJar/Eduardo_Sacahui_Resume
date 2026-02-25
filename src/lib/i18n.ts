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
  };
  header: {
    nav: {
      skills: string;
      migrations: string;
      experience: string;
      caseStudies: string;
      education: string;
    };
    tourTech: string;
    contactMe: string;
  };
  hero: {
    title: string;
    summaryHeading: string;
    summary: string;
    location: string;
    languages: string[];
    downloadCv: string;
    awardsAndCertifications: string;
    contactMe: string;
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
  };
  experience: {
    title: string;
    subtitle: string;
    recentHeading: string;
    earlyHeading: string;
    highlights: string;
    clientProjects: string;
    techUsed: string;
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
    },
    header: {
      nav: {
        skills: 'Skills',
        migrations: 'Migrations',
        experience: 'Experience',
        caseStudies: 'Case Studies',
        education: 'Education',
      },
      tourTech: 'Tour the Tech',
      contactMe: 'Contact Me',
    },
    hero: {
      title: 'AI Solution Architect & Technical Product Owner (Hands-on)',
      summaryHeading: 'Professional Summary',
      summary:
        'Hands-on AI Solution Architect and Technical Product Owner focused on rapid product delivery. I define technical strategy for AI systems, multi-agent orchestration, and enterprise deployments; co-innovate with Product and Engineering teams to convert field insights into roadmap outcomes. I lead end-to-end architecture and development of LLM-powered platforms, Google Workspace integrations, and n8n orchestration under secure-by-design principles (least privilege, backend-owned OAuth, strict JSON validation, and traceability), turning executive vision into demo-ready MVPs and production paths.',
      location: 'Remote — Colombia / Guatemala (AMER)',
      languages: ['English (Default)', 'Spanish', 'Portuguese'],
      downloadCv: 'Download CV',
      awardsAndCertifications: 'AWARDS & CERTIFICATIONS',
      contactMe: 'Contact Me',
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
    },
    experience: {
      title: 'Experience Timeline',
      subtitle: 'A journey through my professional career.',
      recentHeading: 'Recent Experience (2020–Present)',
      earlyHeading: 'Early Career (2014–2020)',
      highlights: 'Highlights',
      clientProjects: 'Client Projects',
      techUsed: 'Tech Used',
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
        "Thanks for reaching out. I'll get back to you soon.",
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
    },
    header: {
      nav: {
        skills: 'Habilidades',
        migrations: 'Migraciones',
        experience: 'Experiencia',
        caseStudies: 'Casos de Estudio',
        education: 'Educación',
      },
      tourTech: 'Recorrido Técnico',
      contactMe: 'Contáctame',
    },
    hero: {
      title: 'Arquitecto de Soluciones AI y Product Owner Técnico (Hands-on)',
      summaryHeading: 'Resumen Profesional',
      summary:
        'Arquitecto de Soluciones AI y Product Owner técnico con enfoque hands-on en entrega rápida de productos. Defino estrategia técnica para sistemas de IA, orquestación multiagente y despliegues enterprise; co-innovo con equipos de Product y Engineering para traducir insights de campo en roadmap accionable. Lidero arquitectura y desarrollo end-to-end de plataformas basadas en LLMs, integraciones Google Workspace y n8n bajo principios de seguridad (least privilege, backend-owned OAuth, trazabilidad y validación estricta de JSON), convirtiendo visión ejecutiva en MVPs demoables con ruta clara a producción.',
      location: 'Remoto — Colombia / Guatemala (AMER)',
      languages: ['Inglés (Predeterminado)', 'Español', 'Portugués'],
      downloadCv: 'Descargar CV',
      awardsAndCertifications: 'PREMIOS Y CERTIFICACIONES',
      contactMe: 'Contáctame',
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
    },
    experience: {
      title: 'Línea de Tiempo Profesional',
      subtitle: 'Un recorrido por mi carrera profesional.',
      recentHeading: 'Experiencia Reciente (2020–Actualidad)',
      earlyHeading: 'Etapa Inicial (2014–2020)',
      highlights: 'Logros',
      clientProjects: 'Proyectos de Cliente',
      techUsed: 'Tecnología Usada',
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
        'Gracias por escribir. Te responderé lo antes posible.',
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
    },
    header: {
      nav: {
        skills: 'Habilidades',
        migrations: 'Migrações',
        experience: 'Experiência',
        caseStudies: 'Estudos de Caso',
        education: 'Educação',
      },
      tourTech: 'Tour Técnico',
      contactMe: 'Contato',
    },
    hero: {
      title: 'Arquiteto de Soluções AI e Product Owner Técnico (Hands-on)',
      summaryHeading: 'Resumo Profissional',
      summary:
        'Arquiteto de Soluções AI e Product Owner técnico com foco hands-on em entrega rápida de produtos. Defino estratégia técnica para sistemas de IA, orquestração multiagente e implantações enterprise; co-inovo com times de Product e Engineering para transformar insights de campo em roadmap acionável. Lidero arquitetura e desenvolvimento end-to-end de plataformas com LLMs, integrações Google Workspace e orquestração n8n com princípios de segurança (least privilege, backend-owned OAuth, rastreabilidade e validação rígida de JSON), convertendo visão executiva em MVPs demonstráveis e caminho claro para produção.',
      location: 'Remoto — Colômbia / Guatemala (AMER)',
      languages: ['Inglês (Padrão)', 'Espanhol', 'Português'],
      downloadCv: 'Baixar CV',
      awardsAndCertifications: 'PRÊMIOS E CERTIFICAÇÕES',
      contactMe: 'Contato',
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
    },
    experience: {
      title: 'Linha do Tempo Profissional',
      subtitle: 'Uma jornada pela minha carreira profissional.',
      recentHeading: 'Experiência Recente (2020–Atual)',
      earlyHeading: 'Início de Carreira (2014–2020)',
      highlights: 'Destaques',
      clientProjects: 'Projetos de Cliente',
      techUsed: 'Tecnologias Utilizadas',
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
        'Obrigado pelo contato. Vou responder em breve.',
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
