
"use client";

import { useEffect, useRef } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { skills, projects, experience } from '@/lib/data';
import type { Skill, Project, Experience } from "@/lib/types";
import { medallionArchitecture } from "@/data/medallion";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/context/LanguageContext";

interface DetailDrawerProps {
  content: { type: 'skill'; id: string } | { type: 'project'; id: string };
  isOpen: boolean;
  onClose: () => void;
}

const DetailDrawer = ({ content, isOpen, onClose }: DetailDrawerProps) => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const { dict } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      titleRef.current?.focus();
    }
  }, [content.id, content.type, isOpen]);

  if (!content) return null;

  let title = "";
  let description = "";
  let relatedProjects: Project[] = [];
  let relatedExperience: Experience[] = [];
  let mainContent: Skill | Project | null = null;
  
  if (content.type === 'skill') {
    const skill = skills.find(s => s.id === content.id);
    if (skill) {
      mainContent = skill;
      title = skill.name;
      description = `${dict.drawer.skillRelatedDescription} ${skill.name}.`;
      relatedProjects = projects.filter(p => p.skills.includes(skill.id));
      relatedExperience = experience.filter(e => e.skills.includes(skill.id));
    }
  } else if (content.type === 'project') {
    const project = projects.find(p => p.id === content.id);
    if (project) {
        mainContent = project;
        title = project.title;
        description = project.summary;
        relatedExperience = experience.filter(e => e.skills.some(s => project.skills.includes(s)));
    }
  }

  const projectDetails = mainContent && content.type === 'project' ? (mainContent as Project) : null;

  const renderListSection = (title: string, items?: string[]) => {
    if (!items || items.length === 0) return null;
    return (
      <div>
        <h4 className="font-semibold text-foreground mb-2">{title}</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
          {items.map((item) => (
            <li key={`${title}-${item}`}>{item}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        className="w-full md:w-3/5 lg:w-1/2 xl:w-2/5 p-0"
        side="right"
        style={{
          paddingTop: "max(env(safe-area-inset-top), 0px)",
          paddingBottom: "max(env(safe-area-inset-bottom), 0px)",
        }}
      >
        <ScrollArea className="h-full">
          <div className="p-6">
            <SheetHeader>
              <SheetTitle ref={titleRef} className="text-2xl text-primary" tabIndex={-1}>{title}</SheetTitle>
              <SheetDescription>{description}</SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-8">
              {projectDetails && (
                  <div>
                      <h3 className="font-semibold text-lg mb-4">{dict.drawer.projectDetails}</h3>
                      <div className="text-sm space-y-4 text-muted-foreground">
                          {projectDetails.client && <p><strong className="text-foreground font-semibold">{dict.drawer.client}:</strong> {projectDetails.client}</p>}
                          {projectDetails.when && <p><strong className="text-foreground font-semibold">{dict.drawer.when}:</strong> {projectDetails.when}</p>}
                          {projectDetails.stack && <p><strong className="text-foreground font-semibold">{dict.drawer.stack}:</strong> {projectDetails.stack}</p>}
                          {projectDetails.methodology && <p><strong className="text-foreground font-semibold">{dict.drawer.methodology}:</strong> {projectDetails.methodology}</p>}
                          
                          {projectDetails.outcomes && (
                            <div>
                                <strong className="text-foreground font-semibold">{dict.drawer.outcomes}:</strong>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {projectDetails.outcomes?.map(o => <Badge key={o} variant="secondary">{o}</Badge>)}
                                </div>
                            </div>
                          )}
                           <div>
                                <strong className="text-foreground font-semibold">{dict.drawer.skills}:</strong>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {projectDetails.skills.map(skillId => {
                                        const skill = skills.find(s => s.id === skillId);
                                        return skill ? (
                                            <Link key={skillId} href={`#skill=${skill.id}`} scroll={false}>
                                                <Badge variant="outline" className="cursor-pointer hover:bg-accent/20">{skill.name}</Badge>
                                            </Link>
                                        ) : null;
                                    })}
                                </div>
                           </div>

                          {content.id === 'rag-knowledge-services' && (
                              <Button variant="link" asChild className="px-0">
                                  <a href="/postman-collection.json" download><Download className="mr-2 h-4 w-4" />{dict.drawer.downloadPostmanCollection}</a>
                              </Button>
                          )}
                           {content.id === 'autotask-to-jira-fabric' && (
                            <div className="mt-4 p-4 border rounded-lg bg-secondary/50">
                                <h4 className="font-semibold text-foreground mb-2">{dict.drawer.medallionArchitecture}</h4>
                                <p className="text-xs whitespace-pre-wrap">{medallionArchitecture}</p>
                            </div>
                          )}

                          {projectDetails.caseStudy && (
                            <div className="space-y-5 rounded-lg border border-border/70 bg-card/40 p-4">
                              {renderListSection("Use Case", projectDetails.caseStudy.useCase)}

                              {projectDetails.caseStudy.statusMatrix && projectDetails.caseStudy.statusMatrix.length > 0 && (
                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">Delivery Status</h4>
                                  <div className="overflow-x-auto rounded-md border border-border/60">
                                    <table className="min-w-[720px] w-full text-left text-xs">
                                      <thead className="bg-secondary/50 text-foreground/90">
                                        <tr>
                                          <th className="px-3 py-2 font-semibold">Key</th>
                                          <th className="px-3 py-2 font-semibold">Functionality</th>
                                          <th className="px-3 py-2 font-semibold">Status</th>
                                          <th className="px-3 py-2 font-semibold">What Is True Now</th>
                                          <th className="px-3 py-2 font-semibold">Next</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {projectDetails.caseStudy.statusMatrix.map((item) => (
                                          <tr key={item.key} className="border-t border-border/60 align-top">
                                            <td className="px-3 py-2 font-mono text-foreground/90">{item.key}</td>
                                            <td className="px-3 py-2 text-muted-foreground">{item.functionality}</td>
                                            <td className="px-3 py-2 text-foreground/90">{item.status}</td>
                                            <td className="px-3 py-2 text-muted-foreground">{item.currentState}</td>
                                            <td className="px-3 py-2 text-muted-foreground">{item.next}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              )}

                              {renderListSection("Implementation Plan", projectDetails.caseStudy.implementationPlan)}
                              {renderListSection("Implementation Details", projectDetails.caseStudy.implementationHighlights)}
                              {renderListSection("How To Test", projectDetails.caseStudy.testChecklist)}
                              {renderListSection("API Quick Checks", projectDetails.caseStudy.apiChecks)}
                              {renderListSection("Validation Proof", projectDetails.caseStudy.validationProof)}
                              {renderListSection("Known Limitations", projectDetails.caseStudy.knownLimitations)}

                              {projectDetails.caseStudy.localCommands && projectDetails.caseStudy.localCommands.length > 0 && (
                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">Local Commands</h4>
                                  <pre className="rounded-md border border-border/60 bg-secondary/40 p-3 text-xs text-foreground/90 overflow-x-auto">{projectDetails.caseStudy.localCommands.join("\n")}</pre>
                                </div>
                              )}
                            </div>
                          )}
                      </div>
                  </div>
              )}
              {relatedProjects.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-4">{dict.drawer.relatedProjects}</h3>
                  <div className="space-y-4">
                    {relatedProjects.map(project => (
                      <Link key={project.id} href={`#project=${project.id}`} scroll={false} className="block text-left">
                        <div className="p-4 border rounded-lg hover:border-primary transition-colors">
                          <h4 className="font-semibold">{project.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{project.summary}</p>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {project.skills.map(skillId => {
                              const skill = skills.find(s => s.id === skillId);
                              return skill ? <Badge key={skillId} variant="outline" className="text-xs">{skill.name}</Badge> : null;
                            })}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {relatedExperience.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-4">{dict.drawer.relatedExperience}</h3>
                  <div className="space-y-4">
                    {relatedExperience.map(exp => (
                      <div key={exp.company + exp.role} className="p-4 border rounded-lg">
                        <h4 className="font-semibold">{exp.role} {dict.drawer.experienceAt} {exp.company}</h4>
                        <p className="text-sm text-muted-foreground">{exp.when}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default DetailDrawer;
