import type { MetadataRoute } from 'next';
import { PRODUCTION_SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION_SITE_URL;
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
