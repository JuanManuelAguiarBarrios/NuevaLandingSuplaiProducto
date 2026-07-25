import type { Metadata } from 'next'
import HeroEntrancePreview from '@/components/preview/HeroEntrancePreview'

/** Ruta temporal de maquetas — no linkeada, sin indexar. Se elimina al
 *  aprobar/descartar los módulos de la secuencia de entrada del hero. */
export const metadata: Metadata = {
  title: 'Preview — Entrada del hero (maquetas)',
  robots: { index: false, follow: false },
}

export default function PreviewHeroPage() {
  return <HeroEntrancePreview />
}
