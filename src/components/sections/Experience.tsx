import { experience } from '@/lib/data';
import TimelineItem from '@/components/ui/TimelineItem';
import { Accordion } from '@/components/ui/accordion';

const Experience = () => {
  return (
    <section id="experience" className="container">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Experience Timeline</h2>
        <p className="mt-4 text-lg text-muted-foreground">A journey through my professional career.</p>
      </div>
      <div className="mt-12 max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
            {experience.map((exp, index) => (
                <TimelineItem key={index} experience={exp} />
            ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Experience;
