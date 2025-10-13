
import { experience } from '@/lib/data';
import TimelineItem from '@/components/ui/TimelineItem';
import { Accordion } from '@/components/ui/accordion';

const currentExperience = experience.filter(exp => parseInt(exp.when.split('–')[0]) >= 2020 || exp.when.includes('Present'));
const earlyExperience = experience.filter(exp => parseInt(exp.when.split('–')[0]) < 2020);


const Experience = () => {
  return (
    <section id="experience" className="container">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Experience Timeline</h2>
        <p className="mt-4 text-lg text-muted-foreground">A journey through my professional career.</p>
      </div>
      <div className="mt-12 max-w-4xl mx-auto space-y-12">
        <div>
            <h3 className="text-2xl font-semibold mb-6 text-center text-primary">Recent Experience (2020–Present)</h3>
            <Accordion type="single" collapsible className="w-full">
                {currentExperience.map((exp, index) => (
                    <TimelineItem key={index} experience={exp} />
                ))}
            </Accordion>
        </div>
        <div>
            <h3 className="text-2xl font-semibold mb-6 text-center text-primary">Early Career (2014–2018)</h3>
            <Accordion type="single" collapsible className="w-full">
                {earlyExperience.map((exp, index) => (
                    <TimelineItem key={index} experience={exp} />
                ))}
            </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Experience;
