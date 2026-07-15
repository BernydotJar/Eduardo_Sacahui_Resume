"use client";

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

  return (
    <article className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card/75 transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_24px_70px_-38px_hsl(var(--primary)/0.7)] ${featured ? 'border-primary/30' : 'border-border/70'}`}>
      <div className={`h-1 w-full ${featured ? 'bg-gradient-to-r from-primary via-cyan-300 to-primary' : 'bg-gradient-to-r from-primary/50 to-transparent'}`} />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-2.5 py-1 font-code text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            {copy.maturity}
          </span>
          {project.category === 'customer-ai-product' ? <Bot className="h-5 w-5 text-cyan-200" aria-hidden="true" /> : <Boxes className="h-5 w-5 text-primary" aria-hidden="true" />}
        </div>

        <h3 className="text-xl font-bold leading-tight text-foreground sm:text-2xl">{project.title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy.summary}</p>

        <dl className="mt-6 space-y-4 border-t border-border/60 pt-5">
          <div>
            <dt className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-foreground/60">
              <Users className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              {dict.portfolio.labels.users}
            </dt>
            <dd className="mt-1.5 text-sm leading-5 text-foreground/85">{copy.users}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-foreground/60">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              {dict.portfolio.labels.problem}
            </dt>
            <dd className="mt-1.5 text-sm leading-5 text-foreground/85">{copy.problem}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-foreground/60">{dict.portfolio.labels.role}</dt>
            <dd className="mt-1.5 text-sm leading-5 text-foreground/85">{copy.role}</dd>
          </div>
        </dl>

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          <Button onClick={onOpen} size="sm" className="group/button flex-1">
            {dict.portfolio.labels.details}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-0.5" aria-hidden="true" />
          </Button>
          {evidenceHref && (
            <Button asChild size="sm" variant="outline" aria-label={`${dict.portfolio.labels.proof}: ${project.title}`}>
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
      <section id="products" className="relative bg-secondary/65">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="font-code text-xs font-bold uppercase tracking-[0.18em] text-primary">{dict.portfolio.impactEyebrow}</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{dict.portfolio.impactTitle}</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">{dict.portfolio.impactSubtitle}</p>
            </div>
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {impactItems.map((item) => (
                <div key={item.label} className="rounded-xl border border-primary/20 bg-background/70 p-4">
                  <dd className="font-code text-2xl font-bold text-primary">{item.value}</dd>
                  <dt className="mt-1 text-xs font-semibold text-foreground">{item.label}</dt>
                  <p className="mt-1 text-[10px] leading-4 text-muted-foreground">{item.context}</p>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-16">
            <div className="max-w-3xl">
              <p className="font-code text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">{dict.portfolio.customerEyebrow}</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{dict.portfolio.customerTitle}</h2>
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

      <section id="platforms" className="relative bg-background">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.1),transparent_70%)]" />
        <div className="container relative">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 font-code text-xs font-bold uppercase tracking-[0.18em] text-primary">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              {dict.portfolio.platformEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{dict.portfolio.platformTitle}</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{dict.portfolio.platformSubtitle}</p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {platformProducts.map(({ id, copyKey }) => {
              const project = getProject(id);
              return project ? <ProductCard key={id} project={project} copyKey={copyKey} onOpen={() => onCardClick(id)} /> : null;
            })}
          </div>
          <div className="mt-8 flex justify-end">
            <a href="#approach" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80">
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
