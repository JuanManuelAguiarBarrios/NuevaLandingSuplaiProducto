'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { COMO_TRABAJAMOS } from '@/content'
import { EASE, revealOnce } from '@/lib/motion'
import LineReveal from '@/components/LineReveal'
import StepVisual from '@/components/proceso/StepVisuals'

/**
 * "Así trabajamos" — tabs interactivas con panel visual (ref. Centinel):
 * los 4 pasos como tabs numeradas; cada una abre un panel sobre fondo
 * surface con el copy del paso a la izquierda y un visual construido en
 * código como protagonista. Sin auto-avance: estos paneles se leen.
 * A11y: tablist/tab/tabpanel, flechas de teclado, focus visible.
 */

/* La progresión de nodos: uno lleno (tu primer agente) y los siguientes
   encendiéndose en cascada al entrar en viewport — el copy hecho visual. */
const NODE_COUNT = 5

const segDraw = {
  hidden: { scaleX: 0 },
  show: (i: number) => ({
    scaleX: 1,
    transition: { delay: 0.25 + i * 0.18, duration: 0.3, ease: EASE },
  }),
}

const dotFill = {
  hidden: { scale: 0 },
  show: (i: number) => ({
    scale: 1,
    transition: { delay: 0.37 + i * 0.18, duration: 0.28, ease: EASE },
  }),
}

function CompromisoBand() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="mt-14 rounded-2xl bg-surface p-8 md:p-12">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
        <LineReveal
          text={COMO_TRABAJAMOS.compromiso.plain}
          accent={COMO_TRABAJAMOS.compromiso.accent}
          as="p"
          className="type-h2 max-w-xl font-editorial font-normal text-ink"
        />

        <m.div
          className="flex items-center"
          initial={prefersReducedMotion ? undefined : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'show'}
          viewport={{ once: true, amount: 0.6 }}
          aria-hidden="true"
        >
          {Array.from({ length: NODE_COUNT }, (_, i) => (
            <span key={i} className="flex items-center">
              {i > 0 && (
                <span className="relative h-px w-8 bg-border md:w-12">
                  <m.span
                    className="absolute inset-0 origin-left bg-primary/50"
                    custom={i - 1}
                    variants={prefersReducedMotion ? undefined : segDraw}
                  />
                </span>
              )}
              <span className="relative size-3.5 rounded-full border border-primary/40 bg-white">
                <m.span
                  className="absolute inset-[2px] rounded-full bg-primary"
                  custom={i - 1}
                  variants={i === 0 || prefersReducedMotion ? undefined : dotFill}
                />
              </span>
            </span>
          ))}
        </m.div>
      </div>
    </div>
  )
}

export default function ComoTrabajamosSection() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const totalTabs = COMO_TRABAJAMOS.paneles.tabs.length
  const activeStep = COMO_TRABAJAMOS.steps[active]

  const focusTab = (index: number) => {
    setActive(index)
    tabRefs.current[index]?.focus()
  }

  const onTablistKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      focusTab((active + 1) % totalTabs)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      focusTab((active - 1 + totalTabs) % totalTabs)
    } else if (e.key === 'Home') {
      e.preventDefault()
      focusTab(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      focusTab(totalTabs - 1)
    }
  }

  return (
    <section id="como-trabajamos" className="bg-white" style={{ paddingBlock: 'var(--section-py)' }}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">

        {/* Titular */}
        <m.h2
          {...revealOnce}
          className="type-h2 font-editorial font-normal text-ink mb-10 text-wrap-balance"
        >
          {COMO_TRABAJAMOS.headline}
        </m.h2>

        {/* Tabs — scroll horizontal en mobile, 4 columnas en desktop */}
        <div
          role="tablist"
          aria-label="Proceso de trabajo"
          onKeyDown={onTablistKeyDown}
          className="-mx-6 mb-5 flex overflow-x-auto px-6 md:mx-0 md:grid md:grid-cols-4 md:gap-1 md:px-0"
        >
          {COMO_TRABAJAMOS.paneles.tabs.map((tab, i) => {
            const isActive = i === active
            return (
              <button
                key={tab}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                type="button"
                role="tab"
                id={`proceso-tab-${i}`}
                aria-selected={isActive}
                aria-controls="proceso-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(i)}
                className={`group flex min-w-[140px] flex-col gap-1.5 rounded-sm border-b-2 px-3 py-3.5 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:min-w-0 ${
                  isActive ? 'border-primary' : 'border-border hover:border-[#D1D5DB]'
                }`}
              >
                <span
                  className={`font-mono text-[10px] tabular-nums transition-colors duration-300 ${
                    isActive ? 'text-primary' : 'text-muted/70'
                  }`}
                  aria-hidden="true"
                >
                  {COMO_TRABAJAMOS.steps[i].n}
                </span>
                <span
                  className={`font-sans text-[13px] leading-snug transition-colors duration-300 ${
                    isActive ? 'font-medium text-ink' : 'text-muted group-hover:text-ink/70'
                  }`}
                >
                  {tab}
                </span>
              </button>
            )
          })}
        </div>

        {/* Panel */}
        <div
          id="proceso-panel"
          role="tabpanel"
          aria-labelledby={`proceso-tab-${active}`}
          className="rounded-2xl bg-surface p-6 md:p-10"
        >
          <AnimatePresence mode="wait">
            <m.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="grid gap-8 lg:grid-cols-[minmax(240px,320px)_1fr] lg:items-center lg:gap-14"
            >
              <div>
                <p className="eyebrow mb-3 text-muted" aria-hidden="true">
                  {activeStep.n} / 0{totalTabs}
                </p>
                <h3 className="font-sans text-[17px] font-semibold leading-snug text-ink">
                  {activeStep.title}
                </h3>
                <p className="mt-2.5 font-sans text-[14px] font-light leading-relaxed text-muted">
                  {activeStep.desc}
                </p>
              </div>
              <StepVisual index={active} />
            </m.div>
          </AnimatePresence>
        </div>

        {/* Compromiso incremental — banda de cierre con la progresión */}
        <CompromisoBand />

      </div>
    </section>
  )
}
