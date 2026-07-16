
"use client";

import { useState } from 'react';
import { skills } from '@/lib/data';
import SkillTile from '@/components/ui/SkillTile';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/components/context/LanguageContext';

interface SkillsProps {
  onTileClick: (skillId: string) => void;
}

const allTags = [...new Set(skills.flatMap(s => s.tags))];

const Skills = ({ onTileClick }: SkillsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const shouldReduceMotion = useReducedMotion();
  const { dict } = useLanguage();

  const toggleTag = (tag: string) => {
    setActiveTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setActiveTags([]);
  };

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) || skill.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = activeTags.length === 0 || activeTags.every(tag => skill.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const isFiltering = searchTerm || activeTags.length > 0;

  return (
    <section id="skills" className="relative bg-background pixel-grid py-20 border-b border-border/60">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.02),transparent_70%)]" />
      
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="font-code text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">[SYS.COMPETENCIES // SKILLS_MATRIX]</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{dict.skills.title}</h2>
          <p className="mt-4 text-base text-muted-foreground leading-7">{dict.skills.subtitle}</p>
        </div>

        {/* Console control header */}
        <div className="glass-panel border-white/5 rounded-t-xl border-x border-t p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
            <Input 
              type="search" 
              placeholder={dict.skills.searchPlaceholder}
              className="pl-9 h-9 font-code text-xs bg-zinc-950/60 border-white/5 focus-visible:ring-primary/45 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {allTags.map(tag => (
              <button 
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 font-code text-[10px] uppercase tracking-wider rounded border transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                  activeTags.includes(tag)
                    ? 'bg-primary/20 text-primary border-primary/50'
                    : 'bg-white/[0.02] text-muted-foreground border-white/5 hover:border-white/20 hover:text-foreground'
                }`}
              >
                [{tag}]
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard filter details banner */}
        <div className="border-x border-white/5 bg-zinc-950/20 py-2.5 px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-code text-muted-foreground/60 border-b">
          <span>
            {dict.skills.filterBehavior}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              {dict.skills.legend.expert}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {dict.skills.legend.advanced}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary border border-white/10" />
              {dict.skills.legend.intermediate}
            </span>
          </div>
        </div>
      
      <div className={cn("relative", !isFiltering && "overflow-x-auto pb-2")}>
        <div className={cn(
          "relative grid gap-2",
          isFiltering
            ? "grid-cols-[repeat(auto-fill,minmax(120px,1fr))]"
            : "grid-cols-18 grid-rows-7 min-w-[960px]"
        )}>
          <AnimatePresence>
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                layout={!shouldReduceMotion}
                initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.8 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2, delay: index * 0.02 }}
                className={cn(
                  "min-h-[100px]",
                  !isFiltering && `col-start-${skill.col} row-start-${skill.row}`
                )}
              >
                <SkillTile skill={skill} onClick={() => onTileClick(skill.id)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      {filteredSkills.length === 0 && (
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">{dict.skills.noSkillsFound}</p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-3 inline-flex items-center rounded-md border border-border px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {dict.skills.clearFilters}
          </button>
        </div>
      )}
      </div>
    </section>
  );
};

export default Skills;

    
