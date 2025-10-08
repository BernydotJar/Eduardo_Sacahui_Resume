import type { Project } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CaseStudyCardProps {
  project: Project;
  onClick: () => void;
}

const CaseStudyCard = ({ project, onClick }: CaseStudyCardProps) => {
  return (
    <Card className="hover:border-primary transition-colors hover:shadow-lg hover:shadow-primary/10 flex flex-col h-full">
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.summary}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex items-end">
        <Button variant="outline" onClick={onClick} className="w-full">
          View Details <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default CaseStudyCard;
