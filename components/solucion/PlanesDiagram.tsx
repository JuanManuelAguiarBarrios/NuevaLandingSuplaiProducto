'use client'

import { m } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { SOLUCION } from '@/content'
import type { FlowState, PlaneKey } from '@/content'
import { DURATION, EASE, VIEWPORT } from '@/lib/motion'
import { usePrefersReducedMotion } from '@/lib/useScrollMotion'

/**
 * Tres planos apilados con leve perspectiva: tus canales arriba, Suplai en
 * el medio y tus sistemas abajo. Lenguaje de marca y de Suplai Control:
 *  - Los planos llevan las esquinas cortadas a 45° del isotipo (arriba a la
 *    izquierda y abajo a la derecha).
 *  - Superficies de panel de Control: blanco, borde de 1 px, sombra mínima.
 *  - Entre planos viajan pills de estado (punto + etiqueta) con los colores
 *    de Control: En curso, Resuelto y Escalación.
 *  - El plano central lleva el lockup de Suplai; de él sale la escalación
 *    hacia tu equipo.
 * `active` resalta el plano del paso que el usuario está mirando.
 */

const VIEW = { w: 600, h: 560 }
const PLANE = { x: 20, w: 340, h: 100, skew: 90, chamfer: 20 }
const PLANE_Y: Record<PlaneKey, number> = { canales: 20, suplai: 230, sistemas: 440 }
/** Carriles (u entre 0 y 1): ida a la izquierda, eje al centro, vuelta a la derecha. */
const LANE = { down: 0.2, center: 0.5, up: 0.8 }
const CHIP = { h: 32, padX: 14, dot: 3.5, charW: 8.8, gap: 10, font: 15 }
const PILL = { h: 26, padX: 12, charW: 6.9, font: 12.5 }
const LOCKUP = { w: 150, h: 41 } // /brand/suplai-lockup-black.png, 426×116

const D = SOLUCION.diagram

const STATE_FILL: Record<FlowState, string> = {
  running: 'fill-state-running',
  resolved: 'fill-state-resolved',
  escalated: 'fill-state-escalated',
}

type Point = { x: number; y: number }

/** Punto sobre la superficie del plano. u: izquierda a derecha, v: fondo a frente. */
function onPlane(y: number, u: number, v: number): Point {
  return { x: PLANE.x + PLANE.skew * (1 - v) + PLANE.w * u, y: y + PLANE.h * v }
}

/** Avanza `dist` desde p hacia q. */
function toward(p: Point, q: Point, dist: number): Point {
  const len = Math.hypot(q.x - p.x, q.y - p.y)
  return { x: p.x + ((q.x - p.x) / len) * dist, y: p.y + ((q.y - p.y) / len) * dist }
}

/** Paralelogramo con las esquinas superior izquierda e inferior derecha cortadas, como el isotipo. */
function planePoints(y: number): string {
  const { x, w, h, skew, chamfer: c } = PLANE
  const A = { x: x + skew, y }
  const B = { x: x + skew + w, y }
  const C = { x: x + w, y: y + h }
  const Dp = { x, y: y + h }
  const pts = [toward(A, B, c), B, toward(C, B, c), toward(C, Dp, c), Dp, toward(A, Dp, c)]
  return pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
}

const laneX = (u: number) => onPlane(0, u, 0.5).x

const planeIn: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE, delay: i * 0.16 } }),
}

const drawIn: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: DURATION.slow, ease: EASE, delay: 0.55 + i * 0.08 },
  }),
}

interface StatusPillProps {
  x: number
  y: number
  label: string
  state: FlowState
  anchor?: 'middle' | 'start'
}

/** Pill de estado de Control: punto de color + etiqueta, sobre blanco con borde. */
function StatusPill({ x, y, label, state, anchor = 'middle' }: StatusPillProps) {
  const width = label.length * PILL.charW + PILL.padX * 2 + 12
  const left = anchor === 'middle' ? x - width / 2 : x
  return (
    <g>
      <rect x={left} y={y - PILL.h / 2} width={width} height={PILL.h} rx={PILL.h / 2} className="fill-white stroke-line" />
      <circle cx={left + PILL.padX + 3} cy={y} r={3.5} className={STATE_FILL[state]} />
      <text x={left + PILL.padX + 12} y={y + 4.3} fontSize={PILL.font} className="fill-ink font-sans font-medium">
        {label}
      </text>
    </g>
  )
}

function Chips({ y, items, dotClass }: { y: number; items: string[]; dotClass: string }) {
  const widths = items.map((t) => t.length * CHIP.charW + CHIP.padX * 2 + 12)
  const total = widths.reduce((a, b) => a + b, 0) + CHIP.gap * (items.length - 1)
  const center = onPlane(y, 0.5, 0.4)
  const start = center.x - total / 2
  // x de cada chip: suma de los anchos anteriores más los gaps.
  const xs = widths.map((_, i) => start + widths.slice(0, i).reduce((a, w) => a + w + CHIP.gap, 0))
  return (
    <>
      {items.map((item, i) => (
        <g key={item}>
          <rect x={xs[i]} y={center.y - CHIP.h / 2} width={widths[i]} height={CHIP.h} rx={6} className="fill-white stroke-line" />
          <circle cx={xs[i] + CHIP.padX + 3} cy={center.y} r={CHIP.dot} className={dotClass} />
          <text x={xs[i] + CHIP.padX + 13} y={center.y + 5} fontSize={CHIP.font} className="fill-ink font-sans font-medium">
            {item}
          </text>
        </g>
      ))}
    </>
  )
}

