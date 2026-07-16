import { MouseEvent as ReactMouseEvent, useRef } from "react";
import { ArrowRight, ArrowUpRight, Bot, Boxes, ExternalLink, Github, ShieldCheck, Sparkles, Users } from 'lucide-react';
import type { Project } from '@/lib/types';
import { projects } from '@/lib/data';
import { useLanguage } from '@/components/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { withBasePath } from '@/lib/site';

type CardKey = 'rice' | 'laMuni' | 'recruiting' | 'harness' | 'rag' | 'timeEstimator' | 'constructHub';

const customerProducts: Array<{ id: string; copyKey: CardKey }> = [
  { id: 'rice-command-center-demo-mode', copyKey: 'rice' },
  { id: 'la-muni-procedure-workflow-advisor', copyKey: 'laMuni' },
  { id: 'ai-recruiting-copilot', copyKey: 'recruiting' },
];

const platformProducts: Array<{ id: string; copyKey: CardKey }> = [
  { id: 'harness-sdlc-agentic-delivery', copyKey: 'harness' },
  { id: 'rag-made-easy', copyKey: 'rag' },
  { id: 'time-estimator', copyKey: 'timeEstimator' },
  { id: 'constructhub-ai-procurement-platform', copyKey: 'constructHub' },
];

interface CaseStudiesProps {
  onCardClick: (projectId: string) => void;
}

const getProject = (id: string) => projects.find((project) => project.id === id);

const publicEvidenceHref = (project: Project) => {
  const evidence = project.evidence?.find((item) => item.publiclySafe && item.href);
  if (!evidence?.href) return undefined;
  return evidence.href.startsWith('/') ? withBasePath(evidence.href) : evidence.href;
};

const ProductCard = ({ project, copyKey, featured, onOpen }: { project: Project; copyKey: CardKey; featured?: boolean; onOpen: () => void }) => {
  const { dict } = useLanguage();
  const copy = dict.portfolio.cards[copyKey];
  const evidenceHref = publicEvidenceHref(project);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <article 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative flex h-full flex-col overflow-hidden rounded-xl border bg-zinc-950/40 transition-all duration-300 hover:-translate-y-1 glow-card-hover ${featured ? 'border-primary/30 shadow-[0_0_15px_rgba(16,185,129,0.06)]' : 'border-white/5 shadow-md hover:border-primary/20'}`}
    >
      <div className={`h-[2px] w-full ${featured ? 'bg-gradient-to-r from-primary via-accent to-primary' : 'bg-gradient-to-r from-primary/50 to-transparent'}`} />
      
      {/* Grid Pattern inside the card */}
      <div className="absolute inset-0 pixel-grid pointer-events-none opacity-20" />

      <div className="relative z-10 flex flex-grow flex-col p-5 sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded border border-white/10 bg-white/[0.02] px-2.5 py-1 font-code text-[9px] font-bold uppercase tracking-[0.14em] text-foreground/80">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            {copy.maturity}
          </span>
          {project.category === 'customer-ai-product' ? <Bot className="h-5 w-5 text-accent" aria-hidden="true" /> : <Boxes className="h-5 w-5 text-primary" aria-hidden="true" />}
        </div>

        <h3 className="text-xl font-bold leading-tight text-foreground tracking-tight sm:text-2xl">{project.title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy.summary}</p>

        <dl className="mt-6 space-y-4 border-t border-white/5 pt-5 flex-grow">
          <div>
            <dt className="flex items-center gap-2 font-code text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground/50">
              <Users className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              {dict.portfolio.labels.users}
            </dt>
            <dd className="mt-1 text-sm font-medium leading-5 text-foreground/90">{copy.users}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-2 font-code text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground/50">
              <ShieldCheck className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              {dict.portfolio.labels.problem}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-muted-foreground">{copy.problem}</dd>
          </div>
          <div>
            <dt className="font-code text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground/50">{dict.portfolio.labels.role}</dt>
            <dd className="mt-1 text-sm leading-5 text-foreground/80">{copy.role}</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-white/5">
          <Button onClick={onOpen} size="sm" className="group/button flex-1 border border-primary hover:bg-primary/95 transition-all">
            {dict.portfolio.labels.details}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-0.5" aria-hidden="true" />
          </Button>
          {evidenceHref && (
            <Button asChild size="sm" variant="outline" className="glass-panel border-white/10 hover:bg-white/5" aria-label={`${dict.portfolio.labels.proof}: ${project.title}`}>
              <a href={evidenceHref} target="_blank" rel="noreferrer">
                {project.sourceUrl === evidenceHref ? <Github className="h-4 w-4" aria-hidden="true" /> : <ExternalLink className="h-4 w-4" aria-hidden="true" />}
              </a>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};

const CaseStudies = ({ onCardClick }: CaseStudiesProps) => {
  const { dict } = useLanguage();
  const impactItems = Object.values(dict.portfolio.impactItems);

  return (
    <>
      <section id="products" className="relative bg-background pixel-grid border-b border-border/60">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.02),transparent_70%)]" />
        
        <div className="container relative z-10">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end border-b border-white/5 pb-10">
            <div>
              <p className="font-code text-xs font-bold uppercase tracking-[0.2em] text-primary">{dict.portfolio.impactEyebrow}</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{dict.portfolio.impactTitle}</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">{dict.portfolio.impactSubtitle}</p>
            </div>
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {impactItems.map((item) => (
                <div key={item.label} className="rounded-lg border border-white/5 bg-zinc-950/40 p-4 transition-all hover:border-white/10">
                  <dd className="font-code text-2xl font-bold text-primary tracking-tight">{item.value}</dd>
                  <dt className="mt-1 text-xs font-semibold text-foreground">{item.label}</dt>
                  <p className="mt-1 text-[10px] leading-4 text-muted-foreground/60">{item.context}</p>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-16">
            <div className="max-w-3xl">
              <p className="font-code text-xs font-bold uppercase tracking-[0.2em] text-accent">{dict.portfolio.customerEyebrow}</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{dict.portfolio.customerTitle}</h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">{dict.portfolio.customerSubtitle}</p>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {customerProducts.map(({ id, copyKey }, index) => {
                const project = getProject(id);
                return project ? <ProductCard key={id} project={project} copyKey={copyKey} featured={index === 0} onOpen={() => onCardClick(id)} /> : null;
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="platforms" className="relative bg-background pixel-grid border-b border-border/60">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.03),transparent_70%)]" />
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 font-code text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              {dict.portfolio.platformEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{dict.portfolio.platformTitle}</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{dict.portfolio.platformSubtitle}</p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {platformProducts.map(({ id, copyKey }) => {
              const project = getProject(id);
              return project ? <ProductCard key={id} project={project} copyKey={copyKey} onOpen={() => onCardClick(id)} /> : null;
            })}
          </div>
          <div className="mt-10 flex justify-end">
            <a href="#approach" className="inline-flex items-center gap-2 font-code text-xs uppercase tracking-wider text-primary hover:text-primary/80 transition-colors">
              {dict.header.nav.approach}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudies;
