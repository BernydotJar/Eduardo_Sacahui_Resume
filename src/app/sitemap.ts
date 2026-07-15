import type { MetadataRoute } from 'next';
import { projects } from '@/lib/data';
import { PRODUCTION_SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION_SITE_URL;
  const projectRoutes = projects
    .filter((project) => project.category && project.caseStudy)
    .map((project) => ({
      url: `${siteUrl}/projects/${project.id}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: project.category === 'customer-ai-product' ? 0.9 : 0.75,
    }));

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    ...projectRoutes,
  ];
}
