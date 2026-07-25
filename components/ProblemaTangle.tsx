'use client'

import { m, useReducedMotion } from 'framer-motion'
import { EASE } from '@/lib/motion'

/**
 * Diagrama del caos (Problema): los mismos sistemas que en Solución giran
 * ordenados alrededor de Suplai, acá aparecen enredados — todos atados al
 * nodo "coordinación manual" por líneas que se cruzan. Es el espejo
 * narrativo de la órbita: el antes y el después usan el mismo lenguaje.
 * El dibujo de las líneas es el momento orquestado de la sección.
 */

const W = 600
const H = 520

const NODES = [
  { label: 'WhatsApp',  x: 95,  y: 64 },
  { label: 'TMS',       x: 306, y: 42 },
  { label: 'Llamadas',  x: 512, y: 78 },
  { label: 'Planillas', x: 58,  y: 268 },
  { label: 'Mails',     x: 544, y: 292 },
  { label: 'ERP',       x: 150, y: 452 },
  { label: 'WMS',       x: 452, y: 448 },
]

const CENTER = { x: 300, y: 268 }

/* Curvas autoradas: cada sistema llega al centro dando vueltas y cruzándose
   con las demás. Las dos últimas son cruces laterales sistema↔sistema. */
const PATHS = [
  'M95 64 C 240 140, 150 320, 300 268',
  'M306 42 C 180 160, 430 180, 300 268',
  'M512 78 C 380 120, 240 200, 300 268',
  'M58 268 C 200 180, 380 350, 300 268',
  'M544 292 C 420 380, 240 320, 300 268',
  'M150 452 C 260 380, 160 240, 300 268',
  'M452 448 C 360 360, 480 240, 300 268',
  'M95 64 C 300 240, 300 240, 544 292',
  'M58 268 C 250 420, 330 100, 512 78',
]

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { delay: i * 0.09, duration: 0.9, ease: EASE },
  }),
}

export default function ProblemaTangle({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion()
  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: 'hidden' as const,
        whileInView: 'show' as const,
        viewport: { once: true, amount: 0.35 },
      }

  return (
    <div
      className={`relative w-full ${className ?? ''}`}
      style={{ aspectRatio: `${W} / ${H}` }}
      aria-hidden="true"
    >
      <m.svg
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 h-full w-full"
        {...motionProps}
      >
        {PATHS.map((d, i) => (
          <m.path
            key={i}
            d={d}
            custom={i}
            variants={prefersReducedMotion ? undefined : draw}
            fill="none"
            stroke={i < NODES.length ? '#D1D5DB' : 'rgba(37,99,235,0.28)'}
            strokeWidth="1"
          />
        ))}
      </m.svg>

      {NODES.map((n) => (
        <span
          key={n.label}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-white px-3 py-1.5 font-mono text-[10px] tracking-[0.06em] text-muted shadow-sm"
          style={{ left: `${(n.x / W) * 100}%`, top: `${(n.y / H) * 100}%` }}
        >
          {n.label}
        </span>
      ))}

      <span
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40 bg-primary/5 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-primary"
        style={{ left: `${(CENTER.x / W) * 100}%`, top: `${(CENTER.y / H) * 100}%` }}
      >
        Coordinación manual
      </span>
    </div>
  )
}
