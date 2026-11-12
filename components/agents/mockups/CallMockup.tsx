import MockupPanel, { Thread } from '@/components/product/MockupPanel'
import StatusPill from '@/components/product/StatusPill'
import { PhoneIcon } from '@/components/product/icons'
import { MOCKUPS } from '@/content'
import { keepCodesTogether } from '@/lib/text'

/** Alturas de las barras de la onda de voz, en px. */
const WAVE = [6, 10, 16, 12, 18, 9, 14, 7, 12, 16, 8, 5]

/** Agente 02: llamada en curso con su transcripción, como en Llamadas de Control. */
export default function CallMockup({ className }: { className?: string }) {
  const call = MOCKUPS.voice
  return (
    <MockupPanel label={call.label} className={className}>
      <header className="flex items-center gap-2.5 border-b border-line px-3 py-2.5">
        <span className="relative flex size-7 shrink-0 items-center justify-center rounded-full bg-paper text-ink">
          <span className="absolute inset-0 rounded-full border border-state-running motion-safe:animate-ping" />
          <PhoneIcon />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold">
            {call.status} con {call.caller}
          </p>
          <p className="text-[10px] text-ink-muted">{keepCodesTogether(call.detail)}</p>
        </div>
        <StatusPill state={call.state} />
      </header>
      <div className="px-3 py-3">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-[10px] font-semibold tracking-wide text-ink-muted uppercase">{call.transcript}</p>
          <div className="flex h-5 items-center gap-[3px]">
            {WAVE.map((height, i) => (
              <span key={i} style={{ height }} className="w-[2px] rounded-full bg-ink/30" />
            ))}
          </div>
        </div>
        <Thread messages={call.turns} contact={call.caller} />
      </div>
    </MockupPanel>
  )
}
