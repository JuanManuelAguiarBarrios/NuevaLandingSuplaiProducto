'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

/**
 * Gate + contenedor del ambiente 3D del hero.
 *
 * - Carga lazy: `HeroCanvas` (three + fiber) sólo entra como chunk async, nunca
 *   en el First Load JS ni en SSR (ssr:false).
 * - Sólo monta en desktop con puntero fino y sin `prefers-reduced-motion`.
 * - Espera al idle post-paint → no compite con el LCP del headline.
 * - Pausa el render loop cuando el hero sale de viewport.
 *
 * Si no monta, el fondo estático del hero (grid + glow) queda como fallback.
 */

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false })

export default function HeroAmbient() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useState(true)

  // Decidir si corresponde montar, después del idle.
  useEffect(() => {
    const motionOk = window.matchMedia('(min-width: 768px) and (pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!motionOk.matches || reduce.matches) return

    const win = window as typeof window & {
      requestIdleCallback?: (cb: () => void) => number
      cancelIdleCallback?: (id: number) => void
    }
    let idleId = 0
    let timeoutId = 0
    if (win.requestIdleCallback) {
      idleId = win.requestIdleCallback(() => setMounted(true))
    } else {
      timeoutId = window.setTimeout(() => setMounted(true), 200)
    }
    return () => {
      if (idleId && win.cancelIdleCallback) win.cancelIdleCallback(idleId)
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [])

  // Pausar el loop cuando el hero no está visible.
  useEffect(() => {
    if (!mounted) return
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry?.isIntersecting ?? false),
      { threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [mounted])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 opacity-60"
      aria-hidden="true"
    >
      {mounted && <HeroCanvas active={active} />}
    </div>
  )
}
