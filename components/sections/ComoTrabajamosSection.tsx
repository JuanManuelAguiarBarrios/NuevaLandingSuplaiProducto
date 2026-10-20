'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { m, useMotionValueEvent, useScroll } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import LineReveal from '@/components/LineReveal'
import { COMO_TRABAJAMOS, DEMO_URL } from '@/content'
import { fadeUp, VIEWPORT } from '@/lib/motion'
import { useScrollMotion, useScrollRange } from '@/lib/useScrollMotion'

/**
 * Cómo trabajamos: 4 pasos a pantalla completa. En desktop el escenario
 * queda fijo; cada paso nuevo entra con un wipe de abajo hacia arriba
 * (clip-path) sobre el anterior, con la imagen en parallax, y el contador
 * de abajo a la derecha sigue al paso activo. En mobile / reduced-motion
 * los pasos se apilan.
 */

type Step = (typeof COMO_TRABAJAMOS)['steps'][number]

const STEPS = COMO_TRABAJAMOS.steps
const TRANSITIONS = STEPS.length - 1
/** Parte del recorrido que ocupan las transiciones; el resto es pausa final. */
const TRAVEL = 0.88

/** Ventana de scroll [inicio, fin] en la que entra el paso i (i ≥ 1). */
function windowFor(i: number): [number, number] {
  const end = (i / TRANSITIONS) * TRAVEL
  const start = end - (TRAVEL / TRANSITIONS) * 0.75
  return [start, end]
}

function StepContent({ step }: { step: Step }) {
  const titleId = `paso-${step.n}`
  return (
    <div className="relative z-10 max-w-3xl px-5 pb-16 sm:px-8 lg:px-12 lg:pb-20">
      <p className="eyebrow flex gap-4 text-accent-inverse">
        <span className="tabular-nums">{step.n}</span>
        <span>{step.label}</span>
      </p>
      <h3 id={titleId} className="mt-5 text-h1 font-semibold text-ink-inverse">
        {step.title.split('\n').map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h3>
      <p className="mt-6 max-w-md text-lead text-ink-inverse-muted">{step.body}</p>
      <a
        href={DEMO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="link-line mt-8 inline-block text-sm font-medium text-ink-inverse"
      >
        {COMO_TRABAJAMOS.cta} <span aria-hidden="true">→</span>
      </a>
    </div>
  )
}

function StepMedia({ step, sizes }: { step: Step; sizes: string }) {
  return (
    <>
      <Image src={step.image.src} alt={step.image.alt} fill sizes={sizes} className="object-cover" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-night/90 via-night/55 to-night/10" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/80 to-transparent" />
    </>
  )
}

function PinnedStep({ step, index, progress }: { step: Step; index: number; progress: MotionValue<number> }) {
  const [start, end] = index === 0 ? [-1, 0] : windowFor(index)
  const clip = useScrollRange(progress, [start, end], ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'])
  const imageScale = useScrollRange(progress, [start, end + 0.2], [1.12, 1])
  const imageY = useScrollRange(progress, [start, 1], ['0%', '-6%'])
  const contentOpacity = useScrollRange(progress, [end - 0.04, end + 0.04], [0, 1])
  const contentY = useScrollRange(progress, [end - 0.04, end + 0.06], [48, 0])

  return (
    <m.article
      aria-labelledby={`paso-${step.n}`}
      style={index === 0 ? undefined : { clipPath: clip }}
      className="absolute inset-0 isolate flex items-end overflow-hidden"
    >
      <m.div style={{ scale: imageScale, y: imageY }} className="absolute inset-0">
        <StepMedia step={step} sizes="100vw" />
      </m.div>
      <m.div style={index === 0 ? undefined : { opacity: contentOpacity, y: contentY }}>
        <StepContent step={step} />
      </m.div>
    </m.article>
  )
}

function StepCounter({ active, progress }: { active: number; progress: MotionValue<number> }) {
  const step = STEPS[active]
  const scaleX = useScrollRange(progress, [0, TRAVEL], [1 / STEPS.length, 1])
  return (
    <div aria-hidden="true" className="absolute right-12 bottom-20 z-20 w-56 text-right">
      <p className="font-sans text-[clamp(3rem,5vw,4.5rem)] leading-none font-light tracking-[-0.04em] text-ink-inverse tabular-nums">
        {step.n}
        <span className="ml-1 align-top font-mono text-xs tracking-normal text-caption">
          de {String(STEPS.length).padStart(2, '0')}
        </span>
      </p>
      <div className="mt-4 h-px bg-line-inverse">
        <m.div style={{ scaleX }} className="h-px origin-left bg-accent-inverse" />
      </div>
      <p className="mt-3 text-sm text-caption">{step.label}</p>
    </div>
  )
}

export default function ComoTrabajamosSection() {
  const stageRef = useRef<HTMLDivElement>(null)
  const isScrollMotion = useScrollMotion()
  const [active, setActive] = useState(0)

  const { scrollYProgress: p } = useScroll({ target: stageRef, offset: ['start start', 'end end'] })

  // El contador cambia de paso a mitad de cada wipe (solo re-render en el umbral).
  useMotionValueEvent(p, 'change', (v) => {
    const next = STEPS.reduce((acc, _, i) => (i > 0 && v >= windowFor(i)[0] + (TRAVEL / TRANSITIONS) * 0.4 ? i : acc), 0)
    if (next !== active) setActive(next)
  })

  return (
    <section id="como-trabajamos" data-tone="dark" aria-labelledby="como-title" className="bg-night text-ink-inverse">
      <header className="grid gap-8 px-5 pt-24 pb-16 sm:px-8 lg:grid-cols-12 lg:px-12 lg:pt-36 lg:pb-20">
        <div className="lg:col-span-7">
          <p className="eyebrow text-caption">{COMO_TRABAJAMOS.eyebrow}</p>
          <div id="como-title">
            <LineReveal
              text={COMO_TRABAJAMOS.headline.text}
              accent={COMO_TRABAJAMOS.headline.accent}
              className="mt-5 text-display font-semibold"
            />
          </div>
        </div>
        <m.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="max-w-sm text-ink-inverse-muted lg:col-span-4 lg:col-start-9 lg:self-end"
        >
          {COMO_TRABAJAMOS.intro}
        </m.p>
      </header>

      {isScrollMotion ? (
        <div ref={stageRef} style={{ height: `${STEPS.length * 100 + 40}svh` }} className="relative">
          <div className="sticky top-0 h-svh overflow-hidden">
            {STEPS.map((step, i) => (
              <PinnedStep key={step.n} step={step} index={i} progress={p} />
            ))}
            <StepCounter active={active} progress={p} />
          </div>
        </div>
      ) : (
        <div ref={stageRef}>
          {STEPS.map((step) => (
            <article
              key={step.n}
              aria-labelledby={`paso-${step.n}`}
              className="relative isolate flex min-h-[86svh] items-end overflow-hidden"
            >
              <div className="absolute inset-0">
                <StepMedia step={step} sizes="100vw" />
              </div>
              <m.div variants={fadeUp} initial="hidden" whileInView="show" viewport={VIEWPORT}>
                <StepContent step={step} />
              </m.div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
