"use client";

import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  FileCheck2,
  Gauge,
  Github,
  Radar,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { projects } from '@/lib/data';
import CaseStudyCard from '@/components/ui/CaseStudyCard';
import { useLanguage } from '@/components/context/LanguageContext';
import { Button } from '@/components/ui/button';

const featuredProject = projects.find((project) => project.id === 'time-estimator');

const caseStudyIds = [
  'rice-command-center-demo-mode',
  'constructhub-ai-procurement-platform',
  'harness-sdlc-agentic-delivery',
  'laura-ai-agent-rag-workflow',
  'rag-made-easy',
  'ai-recruiting-copilot',
  'pentaho-to-powerbi',
  'alteryx-to-powerautomate',
  'autotask-to-jira-fabric'
];

const caseStudies = caseStudyIds
  .map((id) => projects.find((project) => project.id === id))
  .filter((project): project is NonNullable<typeof project> => Boolean(project));

interface CaseStudiesProps {
  onCardClick: (projectId: string) => void;
}

const CaseStudies = ({ onCardClick }: CaseStudiesProps) => {
  const { dict } = useLanguage();

  if (!featuredProject && caseStudies.length === 0) return null;

  const capabilityRows = [
    { label: dict.caseStudies.capabilities.discovery, value: 86, icon: Radar },
    { label: dict.caseStudies.capabilities.estimation, value: 100, icon: Gauge },
    { label: dict.caseStudies.capabilities.assumptions, value: 72, icon: ShieldCheck },
    { label: dict.caseStudies.capabilities.reports, value: 94, icon: FileCheck2 },
  ];

  return (
    <section id="casestudies" className="relative overflow-hidden bg-secondary">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.12),transparent_68%)]" />
      <div className="container relative">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{dict.caseStudies.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{dict.caseStudies.subtitle}</p>
        </div>

        {featuredProject && (
          <article className="group relative mt-12 overflow-hidden rounded-2xl border border-cyan-400/25 bg-[#040b0d] shadow-[0_28px_90px_-38px_rgba(34,211,238,0.45)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(34,211,238,0.14),transparent_34%),radial-gradient(circle_at_88%_88%,rgba(34,197,94,0.12),transparent_38%)]" />
            <div className="relative grid lg:grid-cols-[1.02fr_0.98fr]">
              <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 font-code text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-200">
                    <span className="relative flex h-2 w-2" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-60 motion-reduce:animate-none" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
                    </span>
                    {dict.caseStudies.featuredLabel}
                  </span>
                  <span className="font-code text-xs uppercase tracking-[0.16em] text-emerald-300/70">RPA · AI · Product</span>
                </div>

                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-200 shadow-[inset_0_0_18px_rgba(34,211,238,0.12)]">
                  <BrainCircuit className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                  {featuredProject.title}
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  {featuredProject.summary}
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button
                    onClick={() => onCardClick(featuredProject.id)}
                    className="group/button justify-center bg-cyan-300 text-slate-950 hover:bg-cyan-200"
                  >
                    {dict.caseStudies.viewDetails}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-0.5" aria-hidden="true" />
                  </Button>
                  {featuredProject.liveUrl && (
                    <Button asChild variant="outline" className="justify-center border-emerald-300/30 bg-emerald-300/5 text-emerald-100 hover:bg-emerald-300/10 hover:text-white">
                      <a href={featuredProject.liveUrl} target="_blank" rel="noreferrer">
                        {dict.caseStudies.liveApp}
                        <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
                      </a>
                    </Button>
                  )}
                  {featuredProject.sourceUrl && (
                    <Button asChild variant="ghost" className="justify-center text-slate-300 hover:bg-white/5 hover:text-white">
                      <a href={featuredProject.sourceUrl} target="_blank" rel="noreferrer">
                        <Github className="mr-2 h-4 w-4" aria-hidden="true" />
                        {dict.caseStudies.viewSource}
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              <div className="relative border-t border-cyan-300/15 bg-[#061116]/90 p-4 sm:p-7 lg:border-l lg:border-t-0 lg:p-9">
                <div className="relative overflow-hidden rounded-xl border border-cyan-300/20 bg-[#071519] p-4 shadow-[0_20px_60px_-32px_rgba(34,211,238,0.7)] sm:p-5">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2 font-code text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100">
                      <Sparkles className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
                      {dict.caseStudies.instrumentLabel}
                    </div>
                    <div className="flex gap-1.5" aria-hidden="true">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/70" />
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-300/70" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-5">
                    <div className="rounded-lg border border-cyan-300/15 bg-cyan-300/[0.06] p-3">
                      <p className="text-[10px] leading-tight text-slate-400">{dict.caseStudies.metricHours}</p>
                      <p className="mt-2 font-code text-xl font-bold text-white sm:text-2xl">186.5</p>
                    </div>
                    <div className="rounded-lg border border-amber-300/15 bg-amber-300/[0.05] p-3">
                      <p className="text-[10px] leading-tight text-slate-400">{dict.caseStudies.metricRisk}</p>
                      <p className="mt-2 font-code text-xs font-bold uppercase text-amber-200 sm:text-sm">{dict.caseStudies.riskValue}</p>
                    </div>
                    <div className="rounded-lg border border-emerald-300/15 bg-emerald-300/[0.05] p-3">
                      <p className="text-[10px] leading-tight text-slate-400">{dict.caseStudies.metricConfidence}</p>
                      <p className="mt-2 font-code text-xs font-bold uppercase text-emerald-200 sm:text-sm">{dict.caseStudies.confidenceValue}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {capabilityRows.map(({ label, value, icon: Icon }) => (
                      <div key={label}>
                        <div className="mb-1.5 flex items-center justify-between text-[11px]">
                          <span className="flex items-center gap-2 text-slate-300">
                            <Icon className="h-3.5 w-3.5 text-cyan-300/80" aria-hidden="true" />
                            {label}
                          </span>
                          <span className="font-code text-cyan-100">{value}%</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-300 shadow-[0_0_12px_rgba(34,211,238,0.55)] transition-[width] duration-700"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        )}

        {caseStudies.length > 0 && (
          <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {caseStudies.map((project) => (
              <CaseStudyCard key={project.id} project={project} onClick={() => onCardClick(project.id)} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CaseStudies;
