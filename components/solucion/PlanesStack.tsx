import Image from 'next/image'
import StatusPill from '@/components/product/StatusPill'
import { SOLUCION } from '@/content'

/**
 * Versión vertical del diagrama de tres planos para pantallas chicas,
 * donde el SVG en perspectiva queda con texto ilegible. Mismo contenido:
 * tus canales arriba, Suplai en el medio, tus sistemas abajo, los eventos
 * que viajan entre ellos y la escalación a tu equipo. Estática.
 */

const D = SOLUCION.diagram

function Chips({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-line bg-white p-4 shadow-sm">
      <p className="text-xs font-medium text-ink-muted">{title}</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item} className="rounded-md border border-line px-3 py-1.5 text-sm font-medium">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Tramo entre dos planos: la línea y los dos eventos que viajan por ella. */
function Link({ down, up }: { down: { label: string; state: 'running' | 'resolved' | 'escalated' }; up: typeof down }) {
  return (
    <div className="relative flex flex-col items-start gap-2 py-4 pl-8">
      <span aria-hidden="true" className="absolute inset-y-0 left-3 w-px bg-ink/25" />
      <StatusPill state={down.state} label={`↓ ${down.label}`} />
      <StatusPill state={up.state} label={`↑ ${up.label}`} />
    </div>
  )
}

export default function PlanesStack({ className = '' }: { className?: string }) {
  return (
    <div role="img" aria-label={D.label} className={className}>
      <div aria-hidden="true">
        <Chips title={D.canales.title} items={D.canales.items} />
        <Link down={D.flow.inbound} up={D.flow.reply} />
        <div className="rounded-xl border border-ink/50 bg-white p-4 shadow-sm">
          <Image src="/brand/suplai-lockup-black.png" alt="" width={110} height={30} quality={90} className="h-[30px] w-auto" />
          <p className="mt-2 text-sm text-ink-muted">{D.suplai.caption}</p>
          <p className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-3 text-xs text-ink-muted">
            <StatusPill state="escalated" label={D.escalation.label} />
            {D.escalation.caption}
          </p>
        </div>
        <Link down={D.flow.lookup} up={D.flow.update} />
        <Chips title={D.sistemas.title} items={D.sistemas.items} />
      </div>
    </div>
  )
}
