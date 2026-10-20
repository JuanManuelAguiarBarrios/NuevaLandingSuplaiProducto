'use client'

import { m } from 'framer-motion'
import LineReveal from '@/components/LineReveal'
import { PRINCIPIOS } from '@/content'
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion'

/**
 * Principios: titular a la izquierda, grilla 2×2 con hairlines a la
 * derecha. Íconos de línea propios (stroke fino, azul). Sección clara.
 */

const ICON_PROPS = {
  width: 32,
  height: 32,
  viewBox: '0 0 32 32',
  fill: 'none',
  strokeWidth: 1.25,
  'aria-hidden': true,
  className: 'stroke-accent',
} as const

/** Sin migraciones: dos sistemas unidos sin moverse. */
function LinkIcon() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="3" y="9" width="10" height="14" rx="1.5" />
      <rect x="19" y="9" width="10" height="14" rx="1.5" />
      <path d="M13 16h6" strokeDasharray="2 2" />
    </svg>
  )
}

/** Supervisión: el proceso sigue y la excepción sube a una persona. */
function SuperviseIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M3 22h26" />
      <path d="M17 22c0-6 4-9 8-9" />
      <circle cx="25" cy="10" r="3" />
    </svg>
  )
}

/** Trazabilidad: registro de eventos en línea. */
function TraceIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M8 6v20" />
      <circle cx="8" cy="9" r="2" />
      <circle cx="8" cy="16" r="2" />
      <circle cx="8" cy="23" r="2" />
      <path d="M13 9h14M13 16h10M13 23h12" />
    </svg>
  )
}

/** Escalar: un módulo y los que se suman. */
function ScaleIcon() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="3" y="19" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="14" rx="1" strokeDasharray="2 2" />
      <rect x="23" y="5" width="6" height="22" rx="1" strokeDasharray="2 2" />
    </svg>
  )
}

const ICONS = [LinkIcon, SuperviseIcon, TraceIcon, ScaleIcon]

export default function PrincipiosSection() {
  return (
    <section
      data-tone="light"
      aria-labelledby="principios-title"
      className="bg-paper px-5 py-24 text-ink sm:px-8 lg:px-12 lg:py-36"
    >
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div id="principios-title">
            <LineReveal
              text={PRINCIPIOS.headline.text}
              accent={PRINCIPIOS.headline.accent}
              className="text-h1 font-semibold"
            />
          </div>
        </div>

        <m.ul
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="grid border-t border-line sm:grid-cols-2 lg:col-span-7"
        >
          {PRINCIPIOS.items.map((item, i) => {
            const Icon = ICONS[i]
            return (
              <m.li
                key={item.title}
                variants={fadeUp}
                className="border-b border-line py-8 sm:px-8 sm:even:border-l sm:odd:pl-0 lg:py-10"
              >
                <Icon />
                <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-ink-muted">{item.body}</p>
              </m.li>
            )
          })}
        </m.ul>
      </div>
    </section>
  )
}
