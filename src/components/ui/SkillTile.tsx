
"use client";

import type { Skill } from '@/lib/types';
import { useEasterEgg } from '@/components/context/EasterEggContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SkillTileProps {
  skill: Skill;
  onClick: () => void;
}

const levelColorMap: { [key: string]: string } = {
  expert: 'border-primary shadow-primary/20',
  advanced: 'border-accent shadow-accent/20',
  intermediate: 'border-secondary',
  education: 'border-muted/30',
  legacy: 'border-muted/50'
};

const SkillTile = ({ skill, onClick }: SkillTileProps) => {
  const { isEasterEggActive } = useEasterEgg();

  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "relative w-full h-full p-2 rounded-lg border-2 text-left transition-all duration-300 flex flex-col justify-between",
        levelColorMap[skill.level] || 'border-muted',
        'hover:bg-accent/10 hover:border-accent hover:shadow-[0_0_15px_hsl(var(--accent))] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background'
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isEasterEggActive && (
         <motion.div 
            className="absolute inset-0 animate-pulse-emerald rounded-lg"
            style={{ animationDelay: `${Math.random() * 0.5}s` }}
        />
      )}
      <div className='relative'>
        <div className="text-[10px] text-muted-foreground capitalize">{skill.level}</div>
        <span className="font-code text-3xl font-bold text-foreground/80">{skill.symbol}</span>
      </div>
      <div className="relative">
        <p className="text-sm font-semibold truncate text-foreground">{skill.name}</p>
      </div>
    </motion.button>
  );
};

export default SkillTile;
