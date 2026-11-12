import MockupPanel from '@/components/product/MockupPanel'
import StatusPill from '@/components/product/StatusPill'
import { MOCKUPS } from '@/content'

/** Agente 04: agenda de turnos del día, con las piezas de lista y estado de Control. */
export default function AgendaMockup({ className }: { className?: string }) {
  const agenda = MOCKUPS.agenda
  return (
    <MockupPanel label={agenda.label} className={className}>
      <header className="border-b border-line px-3 py-2.5">
        <p className="text-xs font-semibold">{agenda.title}</p>
      </header>
      <ul className="divide-y divide-line">
        {agenda.slots.map((slot) => (
          <li key={slot.time} className="flex items-center gap-3 px-3 py-2.5">
            <span className="text-[11px] text-ink-muted tabular-nums">{slot.time}</span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-medium">{slot.title}</span>
              <span className="block text-[10px] text-ink-muted">{slot.who}</span>
            </span>
            <StatusPill state={slot.state} />
          </li>
        ))}
        <li className="flex items-center gap-3 px-3 py-2.5">
          <span className="text-[11px] text-ink-muted tabular-nums">{agenda.free.time}</span>
          <span className="flex-1 rounded-md border border-dashed border-line px-2 py-1.5 text-[11px] text-ink-muted">
            {agenda.free.title}
          </span>
        </li>
      </ul>
    </MockupPanel>
  )
}
