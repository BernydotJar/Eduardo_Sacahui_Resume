import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { EasterEggProvider } from '@/components/context/EasterEggContext';
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: 'Eduardo Sacahui | Platform Architect & Engineering Lead',
  description:
    'Portfolio of Eduardo Sacahui, a Platform Architect & Engineering Lead specializing in AI-First Apps, Data Platforms, and Automation.',
  openGraph: {
    title: 'Eduardo Sacahui | Platform Architect & Engineering Lead',
    description:
      'Explore the projects, skills, and experience of Eduardo Sacahui.',
    url: 'https://eduardo-sacahui-portfolio.com', // Replace with actual domain
    siteName: 'Eduardo Sacahui Portfolio',
    images: [
      {
        url: 'https://eduardo-sacahui-portfolio.com/og-image.png', // Replace with actual OG image URL
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eduardo Sacahui | Platform Architect & Engineering Lead',
    description:
      'Portfolio of Eduardo Sacahui, specializing in AI-First Apps, Data Platforms, and Automation.',
    images: ['https://eduardo-sacahui-portfolio.com/og-image.png'], // Replace with actual OG image URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <EasterEggProvider>
          {children}
          <Toaster />
        </EasterEggProvider>
        <Analytics />
      </body>
    </html>
  );
}
