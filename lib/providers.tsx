'use client'

import { useEffect } from 'react'
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'
import Lenis from 'lenis'

/**
 * Habilita smooth scroll en toda la app.
 * Wrapeá en el layout del root — sólo client side.
 *
 * Accesibilidad: Lenis NO respeta prefers-reduced-motion por su cuenta.
 * Si el usuario pide movimiento reducido, no inicializamos Lenis y dejamos
 * el scroll nativo del browser. También reaccionamos si el valor cambia en vivo.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')

    let lenis: Lenis | null = null
    let raf: number | null = null

    const start = () => {
      if (lenis || media.matches) return
      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 1.5,
      })
      const frame = (time: number) => {
        lenis?.raf(time)
        raf = requestAnimationFrame(frame)
      }
      raf = requestAnimationFrame(frame)
    }

    const stop = () => {
      if (raf !== null) cancelAnimationFrame(raf)
      raf = null
      lenis?.destroy()
      lenis = null
    }

    const onChange = () => (media.matches ? stop() : start())

    start()
    media.addEventListener('change', onChange)

    return () => {
      media.removeEventListener('change', onChange)
      stop()
    }
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
