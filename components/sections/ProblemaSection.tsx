'use client'

import { m } from 'framer-motion'
import { PROBLEMA } from '@/content'
import { fadeUp, stagger, revealOnce } from '@/lib/motion'
import { ContextualCopy } from '@/components/logos'

export default function ProblemaSection() {
  return (
    <section id="problema" className="bg-white" style={{ paddingBlock: 'var(--section-py)' }}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">

        {/* Frase ancla — la segunda línea es el elemento de firma (itálica azul) */}
        <m.div {...revealOnce} className="mb-20 max-w-3xl">
          <p className="type-h2 font-editorial font-normal text-ink text-wrap-balance">
            {PROBLEMA.anchor.split('\n').map((line, i) => (
              <span key={i} className={i === 0 ? 'block' : 'block accent'}>
                {line}
              </span>
            ))}
          </p>
        </m.div>

        {/* Dos columnas — sin cards, layout editorial */}
        <div className="grid gap-x-16 gap-y-12 md:grid-cols-2">

          {/* Qué pasa hoy */}
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <m.p
              variants={fadeUp}
              className="mb-7 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-muted"
            >
              {PROBLEMA.hoy.label}
            </m.p>
            <ul className="flex flex-col gap-5">
              {PROBLEMA.hoy.items.map((item, i) => (
                <m.li
                  key={i}
                  variants={fadeUp}
                  className="flex items-start gap-4 border-t border-border pt-5"
                >
                  <span
                    className="mt-[5px] font-mono text-[10px] font-medium text-muted shrink-0"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-sans text-[15px] font-light leading-relaxed text-ink">
                    <ContextualCopy text={item} />
                  </span>
                </m.li>
              ))}
            </ul>
          </m.div>

          {/* Qué cuesta */}
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <m.p
              variants={fadeUp}
              className="mb-7 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-primary"
            >
              {PROBLEMA.impacto.label}
            </m.p>
            <ul className="flex flex-col gap-5">
              {PROBLEMA.impacto.items.map((item, i) => (
                <m.li
                  key={i}
                  variants={fadeUp}
                  className="flex items-start gap-4 border-t border-border pt-5"
                >
                  <span
                    className="mt-[5px] font-mono text-[10px] font-medium text-primary/50 shrink-0"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-sans text-[15px] font-light leading-relaxed text-ink">
                    <ContextualCopy text={item} />
                  </span>
                </m.li>
              ))}
            </ul>
          </m.div>

        </div>
      </div>
    </section>
  )
}
