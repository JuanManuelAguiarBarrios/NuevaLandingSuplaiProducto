import { PANEL } from '@/content'

/**
 * Mockup del panel de Suplai: constructor de flujos agénticos con ramas
 * (izquierda) cuyo resultado se plasma en un dashboard de actividad
 * (derecha). Hecho en código dentro del design system — nítido en cualquier
 * resolución y editable cuando el producto real cambie. Datos ilustrativos
 * genéricos (roles, sin nombres ni casos reales).
 */

type Actor = 'agente' | 'equipo'

function Chip({ tone, children }: { tone: 'primary' | 'neutral'; children: React.ReactNode }) {
  const styles =
    tone === 'primary'
      ? 'border-primary/30 bg-primary/10 text-primary'
      : 'border-border bg-white text-muted'
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.08em] ${styles}`}
    >
      {children}
    </span>
  )
}

function FlowNode({
  tipo,
  title,
  isAccent = false,
}: {
  tipo: string
  title: string
  isAccent?: boolean
}) {
  return (
    <div
      className={`inline-flex flex-col gap-0.5 rounded-lg border px-3 py-2 ${
        isAccent ? 'border-primary/40 bg-primary/5' : 'border-border bg-white'
      }`}
    >
      <span className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-muted">
        {tipo}
      </span>
      <span className="font-sans text-[11.5px] font-medium text-ink">{title}</span>
    </div>
  )
}

function StepPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-border bg-white px-2 py-1 font-sans text-[10.5px] font-light text-ink">
      {children}
    </span>
  )
}

function BranchArrow() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="#9CA3AF"
      strokeWidth="1.25"
      strokeLinecap="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M1 5h7M5.5 2.5L8 5 5.5 7.5" />
    </svg>
  )
}

/** Rama del flujo: condición → pasos encadenados → quién la resuelve. */
function Branch({ rama }: { rama: (typeof PANEL.flujo.ramas)[number] }) {
  return (
    <li className="group relative py-2 pl-6 last:pb-0">
      {/* Codo del árbol: tick horizontal hacia la card */}
      <span className="absolute left-0 top-1/2 h-px w-5 bg-border" aria-hidden="true" />
      {/* Borra la línea vertical del contenedor debajo del último codo */}
      <span
        className="absolute -left-px bottom-0 top-1/2 hidden w-px bg-white group-last:block"
        aria-hidden="true"
      />
      <div className="flex flex-wrap items-center gap-1.5">
        <Chip tone={rama.actor === 'agente' ? 'primary' : 'neutral'}>{rama.cond}</Chip>
        {rama.pasos.map((paso) => (
          <span key={paso} className="flex items-center gap-1.5">
            <BranchArrow />
            <StepPill>{paso}</StepPill>
          </span>
        ))}
        <span className="ml-0.5 font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
          {rama.actor}
        </span>
      </div>
    </li>
  )
}

export default function SuplaiPanelMockup() {
  const { flujo, dashboard } = PANEL

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white shadow-[0_24px_60px_-28px_rgba(10,10,10,0.22)]">

      {/* Chrome de ventana */}
      <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-border" />
        </div>
        <span className="font-mono text-[10px] text-muted">{PANEL.chrome}</span>
        <span className="w-12" aria-hidden="true" />
      </div>

      <div className="grid lg:grid-cols-[1.25fr_1fr]">

        {/* Constructor de flujo con ramas */}
        <div className="border-b border-border lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between gap-3 border-b border-border-light px-4 py-3">
            <p className="eyebrow text-muted">{flujo.label}</p>
            <Chip tone="primary">{flujo.estado}</Chip>
          </div>

          <div className="p-4 md:p-5">
            <FlowNode tipo={flujo.trigger.tipo} title={flujo.trigger.title} />
            <div className="ml-[18px] h-4 w-px bg-border" aria-hidden="true" />
            <FlowNode tipo={flujo.agente.tipo} title={flujo.agente.title} isAccent />

            {/* Árbol de ramas */}
            <ul className="ml-[18px] mt-1 border-l border-border">
              {flujo.ramas.map((rama) => (
                <Branch key={rama.cond} rama={rama} />
              ))}
            </ul>
          </div>
        </div>

        {/* Dashboard de actividad: cada ejecución de una rama, plasmada */}
        <div>
          <div className="border-b border-border-light px-4 py-3">
            <p className="eyebrow text-muted">{dashboard.label}</p>
          </div>
          <ul className="divide-y divide-border-light">
            {dashboard.eventos.map((e, i) => (
              <li key={i} className="flex items-center gap-3 px-4 py-2.5">
                <span className="w-9 shrink-0 font-mono text-[10px] tabular-nums text-muted">
                  {e.hora}
                </span>
                <span
                  className={`size-1.5 shrink-0 rounded-full ${
                    e.actor === 'agente' ? 'bg-primary' : 'bg-[#9CA3AF]'
                  }`}
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-sans text-[11.5px] font-light text-ink">
                    {e.evento}
                  </span>
                  <span className="block truncate font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
                    {e.rama}
                  </span>
                </span>
                <Chip tone={(e.actor as Actor) === 'agente' ? 'primary' : 'neutral'}>
                  {e.actor}
                </Chip>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  )
}
