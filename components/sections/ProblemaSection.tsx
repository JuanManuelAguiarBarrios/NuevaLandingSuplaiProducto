'use client'

import { m } from 'framer-motion'
import { PROBLEMA } from '@/content'
import { EASE, fadeUp } from '@/lib/motion'
import LineReveal from '@/components/LineReveal'

/**
 * "Qué pasa hoy / Qué cuesta" como pares conectados: cada fila une el
 * problema con su costo mediante un conector que se dibuja al entrar la
 * fila en viewport — la relación causa→consecuencia hecha visible. Ese
 * dibujo es el único momento orquestado de la sección.
 */

const rowStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

/* El conector se dibuja después de que aparecen los dos textos de la fila. */
const drawLineX = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { delay: 0.4, duration: 0.5, ease: EASE } },
}

const drawLineY = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { delay: 0.4, duration: 0.4, ease: EASE } },
}

const dotIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { delay: 0.85, duration: 0.2 } },
}

function Connector() {
  return (
    <span className="relative hidden h-px self-center bg-border md:block" aria-hidden="true">
      <m.span variants={drawLineX} className="absolute inset-0 origin-left bg-primary/50" />
      <m.span
        variants={dotIn}
        className="absolute -right-0.5 top-1/2 size-[5px] -translate-y-1/2 rounded-full bg-primary"
      />
    </span>
  )
}

export default function ProblemaSection() {
  return (
    <section id="problema" className="bg-white" style={{ paddingBlock: 'var(--section-py)' }}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">

        {/* Headline de encuadre — reveal por línea, "manual" como acento */}
        <LineReveal
          text={PROBLEMA.headline.text}
          accent={PROBLEMA.headline.accent}
          as="h2"
          className="type-h2 mb-12 font-editorial font-normal text-ink"
        />

        {/* Cabecera de columnas — una sola vez, no por fila */}
        <div className="mb-2 hidden md:grid md:grid-cols-[2.5rem_1fr_88px_1fr] md:gap-x-6">
          <span />
          <span className="eyebrow text-muted">{PROBLEMA.labels.problema}</span>
          <span />
          <span className="eyebrow text-muted">{PROBLEMA.labels.costo}</span>
        </div>

        {/* Pares problema → costo */}
        {PROBLEMA.pares.map((par, i) => (
          <m.div
            key={i}
            variants={rowStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="grid gap-x-6 gap-y-2 border-t border-border py-7 md:grid-cols-[2.5rem_1fr_88px_1fr] md:items-center"
          >
            <m.span
              variants={fadeUp}
              className="font-mono text-[11px] font-medium text-muted"
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, '0')}
            </m.span>
            <m.p
              variants={fadeUp}
              className="font-sans text-[15px] font-light leading-relaxed text-ink"
            >
              {par.problema}
            </m.p>
            <Connector />
            {/* Conector vertical en mobile */}
            <m.span
              variants={drawLineY}
              className="h-4 w-px origin-top bg-primary/50 md:hidden"
              aria-hidden="true"
            />
            <m.p
              variants={fadeUp}
              className="font-sans text-[15px] font-medium leading-relaxed text-ink"
            >
              {par.costo}
            </m.p>
          </m.div>
        ))}

      </div>
    </section>
  )
}
