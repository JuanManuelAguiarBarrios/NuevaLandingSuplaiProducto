import type { AgentKey } from '@/content'

/**
 * Viñetas por canal para las cards de agentes: SVG a mano, monocromo
 * (ink-inverse al 30%) con un único acento celeste, stroke fino. Sin
 * iconografía de librería ni emojis. Estáticas.
 */

const BASE_STROKE = 'stroke-ink-inverse/30'
const BASE_FILL = 'fill-ink-inverse/30'
const ACCENT_STROKE = 'stroke-accent-inverse'
const ACCENT_FILL = 'fill-accent-inverse'

const SVG_PROPS = {
  viewBox: '0 0 96 44',
  fill: 'none',
  'aria-hidden': true,
  className: 'h-auto w-full',
} as const

/** WhatsApp: consulta entrante y respuesta del agente. */
function ChatVignette() {
  return (
    <svg {...SVG_PROPS}>
      <rect x="1" y="2" width="42" height="16" rx="8" strokeWidth="1" className={BASE_STROKE} />
      <circle cx="15" cy="10" r="1.5" className={BASE_FILL} />
      <circle cx="22" cy="10" r="1.5" className={BASE_FILL} />
      <circle cx="29" cy="10" r="1.5" className={BASE_FILL} />
      <rect x="41" y="26" width="54" height="16" rx="8" strokeWidth="1" className={ACCENT_STROKE} />
      <path d="M50 34h28" strokeWidth="1" strokeLinecap="round" opacity="0.5" className={ACCENT_STROKE} />
    </svg>
  )
}

/** Voz: waveform de barras finas, las centrales en acento. */
function WaveformVignette() {
  const heights = [6, 10, 14, 20, 28, 34, 38, 30, 24, 16, 12, 8, 6]
  return (
    <svg {...SVG_PROPS}>
      {heights.map((h, i) => (
        <path
          key={i}
          d={`M${8 + i * 7} ${22 - h / 2}v${h}`}
          strokeWidth="1.5"
          strokeLinecap="round"
          className={i >= 4 && i <= 7 ? ACCENT_STROKE : BASE_STROKE}
        />
      ))}
    </svg>
  )
}

/** Conductores: ruta punteada con la entrega confirmada en destino. */
function RouteVignette() {
  return (
    <svg {...SVG_PROPS}>
      <circle cx="8" cy="36" r="3" strokeWidth="1" className={BASE_STROKE} />
      <path
        d="M12 36 C 32 36, 42 13, 66 13"
        strokeWidth="1"
        strokeDasharray="3 4"
        strokeLinecap="round"
        className={BASE_STROKE}
      />
      <circle cx="78" cy="13" r="9" strokeWidth="1" className={ACCENT_STROKE} />
      <path
        d="M74.5 13.5l2.5 2.5 4.5-5.5"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={ACCENT_STROKE}
      />
    </svg>
  )
}

/** Agenda: grilla de calendario con un turno tomado. */
function CalendarVignette() {
  const cols = [8, 30, 52, 74]
  const rows = [3, 17, 31]
  return (
    <svg {...SVG_PROPS}>
      {rows.map((y, r) =>
        cols.map((x, c) =>
          c === 2 && r === 1 ? (
            <rect key={`${r}-${c}`} x={x} y={y} width="14" height="10" rx="2" className={ACCENT_FILL} />
          ) : (
            <rect key={`${r}-${c}`} x={x} y={y} width="14" height="10" rx="2" strokeWidth="1" className={BASE_STROKE} />
          ),
        ),
      )}
    </svg>
  )
}

/** Incidencias: línea de estados con la excepción que se desvía y vuelve. */
function StatusVignette() {
  return (
    <svg {...SVG_PROPS}>
      <path d="M4 30h88" strokeWidth="1" strokeLinecap="round" className={BASE_STROKE} />
      <circle cx="14" cy="30" r="2.5" className={BASE_FILL} />
      <circle cx="36" cy="30" r="2.5" className={BASE_FILL} />
      <path d="M36 30 C 40 16, 54 16, 58 30" strokeWidth="1" className={ACCENT_STROKE} />
      <circle cx="47" cy="19.5" r="2.5" className={ACCENT_FILL} />
      <circle cx="58" cy="30" r="2.5" className={ACCENT_FILL} />
      <circle cx="80" cy="30" r="2.5" className={BASE_FILL} />
    </svg>
  )
}

/** A medida: módulos existentes y uno nuevo que se suma. */
function CustomVignette() {
  return (
    <svg {...SVG_PROPS}>
      <rect x="4" y="12" width="20" height="20" rx="3" strokeWidth="1" className={BASE_STROKE} />
      <rect x="30" y="12" width="20" height="20" rx="3" strokeWidth="1" className={BASE_STROKE} />
      <path d="M50 22h10" strokeWidth="1" strokeDasharray="2 3" className={BASE_STROKE} />
      <rect x="62" y="8" width="28" height="28" rx="3" strokeWidth="1" strokeDasharray="3 3" className={ACCENT_STROKE} />
      <path d="M76 16v12M70 22h12" strokeWidth="1" strokeLinecap="round" className={ACCENT_STROKE} />
    </svg>
  )
}

const VIGNETTES: Record<AgentKey, () => React.ReactNode> = {
  whatsapp: ChatVignette,
  voice: WaveformVignette,
  conductores: RouteVignette,
  agenda: CalendarVignette,
  incidencias: StatusVignette,
  custom: CustomVignette,
}

export default function AgentVignette({ agentKey }: { agentKey: AgentKey }) {
  const Vignette = VIGNETTES[agentKey]
  return <Vignette />
}
