'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { m, useReducedMotion } from 'framer-motion'
import { HERO, NAV } from '@/content'
import { EASE } from '@/lib/motion'

/**
 * MAQUETA TEMPORAL — secuencia de entrada del hero (ref. terminal-industries).
 * Módulo 1: preloader con contador odómetro + wipe. Módulo 2: reveal del
 * hero por tiempos con máscaras de línea. Esta ruta se elimina al decidir.
 * En producción el contador refleja carga real (video/fuentes) con piso
 * 0.8s y tope 2s; acá se simula con 1.6s.
 */

const EASE_CSS = 'cubic-bezier(0.16, 1, 0.3, 1)'

type Typo = 'editorial' | 'inter'
type Placement = 'esquina' | 'centro'
type NavMode = 'fade' | 'visible'

/* ── Contador odómetro ──────────────────────────────────────── */

function DigitRoll({ digit }: { digit: number }) {
  return (
    <span className="inline-block overflow-hidden" style={{ height: '1em', width: '0.62em' }}>
      <span
        className="block"
        style={{
          transform: `translateY(-${digit}em)`,
          transition: `transform 320ms ${EASE_CSS}`,
        }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className="block text-center" style={{ height: '1em', lineHeight: 1 }}>
            {i}
          </span>
        ))}
      </span>
    </span>
  )
}

function Counter({ value, typo }: { value: number; typo: Typo }) {
  const digits = [Math.floor(value / 100), Math.floor(value / 10) % 10, value % 10]
  return (
    <div
      className={
        typo === 'editorial'
          ? 'font-editorial font-normal text-white'
          : 'font-sans font-light tabular-nums text-white'
      }
      style={{
        fontSize: 'clamp(72px, 14vw, 140px)',
        letterSpacing: typo === 'inter' ? '-0.02em' : '-0.01em',
      }}
    >
      <DigitRoll digit={digits[0]} />
      <DigitRoll digit={digits[1]} />
      <DigitRoll digit={digits[2]} />
    </div>
  )
}

/* ── Secuencia completa ─────────────────────────────────────── */

function Sequence({
  withPreloader,
  typo,
  placement,
  navMode,
}: {
  withPreloader: boolean
  typo: Typo
  placement: Placement
  navMode: NavMode
}) {
  const prefersReducedMotion = useReducedMotion()
  const skip = Boolean(prefersReducedMotion)
  const runPreloader = withPreloader && !skip

  const [count, setCount] = useState(runPreloader ? 0 : 100)
  const [phase, setPhase] = useState<'loading' | 'out' | 'hero'>(
    runPreloader ? 'loading' : 'hero'
  )

  // Contador: simula la carga real (piso 0.8s / tope 2s en producción).
  useEffect(() => {
    if (phase !== 'loading') return
    const start = performance.now()
    const DUR = 1600
    let raf: number
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DUR)
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [phase])

  // Beat de 250ms en 100 → wipe. El hero arranca 250ms después del wipe.
  useEffect(() => {
    if (phase !== 'loading' || count < 100) return
    const id = setTimeout(() => setPhase('out'), 250)
    return () => clearTimeout(id)
  }, [phase, count])

  useEffect(() => {
    if (phase !== 'out') return
    const id = setTimeout(() => setPhase('hero'), 250)
    return () => clearTimeout(id)
  }, [phase])

  const heroOn = phase === 'hero'
  const lines = HERO.headline.plain.split('\n')

  const rise = (delay: number) => ({
    initial: skip ? false : ({ opacity: 0, y: 14 } as const),
    animate: heroOn ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, ease: EASE, delay },
  })

  return (
    <div className="relative h-[82vh] min-h-[560px] overflow-hidden bg-[#0A0A0A]">

      {/* Fondo (video/poster + overlay): se enciende durante la secuencia */}
      <m.div
        className="absolute inset-0"
        initial={skip ? false : { opacity: 0 }}
        animate={heroOn ? { opacity: 1 } : {}}
        transition={{ duration: 1.4, ease: 'linear' }}
        aria-hidden="true"
      >
        <Image src="/hero/poster.webp" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[#0A0A0A]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-[#0A0A0A]/55 to-[#0A0A0A]/30" />
      </m.div>

      {/* Nav (mock para la maqueta) */}
      <m.div
        className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 py-5 md:px-10"
        initial={skip || navMode === 'visible' ? false : { opacity: 0 }}
        animate={navMode === 'visible' || heroOn ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, ease: EASE, delay: navMode === 'fade' ? 1.15 : 0 }}
      >
        <Image
          src="/brand/suplai-lockup-white.png"
          alt="Suplai"
          width={90}
          height={24}
          className="h-5 w-auto"
        />
        <div className="hidden gap-6 md:flex">
          {NAV.links.map((link) => (
            <span key={link.href} className="font-sans text-[13px] text-white/70">
              {link.label}
            </span>
          ))}
        </div>
        <span className="rounded-full bg-primary px-4 py-1.5 font-sans text-[12px] font-semibold text-white">
          {NAV.cta}
        </span>
      </m.div>

      {/* Contenido del hero */}
      <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-10">
        <div className="mx-auto w-full max-w-[1200px]">
          <h1 className="type-display max-w-[880px] font-editorial font-normal text-white">
            {lines.map((line, i) => {
              const isLast = i === lines.length - 1
              const delay = 0.05 + i * 0.18
              return (
                <span key={i} className="block overflow-hidden">
                  <m.span
                    className="block"
                    initial={skip ? false : { y: '110%' }}
                    animate={heroOn ? { y: '0%' } : {}}
                    transition={{ duration: 0.8, ease: EASE, delay }}
                  >
                    {line}
                    {isLast && (
                      <>
                        {' '}
                        <span className="inline-block overflow-hidden pr-[0.08em] align-bottom">
                          <m.span
                            className="accent inline-block"
                            initial={skip ? false : { y: '115%' }}
                            animate={heroOn ? { y: '0%' } : {}}
                            transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
                          >
                            {HERO.headline.accent}
                          </m.span>
                        </span>
                      </>
                    )}
                  </m.span>
                </span>
              )
            })}
          </h1>

          <m.p
            {...rise(0.62)}
            className="mt-8 max-w-[540px] font-sans font-normal leading-relaxed text-white/90"
            style={{ fontSize: 'clamp(15px, 1.55vw, 18px)' }}
          >
            {HERO.subtitle}
          </m.p>

          <m.div {...rise(0.78)} className="mt-10">
            <span className="inline-flex items-center rounded-full bg-primary px-7 py-3 font-sans text-[14px] font-semibold text-white">
              {HERO.cta}
            </span>
          </m.div>
        </div>
      </div>

      {/* Módulo 1 — preloader con contador y wipe de salida */}
      {runPreloader && (
        <m.div
          className="absolute inset-0 z-20 bg-[#0A0A0A]"
          initial={{ y: '0%' }}
          animate={{ y: phase === 'loading' ? '0%' : '-100%' }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="absolute left-6 top-5 md:left-10">
            <Image
              src="/brand/suplai-lockup-white.png"
              alt="Suplai"
              width={90}
              height={24}
              className="h-5 w-auto opacity-80"
            />
          </div>
          <div
            className={
              placement === 'centro'
                ? 'absolute inset-0 grid place-items-center'
                : 'absolute bottom-8 right-8 md:bottom-10 md:right-12'
            }
          >
            <Counter value={count} typo={typo} />
          </div>
        </m.div>
      )}
    </div>
  )
}

