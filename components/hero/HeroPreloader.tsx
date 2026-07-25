'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { m } from 'framer-motion'
import { EASE } from '@/lib/motion'

/**
 * Módulo 1 — Preloader con contador odómetro (ref. terminal-industries).
 *
 * Coordinación: un script inline en el layout pone <html data-hero-hold>
 * antes del primer paint (solo primera visita de la sesión, nunca con
 * reduced-motion). Ese atributo muestra este overlay vía CSS y pausa la
 * secuencia de entrada del hero. Acá corre el contador (progreso real con
 * piso 0.8s y tope 2s), el beat en 100 y el wipe de salida; el hold se
 * libera 250ms después de iniciado el wipe para que el hero arranque
 * mientras el panel todavía sale de cuadro.
 *
 * Sin JS: el script inline nunca corre → ni hold ni overlay, hero visible.
 * Si el bundle no hidrata: el propio script inline suelta el hold a los 4.5s.
 */

const SESSION_KEY = 'suplai-intro'
const MIN_MS = 800
const CAP_MS = 2000
const BEAT_MS = 250
const HERO_START_AFTER_WIPE_MS = 250
const EASE_CSS = 'cubic-bezier(0.16, 1, 0.3, 1)'

function releaseHold() {
  document.documentElement.removeAttribute('data-hero-hold')
  try {
    sessionStorage.setItem(SESSION_KEY, '1')
  } catch {
    /* sessionStorage bloqueado: el preloader simplemente saldrá cada carga */
  }
}

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

export default function HeroPreloader() {
  const [phase, setPhase] = useState<'idle' | 'counting' | 'exit' | 'done'>('idle')
  const [count, setCount] = useState(0)

  // Al hidratar: si el script inline no puso el hold (visita repetida o
  // reduced-motion), este componente no tiene nada que hacer.
  useEffect(() => {
    if (document.documentElement.hasAttribute('data-hero-hold')) {
      setPhase('counting')
    } else {
      setPhase('done')
    }
  }, [])

  // Contador: progreso real (fuentes + load) acotado entre MIN_MS y CAP_MS.
  useEffect(() => {
    if (phase !== 'counting') return
    const start = performance.now()
    let target = 25
    const onLoad = () => {
      target = 100
    }
    if (document.readyState === 'complete') target = 100
    else window.addEventListener('load', onLoad, { once: true })
    document.fonts?.ready.then(() => {
      target = Math.max(target, 65)
    })

    let raf = 0
    const loop = (now: number) => {
      const elapsed = now - start
      if (elapsed >= CAP_MS) target = 100
      // Nunca más rápido que la rampa MIN_MS ni más lento que la CAP_MS.
      const ceilByTime = Math.min(100, (elapsed / MIN_MS) * 100)
      const floorByTime = Math.min(100, (elapsed / CAP_MS) * 100)
      const shown = Math.round(Math.min(ceilByTime, Math.max(target, floorByTime)))
      setCount(shown)
      if (shown >= 100) {
        window.setTimeout(() => setPhase('exit'), BEAT_MS)
        return
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('load', onLoad)
    }
  }, [phase])

  // El hero arranca mientras el panel todavía está saliendo.
  useEffect(() => {
    if (phase !== 'exit') return
    const id = window.setTimeout(releaseHold, HERO_START_AFTER_WIPE_MS)
    return () => window.clearTimeout(id)
  }, [phase])

  if (phase === 'done') return null

  const digits = [Math.floor(count / 100), Math.floor(count / 10) % 10, count % 10]

  return (
    <m.div
      className="hero-preloader fixed inset-0 z-[100] bg-[#0A0A0A]"
      data-active={phase === 'counting' || phase === 'exit' ? '' : undefined}
      initial={false}
      animate={{ y: phase === 'exit' ? '-100%' : '0%' }}
      transition={{ duration: 0.9, ease: EASE }}
      onAnimationComplete={() => {
        if (phase === 'exit') setPhase('done')
      }}
      aria-hidden="true"
    >
      <div className="absolute left-6 top-5 md:left-10">
        <Image
          src="/brand/suplai-lockup-white.png"
          alt=""
          width={90}
          height={24}
          className="h-5 w-auto opacity-80"
        />
      </div>
      <div className="absolute bottom-8 right-8 md:bottom-10 md:right-12">
        <div
          className="font-sans font-light tabular-nums text-white"
          style={{ fontSize: 'clamp(72px, 14vw, 140px)', letterSpacing: '-0.02em' }}
        >
          <DigitRoll digit={digits[0]} />
          <DigitRoll digit={digits[1]} />
          <DigitRoll digit={digits[2]} />
        </div>
      </div>
    </m.div>
  )
}
