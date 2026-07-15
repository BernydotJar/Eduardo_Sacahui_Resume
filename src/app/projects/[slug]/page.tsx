import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectCaseStudyPage from '@/components/ProjectCaseStudyPage';
import { projects } from '@/lib/data';
import { PRODUCTION_SITE_URL } from '@/lib/site';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

const shareableProjects = projects.filter((project) => project.category && project.caseStudy);

export const dynamicParams = false;

export function generateStaticParams() {
  return shareableProjects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = shareableProjects.find((item) => item.id === slug);
  if (!project) return {};

  const title = project.title;
  const description = `${project.maturity ? `${project.maturity}. ` : ''}${project.summary}`;
  const url = `${PRODUCTION_SITE_URL}/projects/${project.id}/`;
  const image = `${PRODUCTION_SITE_URL}/og-image.png`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'article', images: [{ url: image, width: 1200, height: 630, alt: project.title }] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = shareableProjects.find((item) => item.id === slug);
  if (!project) notFound();
  return <ProjectCaseStudyPage project={project} />;
}
