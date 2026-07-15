"use client";

import { ArrowDownRight, Download, Layers3, Route, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/context/LanguageContext';
import { withBasePath } from '@/lib/site';

const HeroElementTile = ({ number, symbol }: { number: string; symbol: string }) => (
  <span className="element-tile h-9 w-9 text-sm font-bold" aria-hidden="true">
    <span className="element-tile-number text-[8px]">{number}</span>
    {symbol}
  </span>
);

const Hero = () => {
  const { dict } = useLanguage();
  const pillars = [
    { label: dict.hero.pillars.products, icon: Sparkles },
    { label: dict.hero.pillars.platforms, icon: Layers3 },
    { label: dict.hero.pillars.transformation, icon: Route },
  ];

  return (
    <section id="hero" className="relative overflow-hidden border-b border-border/50 bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,hsl(var(--primary)/0.16),transparent_32%),radial-gradient(circle_at_82%_20%,rgba(34,211,238,0.1),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(hsl(var(--foreground))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground))_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="container relative z-10 grid min-h-[calc(100svh-3.5rem)] items-center gap-10 py-14 lg:grid-cols-[1.08fr_0.92fr] lg:py-20">
        <div>
          <div className="mb-7 flex items-center gap-3">
            <HeroElementTile number="99" symbol="Ed" />
            <div>
              <p className="font-semibold text-foreground">Eduardo Sacahui</p>
              <p className="font-code text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{dict.hero.location}</p>
            </div>
          </div>

          <p className="font-code text-xs font-bold uppercase tracking-[0.18em] text-primary">
            {dict.hero.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.04] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
            {dict.hero.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground/85 sm:text-xl">
            {dict.hero.summary}
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            {dict.hero.differentiator}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {pillars.map(({ label, icon: Icon }) => (
              <span key={label} className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.07] px-3 py-1.5 text-xs font-semibold text-foreground">
                <Icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button size="lg" asChild className="justify-center shadow-[0_0_28px_hsl(var(--primary)/0.18)]">
              <a href="#products">
                {dict.hero.exploreProducts}
                <ArrowDownRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="justify-center">
              <a href="#leadership">{dict.hero.viewLeadership}</a>
            </Button>
            <Button size="lg" variant="ghost" asChild className="justify-center text-muted-foreground hover:text-foreground">
              <a href={withBasePath('/Eduardo_Sacahui_Resume.pdf')} download>
                <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                {dict.hero.downloadResume}
              </a>
            </Button>
          </div>
        </div>

        <aside className="relative mx-auto w-full max-w-xl lg:max-w-none" aria-label={dict.hero.proofLabel}>
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-cyan-300/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-card/85 p-5 shadow-2xl backdrop-blur sm:p-7">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <p className="font-code text-xs font-bold uppercase tracking-[0.18em] text-primary">{dict.hero.proofLabel}</p>
              <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.8)]" aria-hidden="true" />
                {dict.hero.proofStatus}
              </span>
            </div>
            <ol className="mt-5 space-y-3">
              {dict.hero.proofItems.map((item, index) => (
                <li key={item} className="grid grid-cols-[2.25rem_1fr] items-center gap-3 rounded-xl border border-border/60 bg-background/55 p-3.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 font-code text-xs font-bold text-primary">
                    0{index + 1}
                  </span>
                  <span className="text-sm font-medium leading-5 text-foreground/90">{item}</span>
                </li>
              ))}
            </ol>
            <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border/60 pt-5 text-center">
              <div><strong className="block font-code text-lg text-primary">AI</strong><span className="text-[10px] text-muted-foreground">{dict.hero.proofTags.products}</span></div>
              <div><strong className="block font-code text-lg text-cyan-200">HITL</strong><span className="text-[10px] text-muted-foreground">{dict.hero.proofTags.control}</span></div>
              <div><strong className="block font-code text-lg text-hazmat">0→1</strong><span className="text-[10px] text-muted-foreground">{dict.hero.proofTags.delivery}</span></div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Hero;
