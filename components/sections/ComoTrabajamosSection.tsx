'use client'

import { useRef } from 'react'
import { m, useReducedMotion, useScroll } from 'framer-motion'
import { COMO_TRABAJAMOS } from '@/content'
import { EASE, DURATION, revealOnce } from '@/lib/motion'
import { useActiveStepCount } from '@/lib/useActiveStepCount'
import LineReveal from '@/components/LineReveal'

/**
 * "Así trabajamos" como timeline (A3 + B6): línea de progreso scroll-linked
 * que conecta los 4 pasos — horizontal en desktop, rail vertical en mobile —
 * con cada paso encendiéndose cuando la línea lo alcanza. Ese dibujo es el
 * único momento orquestado de la sección.
 */

type Step = (typeof COMO_TRABAJAMOS.steps)[number]

function StepItem({ step, isActive }: { step: Step; isActive: boolean }) {
  return (
    <m.div
      initial={false}
      animate={{ opacity: isActive ? 1 : 0.35 }}
      transition={{ duration: DURATION.fast, ease: EASE }}
    >
      <p
        className="mb-4 font-mono text-[11px] font-medium tracking-[0.08em] transition-colors duration-300"
        style={{ color: isActive ? '#2563EB' : '#9CA3AF' }}
      >
        {step.n}
      </p>
      <h3 className="type-h4 font-editorial font-normal text-ink mb-3">
        {step.title}
      </h3>
      <p className="font-sans text-[13px] font-light leading-relaxed text-muted">
        {step.desc}
      </p>
    </m.div>
  )
}

export default function ComoTrabajamosSection() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // El dibujo arranca cuando la timeline entra por abajo (85% del viewport)
  // y completa cuando su tope llega al 30% — ~medio viewport de recorrido.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.85', 'start 0.3'],
  })

  const totalSteps = COMO_TRABAJAMOS.steps.length
  const activeFromScroll = useActiveStepCount(scrollYProgress, totalSteps)
  const activeCount = prefersReducedMotion ? totalSteps : activeFromScroll

  return (
    <section id="como-trabajamos" className="bg-white" style={{ paddingBlock: 'var(--section-py)' }}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">

        {/* Titular */}
        <m.h2
          {...revealOnce}
          className="type-h2 font-editorial font-normal text-ink mb-14 text-wrap-balance"
        >
          {COMO_TRABAJAMOS.headline}
        </m.h2>

        <div ref={timelineRef}>
          {/* Línea de progreso horizontal (desktop) con un nodo por paso */}
          <div className="relative mb-12 hidden lg:block" aria-hidden="true">
            <div className="h-px w-full bg-border" />
            <m.div
              className="absolute inset-x-0 top-0 h-px origin-left bg-primary"
              style={{ scaleX: prefersReducedMotion ? 1 : scrollYProgress }}
            />
            {COMO_TRABAJAMOS.steps.map((step, i) => (
              <span
                key={step.n}
                className={`absolute top-1/2 size-[7px] -translate-y-1/2 rounded-full transition-colors duration-300 ${
                  i < activeCount ? 'bg-primary' : 'bg-border'
                }`}
                style={{ left: `${(i / totalSteps) * 100}%` }}
              />
            ))}
          </div>

          {/* Rail vertical (mobile) + pasos */}
          <div className="relative">
            <div
              className="absolute bottom-1 left-0 top-1 w-px bg-border lg:hidden"
              aria-hidden="true"
            />
            <m.div
              className="absolute bottom-1 left-0 top-1 w-px origin-top bg-primary lg:hidden"
              style={{ scaleY: prefersReducedMotion ? 1 : scrollYProgress }}
              aria-hidden="true"
            />
            <div className="grid gap-x-8 gap-y-12 pl-7 lg:grid-cols-4 lg:pl-0">
              {COMO_TRABAJAMOS.steps.map((step, i) => (
                <StepItem key={step.n} step={step} isActive={i < activeCount} />
              ))}
            </div>
          </div>
        </div>

        {/* Compromiso incremental — remate editorial de la timeline */}
        <div className="mt-20">
          <LineReveal
            text={COMO_TRABAJAMOS.compromiso.plain}
            accent={COMO_TRABAJAMOS.compromiso.accent}
            as="p"
            className="type-h2 max-w-2xl font-editorial font-normal text-ink"
          />
        </div>

        {/* Closing card */}
        <m.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: DURATION.base, delay: 0.15, ease: EASE }}
          className="mt-16 rounded-xl border border-border bg-surface p-8 md:p-10"
        >
          <h3 className="type-h3 font-editorial font-normal text-ink mb-3 text-wrap-balance">
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
