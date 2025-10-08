import type { Experience } from '@/lib/types';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { skills } from '@/lib/data';

interface TimelineItemProps {
  experience: Experience;
}

const TimelineItem = ({ experience }: TimelineItemProps) => {
    
    const techUsed = skills.filter(skill => experience.skills.includes(skill.id));
    
  return (
    <AccordionItem value={experience.company + experience.role}>
        <AccordionTrigger>
            <div className='flex justify-between items-center w-full pr-4'>
                <div className='text-left'>
                    <h3 className="text-lg font-semibold">{experience.role}</h3>
                    <p className="text-sm text-muted-foreground">{experience.company}</p>
                </div>
                <p className="text-sm text-muted-foreground font-mono shrink-0">{experience.when}</p>
            </div>
        </AccordionTrigger>
        <AccordionContent>
           <div className="pl-4 border-l-2 border-primary ml-2">
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    {experience.highlights.map((highlight, index) => (
                        <li key={index} dangerouslySetInnerHTML={{__html: highlight.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground/90">$1</strong>')}}></li>
                    ))}
                </ul>

                <div className="mt-4">
                    <p className="text-sm font-semibold text-foreground mb-2">Tech Used:</p>
                    <div className="flex flex-wrap gap-2">
                        {techUsed.map(skill => (
                            <Badge key={skill.id} variant="secondary">{skill.name}</Badge>
                        ))}
                    </div>
                </div>
           </div>
        </AccordionContent>
    </AccordionItem>
  );
};

export default TimelineItem;
