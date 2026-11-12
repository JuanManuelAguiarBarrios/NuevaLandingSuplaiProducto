'use client'

import { useEffect, useRef } from 'react'

/**
 * <video> de fondo, muted, loop y playsinline, con poster. No se descarga
 * al cargar la página (preload="none"): empieza a bajar y a reproducirse
 * cuando entra en pantalla, y se pausa cuando sale. Así en mobile,
 * donde queda debajo del primer pantallazo, no pesa en la carga inicial.
 * React no siempre baja el atributo `muted` al DOM (issue conocido) y
 * Safari lo exige para reproducir solo, así que se fuerza antes de play().
 * Con prefers-reduced-motion el video no arranca y queda el poster.
 */


/**
 * Dos umbrales: con solo el 0, un video que arranca tocando el borde no
 * vuelve a avisar cuando de verdad entra en pantalla.
 */
const OBSERVER_OPTIONS: IntersectionObserverInit = { threshold: [0, 0.01] }

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
      // Se exige área visible: un video que apenas toca el borde inferior de la
      // pantalla (el segundo acto del hero en mobile) cuenta como "intersecting"
      // con área cero y se descargaría con la página.
      if (entry.intersectionRatio <= 0) {
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
