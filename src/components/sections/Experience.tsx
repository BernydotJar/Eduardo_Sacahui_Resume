"use client";

import { BriefcaseBusiness, Network } from 'lucide-react';
import { experience } from '@/lib/data';
import TimelineItem from '@/components/ui/TimelineItem';
import { Accordion } from '@/components/ui/accordion';
import { useLanguage } from '@/components/context/LanguageContext';

const engagementCompanies = new Set([
  'Credito Directo (Argentina)',
  'Accounting Models / GST Directo',
  'Haceb (via LCH Consulting)',
  'Fragomen',
]);

const byNewest = (a: (typeof experience)[number], b: (typeof experience)[number]) =>
  Number.parseInt(b.when.split('–')[0], 10) - Number.parseInt(a.when.split('–')[0], 10);

const leadershipRoles = experience.filter((item) => !engagementCompanies.has(item.company)).sort(byNewest);
const selectedEngagements = experience.filter((item) => engagementCompanies.has(item.company)).sort(byNewest);

const Experience = () => {
  const { dict } = useLanguage();

  return (
    <>
      <section id="leadership" className="bg-background">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
              <Network className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">{dict.experience.leadershipTitle}</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{dict.experience.leadershipSubtitle}</p>
          </div>
          <div className="mx-auto mt-10 max-w-4xl">
            <Accordion type="single" collapsible className="w-full">
              {leadershipRoles.map((item) => (
                <TimelineItem key={item.company + item.role + item.when} experience={item} />
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section id="engagements" className="border-y border-border/60 bg-secondary/45">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-200">
              <BriefcaseBusiness className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">{dict.experience.engagementsTitle}</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{dict.experience.engagementsSubtitle}</p>
            <p className="mt-4 rounded-lg border border-border/70 bg-background/60 p-4 text-xs leading-5 text-muted-foreground">{dict.experience.overlapNote}</p>
          </div>
          <div className="mx-auto mt-10 max-w-4xl">
            <Accordion type="single" collapsible className="w-full">
              {selectedEngagements.map((item) => (
                <TimelineItem key={item.company + item.role + item.when} experience={item} />
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
};

export default Experience;
