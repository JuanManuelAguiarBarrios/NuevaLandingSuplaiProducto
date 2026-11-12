'use client'

import { useEffect, useRef, useState } from 'react'
import { m, useMotionTemplate, useMotionValueEvent, useScroll } from 'framer-motion'
import AutoplayVideo from '@/components/AutoplayVideo'
import HeroMap from '@/components/hero/HeroMap'
import RotatingWords from '@/components/hero/RotatingWords'
import { LineContent } from '@/components/LineReveal'
import { MAP_PINS, MAP_VIEWBOX } from '@/components/hero/coneSur'
import { MessageIcon } from '@/components/product/icons'
import { DEMO_URL, HERO, WHATSAPP, whatsappUrl } from '@/content'
import { lineUp, stagger, VIEWPORT } from '@/lib/motion'
import { useScrollMotion, useScrollRange } from '@/lib/useScrollMotion'

/**
 * Hero en dos actos.
 *  1. Intro: la propuesta como titular (h1), con la industria que rota como
 *     línea secundaria arriba, bajada, lista de países y mapa del Cono Sur.
 *  2. Operación: al scrollear, el mapa hace zoom hacia Uruguay y el video
 *     se abre en un círculo desde ese punto (clip-path); después suben las
 *     dos líneas del titular.
 * En desktop sin reduced-motion la sección mide 180svh con un escenario
 * sticky. En mobile / reduced-motion los dos actos se apilan.
 * El video lleva poster y no se descarga hasta que se acerca a la pantalla
 * (ver AutoplayVideo): en mobile, donde el segundo acto queda debajo del
 * primero, la carga inicial no lo incluye.
 */

const SEDE = MAP_PINS.uruguay
const MAP_ORIGIN = `${(SEDE.x / MAP_VIEWBOX.width) * 100}% ${(SEDE.y / MAP_VIEWBOX.height) * 100}%`

