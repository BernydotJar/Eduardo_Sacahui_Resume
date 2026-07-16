
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
  expert: 'border-emerald-500/20 bg-emerald-950/5 text-emerald-400 hover:border-emerald-400 hover:text-emerald-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.25)]',
  advanced: 'border-cyan-500/20 bg-cyan-950/5 text-cyan-400 hover:border-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.25)]',
  intermediate: 'border-pink-500/20 bg-pink-950/5 text-pink-400 hover:border-pink-400 hover:text-pink-300 hover:shadow-[0_0_15px_rgba(244,114,182,0.25)]',
  education: 'border-white/5 bg-zinc-950/20 text-muted-foreground hover:border-white/20',
  legacy: 'border-white/5 bg-zinc-950/20 text-muted-foreground hover:border-white/20'
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
          "relative w-full h-full p-2.5 rounded-lg border text-left transition-all duration-300 flex flex-col justify-between overflow-hidden bg-zinc-950/45",
          levelColorMap[skill.level] || 'border-white/5',
          'focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 focus:ring-offset-background'
        )}
        whileHover={
          shouldReduceMotion
            ? undefined
            : { scale: 1.05, y: -2, transition: { type: 'spring', stiffness: 450, damping: 22 } }
        }
        whileTap={
          shouldReduceMotion
            ? undefined
            : { scale: 0.97, transition: { type: 'spring', stiffness: 600, damping: 15 } }
        }
      >
        {/* Subtle grid pattern inside each tile */}
        <div className="absolute inset-0 pixel-grid pointer-events-none opacity-[0.08]" />

        {isEasterEggActive && !shouldReduceMotion && (
           <motion.div 
              className="absolute inset-0 animate-pulse-emerald rounded-lg"
              style={{ animationDelay: pulseDelay }}
          />
        )}
        <span
          aria-hidden="true"
          className="absolute right-2 top-2 font-code text-[9px] font-bold text-muted-foreground/35 select-none"
        >
          {(skill.row - 1) * 18 + skill.col}
        </span>
        <div className="relative min-w-0 w-full flex-1 flex flex-col justify-between">
          <div className="relative min-w-0">
            <div className="font-code text-[8px] uppercase tracking-wider text-muted-foreground/50 leading-none truncate pr-4">
              {displayLevel}
            </div>
            <span className="font-code text-2xl sm:text-3.5xl font-bold block mt-1.5 leading-none">
              {skill.symbol}
            </span>
          </div>
          <div className="relative min-w-0 w-full mt-2.5">
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
