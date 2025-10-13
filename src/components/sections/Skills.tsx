
"use client";

import { useState } from 'react';
import { skills } from '@/lib/data';
import SkillTile from '@/components/ui/SkillTile';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkillsProps {
  onTileClick: (skillId: string) => void;
}

const allTags = [...new Set(skills.flatMap(s => s.tags))];

const Skills = ({ onTileClick }: SkillsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setActiveTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
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
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Periodic Table of Skills</h2>
        <p className="mt-4 text-lg text-muted-foreground">An exhaustive list of my technical capabilities.</p>
      </div>

      <div className="my-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search skills..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {allTags.map(tag => (
            <button 
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 text-sm rounded-full border transition-colors ${
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
      
      <div className={cn(
        "relative grid gap-1",
        isFiltering 
          ? "grid-cols-[repeat(auto-fill,minmax(120px,1fr))]"
          : "grid-cols-18 grid-rows-7"
      )}>
        <AnimatePresence>
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
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
      {filteredSkills.length === 0 && (
        <p className="text-center text-muted-foreground mt-8">No skills found. Try adjusting your search or filters.</p>
      )}
    </section>
  );
};

export default Skills;

    