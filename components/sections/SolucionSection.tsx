'use client'

import { useEffect, useRef, useState } from 'react'
import { m, useScroll, MotionValue } from 'framer-motion'
import { SOLUCION } from '@/content'
import { EASE, DURATION, revealOnce } from '@/lib/motion'
import SuplaiOrbitDiagram from '@/components/SuplaiOrbitDiagram'

/**
 * Cuenta cuántos pasos están activos según el progreso del scroll-jack.
 * Solo dispara re-render cuando ese número cambia (unas pocas veces en total),
 * no en cada frame — antes snapshoteábamos el float y React reconciliaba 60×/s.
 */
function useActiveStepCount(mv: MotionValue<number>, total: number): number {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const compute = (p: number) => {
      let c = 0
      for (let i = 0; i < total; i++) {
        if (p >= i / total - 0.05) c = i + 1
      }
      setCount((prev) => (prev === c ? prev : c))
    }
    compute(mv.get())
    return mv.on('change', compute)
  }, [mv, total])
  return count
}

/**
 * Tamaño del diagrama de órbita según breakpoint (300 / sm:380 / lg:420).
 * Arranca en 300 para SSR y hace upgrade en el cliente — evita mismatch de
 * hidratación.
 */
function useOrbitSize(): number {
  const [size, setSize] = useState(300)
  useEffect(() => {
    const sm = window.matchMedia('(min-width: 640px)')
    const lg = window.matchMedia('(min-width: 1024px)')
    const update = () => setSize(lg.matches ? 420 : sm.matches ? 380 : 300)
    update()
    sm.addEventListener('change', update)
    lg.addEventListener('change', update)
    return () => {
      sm.removeEventListener('change', update)
      lg.removeEventListener('change', update)
    }
  }, [])
  return size
}

/* ── Diagrama de órbita → components/SuplaiOrbitDiagram.tsx ──── */

function StepRow({
  step,
  isActive,
}: {
  step: (typeof SOLUCION.steps)[number]
  /** En desktop se atenúa según el scroll; en mobile va siempre activo. */
  isActive: boolean
}) {
  return (
    <m.div
      animate={{ opacity: isActive ? 1 : 0.28, y: isActive ? 0 : 8 }}
      transition={{ duration: DURATION.fast, ease: EASE }}
      className="flex items-start gap-6 py-8 border-t border-border"
    >
      <div className="shrink-0 mt-1 text-right" style={{ width: 28 }}>
        <span
          className="font-mono text-[11px] font-medium tracking-[0.12em] transition-colors duration-300"
          style={{ color: isActive ? '#2563EB' : '#D1D5DB' }}
        >
          {step.n}
        </span>
      </div>
      <div className="flex-1">
        <p
          className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] mb-1 transition-colors duration-300"
          style={{ color: isActive ? '#6B7280' : '#D1D5DB' }}
        >
          {step.label}
        </p>
        <h3
          className="type-h3 font-editorial font-normal text-wrap-balance transition-colors duration-300"
          style={{ color: isActive ? '#0A0A0A' : '#D1D5DB' }}
        >
          {step.title}
        </h3>
        <p
          className="mt-2 font-sans text-sm font-light leading-relaxed transition-colors duration-300"
          style={{ color: isActive ? '#6B7280' : '#E5E7EB' }}
        >
          {step.desc}
        </p>
      </div>
    </m.div>
  )
}

/** Titular con la palabra "operativa" (la categoría de Suplai) en itálica azul.
 *  Robusto: si esa palabra no está en el copy, no acentúa nada. */
function SolucionHeadline() {
  const words = SOLUCION.headline.split(' ')
  return (
    <>
      {words.map((word, i) => {
        const clean = word.replace(/[.,;:]/g, '').toLowerCase()
        const isAccent = clean === 'operativa'
        return (
          <span key={i} className={isAccent ? 'accent' : undefined}>
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </>
  )
}

export default function SolucionSection() {
  const containerRef = useRef<HTMLElement>(null)
  // El scroll-jack (sticky 280vh) sólo tiene sentido en desktop.
  // En mobile todo el contenido no entra en 100vh y se recortaba.
  const [isDesktop, setIsDesktop] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const activeCount = useActiveStepCount(scrollYProgress, SOLUCION.steps.length)
  const orbitSize = useOrbitSize()

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => setIsDesktop(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <section
      ref={containerRef}
      id="solucion"
      className="relative bg-white lg:h-[280vh]"
    >
      <div className="flex items-center py-20 lg:sticky lg:top-0 lg:h-screen lg:py-0">
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">

            {/* Izquierda: titular + hub */}
            <div>
              <m.h2
                {...revealOnce}
                className="type-h2 font-editorial font-normal text-ink text-wrap-balance mb-10"
              >
                <SolucionHeadline />
              </m.h2>

              <m.div
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                <SuplaiOrbitDiagram size={orbitSize} className="mx-auto" />
              </m.div>
            </div>

            {/* Derecha: pasos con rail */}
            <div className="flex gap-5">
              {/* Rail de progreso */}
              <div className="relative w-px flex-none self-stretch bg-border">
                <m.div
                  className="absolute top-0 left-0 w-full bg-primary origin-top"
                  style={{ scaleY: isDesktop ? scrollYProgress : 1, height: '100%' }}
                />
              </div>

              <div className="flex-1">
                {SOLUCION.steps.map((step, i) => (
                  <StepRow
                    key={step.n}
                    step={step}
                    isActive={!isDesktop || i < activeCount}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
