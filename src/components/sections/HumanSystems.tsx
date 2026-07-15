"use client";

import { Brain, GraduationCap, Hand, RefreshCw, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/components/context/LanguageContext';

const themeIcons = [ShieldCheck, Brain, RefreshCw, Hand];

const HumanSystems = () => {
  const { dict } = useLanguage();

  return (
    <section id="human-systems" className="relative overflow-hidden bg-secondary/45">
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="container relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="font-code text-xs font-bold uppercase tracking-[0.18em] text-primary">{dict.humanSystems.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{dict.humanSystems.title}</h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground">{dict.humanSystems.summary}</p>
          <div className="mt-7 rounded-xl border border-hazmat/25 bg-hazmat/[0.05] p-4">
            <div className="flex gap-3">
              <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-hazmat" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-foreground">{dict.humanSystems.degreeLabel}</p>
                <p className="mt-1 text-xs text-muted-foreground">{dict.humanSystems.degreeStatus}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="grid gap-4 sm:grid-cols-2">
            {dict.humanSystems.themes.map((theme, index) => {
              const Icon = themeIcons[index];
              return (
                <article key={theme.title} className="rounded-xl border border-border/70 bg-background/65 p-5">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="mt-4 font-bold text-foreground">{theme.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{theme.description}</p>
                </article>
              );
            })}
          </div>
          <p className="mt-5 border-l-2 border-primary/50 pl-4 text-xs leading-5 text-muted-foreground">{dict.humanSystems.boundary}</p>
        </div>
      </div>
    </section>
  );
};

export default HumanSystems;
