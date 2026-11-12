import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import { Newsreader } from 'next/font/google'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import Navbar from '@/components/Navbar'
import { CONTACT_EMAIL, LINKEDIN_URL, POSITIONING } from '@/content'
import { SmoothScrollProvider } from '@/lib/providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// PP Editorial New no está disponible/licenciada en el repo.
// Newsreader es el fallback serif editorial más cercano (mismo espíritu).
// Cuando tengás la licencia de PP Editorial New, reemplazá esta línea
// con localFont() apuntando a los archivos en public/fonts/.
// Solo se usa peso 400 (normal + italic) en toda la landing — ver `font-normal`
// en cada `font-editorial`. Pedir 300/500 acá descargaría variantes sin uso.
const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['400'],
})

const SITE_URL = 'https://getsuplai.com'
// Mismo posicionamiento que el hero y la imagen Open Graph (content/index.ts).
const TITLE = POSITIONING.title
const DESCRIPTION = POSITIONING.description

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: 'Suplai',
  keywords: [
    'logística',
    'agentes de IA',
    'WhatsApp',
    'atención de llamadas',
    'automatización logística',
    'TMS',
    'WMS',
    'ERP',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_UY',
    url: SITE_URL,
    siteName: 'Suplai',
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
}

/* Datos estructurados (schema.org) — cómo Google entiende la marca. */
const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Suplai',
  url: SITE_URL,
  logo: `${SITE_URL}/brand/suplai-lockup-black.png`,
  email: CONTACT_EMAIL,
  description: DESCRIPTION,
  sameAs: [LINKEDIN_URL],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es-UY"
      className={`${inter.variable} ${newsreader.variable} ${GeistMono.variable}`}
    >
      <body className="bg-paper font-sans text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:rounded-md focus-visible:bg-white focus-visible:px-4 focus-visible:py-2.5 focus-visible:text-sm focus-visible:font-medium focus-visible:text-ink"
        >
          Saltar al contenido principal
        </a>
        <SmoothScrollProvider>
          <Navbar />
          {children}
        </SmoothScrollProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }}
        />

        {/* Google tag (gtag.js) con afterInteractive, para no competir con el LCP del hero */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MP07NLY22V"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MP07NLY22V');
          `}
        </Script>
      </body>
    </html>
  )
}
