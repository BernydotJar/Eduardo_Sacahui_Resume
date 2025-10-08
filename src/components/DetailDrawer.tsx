"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { skills, projects, experience } from '@/lib/data';
import type { Skill, Project, Experience } from "@/lib/types";
import { medallionArchitecture } from "@/data/medallion";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

interface DetailDrawerProps {
  content: { type: 'skill'; id: string } | { type: 'project'; id: string };
  isOpen: boolean;
  onClose: () => void;
}

const DetailDrawer = ({ content, isOpen, onClose }: DetailDrawerProps) => {
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
      description = `Projects and experience related to ${skill.name}.`;
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

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full md:w-3/5 lg:w-1/2 xl:w-2/5 p-0" side="right">
        <ScrollArea className="h-full">
          <div className="p-6">
            <SheetHeader>
              <SheetTitle className="text-2xl text-primary">{title}</SheetTitle>
              <SheetDescription>{description}</SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-8">
              {content.type === 'project' && mainContent && (
                  <div>
                      <h3 className="font-semibold text-lg mb-2">Project Details</h3>
                      <div className="text-sm space-y-2 text-muted-foreground">
                          <p><strong className="text-foreground">Stack:</strong> {(mainContent as Project).stack}</p>
                          {(mainContent as Project).outcomes && (
                            <div className="flex flex-wrap gap-2 pt-2">
                                {(mainContent as Project).outcomes?.map(o => <Badge key={o} variant="secondary">{o}</Badge>)}
                            </div>
                          )}
                          {content.id === 'rag-knowledge-services' && (
                              <Button variant="link" asChild className="px-0">
                                  <a href="/postman-collection.json" download><Download className="mr-2 h-4 w-4" />Download Postman Collection</a>
                              </Button>
                          )}
                           {content.id === 'autotask-to-jira-fabric' && (
                            <div className="mt-4 p-4 border rounded-lg bg-secondary/50">
                                <h4 className="font-semibold text-foreground mb-2">Medallion Architecture</h4>
                                <p className="text-xs whitespace-pre-wrap">{medallionArchitecture}</p>
                            </div>
                          )}
                      </div>
                  </div>
              )}
              {relatedProjects.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-4">Related Projects</h3>
                  <div className="space-y-4">
                    {relatedProjects.map(project => (
                      <div key={project.id} className="p-4 border rounded-lg">
                        <h4 className="font-semibold">{project.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{project.summary}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {project.skills.map(skillId => {
                            const skill = skills.find(s => s.id === skillId);
                            return skill ? <Badge key={skillId} variant="outline" className="text-xs">{skill.name}</Badge> : null;
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {relatedExperience.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-4">Related Experience</h3>
                  <div className="space-y-4">
                    {relatedExperience.map(exp => (
                      <div key={exp.company + exp.role} className="p-4 border rounded-lg">
                        <h4 className="font-semibold">{exp.role} at {exp.company}</h4>
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
