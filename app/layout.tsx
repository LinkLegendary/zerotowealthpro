import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  verification: {
    google: 'WlHPyV2SKreAqYI7SbWfoGb-SQTmlmZhIbZrRBrDxR4', // 👈 paste your code here (only the content value)
  },
  metadataBase: new URL('https://zerotowealthpro.com'),
  title: {
    default: 'Zero to Wealth Pro',
    template: '%s | Zero to Wealth Pro',
  },
  icons: {
    icon: '/zwp.png',
  },
  description:
    'Structured debt payoff systems, calculators, and real-world financial breakdowns.',
  keywords: [
    'debt snowball',
    'debt avalanche',
    'debt payoff calculator',
    'how to pay off debt fast',
    'credit card payoff strategy',
    'minimum payment trap',
    'debt reduction plan',
    'personal finance tips',
    'budgeting for beginners',
    'how to get out of debt',
  ],
  authors: [{ name: 'Zero to Wealth Pro' }],
  openGraph: {
    title: 'Zero to Wealth Pro',
    description:
      'Structured debt payoff systems and practical financial tools.',
    url: 'https://zerotowealthpro.com',
    siteName: 'Zero to Wealth Pro',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1544364422137939"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>

      <body>{children}</body>
    </html>
  );
}
