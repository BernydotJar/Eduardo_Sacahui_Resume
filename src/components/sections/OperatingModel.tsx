"use client";

import { useLanguage } from '@/components/context/LanguageContext';

const OperatingModel = () => {
  const { dict } = useLanguage();

  return (
    <section id="approach" className="relative bg-background pixel-grid py-20 border-b border-border/60">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.02),transparent_70%)]" />

      <div className="container relative z-10">
        <div className="max-w-3xl">
          <p className="font-code text-xs font-bold uppercase tracking-[0.2em] text-primary">{dict.approach.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{dict.approach.title}</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">{dict.approach.subtitle}</p>
        </div>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dict.approach.stages.map((stage, index) => (
            <li key={stage.name} className="glass-panel relative rounded-xl border border-white/5 bg-zinc-950/40 p-5 transition-all hover:border-primary/30 group">
              {/* Subtle background grid on hover */}
              <div className="absolute inset-0 pixel-grid pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity" />

              <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-3">
                <span className="font-code text-[10px] font-bold text-primary">[STAGE.0{index + 1}]</span>
                <span className="font-code text-[8px] text-muted-foreground/30">[OP_MD_SYS]</span>
              </div>
              <h3 className="text-lg font-bold text-foreground tracking-tight">{stage.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground/80">{stage.responsibilities}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default OperatingModel;
