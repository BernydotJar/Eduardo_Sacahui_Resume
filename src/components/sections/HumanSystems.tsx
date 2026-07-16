"use client";

import { Brain, GraduationCap, Hand, RefreshCw, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/components/context/LanguageContext';

const themeIcons = [ShieldCheck, Brain, RefreshCw, Hand];

const HumanSystems = () => {
  const { dict } = useLanguage();

  return (
    <section id="human-systems" className="relative overflow-hidden bg-background pixel-grid py-20 border-b border-border/60">
      {/* Background cyber glows */}
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03),transparent_70%)]" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(245,166,35,0.02),transparent_70%)]" />

      <div className="container relative z-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="font-code text-xs font-bold uppercase tracking-[0.2em] text-primary">{dict.humanSystems.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{dict.humanSystems.title}</h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground">{dict.humanSystems.summary}</p>
          
          {/* Framed Degree Banner */}
          <div className="mt-8 rounded-lg border border-hazmat/20 bg-hazmat/[0.02] p-4 relative overflow-hidden blueprint-cross blueprint-cross-tl blueprint-cross-tr blueprint-cross-bl blueprint-cross-br">
            <div className="flex gap-3 relative z-10">
              <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-hazmat" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-foreground tracking-tight">{dict.humanSystems.degreeLabel}</p>
                <p className="mt-1 text-xs text-muted-foreground/80 font-code">[EXPECTED_2026 // FRANKLIN_UNI]</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="grid gap-4 sm:grid-cols-2">
            {dict.humanSystems.themes.map((theme, index) => {
              const Icon = themeIcons[index];
              return (
                <article key={theme.title} className="glass-panel relative rounded-xl border border-white/5 bg-zinc-950/40 p-5 transition-all hover:border-primary/30 group">
                  <div className="absolute inset-0 pixel-grid pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity" />
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="mt-4 font-bold text-foreground tracking-tight">{theme.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground/80">{theme.description}</p>
                </article>
              );
            })}
          </div>
          <p className="mt-5 border-l border-primary/40 pl-4 font-code text-[10px] uppercase tracking-wider text-muted-foreground/40 leading-relaxed select-none">{dict.humanSystems.boundary}</p>
        </div>
      </div>
    </section>
  );
};

export default HumanSystems;
