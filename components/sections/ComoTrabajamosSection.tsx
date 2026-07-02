'use client'

import { m } from 'framer-motion'
import { COMO_TRABAJAMOS } from '@/content'

const ease = [0.16, 1, 0.3, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
}

export default function ComoTrabajamosSection() {
  return (
    <section id="como-trabajamos" className="bg-white py-28 md:py-36">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">

        {/* Titular */}
        <m.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease }}
          className="font-editorial font-normal text-ink mb-14 text-wrap-balance"
          style={{
            fontSize: 'clamp(26px, 3.2vw, 46px)',
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
          }}
        >
          {COMO_TRABAJAMOS.headline}
        </m.h2>

        {/* Steps en cuatro columnas */}
        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {COMO_TRABAJAMOS.steps.map((step) => (
            <m.div key={step.n} variants={fadeUp}>
              <p className="font-mono text-[11px] font-medium text-primary mb-4">{step.n}</p>
              <div className="h-px w-8 bg-border mb-4" aria-hidden="true" />
              <h3
                className="font-editorial font-normal text-ink mb-3"
                style={{
                  fontSize: 'clamp(16px, 1.6vw, 20px)',
                  lineHeight: 1.25,
                  letterSpacing: '-0.013em',
                }}
              >
                {step.title}
              </h3>
              <p className="font-sans text-[13px] font-light leading-relaxed text-muted">
                {step.desc}
              </p>
            </m.div>
          ))}
        </m.div>

        {/* Closing card */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="mt-16 rounded-xl border border-border bg-surface p-8 md:p-10"
        >
          <h3
            className="font-editorial font-normal text-ink mb-3 text-wrap-balance"
            style={{
              fontSize: 'clamp(20px, 2.2vw, 30px)',
              lineHeight: 1.2,
              letterSpacing: '-0.016em',
            }}
          >
            {COMO_TRABAJAMOS.closing.title}
          </h3>
          <p className="font-sans text-[14px] font-light leading-relaxed text-muted max-w-xl">
            {COMO_TRABAJAMOS.closing.desc}
          </p>
        </m.div>

      </div>
    </section>
  )
}
