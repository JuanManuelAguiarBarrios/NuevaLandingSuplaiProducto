import { PANEL } from '@/content'

/**
 * Mockup del panel de Suplai (patrón HappyRobot: mostrar la UI del producto).
 * Hecho en código dentro del design system — nítido en cualquier resolución
 * y editable cuando el producto real cambie. Datos ilustrativos genéricos
 * (roles y números de envío, sin nombres ni casos reales).
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

function ActorChip({ actor }: { actor: Actor }) {
  return <Chip tone={actor === 'agente' ? 'primary' : 'neutral'}>{actor}</Chip>
}

export default function SuplaiPanelMockup() {
  const { conversaciones, trazabilidad } = PANEL

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

      <div className="grid md:grid-cols-[1fr_1.35fr]">

        {/* Conversaciones */}
        <div className="border-b border-border md:border-b-0 md:border-r">
          <p className="eyebrow border-b border-border-light px-4 py-3 text-muted">
            {conversaciones.label}
          </p>
          <ul className="divide-y divide-border-light">
            {conversaciones.items.map((item) => (
              <li key={item.nombre} className="flex flex-col gap-1 px-4 py-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate font-sans text-[12px] font-medium text-ink">
                    {item.nombre}
                  </span>
                  <Chip tone={item.actor === 'agente' ? 'primary' : 'neutral'}>
                    {item.estado}
                  </Chip>
                </div>
                <span className="truncate font-sans text-[11px] font-light text-muted">
                  {item.snippet}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Trazabilidad */}
        <div>
          <div className="flex items-center justify-between gap-3 border-b border-border-light px-4 py-3">
            <p className="eyebrow text-muted">{trazabilidad.label}</p>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-ink">{trazabilidad.envio}</span>
              <Chip tone="primary">{trazabilidad.estado}</Chip>
            </div>
          </div>
          <ul className="divide-y divide-border-light">
            {trazabilidad.eventos.map((e, i) => (
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
                <span className="flex-1 font-sans text-[11.5px] font-light text-ink">
                  {e.evento}
                </span>
                <ActorChip actor={e.actor} />
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  )
}