/* ── Página de preview con controles ────────────────────────── */

function OptionGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: readonly { key: T; text: string }[]
  onChange: (v: T) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
        {label}
      </span>
      <div className="flex gap-1">
        {options.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => onChange(option.key)}
            className={`rounded-full border px-3 py-1 font-sans text-[11px] transition-colors ${
              value === option.key
                ? 'border-primary bg-primary/20 text-white'
                : 'border-white/15 text-white/55 hover:text-white/80'
            }`}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function HeroEntrancePreview() {
  const [typo, setTypo] = useState<Typo>('inter')
  const [placement, setPlacement] = useState<Placement>('esquina')
  const [navMode, setNavMode] = useState<NavMode>('fade')
  const [withPreloader, setWithPreloader] = useState(true)
  const [runId, setRunId] = useState(1)

  const replay = (pre: boolean) => {
    setWithPreloader(pre)
    setRunId((r) => r + 1)
  }

  return (
    <main className="min-h-screen bg-[#141414] pt-16">
      <div className="px-6 py-6 md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
          Preview temporal — secuencia de entrada del hero (ref. Terminal)
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
          <OptionGroup
            label="Contador"
            value={typo}
            options={[
              { key: 'editorial', text: 'PP Editorial' },
              { key: 'inter', text: 'Inter tabular' },
            ]}
            onChange={setTypo}
          />
          <OptionGroup
            label="Ubicación"
            value={placement}
            options={[
              { key: 'esquina', text: 'Abajo derecha' },
              { key: 'centro', text: 'Centrado' },
            ]}
            onChange={setPlacement}
          />
          <OptionGroup
            label="Nav"
            value={navMode}
            options={[
              { key: 'fade', text: 'Entra al final' },
              { key: 'visible', text: 'Visible siempre' },
            ]}
            onChange={setNavMode}
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => replay(true)}
              className="rounded-full bg-primary px-4 py-1.5 font-sans text-[12px] font-semibold text-white"
            >
              ▶ Módulos 1 + 2
            </button>
            <button
              type="button"
              onClick={() => replay(false)}
              className="rounded-full border border-white/20 px-4 py-1.5 font-sans text-[12px] text-white/80"
            >
              ▶ Solo Módulo 2
            </button>
          </div>
        </div>
      </div>

      <Sequence
        key={`${runId}-${typo}-${placement}-${navMode}-${withPreloader}`}
        withPreloader={withPreloader}
        typo={typo}
        placement={placement}
        navMode={navMode}
      />
    </main>
  )
}
