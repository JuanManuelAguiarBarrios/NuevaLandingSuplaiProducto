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
 *
 * Performance: solo tiene sentido en desktop con mouse/trackpad (`pointer: fine`).
 * En touch el scroll nativo ya es fluido — Lenis ahí solo suma un RAF loop
 * permanente sin aportar nada, así que en mobile queda desactivado.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const finePointer = window.matchMedia('(pointer: fine)')

    let lenis: Lenis | null = null
    let raf: number | null = null

    const start = () => {
      if (lenis || reduceMotion.matches || !finePointer.matches) return
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

    const onChange = () => (reduceMotion.matches || !finePointer.matches ? stop() : start())

    start()
    reduceMotion.addEventListener('change', onChange)
    finePointer.addEventListener('change', onChange)

    return () => {
      reduceMotion.removeEventListener('change', onChange)
      finePointer.removeEventListener('change', onChange)
      stop()
    }
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
