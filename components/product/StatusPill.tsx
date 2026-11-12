import { CONTROL_STATES } from '@/content'
import type { FlowState } from '@/content'

/**
 * Píldora de estado de Suplai Control: punto de color y etiqueta. El color
 * va solo en el punto; el texto queda en tinta para mantener el contraste.
 */

const DOT: Record<FlowState, string> = {
  running: 'bg-state-running',
  resolved: 'bg-state-resolved',
  escalated: 'bg-state-escalated',
}

interface StatusPillProps {
  state: FlowState
  /** Por defecto, la etiqueta del estado (En curso, Resuelto, Escalación). */
  label?: string
  className?: string
}

export function StateDot({ state, className = '' }: { state: FlowState; className?: string }) {
  return <span aria-hidden="true" className={`size-1.5 shrink-0 rounded-full ${DOT[state]} ${className}`} />
}

export default function StatusPill({ state, label, className = '' }: StatusPillProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-white px-2 py-0.5 text-[11px] leading-4 font-medium whitespace-nowrap text-ink ${className}`}
    >
      <StateDot state={state} />
      {label ?? CONTROL_STATES[state]}
    </span>
  )
}