const MASK = 'block overflow-hidden pb-[0.12em] -mb-[0.12em]'
/** Punto del recorrido en que el segundo acto ya tapa al primero. */
const ACT_TWO_AT = 0.4

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const sedeRef = useRef<SVGCircleElement>(null)
  const isScrollMotion = useScrollMotion()

  const [center, setCenter] = useState({ x: 0, y: 0 })
  const [isStatementHovered, setIsStatementHovered] = useState(false)
  const [isActTwo, setIsActTwo] = useState(false)

  const { scrollYProgress: p } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Acto 1 → se va
  const introY = useScrollRange(p, [0, 0.3], [0, -140])
  const introOpacity = useScrollRange(p, [0, 0.22], [1, 0])
  const hintOpacity = useScrollRange(p, [0, 0.08], [1, 0])
  const mapScale = useScrollRange(p, [0, 0.5], [1, 7])
  const mapOpacity = useScrollRange(p, [0.12, 0.38], [1, 0.25])
  // Acto 2 → se abre desde la sede
  const clipRadius = useScrollRange(p, [0.18, 0.6], [0, 150])
  const clipPath = useMotionTemplate`circle(${clipRadius}% at ${center.x}px ${center.y}px)`
  const mediaScale = useScrollRange(p, [0.18, 0.8], [1.3, 1])
  const line1Y = useScrollRange(p, [0.55, 0.72], ['110%', '0%'])
  const line2Y = useScrollRange(p, [0.6, 0.77], ['110%', '0%'])
  const restOpacity = useScrollRange(p, [0.68, 0.82], [0, 1])
  const restY = useScrollRange(p, [0.68, 0.82], [20, 0])

  // Con el escenario fijo los dos actos están superpuestos: el que no se ve
  // queda inerte, para que el foco de teclado no caiga en botones invisibles.
  useMotionValueEvent(p, 'change', (v) => {
    const next = v >= ACT_TWO_AT
    if (next !== isActTwo) setIsActTwo(next)
  })
  const isActOneInert = isScrollMotion && isActTwo
  const isActTwoInert = isScrollMotion && !isActTwo

  // Centro del círculo = posición del punto de la sede dentro del escenario.
  // El mapa escala con origen en ese punto, así que su posición no cambia.
  useEffect(() => {
    if (!isScrollMotion) return
    const measure = () => {
      const pin = sedeRef.current?.getBoundingClientRect()
      const stage = stageRef.current?.getBoundingClientRect()
      if (!pin || !stage) return
      setCenter({
        x: pin.left + pin.width / 2 - stage.left,
        y: pin.top + pin.height / 2 - stage.top,
      })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [isScrollMotion])

  const propositionLines = HERO.proposition.text.split('\n')
  const lines = HERO.headline.text.split('\n')
  const lineStyles = [line1Y, line2Y]

  return (
    <section
      ref={sectionRef}
      id="inicio"
      data-tone="dark"
      data-motion={isScrollMotion ? 'on' : 'off'}
      aria-label="Inicio"
      className="group/hero relative bg-night text-ink-inverse data-[motion=on]:h-[180svh]"
    >
      <div
        ref={stageRef}
        className="relative group-data-[motion=on]/hero:sticky group-data-[motion=on]/hero:top-0 group-data-[motion=on]/hero:h-svh group-data-[motion=on]/hero:overflow-hidden"
      >
        {/* ── Acto 1: intro ── */}
        <div inert={isActOneInert} className="relative grid min-h-svh grid-cols-1 gap-12 px-5 pt-28 pb-10 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12 lg:pt-32 lg:pb-12">
          <m.div
            style={isScrollMotion ? { y: introY, opacity: introOpacity } : undefined}
            className="relative z-10 flex flex-col justify-between gap-12 lg:col-span-7"
          >
            {/* my-auto: centra el bloque de textos en el espacio libre sobre la lista de países. */}
            <div className="@container lg:my-auto">
              <p
                onMouseEnter={() => setIsStatementHovered(true)}
                onMouseLeave={() => setIsStatementHovered(false)}
                className="intro text-[clamp(1rem,1.5vw,1.375rem)] font-medium tracking-[-0.01em] text-ink-inverse-muted [animation-delay:120ms] lg:mt-4"
              >
                <span className="sr-only">{HERO.statement.label}</span>
                <span aria-hidden="true">{HERO.statement.fixed} </span>
                <RotatingWords words={HERO.statement.rotating} isPaused={isStatementHovered} className="text-ink-inverse" />
              </p>
              {/* Tamaño relativo al ancho de la columna (cqw): en desktop la línea más
                  larga del titular entra entera; en mobile el texto fluye sin cortes fijos. */}
              <h1 className="intro-solid mt-4 text-[clamp(1.875rem,8.6cqw,3rem)] leading-[1.04] font-semibold tracking-[-0.04em] text-balance text-ink-inverse lg:mt-5 lg:text-[clamp(2rem,6.8cqw,4.25rem)] lg:text-wrap">
                {propositionLines.map((line) => (
                  <span key={line} className="lg:block">
                    <LineContent line={line} accent={HERO.proposition.accent} />{' '}
                  </span>
                ))}
              </h1>
              <p className="intro-solid mt-6 max-w-md text-lead text-ink-inverse-muted lg:mt-8">
                {HERO.intro}
              </p>
              <div className="intro mt-8 flex flex-wrap items-center gap-6 [animation-delay:460ms]">
                <a
                  href={DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-accent px-5 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-accent-strong"
                >
                  {HERO.ctaPrimary} <span aria-hidden="true">→</span>
                </a>
                <a
                  href={whatsappUrl(WHATSAPP.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 py-3.5 text-sm font-medium text-ink-inverse"
                >
                  <MessageIcon className="size-4" />
                  <span className="link-line">{HERO.ctaWhatsapp}</span>
                </a>
              </div>
            </div>

            <ol className="grid grid-cols-2 border-t border-line-inverse sm:grid-cols-4">
              {HERO.countries.map((c, i) => (
                <li
                  key={c.pin}
                  style={{ animationDelay: `${500 + i * 80}ms` }}
                  className="intro border-b border-line-inverse py-4 pr-4 sm:border-b-0"
                >
                  <span className="font-mono text-[11px] text-caption tabular-nums">{c.n}</span>
                  <span className="mt-2 block font-medium text-ink-inverse">{c.name}</span>
                  {'note' in c && <span className="mt-1 block text-sm text-ink-inverse-muted">{c.note}</span>}
                </li>
              ))}
            </ol>
          </m.div>

          {/* Solo en desktop: en pantallas chicas la lista de países ya dice lo mismo. */}
          <div className="relative hidden items-center justify-center lg:col-span-5 lg:flex">
            <m.div
              style={
                isScrollMotion
                  ? { scale: mapScale, opacity: mapOpacity, transformOrigin: MAP_ORIGIN }
                  : undefined
              }
              className="intro relative aspect-[491/790] h-[min(76svh,820px)] [animation-delay:250ms]"
            >
              <HeroMap labels={HERO.countries} sedeRef={sedeRef} />
            </m.div>
          </div>

          <m.p
            style={{ opacity: hintOpacity }}
            aria-hidden="true"
            className="eyebrow absolute right-12 bottom-8 hidden text-caption group-data-[motion=on]/hero:block"
          >
            {HERO.scrollHint} ↓
          </m.p>
        </div>

        {/* ── Acto 2: la operación ── */}
        <m.div
          inert={isActTwoInert}
          style={isScrollMotion ? { clipPath } : undefined}
          className="relative min-h-[92svh] overflow-hidden group-data-[motion=on]/hero:absolute group-data-[motion=on]/hero:inset-0 group-data-[motion=on]/hero:min-h-0"
        >
          <m.div
            style={isScrollMotion ? { scale: mediaScale } : undefined}
            className="absolute inset-0"
            aria-hidden="true"
          >
            <AutoplayVideo loop poster={HERO.video.poster} className="absolute inset-0 h-full w-full object-cover">
              <source src={HERO.video.mp4} type="video/mp4" />
            </AutoplayVideo>
            <div className="absolute inset-0 bg-night/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-night/10" />
          </m.div>

          <div className="absolute inset-x-0 bottom-0 grid gap-8 px-5 pb-10 sm:px-8 lg:grid-cols-12 lg:items-end lg:px-12 lg:pb-14">
            <m.h2
              variants={stagger}
              initial={isScrollMotion ? false : 'hidden'}
              whileInView={isScrollMotion ? undefined : 'show'}
              viewport={VIEWPORT}
              className="text-[clamp(1.625rem,0.5rem+3.6vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.04em] text-ink-inverse lg:col-span-8"
            >
              {lines.map((line, i) => (
                <span key={line} className={MASK}>
                  <m.span
                    variants={isScrollMotion ? undefined : lineUp}
                    style={isScrollMotion ? { y: lineStyles[i] } : undefined}
                    className="block"
                  >
                    <LineContent line={line} accent={HERO.headline.accent} />
                  </m.span>
                </span>
              ))}
            </m.h2>

            <m.div
              style={isScrollMotion ? { opacity: restOpacity, y: restY } : undefined}
              className="lg:col-span-4 lg:col-start-9 xl:col-span-3 xl:col-start-10"
            >
              <p className="max-w-sm text-lead text-ink-inverse-muted">{HERO.subtitle}</p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <a
                  href={DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-accent px-5 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-accent-strong"
                >
                  {HERO.ctaPrimary} <span aria-hidden="true">→</span>
                </a>
                <a href={HERO.ctaSecondary.href} className="link-line text-sm font-medium text-ink-inverse">
                  {HERO.ctaSecondary.label} <span aria-hidden="true">→</span>
                </a>
              </div>
            </m.div>
          </div>
        </m.div>
      </div>
    </section>
  )
}
