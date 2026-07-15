"use client";

import { ArrowDown } from 'lucide-react';
import { useLanguage } from '@/components/context/LanguageContext';

const OperatingModel = () => {
  const { dict } = useLanguage();

  return (
    <section id="approach" className="border-y border-border/60 bg-secondary/45">
      <div className="container">
        <div className="max-w-3xl">
          <p className="font-code text-xs font-bold uppercase tracking-[0.18em] text-primary">{dict.approach.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{dict.approach.title}</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">{dict.approach.subtitle}</p>
        </div>

        <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {dict.approach.stages.map((stage, index) => (
            <li key={stage.name} className="relative rounded-xl border border-border/70 bg-background/65 p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-code text-xs font-bold text-primary">0{index + 1}</span>
                {index < dict.approach.stages.length - 1 && <ArrowDown className="h-4 w-4 text-primary/40 lg:-rotate-90" aria-hidden="true" />}
              </div>
              <h3 className="text-lg font-bold text-foreground">{stage.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{stage.responsibilities}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default OperatingModel;
