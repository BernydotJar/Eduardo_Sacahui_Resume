

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
  caseStudy?: ProjectCaseStudy;
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
