

export interface Skill {
  id: string;
  symbol: string;
  name: string;
  level: string;
  stable: boolean;
  tags: string[];
  row: number;
  col: number;
}

export interface Project {
  id: string;
  title: string;
  skills: string[];
  stack?: string;
  summary: string;
  outcomes?: string[];
  when?: string;
  client?: string;
  methodology?: string;
  aliases?: string[];
  liveUrl?: string;
  sourceUrl?: string;
  category?: 'customer-ai-product' | 'ai-platform' | 'enterprise-transformation';
  maturity?: string;
  industry?: string;
  primaryUsers?: string[];
  buyerOrStakeholder?: string[];
  customerProblem?: string;
  productSurface?: string[];
  myRole?: string;
  teamContext?: string;
  discovery?: string[];
  productDecisions?: string[];
  tradeoffs?: string[];
  architectureSummary?: string;
  aiBehavior?: string[];
  evaluation?: string[];
  safetyAndHumanControl?: string[];
  delivery?: string[];
  adoptionOrFeedback?: string[];
  businessOutcome?: string[];
  technicalOutcome?: string[];
  evidence?: ProjectEvidence[];
  nextStage?: string;
  caseStudy?: ProjectCaseStudy;
}

export interface ProjectEvidence {
  label: string;
  href?: string;
  kind: 'live-demo' | 'source' | 'repository' | 'portfolio-record' | 'artifact';
  publiclySafe: boolean;
}

export interface ProjectCaseStudyStatus {
  key: string;
  functionality: string;
  status: string;
  currentState: string;
  next: string;
}

export interface ProjectCaseStudy {
  useCase: string[];
  statusMatrix?: ProjectCaseStudyStatus[];
  implementationPlan?: string[];
  implementationHighlights?: string[];
  localCommands?: string[];
  testChecklist?: string[];
  apiChecks?: string[];
  validationProof?: string[];
  knownLimitations?: string[];
}

export interface Experience {
  company: string;
  role: string;
  when: string;
  highlights: string[];
  metrics?: string[];
  skills: string[];
  projects?: string[];
  display_role_override?: string;
  display_company_override?: string;
  notes?: string;
}

export interface Education {
    id: string;
    title: string;
    school: string;
    status: string;
}

export interface Award {
    title: string;
    date: string;
}
