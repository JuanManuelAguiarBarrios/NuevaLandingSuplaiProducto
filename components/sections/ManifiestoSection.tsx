'use client'

import { useEffect, useRef, useState } from 'react'
import { MANIFIESTO } from '@/content'

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function smoothstep(t: number): number {
  t = Math.max(0, Math.min(1, t))
  return t * t * (3 - 2 * t)
}

// Inactive: #C1C9D9 — visible pero apagado
// Active:   #0A0A0A — text token
function segColor(progress: number, activateAt: number): string {
  const t = smoothstep((progress - activateAt) / 0.16)
  return `rgb(${Math.round(lerp(193, 10, t))},${Math.round(lerp(201, 10, t))},${Math.round(lerp(217, 10, t))})`
}

export default function ManifiestoSection() {
  const ref = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  // El scroll-jack (200vh sticky) sólo tiene sentido en desktop.
  // En mobile era mucho scroll “muerto” para dos líneas → sección normal y texto ya activo.
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => setIsDesktop(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    let ticking = false

    const measure = () => {
      ticking = false
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const sectionTop = rect.top + window.scrollY
      const scrollable = el.offsetHeight - window.innerHeight
      if (scrollable <= 0) return
      const p = (window.scrollY - sectionTop) / scrollable
      setProgress(Math.max(0, Math.min(1, p)))
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(measure)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    measure()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // En mobile no hay scroll-jack: mostramos el texto en su color final (activo).
  const p = isDesktop ? progress : 1

  return (
    <section
      ref={ref}
      aria-label="Manifiesto"
      className="relative bg-white lg:h-[200vh]"
    >
      <div className="flex items-center bg-white py-24 lg:sticky lg:top-0 lg:h-screen lg:py-0">
        <div className="mx-auto w-full max-w-[860px] px-6 md:px-10">

          {/* Titular editorial — líneas que se iluminan al hacer scroll */}
          <p
            className="font-editorial font-normal"
            style={{ lineHeight: 1.07, letterSpacing: '-0.022em', marginBottom: '0.65em' }}
          >
            {MANIFIESTO.lines.map((line, i) => (
              <span
                key={i}
                className="block"
                style={{
                  fontSize: 'clamp(32px, 4.6vw, 64px)',
                  color: segColor(p, i === 0 ? 0.06 : 0.28),
                }}
              >
                {line}
              </span>
            ))}
          </p>

          {/* Sub-copy */}
          <p
            className="font-sans font-light"
            style={{ lineHeight: 1.6, fontSize: 'clamp(17px, 1.9vw, 22px)' }}
          >
            {MANIFIESTO.subcopy.map((text, i) => (
              <span
                key={i}
                style={{ color: segColor(p, i === 0 ? 0.54 : 0.74) }}
              >
                {text}{i === 0 ? ' ' : ''}
              </span>
            ))}
          </p>

        </div>
      </div>
    </section>
  )
}
