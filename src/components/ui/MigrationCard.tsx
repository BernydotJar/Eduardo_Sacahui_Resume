"use client";

import type { Project } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEasterEgg } from '@/components/context/EasterEggContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { medallionEasterEgg } from '@/data/medallion';

interface MigrationCardProps {
  migration: Project;
  onClick: () => void;
}

const MigrationCard = ({ migration, onClick }: MigrationCardProps) => {
  const { isEasterEggActive } = useEasterEgg();

  const renderSummary = () => {
    if (!isEasterEggActive || migration.id !== 'autotask-to-jira-fabric') {
        return <CardDescription>{migration.summary}</CardDescription>;
    }

    return (
        <TooltipProvider>
            <p className="text-sm text-muted-foreground">
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
    <button onClick={onClick} className="text-left h-full">
        <Card className="h-full flex flex-col hover:border-primary transition-colors hover:shadow-lg hover:shadow-primary/10">
        <CardHeader>
            <CardTitle className="text-xl">{migration.title}</CardTitle>
            {renderSummary()}
        </CardHeader>
        <CardContent className="flex-grow">
            <p className="text-sm font-semibold text-muted-foreground mb-2">Stack</p>
            <p className="text-sm text-foreground/80">{migration.stack}</p>
        </CardContent>
        <CardFooter>
            <div className="flex flex-wrap gap-2">
            {migration.outcomes?.map(outcome => (
                <Badge key={outcome} variant="secondary">{outcome}</Badge>
            ))}
            </div>
        </CardFooter>
        </Card>
    </button>
  );
};

export default MigrationCard;
