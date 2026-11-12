import Image from 'next/image'
import { APOYOS, CLIENTES } from '@/content'

/**
 * Banda clara: los clientes en una fila fija y, debajo, la fila "Apoyados
 * por" con los respaldos institucionales (separados para no confundirlos
 * con clientes). Sin movimiento: con pocos logos, repetirlos en loop se
 * lee como relleno y no se puede pausar con teclado.
 */

const LOGO_H = 44
const LOGO_MAX_W = 160

export default function ClientesSection() {
  return (
    <section data-tone="light" aria-labelledby="clientes-title" className="border-b border-line bg-paper py-10 text-ink lg:py-12">
      <div className="flex flex-col gap-6 px-5 sm:px-8 lg:flex-row lg:items-center lg:gap-10 lg:px-12">
        <h2 id="clientes-title" className="eyebrow shrink-0 text-ink-muted lg:w-40">
          {CLIENTES.title}
        </h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:flex-1">
          {CLIENTES.logos.map((logo) => (
            <li key={logo.name} className="flex h-20 items-center justify-center bg-white px-5 lg:h-24">
              <Image
                src={logo.src}
                alt={logo.name}
                width={Math.min(LOGO_MAX_W, Math.round(LOGO_H * logo.ratio))}
                height={LOGO_H}
                unoptimized
                className="h-auto max-h-11 w-auto max-w-full object-contain"
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 flex flex-col gap-5 border-t border-line px-5 pt-8 sm:flex-row sm:items-center sm:gap-10 sm:px-8 lg:px-12">
        <h3 className="eyebrow shrink-0 text-ink-muted lg:w-40">{APOYOS.title}</h3>
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
