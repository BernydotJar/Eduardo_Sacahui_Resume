export interface Skill {
  id: string;
  symbol: string;
  name: string;
  level: string;
  stable: boolean;
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  skills: string[];
  stack: string;
  summary: string;
  outcomes?: string[];
}

export interface Experience {
  company: string;
  role: string;
  when: string;
  highlights: string[];
  skills: string[];
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
