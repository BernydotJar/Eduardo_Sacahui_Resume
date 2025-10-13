import { projects } from '@/lib/data';
import MigrationCard from '@/components/ui/MigrationCard';

const migrationIds = [
  'pentaho-to-powerbi',
  'alteryx-to-powerautomate',
  'autotask-to-jira-fabric',
  'project-enola-migration',
];

const signatureMigrations = projects.filter(p => migrationIds.includes(p.id));

interface MigrationsProps {
    onCardClick: (projectId: string) => void;
}

const Migrations = ({ onCardClick }: MigrationsProps) => {
  return (
    <section id="migrations" className="bg-secondary">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Signature Migrations</h2>
          <p className="mt-4 text-lg text-muted-foreground">Proven experience in re-platforming and modernization.</p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {signatureMigrations.map(migration => (
            <MigrationCard key={migration.id} migration={migration} onClick={() => onCardClick(migration.id)} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Migrations;

    