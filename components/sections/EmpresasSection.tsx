'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, m, useInView, useReducedMotion } from 'framer-motion'
import { EMPRESAS } from '@/content'
import { EASE, revealOnce } from '@/lib/motion'
import { VerticalGlyph } from '@/components/logos'

/**
 * "Hecho para tu operación" — formato cine: el footage de cada industria es
 * un lienzo panorámico full-width con el título y la descripción encima
 * (scrim inferior) y una fila de tabs numeradas debajo. Autoplay cada 6s
 * mientras la sección está en viewport; pausa al hover/touch; sin autoplay
 * ni video con prefers-reduced-motion (queda la foto).
 */

/** Intervalo del autoplay — compartido por el timer y la barra de progreso. */
const AUTOPLAY_MS = 6000

type EmpresaItem = (typeof EMPRESAS.items)[number] & { video?: string }

export default function EmpresasSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [cycle, setCycle] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.3 })
  const prefersReducedMotion = useReducedMotion()

  const isAutoplaying = isInView && !isPaused && !prefersReducedMotion

  // Autoplay: avanza cada AUTOPLAY_MS mientras la sección está en viewport y
  // el usuario no interactúa. `cycle` reinicia el intervalo (y la barra de
  // progreso) al activar una tab a mano o al reanudar tras una pausa.
  useEffect(() => {
    if (!isAutoplaying) return
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % EMPRESAS.items.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [isAutoplaying, cycle])

  const activate = (index: number) => {
    setActiveIndex(index)
    setCycle((c) => c + 1)
  }

  const pause = () => setIsPaused(true)
  const resume = () => {
    setIsPaused(false)
    setCycle((c) => c + 1)
  }

  const active: EmpresaItem = EMPRESAS.items[activeIndex] ?? EMPRESAS.items[0]

  return (
    <section
      ref={sectionRef}
      id="empresas"
      className="bg-[#0A0A0A]"
      style={{ paddingBlock: 'var(--section-py)' }}
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">

        <m.div {...revealOnce} className="mb-12 max-w-xl">
          <h2
            className="font-editorial font-normal text-white text-wrap-balance"
            style={{
              fontSize: 'clamp(28px, 3.6vw, 52px)',
              lineHeight: 1.1,
              letterSpacing: '-0.022em',
            }}
          >
            {EMPRESAS.headline.plain}{' '}
            <em className="accent">{EMPRESAS.headline.accent}</em>
          </h2>
          <p
            className="mt-4 font-sans font-light leading-relaxed text-white/65"
            style={{ fontSize: 'clamp(14px, 1.4vw, 16px)' }}
          >
            {EMPRESAS.subtitle}
          </p>
        </m.div>

        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE }}
          onMouseEnter={pause}
          onMouseLeave={resume}
          onTouchStart={pause}
        >
          {/* Lienzo cinematográfico. En mobile el aspect es 16:9 nativo del
              footage — el video se ve completo, sin recortes laterales. */}
          <div className="relative aspect-video overflow-hidden rounded-2xl sm:aspect-[16/10] lg:aspect-[21/10]">
            {EMPRESAS.items.map((rawItem, i) => {
              const item: EmpresaItem = rawItem
              const isActive = i === activeIndex
              const hasVideo = Boolean(item.video) && isActive && !prefersReducedMotion
              return (
                <div
                  key={item.key}
                  className={`absolute inset-0 transition-opacity duration-500 ease-signature ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden={!isActive}
                >
                  {hasVideo ? (
                    <video
                      src={item.video}
                      poster={`/empresas/${item.key}.webp`}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="none"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <Image
                      src={`/empresas/${item.key}.webp`}
                      alt={item.alt}
                      fill
                      quality={65}
                      sizes="(min-width: 1280px) 1120px, 100vw"
                      className={`object-cover ${isActive ? 'kenburns' : ''}`}
                    />
                  )}
                </div>
              )
            })}

            {/* Scrim inferior — solo donde el texto va sobre el footage */}
            <div
              className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-[#0A0A0A]/85 via-[#0A0A0A]/20 to-transparent sm:block"
              aria-hidden="true"
            />

            {/* Texto + contador sobre el footage (tablet/desktop) */}
            <div className="absolute inset-x-0 bottom-0 hidden items-end justify-between gap-6 p-6 sm:flex md:p-8">
              <AnimatePresence mode="wait">
                <m.div
                  key={active.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease: EASE }}
                >
                  <h3
                    className="font-editorial font-normal text-white text-wrap-balance"
                    style={{
                      fontSize: 'clamp(22px, 2.8vw, 38px)',
                      lineHeight: 1.15,
                      letterSpacing: '-0.018em',
                    }}
                  >
                    {active.title}
                  </h3>
                  <p className="mt-2 max-w-[46ch] font-sans text-[13px] font-light leading-relaxed text-white/75 md:text-[14px]">
                    {active.desc}
                  </p>
                </m.div>
              </AnimatePresence>

              <div className="flex shrink-0 flex-col items-end gap-2.5">
                <span
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm"
                  aria-hidden="true"
                >
                  <VerticalGlyph name={active.icon} size={17} />
                </span>
                <span className="font-mono text-[11px] tabular-nums text-white/80" aria-hidden="true">
                  {String(activeIndex + 1).padStart(2, '0')} /{' '}
                  {String(EMPRESAS.items.length).padStart(2, '0')}
                </span>
                {!prefersReducedMotion && (
                  <span
                    className="relative h-[2px] w-14 overflow-hidden rounded-full bg-white/20"
                    aria-hidden="true"
                  >
                    <span
                      key={`${activeIndex}-${cycle}`}
                      className="slide-progress absolute inset-0 bg-white/80"
                      data-paused={isAutoplaying ? undefined : 'true'}
                      style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                    />
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Mobile: texto debajo del lienzo — el footage queda limpio */}
          <div className="mt-4 flex items-start justify-between gap-4 sm:hidden">
            <AnimatePresence mode="wait">
              <m.div
                key={active.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                <h3 className="font-editorial text-[20px] font-normal leading-snug text-white text-wrap-balance">
                  {active.title}
                </h3>
                <p className="mt-1.5 font-sans text-[13px] font-light leading-relaxed text-white/65">
                  {active.desc}
                </p>
              </m.div>
            </AnimatePresence>

            <div className="flex shrink-0 flex-col items-end gap-2 pt-1">
              <span className="font-mono text-[11px] tabular-nums text-white/70" aria-hidden="true">
                {String(activeIndex + 1).padStart(2, '0')} /{' '}
                {String(EMPRESAS.items.length).padStart(2, '0')}
              </span>
              {!prefersReducedMotion && (
                <span
                  className="relative h-[2px] w-12 overflow-hidden rounded-full bg-white/20"
                  aria-hidden="true"
                >
                  <span
                    key={`m-${activeIndex}-${cycle}`}
                    className="slide-progress absolute inset-0 bg-white/80"
                    data-paused={isAutoplaying ? undefined : 'true'}
                    style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                  />
                </span>
              )}
            </div>
          </div>

          {/* Tabs de industrias */}
          <div className="-mx-6 mt-2 flex overflow-x-auto px-6 md:mx-0 md:mt-4 md:grid md:grid-cols-6 md:gap-1 md:px-0">
            {EMPRESAS.items.map((item, i) => {
              const isActive = i === activeIndex
              return (
                <button
                  key={item.key}
                  type="button"
                  onMouseEnter={() => activate(i)}
                  onFocus={() => activate(i)}
                  onClick={() => activate(i)}
                  aria-current={isActive || undefined}
                  className={`group flex min-w-[150px] flex-col gap-1.5 rounded-sm border-t px-3 py-3.5 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:min-w-0 ${
                    isActive ? 'border-primary' : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] tabular-nums transition-colors duration-300 ${
                      isActive ? 'text-primary' : 'text-white/30'
                    }`}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`font-sans text-[12px] leading-snug transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-white/45 group-hover:text-white/70'
                    }`}
                  >
                    {item.title}
                  </span>
                </button>
              )
            })}
          </div>
        </m.div>

      </div>
    </section>
  )
}
