

import type { Experience } from '@/lib/types';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { skills, projects } from '@/lib/data';
import Link from 'next/link';

interface TimelineItemProps {
  experience: Experience;
}

const TimelineItem = ({ experience }: TimelineItemProps) => {
    
    const techUsed = skills.filter(skill => experience.skills.includes(skill.id));
    const relatedProjects = experience.projects ? projects.filter(p => experience.projects?.includes(p.id)) : [];
    const role = experience.display_role_override || experience.role;
    const company = experience.display_company_override || experience.company;
    
  return (
    <AccordionItem value={experience.company + experience.role}>
        <AccordionTrigger>
            <div className='flex justify-between items-center w-full pr-4'>
                <div className='text-left'>
                    <h3 className="text-lg font-semibold">{role}</h3>
                    <p className="text-sm text-muted-foreground">{company}</p>
                </div>
                <p className="text-sm text-muted-foreground font-mono shrink-0">{experience.when}</p>
            </div>
        </AccordionTrigger>
        <AccordionContent>
           <div className="pl-4 border-l-2 border-primary ml-2 space-y-6">
                <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Highlights:</h4>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        {experience.highlights.map((highlight, index) => (
                            <li key={index} dangerouslySetInnerHTML={{__html: highlight.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground/90">$1</strong>')}}></li>
                        ))}
                    </ul>
                </div>

                {relatedProjects.length > 0 && (
                     <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2">Client Projects:</h4>
                        <div className="flex flex-wrap gap-2">
                            {relatedProjects.map(project => (
                                <Link key={project.id} href={`#project=${project.id}`} scroll={false}>
                                    <Badge variant="outline" className="cursor-pointer hover:bg-accent/20">{project.title.split('—')[0].trim()}</Badge>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                <div>
                    <p className="text-sm font-semibold text-foreground mb-2">Tech Used:</p>
                    <div className="flex flex-wrap gap-2">
                        {techUsed.map(skill => (
                           <Link key={skill.id} href={`#skill=${skill.id}`} scroll={false}>
                             <Badge variant="secondary" className="cursor-pointer hover:bg-accent/20">{skill.name}</Badge>
                           </Link>
                        ))}
                    </div>
                </div>
           </div>
        </AccordionContent>
    </AccordionItem>
  );
};

export default TimelineItem;
