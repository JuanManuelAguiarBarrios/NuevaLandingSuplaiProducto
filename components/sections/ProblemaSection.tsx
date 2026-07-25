'use client'

import { m } from 'framer-motion'
import { PROBLEMA } from '@/content'
import { fadeUp, stagger } from '@/lib/motion'
import LineReveal from '@/components/LineReveal'
import ProblemaTangle from '@/components/ProblemaTangle'

/**
 * Problema: el diagrama del caos (sistemas enredados alrededor de la
 * coordinación manual — espejo de la órbita ordenada de Solución) junto a
 * los pares causa→consecuencia. El momento orquestado es el dibujo del
 * enredo; los pares entran con el fadeUp estándar del sistema.
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

          {/* El enredo: mismos sistemas que la órbita de Solución, sin capa */}
          <ProblemaTangle className="mx-auto max-w-[560px] lg:mx-0" />

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
              {PROBLEMA.pares.map((par, i) => (
                <m.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-start gap-4 border-t border-border py-6"
                >
                  <span
                    className="mt-[3px] font-mono text-[11px] font-medium text-muted"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-sans text-[15px] font-light leading-relaxed text-ink">
                      {par.problema}
                    </p>
                    <div className="my-2 h-4 w-px bg-primary/50" aria-hidden="true" />
                    <p className="font-sans text-[15px] font-medium leading-relaxed text-ink">
                      {par.costo}
                    </p>
                  </div>
                </m.div>
              ))}
            </m.div>
          </div>

        </div>
      </div>
    </section>
  )
}
