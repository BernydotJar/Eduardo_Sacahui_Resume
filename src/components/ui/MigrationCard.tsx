"use client";

import { MouseEvent as ReactMouseEvent, useRef } from "react";
import type { Project } from '@/lib/types';
import { useEasterEgg } from '@/components/context/EasterEggContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { medallionEasterEgg } from '@/data/medallion';
import { useLanguage } from '@/components/context/LanguageContext';

interface MigrationCardProps {
  migration: Project;
  onClick: () => void;
}

const MigrationCard = ({ migration, onClick }: MigrationCardProps) => {
  const { isEasterEggActive } = useEasterEgg();
  const { dict } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const renderSummary = () => {
    if (!isEasterEggActive || migration.id !== 'autotask-to-jira-fabric') {
        return <span className="block text-sm text-muted-foreground leading-6">{migration.summary}</span>;
    }

    return (
        <TooltipProvider>
            <p className="text-sm text-muted-foreground leading-6">
                Unified KPIs and self-service analytics across engineering & service. {' '}
                <Tooltip>
                    <TooltipTrigger className="text-primary underline decoration-dotted">Medallion</TooltipTrigger>
                    <TooltipContent>
                        <div className="space-y-1 p-1 text-xs">
                            <p><strong>Bronze:</strong> {medallionEasterEgg.bronze}</p>
                            <p><strong>Silver:</strong> {medallionEasterEgg.silver}</p>
                            <p><strong>Gold:</strong> {medallionEasterEgg.gold}</p>
                        </div>
                    </TooltipContent>
                </Tooltip>
            </p>
        </TooltipProvider>
    );
  }

  return (
    <button onClick={onClick} className="text-left h-full w-full block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-xl">
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="glass-panel relative flex h-full flex-col overflow-hidden rounded-xl border border-white/5 bg-zinc-950/40 p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 glow-card-hover"
      >
        {/* Card Grid Pattern */}
        <div className="absolute inset-0 pixel-grid pointer-events-none opacity-20" />
        
        <div className="relative z-10 flex-grow">
          <div className="font-code text-[9px] text-muted-foreground/30 mb-2.5 uppercase tracking-wider select-none">
            [SYS.MIG // {migration.id}]
          </div>
          <h3 className="text-lg font-bold leading-tight text-foreground tracking-tight">{migration.title}</h3>
          <div className="mt-3">{renderSummary()}</div>
        </div>

        <div className="relative z-10 mt-5 border-t border-white/5 pt-4">
          <p className="font-code text-[9px] font-bold uppercase tracking-wider text-muted-foreground/50 mb-2">[{dict.drawer.stack}]</p>
          <p className="text-xs text-foreground/80 font-mono bg-white/[0.01] border border-white/5 rounded px-2.5 py-1.5 leading-relaxed truncate">{migration.stack}</p>
        </div>

        <div className="relative z-10 mt-4 flex flex-wrap gap-1.5">
          {migration.outcomes?.map(outcome => (
            <span 
              key={outcome} 
              className="rounded border border-primary/20 bg-primary/[0.04] px-2 py-0.5 font-code text-[9px] uppercase tracking-wider text-primary"
            >
              {outcome}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
};

export default MigrationCard;
