'use client'

import { m } from 'framer-motion'
import { CONTROL } from '@/content'
import { fadeUp, stagger, revealOnce } from '@/lib/motion'

/**
 * "Vos mantenés el control" (A4): el último des-riesgo antes del CTA final.
 * Tratamiento sobrio tipo Centinel — títulos cortos + una línea, filas
 * editoriales con border-t, cero iconografía de "seguridad".
 */
export default function ControlSection() {
  return (
    <section id="control" className="bg-white" style={{ paddingBlock: 'var(--section-py)' }}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">

        <m.h2
          {...revealOnce}
          className="type-h2 font-editorial font-normal text-ink text-wrap-balance mb-14"
        >
          {CONTROL.headline.plain}{' '}
          <em className="accent">{CONTROL.headline.accent}</em>
        </m.h2>

        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CONTROL.items.map((item) => (
            <m.div key={item.label} variants={fadeUp} className="border-t border-border pt-5">
              <h3 className="mb-2 font-sans text-[15px] font-medium text-ink">
                {item.label}
              </h3>
              <p className="font-sans text-[13px] font-light leading-relaxed text-muted">
                {item.desc}
              </p>
            </m.div>
          ))}
        </m.div>

      </div>
    </section>
  )
}
