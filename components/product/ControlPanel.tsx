import Image from 'next/image'
import MockupPanel from '@/components/product/MockupPanel'
import StatusPill, { StateDot } from '@/components/product/StatusPill'
import { ChannelIcon } from '@/components/product/icons'
import { SOLUCION } from '@/content'
import { keepCodesTogether } from '@/lib/text'

/**
 * Vista de Suplai Control: barra lateral, encabezado y la actividad
 * reciente con los tres estados (En curso, Resuelto, Escalación).
 * `isCompact` deja solo la lista, para espacios chicos.
 */

const C = SOLUCION.control
const COMPACT_ITEMS = 3

type ControlPanelProps = {
  isCompact?: boolean
  className?: string
}

function Sidebar() {
  return (
    <aside className="hidden w-44 shrink-0 border-r border-line bg-paper/60 px-3 py-4 md:block">
      <Image src="/brand/suplai-lockup-black.svg" alt="" width={75} height={20} unoptimized className="h-5 w-auto" />
      <ul className="mt-5 space-y-0.5 text-xs">
        {C.nav.map((item) => (
          <li
            key={item}
            className={`rounded-md px-2 py-1.5 ${item === C.page ? 'bg-white font-medium shadow-sm' : 'text-ink-muted'}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default function ControlPanel({ isCompact = false, className }: ControlPanelProps) {
  const items = isCompact ? C.items.slice(0, COMPACT_ITEMS) : C.items
  return (
    <MockupPanel label={C.label} className={className}>
      <div className="flex">
        {!isCompact && <Sidebar />}
        <div className="min-w-0 flex-1">
          <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
            <p className="text-xs font-medium">{C.page}</p>
            <p className="flex items-center gap-1.5 text-[10px] text-ink-muted">
              <StateDot state="resolved" className="motion-safe:animate-pulse" />
              {C.live}
            </p>
          </header>

          <div className={isCompact ? '' : 'p-4 sm:p-5'}>
            {!isCompact && <p className="text-base font-semibold tracking-tight sm:text-lg">{C.heading}</p>}
            <div className={isCompact ? '' : 'mt-4 rounded-xl border border-line'}>
              <div className="border-b border-line px-4 py-3">
                <p className="text-xs font-semibold">{C.feedTitle}</p>
                <p className="mt-0.5 text-[11px] text-ink-muted">{C.feedBody}</p>
              </div>
              <ul className="divide-y divide-line">
                {items.map((item) => (
                  <li key={item.title} className="flex items-center gap-3 px-4 py-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-paper text-ink-muted">
                      <ChannelIcon channel={item.channel} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-medium">{item.title}</span>
                      <span className="block text-[11px] text-ink-muted">{keepCodesTogether(item.detail)}</span>
                    </span>
                    <StatusPill state={item.state} />
                    <span className="hidden text-[10px] text-ink-muted tabular-nums sm:block">{item.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MockupPanel>
  )
}
