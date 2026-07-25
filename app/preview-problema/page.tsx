import type { Metadata } from 'next'
import ProblemaPreview from '@/components/preview/ProblemaPreview'

/** Ruta temporal de maquetas — no linkeada, sin indexar. Se elimina al
 *  elegir la dirección del rediseño de "Qué pasa hoy / Qué cuesta". */
export const metadata: Metadata = {
  title: 'Preview — Problema (maquetas)',
  robots: { index: false, follow: false },
}

export default function PreviewProblemaPage() {
  return <ProblemaPreview />
}
