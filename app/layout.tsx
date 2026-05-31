import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { AppShell } from '@/components/layout/AppShell';
import { LocaleProvider } from '@/contexts/LocaleContext';
import { DocumentLang } from '@/components/layout/DocumentLang';
import { SITE_URL } from '@/lib/site';
import { OG_IMAGE } from '@/lib/images';

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '600'],
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'RockIsland Rimini | Ristorante sul mare',
    template: '%s | RockIsland Rimini',
  },
  description:
    'Ristorante, bar ed eventi a 400 metri nel mare Adriatico. Tramonti, musica, pesce e cocktail sul Molo di Levante a Rimini.',
  openGraph: {
    title: 'RockIsland Rimini | Ristorante sul mare',
    description:
      '400 metri nel mare. Tramonti, musica, cena. RockIsland — Molo di Levante, Rimini.',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'RockIsland Rimini — vista dal Molo di Levante',
      },
    ],
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RockIsland Rimini',
    description:
      'Ristorante e bar sul molo: pesce, pizza, cocktail ed eventi sul mare.',
    images: [OG_IMAGE],
  },
  /** Lingue gestite lato client senza URL dedicati: niente hreflang ingannevole */
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0D1B2A',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'RockIsland',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Molo di Levante, Largo Ruggero Boscovich',
    addressLocality: 'Rimini',
    postalCode: '47921',
    addressCountry: 'IT',
  },
  telephone: '+3905411497100',
  servesCuisine: ['Seafood', 'Italian', 'Cocktails'],
  priceRange: '€€',
  openingHours: 'Mo-Su 17:30-01:00',
  url: SITE_URL,
};

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="it"
      suppressHydrationWarning
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-navy font-sans">
        {gaMeasurementId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaMeasurementId}');`}
            </Script>
          </>
        ) : null}
        <LocaleProvider>
          <DocumentLang />
          <AppShell>{children}</AppShell>
        </LocaleProvider>
      </body>
    </html>
  );
}
