import { ArrowDownRight, Download, Layers3, Route, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/context/LanguageContext';
import { withBasePath } from '@/lib/site';
import { CanvasBackground } from '@/components/ui/CanvasBackground';

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
    <section id="hero" className="relative overflow-hidden border-b border-border/60 bg-background pixel-grid">
      {/* Immersive Particle Canvas */}
      <CanvasBackground />

      {/* Cybernetic Accent Glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.06),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(255,177,238,0.04),transparent_50%)]" />

      {/* Horizontal and Vertical blueprint lines */}
      <div className="pointer-events-none absolute left-12 top-0 h-full w-px bg-border/20 hidden md:block" />
      <div className="pointer-events-none absolute right-12 top-0 h-full w-px bg-border/20 hidden md:block" />

      <div className="container relative z-10 grid min-h-[calc(100svh-3.5rem)] items-center gap-10 py-14 lg:grid-cols-[1.08fr_0.92fr] lg:py-20">
        <div className="relative py-4">
          {/* Custom Coordinate Tag */}
          <div className="absolute top-0 right-0 font-code text-[9px] text-muted-foreground/40 select-none hidden md:block">
            [SYS.LOC_01 // GRD_AMER]
          </div>

          <div className="mb-7 flex items-center gap-3">
            <HeroElementTile number="99" symbol="Ed" />
            <div>
              <p className="font-semibold text-foreground tracking-tight">Eduardo Sacahui</p>
              <p className="font-code text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{dict.hero.location}</p>
            </div>
          </div>

          <p className="font-code text-xs font-bold uppercase tracking-[0.2em] text-primary">
            {dict.hero.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.06] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6.5xl">
            {dict.hero.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
            {dict.hero.summary}
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground/80 sm:text-base border-l border-primary/20 pl-4">
            {dict.hero.differentiator}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {pillars.map(({ label, icon: Icon }) => (
              <span key={label} className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-foreground/90 backdrop-blur-sm transition-colors hover:border-primary/30">
                <Icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button size="lg" asChild className="justify-center shadow-[0_0_24px_rgba(16,185,129,0.25)] border border-primary hover:bg-primary/95 transition-all">
              <a href="#products">
                {dict.hero.exploreProducts}
                <ArrowDownRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="justify-center glass-panel hover:bg-white/5 border-white/10">
              <a href="#leadership">{dict.hero.viewLeadership}</a>
            </Button>
            <Button size="lg" variant="ghost" asChild className="justify-center text-muted-foreground hover:text-foreground hover:bg-transparent">
              <a href={withBasePath('/Eduardo_Sacahui_Resume.pdf')} download>
                <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                {dict.hero.downloadResume}
              </a>
            </Button>
          </div>
        </div>

        <aside className="relative mx-auto w-full max-w-xl lg:max-w-none" aria-label={dict.hero.proofLabel}>
          <div className="absolute -inset-4 rounded-3xl bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.06),transparent_60%)] blur-xl" />
          
          {/* Framed Console Panel with corner crosshairs */}
          <div className="glass-panel relative overflow-hidden rounded-xl border border-white/10 p-5 shadow-3xl sm:p-7 blueprint-cross blueprint-cross-tl blueprint-cross-tr blueprint-cross-bl blueprint-cross-br">
            {/* Fine Grid background for the card */}
            <div className="absolute inset-0 pixel-grid pointer-events-none opacity-40" />

            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="font-code text-xs font-bold uppercase tracking-[0.2em] text-primary">{dict.hero.proofLabel}</p>
                <p className="font-code text-[8px] text-muted-foreground/50 mt-0.5">[SYS.CORE_METRICS // STATUS_OK]</p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] text-emerald-400 font-code font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                {dict.hero.proofStatus}
              </span>
            </div>

            <ol className="relative z-10 mt-5 space-y-3">
              {dict.hero.proofItems.map((item, index) => (
                <li key={item} className="grid grid-cols-[2.25rem_1fr] items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3.5 transition-all hover:bg-white/[0.04] hover:border-white/10">
                  <span className="flex h-9 w-9 items-center justify-center rounded border border-white/10 bg-white/[0.02] font-code text-xs font-bold text-muted-foreground">
                    0{index + 1}
                  </span>
                  <span className="text-sm font-medium leading-5 text-foreground/90">{item}</span>
                </li>
              ))}
            </ol>

            <div className="relative z-10 mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-5 text-center font-code">
              <div className="border-r border-white/5">
                <strong className="block text-lg font-bold text-primary tracking-tight">AI</strong>
                <span className="text-[9px] text-muted-foreground uppercase tracking-wider">{dict.hero.proofTags.products}</span>
              </div>
              <div className="border-r border-white/5">
                <strong className="block text-lg font-bold text-accent tracking-tight">HITL</strong>
                <span className="text-[9px] text-muted-foreground uppercase tracking-wider">{dict.hero.proofTags.control}</span>
              </div>
              <div>
                <strong className="block text-lg font-bold text-hazmat tracking-tight">0→1</strong>
                <span className="text-[9px] text-muted-foreground uppercase tracking-wider">{dict.hero.proofTags.delivery}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Hero;
