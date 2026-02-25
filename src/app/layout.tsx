import Script from 'next/script';
import { Inter, JetBrains_Mono } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { EasterEggProvider } from '@/components/context/EasterEggContext';
import { LanguageProvider } from '@/components/context/LanguageContext';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://eduardosacahui.github.io/Eduardo_Sacahui_Resume';
const darkOgImage = `${siteUrl}/icon.svg`;

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['700'],
});

export const metadata: Metadata = {
  title: 'Eduardo Sacahui | AI Solution Architect & Technical Product Owner',
  description:
    'Portfolio of Eduardo Sacahui, an AI Solution Architect & Technical Product Owner specializing in AI-first apps, data platforms, and automation.',
  openGraph: {
    title: 'Eduardo Sacahui | AI Solution Architect & Technical Product Owner',
    description:
      'Explore the projects, skills, and experience of Eduardo Sacahui.',
    url: siteUrl,
    siteName: 'Eduardo Sacahui Portfolio',
    images: [
      {
        url: darkOgImage,
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eduardo Sacahui | AI Solution Architect & Technical Product Owner',
    description:
      'Portfolio of Eduardo Sacahui, specializing in AI-first apps, data platforms, and automation.',
    images: [darkOgImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetBrainsMono.variable}`}>
      <head />
      <body className="font-body antialiased">
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <Script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
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
