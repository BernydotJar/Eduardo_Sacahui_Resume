
"use client";

import type { Skill } from '@/lib/types';
import { useEasterEgg } from '@/components/context/EasterEggContext';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/components/context/LanguageContext';
import type { Locale } from '@/lib/i18n';

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

const getDeterministicDelay = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  const positiveHash = Math.abs(hash);
  return (positiveHash % 5) * 0.1;
};

const SkillTile = ({ skill, onClick }: SkillTileProps) => {
  const { isEasterEggActive } = useEasterEgg();
  const shouldReduceMotion = useReducedMotion();
  const { locale, dict } = useLanguage();
  const displayLevel = levelLabelMap[locale][skill.level] || skill.level;
  const pulseDelay = `${getDeterministicDelay(skill.id)}s`;
  const isTopRow = skill.row === 1;

  const tooltipPositionClass = isTopRow 
    ? "top-full mt-2 translate-y-[-4px] group-hover:translate-y-0 group-focus-within:translate-y-0"
    : "bottom-full mb-2 translate-y-[4px] group-hover:translate-y-0 group-focus-within:translate-y-0";

  return (
    <div className="group relative w-full h-full hover:z-20 focus-within:z-20 transition-all duration-200">
      <motion.button
        type="button"
        onClick={onClick}
        aria-label={`${dict.skills.ariaViewSkillDetails} ${skill.name}`}
        className={cn(
          "relative w-full h-full p-2 rounded-lg border-2 text-left transition-all duration-300 flex flex-col justify-between overflow-hidden",
          levelColorMap[skill.level] || 'border-muted',
          'hover:bg-accent/10 hover:border-accent hover:shadow-[0_0_15px_hsl(var(--accent))] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background'
        )}
        whileHover={
          shouldReduceMotion
            ? undefined
            : { scale: 1.04, transition: { type: 'spring', stiffness: 400, damping: 20 } }
        }
        whileTap={
          shouldReduceMotion
            ? undefined
            : { scale: 0.97, transition: { type: 'spring', stiffness: 600, damping: 15 } }
        }
      >
        {isEasterEggActive && !shouldReduceMotion && (
           <motion.div 
              className="absolute inset-0 animate-pulse-emerald rounded-lg"
              style={{ animationDelay: pulseDelay }}
          />
        )}
        <span
          aria-hidden="true"
          className="absolute right-2 top-2 font-code text-[10px] font-bold text-primary/70"
        >
          {(skill.row - 1) * 18 + skill.col}
        </span>
        <div className="relative min-w-0 w-full flex-1 flex flex-col justify-between">
          <div className="relative min-w-0">
            <div className="text-[10px] text-muted-foreground capitalize leading-none truncate pr-4">
              {displayLevel}
            </div>
            <span className="font-code text-2xl sm:text-3xl font-bold text-foreground/80 block mt-1 leading-none">
              {skill.symbol}
            </span>
          </div>
          <div className="relative min-w-0 w-full mt-2">
            <p className="text-xs sm:text-sm font-semibold truncate text-foreground">
              {skill.name}
            </p>
          </div>
        </div>
      </motion.button>
      
      <div
        className={cn(
          "pointer-events-none absolute left-1/2 z-30",
          "w-max max-w-[200px] -translate-x-1/2",
          "rounded-md border bg-background/95 px-3 py-1.5",
          "text-center text-xs text-foreground shadow-xl backdrop-blur-sm",
          "opacity-0 transition-all duration-150 ease-out",
          "group-hover:opacity-100 group-focus-within:opacity-100",
          tooltipPositionClass,
          skill.level === 'expert' && 'border-primary/60',
          skill.level === 'advanced' && 'border-accent/60',
          skill.level === 'intermediate' && 'border-secondary/60',
          !['expert', 'advanced', 'intermediate'].includes(skill.level) && 'border-border'
        )}
      >
        <div className="font-semibold text-foreground">{skill.name}</div>
        <div className="text-[10px] text-muted-foreground capitalize mt-0.5">{displayLevel}</div>
      </div>
    </div>
  );
};

export default SkillTile;
