'use client'

import { m } from 'framer-motion'
import LineReveal from '@/components/LineReveal'
import { PROBLEMA } from '@/content'
import { DURATION, EASE, fadeUp, stagger, VIEWPORT } from '@/lib/motion'

/**
 * Problema: titular grande y la tabla "Qué pasa hoy → Qué cuesta".
 * Cada fila entra escalonada y su hairline se dibuja de izquierda a derecha.
 */

const rowLine = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: DURATION.slow, ease: EASE } },
}

export default function ProblemaSection() {
  return (
    <section
      id="problema"
      data-tone="dark"
      aria-labelledby="problema-title"
      className="bg-night px-5 py-24 text-ink-inverse sm:px-8 lg:px-12 lg:py-36"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          <p className="eyebrow text-caption">{PROBLEMA.eyebrow}</p>
          <div id="problema-title">
            <LineReveal
              text={PROBLEMA.headline.text}
              accent={PROBLEMA.headline.accent}
              className="mt-6 text-h1 font-semibold"
            />
          </div>
        </div>
        <m.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="max-w-sm text-lead text-ink-inverse-muted lg:col-span-4 lg:self-end"
        >
          {PROBLEMA.intro}
        </m.p>
      </div>

      <div className="mt-20 lg:mt-28">
        <div aria-hidden="true" className="eyebrow hidden grid-cols-12 gap-8 pb-4 text-caption md:grid">
          <span className="col-span-5 col-start-2">{PROBLEMA.labels.problema}</span>
          <span className="col-span-5 col-start-8">{PROBLEMA.labels.costo}</span>
        </div>

        <m.ol variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          {PROBLEMA.rows.map((row, i) => (
            <m.li key={row.problema} variants={fadeUp} className="relative grid gap-3 py-7 md:grid-cols-12 md:gap-8 md:py-9">
              <m.span
                variants={rowLine}
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left bg-line-inverse"
              />
              <span className="font-mono text-[11px] text-caption tabular-nums md:col-span-1 md:pt-2">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-h3 font-medium md:col-span-5">
                <span className="sr-only">{PROBLEMA.labels.problema}, </span>
                {row.problema}
              </p>
              <span aria-hidden="true" className="hidden text-h3 text-accent-inverse md:col-span-1 md:block">
                →
              </span>
              <p className="text-lead text-ink-inverse-muted md:col-span-5 md:pt-1">
                <span className="sr-only">{PROBLEMA.labels.costo}, </span>
                {row.costo}
              </p>
            </m.li>
          ))}
          <li aria-hidden="true" className="h-px bg-line-inverse" />
        </m.ol>
      </div>
    </section>
  )
}
