import Image from 'next/image'
import Marquee from '@/components/Marquee'
import { APOYOS, CLIENTES } from '@/content'

/**
 * Banda clara: marquee de clientes y, debajo, la fila fija "Apoyados por"
 * con los respaldos institucionales (separados para no confundirlos con
 * clientes). La lista de clientes se repite dentro de cada copia del
 * marquee para que la pista sea más ancha que cualquier viewport.
 */

const REPEATS = 4
const LOGO_H = 44
const LOGO_MAX_W = 160

export default function ClientesSection() {
  return (
    <section data-tone="light" aria-labelledby="clientes-title" className="border-b border-line bg-paper py-10 text-ink lg:py-12">
      <div className="px-5 sm:px-8 lg:px-12">
        <h2 id="clientes-title" className="eyebrow text-ink-muted">
          {CLIENTES.title}
        </h2>
      </div>

      <Marquee durationClass="[--marquee-duration:45s]" className="mt-8">
        <ul className="flex gap-3 pr-3">
          {Array.from({ length: REPEATS }, (_, r) =>
            CLIENTES.logos.map((logo) => (
              <li
                key={`${logo.name}-${r}`}
                aria-hidden={r > 0 ? true : undefined}
                className="flex h-20 w-44 shrink-0 items-center justify-center bg-white px-5 lg:h-24 lg:w-52"
              >
                <Image
                  src={logo.src}
                  alt={r > 0 ? '' : logo.name}
                  width={Math.min(LOGO_MAX_W, Math.round(LOGO_H * logo.ratio))}
                  height={LOGO_H}
                  unoptimized
                  className="h-auto max-h-11 w-auto max-w-full object-contain"
                />
              </li>
            )),
          )}
        </ul>
      </Marquee>

      <div className="mt-10 flex flex-col gap-5 border-t border-line px-5 pt-8 sm:flex-row sm:items-center sm:gap-10 sm:px-8 lg:px-12">
        <h3 className="eyebrow shrink-0 text-ink-muted">{APOYOS.title}</h3>
        <ul className="flex flex-wrap items-center gap-x-10 gap-y-6 lg:gap-x-14">
          {APOYOS.items.map((item) => (
            <li key={item.name}>
              {/* Alto por logo (dato de contenido): iguala el peso visual entre formatos muy distintos. */}
              <Image
                src={item.src}
                alt={item.fullName}
                width={Math.round(item.height * item.ratio)}
                height={item.height}
                unoptimized
                style={{ height: item.height }}
                className="w-auto opacity-75 grayscale transition-[filter,opacity] duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
