"use client";


import { experience } from '@/lib/data';
import TimelineItem from '@/components/ui/TimelineItem';
import { Accordion } from '@/components/ui/accordion';
import { useLanguage } from '@/components/context/LanguageContext';

const currentExperience = experience.filter(exp => (exp.when.includes('Present') || parseInt(exp.when.split('–')[0]) >= 2020));
const earlyExperience = experience.filter(exp => !currentExperience.includes(exp));


const Experience = () => {
  const { dict } = useLanguage();

  return (
    <section id="experience" className="container">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{dict.experience.title}</h2>
        <p className="mt-4 text-lg text-muted-foreground">{dict.experience.subtitle}</p>
      </div>
      <div className="mt-12 max-w-4xl mx-auto space-y-12">
        <div>
            <h3 className="text-2xl font-semibold mb-6 text-center text-primary">{dict.experience.recentHeading}</h3>
            <Accordion type="single" collapsible className="w-full">
                {currentExperience.sort((a, b) => parseInt(b.when.split('–')[0]) - parseInt(a.when.split('–')[0])).map((exp, index) => (
                    <TimelineItem key={index} experience={exp} />
                ))}
            </Accordion>
        </div>
        <div>
            <h3 className="text-2xl font-semibold mb-6 text-center text-primary">{dict.experience.earlyHeading}</h3>
            <Accordion type="single" collapsible className="w-full">
                {earlyExperience.sort((a, b) => parseInt(b.when.split('–')[0]) - parseInt(a.when.split('–')[0])).map((exp, index) => (
                    <TimelineItem key={index} experience={exp} />
                ))}
            </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Experience;

    
