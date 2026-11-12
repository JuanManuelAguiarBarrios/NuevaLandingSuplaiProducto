import { CONTROL_STATES } from '@/content'
import type { FlowState } from '@/content'

/**
 * Etiqueta de estado del sistema gráfico: punto de color y texto en
 * mayúscula chica, dentro de una caja de línea fina. El color va solo en el
 * punto; el texto queda en tinta para mantener el contraste.
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
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-md border border-line bg-white px-2 py-1 text-[10px] leading-none font-medium tracking-[0.1em] whitespace-nowrap text-ink uppercase ${className}`}
    >
      <StateDot state={state} />
      {label ?? CONTROL_STATES[state]}
    </span>
  )
}
