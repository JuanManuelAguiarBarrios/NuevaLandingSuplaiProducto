import MockupPanel from '@/components/product/MockupPanel'
import StatusPill from '@/components/product/StatusPill'
import { UserIcon } from '@/components/product/icons'
import { MOCKUPS } from '@/content'
import { keepCodesTogether } from '@/lib/text'

/** Agente 05: incidencia que el agente detecta y escala a una persona del equipo. */
export default function IncidentMockup({ className }: { className?: string }) {
  const incident = MOCKUPS.incidencias
  const lastStep = incident.timeline.length - 1
  return (
    <MockupPanel label={incident.label} className={className}>
      <header className="border-b border-line px-3 py-2.5">
        <StatusPill state={incident.state} />
        <p className="mt-2 text-xs font-semibold">{keepCodesTogether(incident.title)}</p>
        <p className="mt-0.5 text-[10px] text-ink-muted">{incident.detail}</p>
      </header>
      <ol className="px-3 py-3">
        {incident.timeline.map((step, i) => (
          <li key={step} className="relative flex items-center gap-2.5 pb-3 text-[11px] last:pb-0">
            {i < lastStep && <span className="absolute top-3 left-[3px] h-full w-px bg-line" />}
            <span
              className={`relative size-[7px] shrink-0 rounded-full ${i === lastStep ? 'bg-state-escalated' : 'bg-ink/30'}`}
            />
            <span className={i === lastStep ? 'font-medium' : 'text-ink-muted'}>{step}</span>
          </li>
        ))}
      </ol>
      <div className="flex justify-end border-t border-line bg-paper/50 px-3 py-2.5">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-ink px-2.5 py-1.5 text-[11px] font-medium text-white">
          <UserIcon className="size-3.5" />
          {incident.action}
        </span>
      </div>
    </MockupPanel>
  )
}
