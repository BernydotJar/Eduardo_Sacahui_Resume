"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Download } from "lucide-react";
import { useLanguage } from "@/components/context/LanguageContext";
import { skills, projects, experience } from "@/lib/data";
import { medallionArchitecture } from "@/data/medallion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProjectCaseStudyModalProps {
  projectId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectCaseStudyModal({ projectId, isOpen, onClose }: ProjectCaseStudyModalProps) {
  const { dict } = useLanguage();
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      titleRef.current?.focus();
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const project = projects.find(p => p.id === projectId);
  if (!project) return null;

  const relatedExperience = experience.filter(e => e.skills.some(s => project.skills.includes(s)));



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
          aria-label={`${project.title} case study`}
          onClick={onClose}
        >
          <motion.div
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className={cn(
              "relative w-full max-w-6xl overflow-hidden rounded-2xl",
              "border border-primary/20 bg-card text-foreground",
              "shadow-[0_0_80px_rgba(34,197,94,0.15)]"
            )}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-20 rounded-full p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Close project details"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Split Panel Layout */}
            <div className="grid h-auto lg:h-[85vh] max-h-[85vh] md:max-h-[88vh] grid-cols-1 lg:grid-cols-[22rem_1fr] overflow-y-auto lg:overflow-hidden bg-[#060e0a]">
              
              {/* Left Column: Sidebar (Fixed/Scrolls on Desktop independently) */}
              <aside className="p-6 md:p-8 border-b border-primary/20 lg:border-b-0 lg:border-r lg:overflow-y-auto bg-[#040a07] space-y-6 flex flex-col lg:min-h-0">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary/70 font-semibold font-code">
                    Case Study Analysis
                  </p>
                  <h2 ref={titleRef} tabIndex={-1} className="text-2xl font-bold text-foreground leading-tight outline-none">
                    {project.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                    {project.summary}
                  </p>
                </div>

                <hr className="border-primary/10" />

                {/* Metadata details */}
                <div className="text-xs space-y-3.5 text-muted-foreground">
                  {project.client && (
                    <div className="flex flex-col gap-1">
                      <span className="text-foreground/70 font-semibold uppercase tracking-wider text-[10px]">{dict.drawer.client}</span>
                      <span className="text-sm text-foreground">{project.client}</span>
                    </div>
                  )}
                  {project.when && (
                    <div className="flex flex-col gap-1">
                      <span className="text-foreground/70 font-semibold uppercase tracking-wider text-[10px]">{dict.drawer.when}</span>
                      <span className="text-sm text-foreground">{project.when}</span>
                    </div>
                  )}
                  {project.methodology && (
                    <div className="flex flex-col gap-1">
                      <span className="text-foreground/70 font-semibold uppercase tracking-wider text-[10px]">{dict.drawer.methodology}</span>
                      <span className="text-sm text-foreground">{project.methodology}</span>
                    </div>
                  )}
                  {project.stack && (
                    <div className="flex flex-col gap-1">
                      <span className="text-foreground/70 font-semibold uppercase tracking-wider text-[10px]">{dict.drawer.stack}</span>
                      <span className="text-sm font-mono text-primary/95">{project.stack}</span>
                    </div>
                  )}
                </div>

                {project.outcomes && project.outcomes.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-foreground/70 font-semibold uppercase tracking-wider text-[10px]">{dict.drawer.outcomes}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.outcomes.map(o => (
                        <Badge key={o} variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                          {o}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <span className="text-foreground/70 font-semibold uppercase tracking-wider text-[10px]">{dict.drawer.skills}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.skills.map(skillId => {
                      const skill = skills.find(s => s.id === skillId);
                      return skill ? (
                        <Link key={skillId} href={`#skill=${skill.id}`} scroll={false} onClick={onClose}>
                          <Badge variant="outline" className="cursor-pointer hover:bg-accent/25 hover:text-accent border-muted/30 transition-colors">
                            {skill.name}
                          </Badge>
                        </Link>
                      ) : null;
                    })}
                  </div>
                </div>

                {project.id === 'rag-knowledge-services' && (
                  <div className="pt-2">
                    <Button variant="outline" asChild className="w-full justify-center text-xs border-primary/30 hover:bg-primary/10 hover:text-primary">
                      <a href="/postman-collection.json" download>
                        <Download className="mr-2 h-3.5 w-3.5" />
                        {dict.drawer.downloadPostmanCollection}
                      </a>
                    </Button>
                  </div>
                )}

                {project.id === 'rag-made-easy' && (
                  <div className="pt-2">
                    <Button asChild className="w-full justify-center text-xs bg-primary text-primary-foreground hover:bg-primary/90">
                      <Link href="/rag-demo/" target="_blank">
                        {dict.drawer.launchInteractivePlayground}
                      </Link>
                    </Button>
                  </div>
                )}

                {project.id === 'ai-recruiting-copilot' && (
                  <div className="pt-2">
                    <Button asChild className="w-full justify-center text-xs bg-primary text-primary-foreground hover:bg-primary/90">
                      <Link href="/recruiting-demo/" target="_blank">
                        {dict.drawer.launchInteractivePlayground}
                      </Link>
                    </Button>
                  </div>
                )}

                {project.id === 'autotask-to-jira-fabric' && (
                  <div className="p-3 border border-primary/20 rounded-lg bg-primary/5 space-y-2 mt-auto">
                    <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider">{dict.drawer.medallionArchitecture}</h4>
                    <p className="text-[10px] font-mono whitespace-pre-wrap leading-normal text-muted-foreground">{medallionArchitecture}</p>
                  </div>
                )}
              </aside>

              {/* Right Column: Main Content (Scrolls independently on desktop) */}
              <main className="p-6 md:p-8 lg:overflow-y-auto space-y-8 bg-[#06100c] relative lg:min-h-0">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.08),transparent_50%)]" />

                {project.caseStudy ? (
                  <div className="relative space-y-8">
                    
                    {/* Prominent Action Banner for RAG Demo */}
                    {project.id === 'rag-made-easy' && (
                      <div className="flex flex-col sm:flex-row gap-4 p-5 border border-primary/30 rounded-xl bg-primary/5 items-center justify-between shadow-[0_0_20px_rgba(34,197,94,0.05)]">
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-primary uppercase tracking-wider font-code">
                            {dict.drawer.interactiveDemoPlayground}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {dict.drawer.interactiveDemoPlaygroundDesc}
                          </p>
                        </div>
                        <Button asChild className="w-full sm:w-auto px-5 py-2.5 bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(34,197,94,0.25)] shrink-0 font-semibold text-xs">
                          <Link href="/rag-demo/" target="_blank">
                            {dict.drawer.launchInteractivePlayground} →
                          </Link>
                        </Button>
                      </div>
                    )}

                    {/* Prominent Action Banner for AI Recruiting Copilot Demo */}
                    {project.id === 'ai-recruiting-copilot' && (
                      <div className="flex flex-col sm:flex-row gap-4 p-5 border border-primary/30 rounded-xl bg-primary/5 items-center justify-between shadow-[0_0_20px_rgba(34,197,94,0.05)]">
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-primary uppercase tracking-wider font-code">
                            {dict.drawer.interactiveDemoPlayground}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {dict.drawer.interactiveDemoPlaygroundDesc}
                          </p>
                        </div>
                        <Button asChild className="w-full sm:w-auto px-5 py-2.5 bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(34,197,94,0.25)] shrink-0 font-semibold text-xs">
                          <Link href="/recruiting-demo/" target="_blank">
                            {dict.drawer.launchInteractivePlayground} →
                          </Link>
                        </Button>
                      </div>
                    )}

                    {/* Use Case */}
                    {project.caseStudy.useCase && project.caseStudy.useCase.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-bold text-primary border-b border-primary/10 pb-2 uppercase tracking-wide">
                          Use Case
                        </h3>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground leading-relaxed">
                          {project.caseStudy.useCase.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Delivery Status Matrix */}
                    {project.caseStudy.statusMatrix && project.caseStudy.statusMatrix.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-bold text-primary border-b border-primary/10 pb-2 uppercase tracking-wide">
                          Delivery Status
                        </h3>
                        <div className="overflow-x-auto rounded-lg border border-primary/20 bg-primary/5">
                          <table className="min-w-[700px] w-full text-left text-xs">
                            <thead className="bg-primary/10 text-primary uppercase font-mono tracking-wider text-[10px]">
                              <tr>
                                <th className="px-4 py-3 font-bold">Key</th>
                                <th className="px-4 py-3 font-bold">Functionality</th>
                                <th className="px-4 py-3 font-bold">Status</th>
                                <th className="px-4 py-3 font-bold">What Is True Now</th>
                                <th className="px-4 py-3 font-bold">Next</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-primary/10">
                              {project.caseStudy.statusMatrix.map((item) => (
                                <tr key={item.key} className="hover:bg-primary/5 transition-colors align-top">
                                  <td className="px-4 py-3 font-mono font-semibold text-primary">{item.key}</td>
                                  <td className="px-4 py-3 font-semibold text-foreground">{item.functionality}</td>
                                  <td className="px-4 py-3 text-muted-foreground">
                                    <span className={cn(
                                      "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase",
                                      item.status.toLowerCase().includes('done') || item.status.toLowerCase().includes('complete')
                                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                        : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                    )}>
                                      {item.status}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3 text-muted-foreground leading-relaxed">{item.currentState}</td>
                                  <td className="px-4 py-3 text-muted-foreground leading-relaxed">{item.next}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Implementation Plan */}
                    {project.caseStudy.implementationPlan && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-bold text-primary border-b border-primary/10 pb-2 uppercase tracking-wide">
                          Implementation Plan
                        </h3>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground leading-relaxed">
                          {project.caseStudy.implementationPlan.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Implementation Details */}
                    {project.caseStudy.implementationHighlights && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-bold text-primary border-b border-primary/10 pb-2 uppercase tracking-wide">
                          Implementation Details
                        </h3>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground leading-relaxed">
                          {project.caseStudy.implementationHighlights.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* How to Test */}
                    {project.caseStudy.testChecklist && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-bold text-primary border-b border-primary/10 pb-2 uppercase tracking-wide">
                          How To Test
                        </h3>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground leading-relaxed">
                          {project.caseStudy.testChecklist.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* API Quick Checks */}
                    {project.caseStudy.apiChecks && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-bold text-primary border-b border-primary/10 pb-2 uppercase tracking-wide">
                          API Quick Checks
                        </h3>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground leading-relaxed">
                          {project.caseStudy.apiChecks.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Validation Proof */}
                    {project.caseStudy.validationProof && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-bold text-primary border-b border-primary/10 pb-2 uppercase tracking-wide">
                          Validation Proof
                        </h3>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground leading-relaxed">
                          {project.caseStudy.validationProof.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Known Limitations */}
                    {project.caseStudy.knownLimitations && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-bold text-primary border-b border-primary/10 pb-2 uppercase tracking-wide">
                          Known Limitations
                        </h3>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground leading-relaxed">
                          {project.caseStudy.knownLimitations.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Local Commands */}
                    {project.caseStudy.localCommands && project.caseStudy.localCommands.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-bold text-primary border-b border-primary/10 pb-2 uppercase tracking-wide">
                          Local Commands
                        </h3>
                        <pre className="rounded-lg border border-primary/20 bg-[#040a07] p-4 text-xs text-primary font-code overflow-x-auto leading-relaxed">{project.caseStudy.localCommands.join("\n")}</pre>
                      </div>
                    )}

                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    <p>No detailed case study available for this project.</p>
                  </div>
                )}

                {/* Related Experience */}
                {relatedExperience.length > 0 && (
                  <div className="space-y-4 pt-4 relative">
                    <h3 className="text-lg font-bold text-primary border-b border-primary/10 pb-2 uppercase tracking-wide">
                      {dict.drawer.relatedExperience}
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {relatedExperience.map(exp => (
                        <div key={exp.company + exp.role} className="p-4 border border-muted/20 rounded-xl bg-muted/5">
                          <h4 className="font-semibold text-foreground text-sm">{exp.role} {dict.drawer.experienceAt} {exp.company}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{exp.when}</p>
                          {exp.highlights && exp.highlights.length > 0 && (
                            <ul className="list-disc pl-4 mt-2 text-[11px] text-muted-foreground space-y-1">
                              {exp.highlights.slice(0, 2).map((h, i) => <li key={i}>{h}</li>)}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </main>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
