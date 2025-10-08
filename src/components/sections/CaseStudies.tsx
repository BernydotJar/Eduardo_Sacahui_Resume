import { projects } from '@/lib/data';
import CaseStudyCard from '@/components/ui/CaseStudyCard';

const caseStudyIds = [
    'ops-second-brain',
    'rag-knowledge-services',
    'orchestrator-k8s',
];

const caseStudies = projects.filter(p => caseStudyIds.includes(p.id));

interface CaseStudiesProps {
    onCardClick: (projectId: string) => void;
}

const CaseStudies = ({ onCardClick }: CaseStudiesProps) => {
    return (
        <section id="casestudies" className="bg-secondary">
            <div className="container">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Case Studies</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Deep dives into impactful projects.</p>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-3">
                    {caseStudies.map(project => (
                        <CaseStudyCard key={project.id} project={project} onClick={() => onCardClick(project.id)} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CaseStudies;
