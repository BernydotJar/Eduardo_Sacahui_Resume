
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

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={`${dict.skills.ariaViewSkillDetails} ${skill.name}`}
      className={cn(
        "relative w-full h-full p-2 rounded-lg border-2 text-left transition-all duration-300 flex flex-col justify-between",
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
      <div className='relative'>
        <div className="text-[11px] text-muted-foreground capitalize leading-none">{displayLevel}</div>
        <span className="font-code text-3xl font-bold text-foreground/80">{skill.symbol}</span>
      </div>
      <div className="relative">
        <p className="text-sm font-semibold truncate text-foreground">{skill.name}</p>
      </div>
    </motion.button>
  );
};

export default SkillTile;
