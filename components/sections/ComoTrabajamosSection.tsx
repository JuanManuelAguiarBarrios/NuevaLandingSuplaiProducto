'use client'

import { useRef, useState } from 'react'
import { m, useReducedMotion, useScroll } from 'framer-motion'
import { COMO_TRABAJAMOS } from '@/content'
import { EASE, DURATION, revealOnce } from '@/lib/motion'
import { useActiveStepCount } from '@/lib/useActiveStepCount'
import LineReveal from '@/components/LineReveal'
import DigitRoll from '@/components/DigitRoll'

/**
 * "Así trabajamos" — split con número rotante: columna izquierda sticky con
 * el número de paso en display editorial que RUEDA como odómetro (el gesto
 * del contador del preloader, no el sticky de Solución) en sync con el paso
 * activo de la derecha. En mobile no hay número gigante: filas con eyebrow
 * numerado + rail vertical scroll-linked. Ese sync es el único momento
 * orquestado de la sección.
 */

type Step = (typeof COMO_TRABAJAMOS.steps)[number]

function StepRow({
  step,
  isActive,
  onHover,
  onHoverEnd,
}: {
  step: Step
  isActive: boolean
  onHover: () => void
  onHoverEnd: () => void
}) {
  return (
    <m.div
      initial={false}
      animate={{ opacity: isActive ? 1 : 0.35 }}
      transition={{ duration: DURATION.fast, ease: EASE }}
      onMouseEnter={onHover}
      onMouseLeave={onHoverEnd}
      className="border-t border-border py-8 lg:py-10"
    >
      {/* Eyebrow numerado solo en mobile — en desktop lo dice el número gigante */}
      <p
        className="mb-3 font-mono text-[11px] font-medium tracking-[0.08em] transition-colors duration-300 lg:hidden"
        style={{ color: isActive ? '#2563EB' : '#9CA3AF' }}
        aria-hidden="true"
      >
        {step.n}
      </p>
      <h3 className="type-h3 font-editorial font-normal text-ink text-wrap-balance">
        {step.title}
      </h3>
      <p className="mt-2.5 max-w-[52ch] font-sans text-[14px] font-light leading-relaxed text-muted">
        {step.desc}
      </p>
    </m.div>
  )
}

/** Fila final "+": el gesto del slot de Agentes — lo custom siempre se
 *  marca igual. No participa del spotlight ni del conteo del número. */
function ClosingRow() {
  return (
    <div className="border-t border-dashed border-border py-8 lg:py-10">
      <span
        className="mb-4 flex size-7 items-center justify-center rounded-full border border-dashed border-[#D1D5DB] text-muted"
        aria-hidden="true"
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M6 1v10M1 6h10" />
        </svg>
      </span>
      <h3 className="type-h3 font-editorial font-normal text-ink text-wrap-balance">
        {COMO_TRABAJAMOS.closing.title}
      </h3>
      <p className="mt-2.5 max-w-xl font-sans text-[14px] font-light leading-relaxed text-muted">
        {COMO_TRABAJAMOS.closing.desc}
      </p>
    </div>
  )
}

export default function ComoTrabajamosSection() {
  const stepsRef = useRef<HTMLDivElement>(null)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  const prefersReducedMotion = useReducedMotion()

  // El paso activo avanza mientras las filas cruzan la franja de lectura.
  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ['start 0.65', 'end 0.55'],
  })

  const totalSteps = COMO_TRABAJAMOS.steps.length
  const activeFromScroll = useActiveStepCount(scrollYProgress, totalSteps)
  // 1..totalSteps — nunca 0: el número gigante siempre muestra un paso.
  // El hover pisa al scroll mientras dura (mismo gesto que el índice de
  // Empresas); en mobile no hay hover y manda el scroll.
  const scrollStep = prefersReducedMotion ? 1 : Math.max(1, activeFromScroll)
  const displayedStep = hoveredStep ?? scrollStep

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

        <div className="grid gap-12 lg:grid-cols-[minmax(220px,320px)_1fr] lg:gap-24">

          {/* Número rotante sticky (desktop) + rail de progreso */}
          <div className="hidden lg:block">
            <div className="sticky top-24 flex items-stretch gap-6">
              <div className="relative w-px bg-border" aria-hidden="true">
                <m.div
                  className="absolute inset-0 origin-top bg-primary"
                  style={{ scaleY: prefersReducedMotion ? 1 : scrollYProgress }}
                />
              </div>
              <div>
                <div
                  className="select-none font-editorial font-normal leading-none"
                  style={{ fontSize: 'clamp(140px, 15vw, 220px)' }}
                  aria-hidden="true"
                >
                  <span className="text-[#E5E7EB]">
                    <DigitRoll digit={0} transitionMs={480} width="0.56em" />
                  </span>
                  <span className="text-[#D1D5DB]">
                    <DigitRoll digit={displayedStep} transitionMs={480} width="0.56em" />
                  </span>
                </div>
                <p
                  className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted"
                  aria-hidden="true"
                >
                  Paso 0{displayedStep} / 0{totalSteps}
                </p>
              </div>
            </div>
          </div>

          {/* Pasos — el activo a plena opacidad, el resto atenuado */}
          <div ref={stepsRef} className="relative">
            {/* Rail vertical scroll-linked (mobile) */}
            <div
              className="absolute bottom-1 left-0 top-1 w-px bg-border lg:hidden"
              aria-hidden="true"
            />
            <m.div
              className="absolute bottom-1 left-0 top-1 w-px origin-top bg-primary lg:hidden"
              style={{ scaleY: prefersReducedMotion ? 1 : scrollYProgress }}
              aria-hidden="true"
            />
            <div className="pl-7 lg:pl-0">
              {COMO_TRABAJAMOS.steps.map((step, i) => (
                <StepRow
                  key={step.n}
                  step={step}
                  isActive={prefersReducedMotion || i === displayedStep - 1}
                  onHover={() => setHoveredStep(i + 1)}
                  onHoverEnd={() => setHoveredStep(null)}
                />
              ))}
              <ClosingRow />
            </div>
          </div>

        </div>

        {/* Compromiso incremental — remate editorial de la sección */}
        <div className="mt-20">
          <LineReveal
            text={COMO_TRABAJAMOS.compromiso.plain}
            accent={COMO_TRABAJAMOS.compromiso.accent}
            as="p"
            className="type-h2 max-w-2xl font-editorial font-normal text-ink"
          />
        </div>

      </div>
    </section>
  )
}
