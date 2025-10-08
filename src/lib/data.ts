import skillsData from '@/data/skills.json';
import projectsData from '@/data/projects.json';
import experienceData from '@/data/experience.json';
import educationData from '@/data/education.json';
import certificationsData from '@/data/certifications.json';
import awardsData from '@/data/awards.json';

import type { Skill, Project, Experience, Education, Award } from './types';

export const skills: Skill[] = skillsData;
export const projects: Project[] = projectsData;
export const experience: Experience[] = experienceData;
export const education: Education[] = educationData;
export const certifications: string[] = certificationsData;
export const awards: Award[] = awardsData;
