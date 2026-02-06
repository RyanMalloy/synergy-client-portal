import type { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Synergy Development | Modern Web Design for Ohio Businesses',
    template: '%s | Synergy Development',
  },
  description:
    'Modern, professional web design and development for Ohio businesses. Transform your web presence with Synergy Development.',
  keywords: [
    'web design',
    'web development',
    'Ohio',
    'Dublin',
    'website redesign',
    'modern web design',
  ],
  authors: [{ name: 'Synergy Development LLC' }],
  creator: 'Synergy Development LLC',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://synergy.dev',
    siteName: 'Synergy Development',
    title: 'Synergy Development | Modern Web Design for Ohio Businesses',
    description:
      'Modern, professional web design and development for Ohio businesses.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Synergy Development',
    description: 'Modern web design for Ohio businesses',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-white focus:text-synergy-blue focus:rounded-lg"
        >
          Skip to main content
        </a>

        <Header />

        <main id="main-content" role="main">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
