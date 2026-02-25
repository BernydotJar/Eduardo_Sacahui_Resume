
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
    <section id="skills" className="container">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{dict.skills.title}</h2>
        <p className="mt-4 text-lg text-muted-foreground">{dict.skills.subtitle}</p>
      </div>

      <div className="my-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder={dict.skills.searchPlaceholder}
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {allTags.map(tag => (
            <button 
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 text-sm rounded-full border transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                activeTags.includes(tag)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-secondary text-secondary-foreground border-secondary hover:bg-muted'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground -mt-4 mb-3">
        {dict.skills.filterBehavior}
      </p>

      <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          {dict.skills.legend.expert}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          {dict.skills.legend.advanced}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
          {dict.skills.legend.intermediate}
        </span>
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
    </section>
  );
};

export default Skills;

    
