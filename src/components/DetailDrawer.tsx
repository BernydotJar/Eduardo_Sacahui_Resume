"use client";

import { SkillChemistryModal } from "./SkillChemistryModal";
import { ProjectCaseStudyModal } from "./ProjectCaseStudyModal";

interface DetailDrawerProps {
  content: { type: 'skill'; id: string } | { type: 'project'; id: string };
  isOpen: boolean;
  onClose: () => void;
}

const DetailDrawer = ({ content, isOpen, onClose }: DetailDrawerProps) => {
  if (!content) return null;

  if (content.type === 'skill') {
    return (
      <SkillChemistryModal
        skillId={content.id}
        isOpen={isOpen}
        onClose={onClose}
      />
    );
  }

  if (content.type === 'project') {
    return (
      <ProjectCaseStudyModal
        projectId={content.id}
        isOpen={isOpen}
        onClose={onClose}
      />
    );
  }

  return null;
};

export default DetailDrawer;
