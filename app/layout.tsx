import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Newsreader } from 'next/font/google'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import Navbar from '@/components/Navbar'
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
const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['300', '400', '500'],
})

const SITE_URL = 'https://getsuplai.com'
const TITLE = 'Suplai — Automatización logística con agentes de IA'
const DESCRIPTION =
  'Suplai es la capa operativa que conecta a tus sistemas actuales y automatiza la coordinación logística con agentes de IA. Sin migraciones, sin cambios en tu flujo.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s · Suplai',
  },
  description: DESCRIPTION,
  applicationName: 'Suplai',
  keywords: [
    'logística',
    'agentes de IA',
    'automatización logística',
    'coordinación operativa',
    'TMS',
    'WMS',
    'ERP',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${newsreader.variable} ${GeistMono.variable}`}
    >
      <body className="font-sans bg-white text-text antialiased">
        <SmoothScrollProvider>
          <Navbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
