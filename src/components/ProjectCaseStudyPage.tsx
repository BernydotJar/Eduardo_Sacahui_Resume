"use client";

import type { ReactNode } from 'react';
import { ArrowLeft, ArrowUpRight, CheckCircle2, ExternalLink, Github, ShieldCheck } from 'lucide-react';
import type { Project } from '@/lib/types';
import { useLanguage } from '@/components/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { withBasePath } from '@/lib/site';

const ListSection = ({ title, items }: { title: string; items?: string[] }) => {
  if (!items?.length) return null;
  return (
    <section className="rounded-2xl border border-border/70 bg-card/55 p-5 sm:p-7">
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

const Field = ({ label, children }: { label: string; children?: ReactNode }) => {
  if (!children) return null;
  return (
    <div>
      <dt className="font-code text-[10px] font-bold uppercase tracking-[0.14em] text-primary">{label}</dt>
      <dd className="mt-2 text-sm leading-6 text-foreground/85">{children}</dd>
    </div>
  );
};

export default function ProjectCaseStudyPage({ project }: { project: Project }) {
  const { dict } = useLanguage();
  const limitations = project.caseStudy?.knownLimitations;
  const outcomes = [...(project.businessOutcome ?? []), ...(project.technicalOutcome ?? []), ...(project.outcomes ?? [])];

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-secondary/35">
        <div className="container py-5">
          <a href={withBasePath('/#products')} className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {dict.projectPage.back}
          </a>
        </div>
      </header>

      <article>
        <section className="relative overflow-hidden border-b border-border/60 py-14 sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,hsl(var(--primary)/0.16),transparent_38%),radial-gradient(circle_at_85%_20%,rgba(34,211,238,0.1),transparent_32%)]" />
          <div className="container relative grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-start">
            <div>
              <div className="flex flex-wrap gap-2">
                {project.maturity && <Badge className="border border-primary/25 bg-primary/10 text-primary hover:bg-primary/10">{project.maturity}</Badge>}
                {project.industry && <Badge variant="outline">{project.industry}</Badge>}
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{project.title}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{project.summary}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {project.liveUrl && (
                  <Button asChild size="lg">
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      {dict.projectPage.live}<ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                )}
                {project.sourceUrl && (
                  <Button asChild size="lg" variant="outline">
                    <a href={project.sourceUrl} target="_blank" rel="noreferrer">
                      <Github className="mr-2 h-4 w-4" aria-hidden="true" />{dict.projectPage.source}
                    </a>
                  </Button>
                )}
              </div>
            </div>

            <dl className="grid gap-5 rounded-2xl border border-primary/20 bg-card/75 p-6 shadow-xl">
              <Field label={dict.projectPage.maturity}>{project.maturity}</Field>
              <Field label={dict.projectPage.users}>{project.primaryUsers?.join(' · ')}</Field>
              <Field label={dict.projectPage.stakeholders}>{project.buyerOrStakeholder?.join(' · ')}</Field>
              <Field label={dict.projectPage.role}>{project.myRole}</Field>
              <Field label={dict.projectPage.team}>{project.teamContext}</Field>
            </dl>
          </div>
        </section>

        <div className="container grid gap-8 py-12 lg:grid-cols-[0.72fr_1.28fr] lg:py-16">
          <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
            {project.customerProblem && (
              <section className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.05] p-6">
                <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-cyan-200">{dict.projectPage.problem}</h2>
                <p className="mt-3 text-sm leading-6 text-foreground/85">{project.customerProblem}</p>
              </section>
            )}
            {project.productSurface?.length && (
              <section className="rounded-2xl border border-border/70 bg-card/55 p-6">
                <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-primary">{dict.projectPage.surface}</h2>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {project.productSurface.map((surface) => <li key={surface}>• {surface}</li>)}
                </ul>
              </section>
            )}
            {project.architectureSummary && (
              <section className="rounded-2xl border border-border/70 bg-card/55 p-6">
                <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-primary">{dict.projectPage.architecture}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.architectureSummary}</p>
              </section>
            )}
          </aside>

          <div className="space-y-6">
            <ListSection title={dict.projectPage.discovery} items={project.discovery} />
            <ListSection title={dict.projectPage.decisions} items={project.productDecisions} />
            <ListSection title={dict.projectPage.tradeoffs} items={project.tradeoffs} />
            <ListSection title={dict.projectPage.aiBehavior} items={project.aiBehavior} />
            <ListSection title={dict.projectPage.evaluation} items={project.evaluation} />
            <ListSection title={dict.projectPage.safety} items={project.safetyAndHumanControl} />
            <ListSection title={dict.projectPage.delivery} items={project.delivery} />
            <ListSection title={dict.projectPage.feedback} items={project.adoptionOrFeedback} />
            <ListSection title={dict.projectPage.outcomes} items={Array.from(new Set(outcomes))} />

            {project.evidence?.length && (
              <section className="rounded-2xl border border-primary/25 bg-primary/[0.05] p-5 sm:p-7">
                <h2 className="flex items-center gap-2 text-xl font-bold"><ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />{dict.projectPage.evidence}</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {project.evidence.filter((item) => item.publiclySafe).map((item) => {
                    const href = item.href?.startsWith('/') ? withBasePath(item.href) : item.href;
                    return href ? (
                      <a key={item.label} href={href} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl border border-border/70 bg-background/70 p-4 text-sm font-semibold hover:border-primary/45">
                        {item.label}<ArrowUpRight className="h-4 w-4 text-primary" aria-hidden="true" />
                      </a>
                    ) : (
                      <div key={item.label} className="rounded-xl border border-border/70 bg-background/70 p-4 text-sm font-semibold">{item.label}</div>
                    );
                  })}
                </div>
              </section>
            )}

            <ListSection title={dict.projectPage.limitations} items={limitations} />
            {project.nextStage && (
              <section className="rounded-2xl border border-hazmat/25 bg-hazmat/[0.04] p-5 sm:p-7">
                <h2 className="text-xl font-bold text-hazmat">{dict.projectPage.nextStage}</h2>
                <p className="mt-3 text-sm leading-6 text-foreground/85">{project.nextStage}</p>
              </section>
            )}

            {(project.caseStudy?.statusMatrix?.length || project.caseStudy?.implementationHighlights?.length) && (
              <details className="rounded-2xl border border-border/70 bg-card/55 p-5 sm:p-7">
                <summary className="cursor-pointer font-semibold text-foreground">{dict.projectPage.technicalDetails}</summary>
                <div className="mt-6 space-y-6">
                  {project.caseStudy.implementationHighlights?.length && <ListSection title={dict.projectPage.technicalDetails} items={project.caseStudy.implementationHighlights} />}
                  {project.caseStudy.statusMatrix?.length && (
                    <div className="overflow-x-auto rounded-xl border border-border/70">
                      <table className="min-w-[720px] text-left text-xs">
                        <thead className="bg-primary/10 text-primary"><tr><th className="p-3">{dict.projectPage.table.key}</th><th className="p-3">{dict.projectPage.table.functionality}</th><th className="p-3">{dict.projectPage.table.status}</th><th className="p-3">{dict.projectPage.table.current}</th><th className="p-3">{dict.projectPage.table.next}</th></tr></thead>
                        <tbody>{project.caseStudy.statusMatrix.map((item) => <tr key={item.key} className="border-t border-border/60 align-top"><td className="p-3 font-code text-primary">{item.key}</td><td className="p-3 font-semibold">{item.functionality}</td><td className="p-3">{item.status}</td><td className="p-3 text-muted-foreground">{item.currentState}</td><td className="p-3 text-muted-foreground">{item.next}</td></tr>)}</tbody>
                      </table>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      </article>
    </main>
  );
}
