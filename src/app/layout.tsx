import Script from 'next/script';
import { Inter, JetBrains_Mono } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { EasterEggProvider } from '@/components/context/EasterEggContext';
import { LanguageProvider } from '@/components/context/LanguageContext';
import { PRODUCTION_SITE_URL } from '@/lib/site';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION_SITE_URL;
const socialImage = `${siteUrl}/og-image.png`;

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono', display: 'swap', weight: ['700'] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Eduardo Sacahui | AI Product & Platform Engineering Leader',
    template: '%s | Eduardo Sacahui',
  },
  description: 'AI Product & Platform Engineering Leader building customer-facing AI products, agentic platforms, governed delivery systems, and enterprise transformation programs.',
  keywords: ['AI product engineering', 'AI platform engineering', 'agentic systems', 'RAG', 'technical product leadership', 'AI architecture', 'human-in-the-loop AI'],
  authors: [{ name: 'Eduardo Sacahui', url: siteUrl }],
  creator: 'Eduardo Sacahui',
  alternates: { canonical: siteUrl },
  other: { 'content-language': 'en, es, pt' },
  openGraph: {
    title: 'Eduardo Sacahui | AI Product & Platform Engineering Leader',
    description: 'Customer-facing AI products, agentic platforms, product strategy, hands-on architecture, delivery, and human-centered adoption.',
    url: siteUrl,
    siteName: 'Eduardo Sacahui — AI Product & Platform Engineering',
    images: [{ url: socialImage, width: 1200, height: 630, alt: 'Eduardo Sacahui — AI Product & Platform Engineering Leader' }],
    locale: 'en_US',
    alternateLocale: ['es_GT', 'pt_BR'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eduardo Sacahui | AI Product & Platform Engineering Leader',
    description: 'Building customer-facing AI products, agentic platforms, and AI-native delivery systems end to end.',
    images: [socialImage],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Eduardo Sacahui',
      url: siteUrl,
      jobTitle: 'AI Product & Platform Engineering Leader',
      sameAs: ['https://github.com/BernydotJar'],
      knowsAbout: ['AI product engineering', 'Agentic systems', 'Retrieval-augmented generation', 'AI platform architecture', 'Human-in-the-loop AI', 'Enterprise transformation'],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: 'Eduardo Sacahui — AI Product & Platform Engineering',
      url: siteUrl,
      inLanguage: ['en', 'es', 'pt'],
      author: { '@id': `${siteUrl}/#person` },
    },
    {
      '@type': 'ItemList',
      name: 'Selected AI Products',
      itemListElement: [
        { '@type': 'ListItem', position: 1, url: `${siteUrl}/projects/rice-command-center-demo-mode/`, name: 'Executive AI Assistant Pilot' },
        { '@type': 'ListItem', position: 2, url: `${siteUrl}/projects/la-muni-procedure-workflow-advisor/`, name: 'LA Muni Procedure Workflow Advisor' },
        { '@type': 'ListItem', position: 3, url: `${siteUrl}/projects/ai-recruiting-copilot/`, name: 'AI Recruiting Copilot Demo' },
      ],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetBrainsMono.variable}`}>
      <body className="font-body antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <Script defer data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN} src="https://plausible.io/js/script.js" />
        )}
        <EasterEggProvider>
          <LanguageProvider>
            {children}
            <Toaster />
          </LanguageProvider>
        </EasterEggProvider>
      </body>
    </html>
  );
}
