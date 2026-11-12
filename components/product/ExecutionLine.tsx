import { CONTROL_STATES, EXECUTION } from '@/content'
import type { ExecutionStep, FlowState } from '@/content'

/**
 * Línea de ejecución: la firma del sistema gráfico. Siempre en el mismo
 * orden: el canal por donde entra el pedido, el sistema donde queda cargado
 * y el estado. Solo se usan canales, sistemas y estados que existen en el
 * producto.
 */

type Tone = 'light' | 'dark'

const CHIP: Record<Tone, string> = {
  light: 'border-line text-ink',
  dark: 'border-line-inverse text-ink-inverse',
}

/** Sobre oscuro, Resuelto va en Celeste; sobre claro, en Azul. */
const DOT: Record<Tone, Record<FlowState, string>> = {
  light: { resolved: 'bg-state-resolved', running: 'bg-state-running', escalated: 'bg-state-escalated' },
  dark: { resolved: 'bg-state-resolved-inverse', running: 'bg-state-running', escalated: 'bg-state-escalated' },
}

type ExecutionLineProps = {
  step: ExecutionStep
  tone?: Tone
  className?: string
}

export default function ExecutionLine({ step, tone = 'light', className = '' }: ExecutionLineProps) {
  const chip = `rounded-md border px-2.5 py-1.5 ${CHIP[tone]}`
  const state = CONTROL_STATES[step.state]
  return (
    <p
      className={`flex flex-wrap items-center gap-2 text-[11px] leading-none font-medium tracking-[0.14em] uppercase ${className}`}
    >
      <span className="sr-only">
        {EXECUTION.label}. {step.channel}, {step.system}, {state}.
      </span>
      <span aria-hidden="true" className={chip}>
        {step.channel}
      </span>
      <span aria-hidden="true" className={tone === 'dark' ? 'text-caption' : 'text-ink-muted'}>
        →
      </span>
      <span aria-hidden="true" className={chip}>
        {step.system}
      </span>
      <span aria-hidden="true" className={`inline-flex items-center gap-2 ${chip}`}>
        <span className={`size-1.5 rounded-full ${DOT[tone][step.state]}`} />
        {state}
      </span>
    </p>
  )
}