function PlaneTitle({ y, text }: { y: number; text: string }) {
  const p = onPlane(y, 0, 0.84)
  return (
    <text x={p.x + 18} y={p.y} fontSize={13} className="fill-ink-muted font-sans font-medium">
      {text}
    </text>
  )
}

interface FlowPillProps {
  lane: number
  from: number
  to: number
  event: { label: string; state: FlowState }
  delay: number
}

/** Un evento que viaja por un carril entre dos planos y se desvanece al llegar. */
function FlowPill({ lane, from, to, event, delay }: FlowPillProps) {
  return (
    <m.g
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: [0, to - from], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2.4, times: [0, 0.2, 0.75, 1], ease: 'easeInOut', repeat: Infinity, repeatDelay: 2.2, delay }}
    >
      <StatusPill x={laneX(lane)} y={from} label={event.label} state={event.state} />
    </m.g>
  )
}

interface PlanesDiagramProps {
  active: PlaneKey | null
}

export default function PlanesDiagram({ active }: PlanesDiagramProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  const planeClass = (key: PlaneKey) => {
    if (key === 'suplai') return active === 'suplai' ? 'fill-white stroke-accent' : 'fill-white stroke-accent/60'
    return active === key ? 'fill-white stroke-accent' : 'fill-white stroke-line'
  }

  const gap1 = { from: PLANE_Y.canales + PLANE.h + 16, to: PLANE_Y.suplai - 16 }
  const gap2 = { from: PLANE_Y.suplai + PLANE.h + 16, to: PLANE_Y.sistemas - 16 }
  const logo = onPlane(PLANE_Y.suplai, 0.5, 0.42)
  const edge = onPlane(PLANE_Y.suplai, 1, 0.5)
  const escalationX = edge.x + 56
  // Orden de entrada: de abajo hacia arriba.
  const order: PlaneKey[] = ['sistemas', 'suplai', 'canales']

  return (
    <m.svg
      viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
      role="img"
      aria-label={D.label}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className="h-auto w-full overflow-visible"
    >
      <defs>
        {/* shadow-sm de Suplai Control */}
        <filter id="plane-shadow" x="-10%" y="-10%" width="120%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0A0A0A" floodOpacity="0.06" />
        </filter>
      </defs>

      {/* Carriles: detrás de los planos, se ven en los huecos. */}
      {[LANE.down, LANE.center, LANE.up].map((u, i) => (
        <m.line
          key={u}
          x1={laneX(u)}
          x2={laneX(u)}
          y1={PLANE_Y.canales + PLANE.h / 2}
          y2={PLANE_Y.sistemas + PLANE.h / 2}
          strokeWidth={1}
          strokeDasharray={u === LANE.center ? undefined : '2 5'}
          className={u === LANE.center ? 'stroke-accent' : 'stroke-ink/25'}
          variants={drawIn}
          custom={i}
        />
      ))}

      {/* Escalación: del plano de Suplai hacia tu equipo. */}
      <m.path
        d={`M${edge.x} ${edge.y} H${escalationX - 8}`}
        strokeWidth={1}
        strokeDasharray="2 5"
        className="fill-none stroke-state-escalated"
        variants={drawIn}
        custom={3}
      />

      {order.map((key, i) => (
        <m.g key={key} variants={planeIn} custom={i}>
          <polygon
            points={planePoints(PLANE_Y[key])}
            strokeWidth={key === 'suplai' ? 1.5 : 1}
            filter="url(#plane-shadow)"
            className={`transition-colors duration-500 ${planeClass(key)}`}
          />
          {key === 'suplai' ? (
            <>
              <image
                href="/brand/suplai-lockup-black.png"
                x={logo.x - LOCKUP.w / 2}
                y={logo.y - LOCKUP.h / 2}
                width={LOCKUP.w}
                height={LOCKUP.h}
              />
              <text x={logo.x} y={logo.y + LOCKUP.h / 2 + 18} textAnchor="middle" fontSize={13} className="fill-ink-muted font-sans">
                {D.suplai.caption}
              </text>
            </>
          ) : (
            <>
              <Chips y={PLANE_Y[key]} items={D[key].items} dotClass={key === 'canales' ? 'fill-accent' : 'fill-ink/35'} />
              <PlaneTitle y={PLANE_Y[key]} text={D[key].title} />
            </>
          )}
        </m.g>
      ))}

      <m.g variants={planeIn} custom={3}>
        <StatusPill x={escalationX} y={edge.y} label={D.escalation.label} state="escalated" anchor="start" />
        <text x={escalationX + 4} y={edge.y + 30} fontSize={12} className="fill-ink-muted font-sans">
          {D.escalation.caption}
        </text>
      </m.g>

      {!prefersReducedMotion && (
        <>
          <FlowPill lane={LANE.down} from={gap1.from} to={gap1.to} event={D.flow.inbound} delay={1.4} />
          <FlowPill lane={LANE.up} from={gap1.to} to={gap1.from} event={D.flow.reply} delay={3.6} />
          <FlowPill lane={LANE.down} from={gap2.from} to={gap2.to} event={D.flow.update} delay={2.5} />
          <FlowPill lane={LANE.up} from={gap2.to} to={gap2.from} event={D.flow.lookup} delay={4.7} />
        </>
      )}
    </m.svg>
  )
}
