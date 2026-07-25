/**
 * Viñetas por canal para las cards de agentes (B4): SVG a mano, dentro del
 * design system — monocromo (blanco al 25%) con un único acento azul, stroke
 * fino. Cero iconografía de librería, cero emojis. Estáticas: el presupuesto
 * de motion de la sección ya lo consume el stagger de entrada de la grilla.
 */

const BASE = 'rgba(255,255,255,0.25)'
const ACCENT = '#2563EB'

const SVG_PROPS = {
  width: 96,
  height: 44,
  viewBox: '0 0 96 44',
  fill: 'none',
  'aria-hidden': true,
} as const

/** WhatsApp — consulta entrante + respuesta del agente (azul). */
function ChatVignette() {
  return (
    <svg {...SVG_PROPS}>
      <rect x="1" y="2" width="42" height="16" rx="8" stroke={BASE} strokeWidth="1.5" />
      <circle cx="15" cy="10" r="1.5" fill={BASE} />
      <circle cx="22" cy="10" r="1.5" fill={BASE} />
      <circle cx="29" cy="10" r="1.5" fill={BASE} />
      <rect x="41" y="26" width="54" height="16" rx="8" stroke={ACCENT} strokeWidth="1.5" />
      <path d="M50 34h28" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

/** Voz — waveform de barras finas, las centrales en azul. */
function WaveformVignette() {
  const heights = [6, 10, 14, 20, 28, 34, 38, 30, 24, 16, 12, 8, 6]
  const accentRange = [4, 7] as const
  return (
    <svg {...SVG_PROPS}>
      {heights.map((h, i) => {
        const x = 8 + i * 7
        const isAccent = i >= accentRange[0] && i <= accentRange[1]
        return (
          <path
            key={i}
            d={`M${x} ${22 - h / 2}v${h}`}
            stroke={isAccent ? ACCENT : BASE}
            strokeWidth="2"
            strokeLinecap="round"
          />
        )
      })}
    </svg>
  )
}

/** Conductores — ruta punteada, entrega confirmada (check azul) en destino. */
function RouteVignette() {
  return (
    <svg {...SVG_PROPS}>
      <circle cx="8" cy="36" r="3" stroke={BASE} strokeWidth="1.5" />
      <path
        d="M12 36 C 32 36, 42 13, 66 13"
        stroke={BASE}
        strokeWidth="1.5"
        strokeDasharray="3 4"
        strokeLinecap="round"
      />
      <circle cx="78" cy="13" r="9" stroke={ACCENT} strokeWidth="1.5" />
      <path
        d="M74.5 13.5l2.5 2.5 4.5-5.5"
        stroke={ACCENT}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Agenda — mini-grilla de calendario con un turno tomado (celda azul). */
function CalendarVignette() {
  const cols = [8, 30, 52, 74]
  const rows = [3, 17, 31]
  const accent = { col: 2, row: 1 }
  return (
    <svg {...SVG_PROPS}>
      {rows.map((y, r) =>
        cols.map((x, c) => {
          const isAccent = c === accent.col && r === accent.row
          return isAccent ? (
            <rect key={`${r}-${c}`} x={x} y={y} width="14" height="10" rx="2" fill={ACCENT} />
          ) : (
            <rect
              key={`${r}-${c}`}
              x={x}
              y={y}
              width="14"
              height="10"
              rx="2"
              stroke={BASE}
              strokeWidth="1.5"
            />
          )
        })
      )}
    </svg>
  )
}

/** Incidencias — línea de estados con la excepción que se desvía y vuelve. */
function StatusVignette() {
  return (
    <svg {...SVG_PROPS}>
      <path d="M4 30h88" stroke={BASE} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="14" cy="30" r="2.5" fill={BASE} />
      <circle cx="36" cy="30" r="2.5" fill={BASE} />
      <path d="M36 30 C 40 16, 54 16, 58 30" stroke={ACCENT} strokeWidth="1.5" />
      <circle cx="47" cy="19.5" r="2.5" fill={ACCENT} />
      <circle cx="58" cy="30" r="2.5" fill={ACCENT} />
      <circle cx="80" cy="30" r="2.5" fill={BASE} />
    </svg>
  )
}

const VIGNETTES: Record<string, () => React.ReactNode> = {
  whatsapp: ChatVignette,
  voice: WaveformVignette,
  conductores: RouteVignette,
  agenda: CalendarVignette,
  incidencias: StatusVignette,
}

export default function AgentVignette({ agentKey }: { agentKey: string }) {
  const Vignette = VIGNETTES[agentKey]
  if (!Vignette) return null
  return <Vignette />
}
