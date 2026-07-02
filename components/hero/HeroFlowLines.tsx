/**
 * Rutas de flujo del hero — 3 beziers horizontales que cruzan el fondo como
 * rutas logísticas. Cada path tiene una base estática tenue y un "dash de luz"
 * que la recorre en loop (estilo Centinel, más quieto).
 *
 * Server Component, CSS puro (keyframes en globals.css) — cero JS en runtime.
 * `pathLength={1000}` normaliza el largo → el loop de stroke-dashoffset cierra
 * sin costura. Delays negativos desfasan los dashes para que no larguen juntos.
 *
 * Fallback (mobile / prefers-reduced-motion, vía media queries en CSS):
 * los dashes se apagan y quedan las líneas base estáticas.
 */

const LINES = [
  { d: 'M -60 170 C 340 90, 760 250, 1500 150', dur: 18, delay: 0 },
  { d: 'M -60 400 C 420 330, 900 480, 1500 410', dur: 26, delay: -9 },
  { d: 'M -60 620 C 320 570, 1020 700, 1500 590', dur: 34, delay: -21 },
]

export default function HeroFlowLines() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {LINES.map((line) => (
        <g key={line.d}>
          <path d={line.d} pathLength={1000} className="hero-flow-base" />
          <path
            d={line.d}
            pathLength={1000}
            className="hero-flow-dash"
            style={{
              animationDuration: `${line.dur}s`,
              animationDelay: `${line.delay}s`,
            }}
          />
        </g>
      ))}
    </svg>
  )
}
