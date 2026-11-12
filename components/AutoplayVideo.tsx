'use client'

import { useEffect, useRef } from 'react'

/**
 * <video> de fondo, muted, loop y playsinline, con poster. No se descarga
 * al cargar la página (preload="none"): empieza a bajar y a reproducirse
 * cuando se acerca a la pantalla, y se pausa cuando sale. Así en mobile,
 * donde queda debajo del primer pantallazo, no pesa en la carga inicial.
 * React no siempre baja el atributo `muted` al DOM (issue conocido) y
 * Safari lo exige para reproducir solo, así que se fuerza antes de play().
 * Con prefers-reduced-motion el video no arranca y queda el poster.
 */

/** Empieza a cargar un poco antes de entrar en pantalla. */
const OBSERVER_OPTIONS: IntersectionObserverInit = { rootMargin: '25% 0px' }

type AutoplayVideoProps = Omit<React.ComponentPropsWithoutRef<'video'>, 'autoPlay' | 'preload'>

export default function AutoplayVideo({ children, ...props }: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    el.muted = true
    el.setAttribute('muted', '')
    el.playsInline = true
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        el.pause()
        return
      }
      // Si el dispositivo bloquea la reproducción (p. ej. Low Power Mode) queda el poster.
      el.play()?.catch(() => undefined)
    }, OBSERVER_OPTIONS)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <video ref={videoRef} muted playsInline preload="none" {...props}>
      {children}
    </video>
  )
}
