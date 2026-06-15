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
          aria-label={`${skill.name} ${dict.skills.title}`}
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
                  {skill.name}
                </h2>
                <p className="mt-3 text-sm md:text-base leading-relaxed text-muted-foreground">
                  {`${dict.drawer.skillRelatedDescription} ${skill.name}.`}
                </p>
                
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <Metric label="Level" value={displayLevel} />
                  <Metric label="Atomic No." value={String(atomicNumber)} />
                  <Metric label="State" value="Production" />
                </div>
                
                {relatedProjects.length > 0 && (
                  <section className="mt-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                      {dict.drawer.relatedProjects}
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
                  <section className="mt-6">
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
                  <section className="mt-6">
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
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
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
