"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/components/context/LanguageContext";
import { skills, projects, experience } from "@/lib/data";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface SkillChemistryModalProps {
  skillId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const levelLabelMap: Record<Locale, Record<string, string>> = {
  en: {
    expert: 'Expert',
    advanced: 'Advanced',
    intermediate: 'Intermediate',
  },
  es: {
    expert: 'Experto',
    advanced: 'Avanzado',
    intermediate: 'Intermedio',
  },
  pt: {
    expert: 'Especialista',
    advanced: 'Avançado',
    intermediate: 'Intermediário',
  },
};

const capabilityOverrides: Record<
  string,
  { capability: string; canDo: string[]; proof: string }
> = {
  prompteng: {
    capability:
      "I design prompts as production contracts: system instructions, task prompts, structured outputs, fallback rules, and eval cases that make LLM behavior measurable instead of improvised.",
    canDo: [
      "System prompting for agentic chatbots and workflow assistants",
      "Prompt/version governance with regression checks",
      "Structured response contracts using JSON schemas",
      "Safety, source-traceability, and refusal/fallback behavior",
      "Eval testing for accuracy, consistency, and production readiness",
    ],
    proof:
      "Used in Rice executive AI workflows, Laura AI Agent, RAG assistants, and document verification pipelines.",
  },
  openai: {
    capability:
      "I build retrieval-grounded AI systems that can search trusted knowledge, assemble context, cite sources, and produce controlled responses instead of relying on raw model memory.",
    canDo: [
      "Document ingestion, chunking, enrichment, and retrieval design",
      "Vector search using pgvector, Pinecone, or cloud-native search",
      "Source-grounded response generation with confidence metadata",
      "RAG evaluation for relevance, faithfulness, and answer quality",
      "Human review loops for high-risk or low-confidence outputs",
    ],
    proof:
      "Resume-backed work includes RAG knowledge workflows, executive AI assistants, agentic knowledge tutor systems, and operations second-brain systems.",
  },
  multiagent: {
    capability:
      "I design agentic workflows where LLMs can plan, retrieve, call tools, validate outputs, and escalate safely through governed backend APIs.",
    canDo: [
      "Intent routing and context assembly",
      "Tool-use orchestration across backend services",
      "Long-term memory and session state patterns",
      "Approval-gated actions and human-in-the-loop controls",
      "Agent observability, audit traces, and rollback-safe workflows",
    ],
    proof:
      "Rice assistant architecture, multi-agent orchestration projects, and UiPath AI Automation Contest work all support this positioning.",
  },
  architecture: {
    capability:
      "I build the backend layer that makes AI usable in production: APIs, auth, orchestration, memory, schemas, queues, observability, and deployment pipelines.",
    canDo: [
      "Python/FastAPI and Node.js/TypeScript AI services",
      "Typed JSON contracts and schema validation",
      "OAuth, RBAC, token handling, and least-privilege access",
      "Distributed backend services for chatbot and assistant features",
      "CI/CD, smoke tests, regression checks, and production gates",
    ],
    proof:
      "The Rice prototype used backend-owned OAuth, typed JSON endpoints, AJV schema validation, RBAC, audit logging, Cloud Run, Firebase Hosting, and Google Workspace integrations.",
  },
  llmops: {
    capability:
      "I create evaluation harnesses that force AI systems to prove they work before they are trusted in production.",
    canDo: [
      "Golden test sets for prompts, RAG, and agent workflows",
      "Schema validation and structured-output checks",
      "False-positive and false-negative review loops",
      "Regression audits for prompt and model changes",
      "Smoke tests for production-readiness gates",
    ],
    proof:
      "The Rice work included seeded test batteries, synthetic fixtures, CI validation, smoke tests, security checks, release gates, and regression audits.",
  },
  llmprod: {
    capability:
      "I build the control layer around AI models: tools, memory, context management, subagents, validation, permissions, and development workflows that keep agents useful and safe.",
    canDo: [
      "Agent loops, tool execution, and permission gates",
      "Memory and context compaction strategies",
      "Subagent orchestration for implementation, review, and research",
      "Spec-driven development flows with human approval",
      "Verification loops that require tests, browser checks, or other evidence",
    ],
    proof:
      "The model is only the 'brain'; the useful system is the environment around it: tools, memory, validation, context management, and orchestration.",
  },
  uipath: {
    capability:
      "I connect AI with enterprise automation platforms so reasoning can become measurable operational execution.",
    canDo: [
      "UiPath, Power Platform, n8n, Blue Prism, and Automation Anywhere architectures",
      "Human-in-the-loop review for high-risk actions",
      "ERP, SAP, ServiceNow, Jira, Google Workspace, and Microsoft integrations",
      "Automation CoE governance, naming standards, error handling, and monitoring",
      "ROI modeling and platform selection across automation stacks",
    ],
    proof:
      "Resume-backed results include $120K+ annual savings, 300% average ROI, 99.9% uptime SLA, 50+ automation solutions, and $50M+ annual transactions automated.",
  },
  docker: {
    capability:
      "I package and operate AI systems like production software: containerized, observable, versioned, secure, and deployable across cloud environments.",
    canDo: [
      "Docker, Kubernetes, Helm, Cloud Run, and cloud deployment pipelines",
      "Containerized AI services with rollback-safe releases",
      "Observability using Prometheus, Grafana, Cloud Logging, and dashboards",
      "Secure runtime patterns for tools, credentials, and model access",
      "Portable architectures that reduce model and cloud lock-in",
    ],
    proof:
      "Containers are becoming the foundation for agentic infrastructure because they provide isolation, portability, versioning, reproducibility, and rollback (as supported by Docker's market agentic reports).",
  },
};

export function SkillChemistryModal({ skillId, isOpen, onClose }: SkillChemistryModalProps) {
  const { locale, dict } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const skill = skills.find(s => s.id === skillId);
  if (!skill) return null;

  const displayLevel = levelLabelMap[locale][skill.level] || skill.level;
  const atomicNumber = (skill.row - 1) * 18 + skill.col;
  const relatedProjects = projects.filter(p => p.skills.includes(skill.id));
  const relatedExperience = experience.filter(e => e.skills.includes(skill.id));

  const override = capabilityOverrides[skill.id];
  const skillData = {
    name: skill.name,
    capability: override?.capability ?? `${dict.drawer.skillRelatedDescription} ${skill.name}.`,
    canDo: override?.canDo ?? [
      `Design and implement ${skill.name} solutions for production environments`,
      `Establish proper governance, standard operating procedures, and automated quality controls`,
      `Design robust integrations and handle complex workflow logic with error resolution`
    ],
    proof: override?.proof ?? `Proven experience applying ${skill.name} in automated workflows, deployment pipelines, and project deliveries.`
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${skillData.name} ${dict.skills.title}`}
          onClick={onClose}
        >
          <motion.div
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, scale: 0.72, rotateX: -12 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.86, rotateX: 8 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            className={cn(
              "relative w-full max-w-3xl overflow-hidden rounded-2xl",
              "border border-primary/40 bg-[#06120d] text-foreground",
              "shadow-[0_0_80px_rgba(34,197,94,0.22)] max-h-[90vh] overflow-y-auto"
            )}
          >
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.18),transparent_40%)]" />
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#06120d]"
              aria-label="Close skill details"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="relative grid gap-8 p-6 md:grid-cols-[15rem_1fr] md:p-8">
              <div className="flex flex-col items-center justify-center">
                <IsotopeVisual
                  symbol={skill.symbol}
                  atomicNumber={atomicNumber}
                  level={displayLevel}
                />
              </div>
              
              <div className="min-w-0 flex flex-col justify-center">
                <p className="mb-2 text-xs uppercase tracking-[0.3em] text-primary/70 font-semibold font-code">
                  Skill Isotope
                </p>
                <h2 className="text-3xl font-bold text-primary md:text-4xl leading-tight">
                  {skillData.name}
                </h2>
                
                <p className="mt-4 text-sm md:text-base leading-relaxed text-muted-foreground">
                  {skillData.capability}
                </p>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <Metric label="Level" value={displayLevel} />
                  <Metric label="Atomic No." value={String(atomicNumber)} />
                  <Metric label="State" value="Production" />
                </div>

                <section className="mt-8">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                    What I Can Build
                  </h3>
                  <ul className="mt-3 grid gap-2">
                    {skillData.canDo.map((item) => (
                      <li key={item} className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="mt-8">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                    Proof / Field Evidence
                  </h3>
                  <p className="mt-3 rounded-lg border border-primary/20 bg-black/20 p-4 text-sm text-muted-foreground">
                    {skillData.proof}
                  </p>
                </section>
                
                {relatedProjects.length > 0 && (
                  <section className="mt-8">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                      Related Case Studies
                    </h3>
                    <div className="mt-3 space-y-2">
                      {relatedProjects.map((project) => (
                        <Link
                          key={project.id}
                          href={`#project=${project.id}`}
                          scroll={false}
                          onClick={onClose}
                          className="block rounded-lg border border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/40 p-3 transition-all duration-200"
                        >
                          <div className="font-semibold text-sm text-foreground">{project.title}</div>
                          <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{project.summary}</div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
                
                {relatedExperience.length > 0 && (
                  <section className="mt-8">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                      {dict.drawer.relatedExperience}
                    </h3>
                    <div className="mt-3 space-y-2">
                      {relatedExperience.map((exp) => (
                        <div key={exp.company + exp.role} className="rounded-lg border border-muted/20 bg-muted/5 p-3">
                          <div className="font-semibold text-sm text-foreground">{exp.role} {dict.drawer.experienceAt} {exp.company}</div>
                          <div className="text-xs text-muted-foreground mt-1">{exp.when}</div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {skill.tags?.length > 0 && (
                  <section className="mt-8">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3">
                      Bonds With
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {skill.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-xs text-foreground capitalize font-code"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold font-code">
        {label}
      </div>
      <div className="mt-1 truncate text-sm md:text-base font-bold text-foreground">
        {value}
      </div>
    </div>
  );
}

function IsotopeVisual({
  symbol,
  atomicNumber,
  level,
}: {
  symbol: string;
  atomicNumber: number;
  level: string;
}) {
  return (
    <div className="relative flex h-52 w-52 items-center justify-center select-none">
      <motion.div
        className="absolute h-48 w-48 rounded-full border border-primary/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute h-36 w-52 rounded-full border border-primary/30"
        animate={{ rotate: -360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute h-52 w-28 rounded-full border border-primary/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="relative flex h-32 w-32 flex-col items-center justify-center rounded-xl border-2 border-primary bg-primary/10 shadow-[0_0_36px_rgba(34,197,94,0.28)]"
        initial={{ scale: 0.75, filter: "blur(8px)" }}
        animate={{ scale: 1, filter: "blur(0px)" }}
        transition={{ delay: 0.08, type: "spring", stiffness: 260, damping: 18 }}
      >
        <span className="absolute left-3 top-3 text-xs font-bold leading-none text-primary/80 font-code">
          {atomicNumber}
        </span>
        <span className="text-4xl font-black leading-none text-primary font-code mt-2">
          {symbol}
        </span>
        <span className="mt-2 max-w-[6rem] truncate text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
          {level}
        </span>
      </motion.div>
      <motion.span
        className="absolute right-6 top-8 h-3 w-3 rounded-full bg-primary shadow-[0_0_16px_rgba(34,197,94,0.9)]"
        animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      />
      <motion.span
        className="absolute bottom-8 left-5 h-2.5 w-2.5 rounded-full bg-lime-300 shadow-[0_0_14px_rgba(190,242,100,0.9)]"
        animate={{ scale: [1, 1.35, 1], opacity: [0.65, 1, 0.65] }}
        transition={{ duration: 1.9, repeat: Infinity, delay: 0.35 }}
      />
    </div>
  );
}
