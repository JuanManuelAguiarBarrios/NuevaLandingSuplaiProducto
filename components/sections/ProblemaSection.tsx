'use client'

import { m } from 'framer-motion'
import { PROBLEMA } from '@/content'
import { fadeUp, stagger } from '@/lib/motion'
import LineReveal from '@/components/LineReveal'
import ProblemaInbox from '@/components/ProblemaInbox'

/**
 * Problema: la pila de interrupciones (los fragmentos del día operativo
 * apilándose — nivel humano) junto a los pares causa→consecuencia. La
 * órbita de Solución cuenta después el nivel sistemas: se complementan
 * sin repetir lenguaje. El momento orquestado es el apilado de cards.
 */
export default function ProblemaSection() {
  return (
    <section id="problema" className="bg-white" style={{ paddingBlock: 'var(--section-py)' }}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">

        {/* Headline de encuadre — reveal por línea, "manual" como acento */}
        <LineReveal
          text={PROBLEMA.headline.text}
          accent={PROBLEMA.headline.accent}
          as="h2"
          className="type-h2 mb-14 font-editorial font-normal text-ink"
        />

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* La pila: los fragmentos del día apilándose como notificaciones */}
          <ProblemaInbox className="mx-auto max-w-[520px] lg:mx-0" />

          {/* Pares problema → costo */}
          <div>
            <p className="eyebrow mb-4 text-muted">
              {PROBLEMA.labels.problema} → {PROBLEMA.labels.costo}
            </p>
            <m.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
            >
              {/* Jerarquía invertida: el costo (lo que duele) en editorial
                  grande; la causa arriba como línea chica. */}
              {PROBLEMA.pares.map((par, i) => (
                <m.div key={i} variants={fadeUp} className="border-t border-border py-6">
                  <p className="flex items-baseline gap-3 font-sans text-[13px] font-light leading-relaxed text-muted">
                    <span
                      className="font-mono text-[11px] font-medium text-primary"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {par.problema}
                  </p>
                  <p className="type-h4 mt-2.5 font-editorial font-normal text-ink text-wrap-balance">
                    {par.costo}
                  </p>
                </m.div>
              ))}
            </m.div>
          </div>

        </div>
      </div>
    </section>
  )
}
