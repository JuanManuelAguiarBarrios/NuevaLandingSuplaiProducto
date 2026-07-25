import { MANIFIESTO } from '@/content'
import LineReveal from '@/components/LineReveal'

/**
 * Manifiesto tipográfico (A1): una sola tesis en tipografía display que
 * frena el scroll entre el hero y "Qué pasa hoy". Sin CTA, sin ningún otro
 * elemento — el aire y el tamaño son la sección.
 */
export default function ManifiestoSection() {
  return (
    <section
      id="manifiesto"
      className="bg-white"
      style={{ paddingBlock: 'var(--section-py-lg)' }}
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <LineReveal
          text={MANIFIESTO.text}
          accent={MANIFIESTO.accent}
          as="h2"
          className="type-display max-w-[900px] font-editorial font-normal text-ink"
        />
      </div>
    </section>
  )
}
