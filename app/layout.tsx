import type { Metadata } from 'next'
import Script from 'next/script'
import { Geist } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import WhatsappFloat from '@/components/WhatsappFloat'
import { CONTACT_EMAIL, LINKEDIN_URL, POSITIONING } from '@/content'
import { SmoothScrollProvider } from '@/lib/providers'

// Geist es la única familia de la marca, la misma que usa Suplai Control.
// Es variable: el peso 460 de los titulares sale del mismo archivo.
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
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
      className={geist.variable}
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
          <WhatsappFloat />
        </SmoothScrollProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }}
        />

        {/* Google tag (gtag.js) con lazyOnload: baja cuando el navegador queda libre,
            después de la carga de la página, y no compite con el contenido. */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MP07NLY22V"
          strategy="lazyOnload"
        />
        <Script id="gtag-init" strategy="lazyOnload">
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
