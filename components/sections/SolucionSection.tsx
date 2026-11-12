'use client'

import { useState } from 'react'
import { m } from 'framer-motion'
import LineReveal from '@/components/LineReveal'
import ControlPanel from '@/components/product/ControlPanel'
import StatusPill from '@/components/product/StatusPill'
import PlanesDiagram from '@/components/solucion/PlanesDiagram'
import PlanesStack from '@/components/solucion/PlanesStack'
import { SOLUCION } from '@/content'
import type { PlaneKey } from '@/content'
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion'

/**
 * Posicionamiento: diagrama de tres planos (canales, Suplai, sistemas) a la
 * izquierda; titular y los tres pasos a la derecha. Al pasar por un paso se
 * resalta su plano en el diagrama. Debajo, una vista del panel Suplai
 * Control con la actividad de los agentes y la leyenda de los tres estados.
 */
export default function SolucionSection() {
  const [activePlane, setActivePlane] = useState<PlaneKey | null>(null)

  return (
    <section
      id="solucion"
      data-tone="light"
      aria-labelledby="solucion-title"
      className="overflow-hidden bg-paper py-24 text-ink lg:py-36"
    >
      <div className="grid gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12">
        <div className="lg:col-span-6">
          <p className="eyebrow text-ink-muted">{SOLUCION.eyebrow}</p>
          {/* En pantallas chicas el diagrama en perspectiva no se lee: va su versión vertical. */}
          <PlanesStack className="mt-8 sm:hidden" />
          <div className="mt-8 hidden max-w-[40rem] sm:block lg:mt-10">
            <PlanesDiagram active={activePlane} />
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:self-center">
          <div id="solucion-title">
            <LineReveal text={SOLUCION.headline.text} accent={SOLUCION.headline.accent} className="text-h2 font-semibold" />
          </div>
          <m.ol variants={stagger} initial="hidden" whileInView="show" viewport={VIEWPORT} className="mt-10">
            {SOLUCION.steps.map((step) => (
              <m.li
                key={step.n}
                variants={fadeUp}
                onMouseEnter={() => setActivePlane(step.plane)}
                onMouseLeave={() => setActivePlane(null)}
                className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-6"
              >
                <span className="font-mono text-[11px] text-ink-muted tabular-nums">{step.n}</span>
                <div>
                  <p className="eyebrow text-ink-muted">{step.label}</p>
                  <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-ink-muted">{step.body}</p>
                </div>
              </m.li>
            ))}
          </m.ol>
        </div>
      </div>

      <div className="mt-20 grid gap-10 border-t border-line px-5 pt-16 sm:px-8 lg:mt-28 lg:grid-cols-12 lg:gap-8 lg:px-12 lg:pt-20">
        <m.div variants={fadeUp} initial="hidden" whileInView="show" viewport={VIEWPORT} className="lg:col-span-4">
          <p className="eyebrow text-ink-muted">{SOLUCION.control.eyebrow}</p>
          <h3 className="mt-5 text-h3 font-semibold">{SOLUCION.control.title}</h3>
          <p className="mt-4 max-w-sm text-ink-muted">{SOLUCION.control.body}</p>
          <dl className="mt-8 border-t border-line">
            {SOLUCION.control.legend.map((entry) => (
              <div key={entry.state} className="grid grid-cols-[7rem_1fr] items-center gap-4 border-b border-line py-3.5">
                <dt>
                  <StatusPill state={entry.state} />
                </dt>
                <dd className="text-sm text-ink-muted">{entry.body}</dd>
              </div>
            ))}
          </dl>
        </m.div>
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="lg:col-span-7 lg:col-start-6"
        >
          <ControlPanel />
        </m.div>
      </div>
    </section>
  )
}
