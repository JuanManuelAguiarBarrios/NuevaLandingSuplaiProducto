'use client'

import { useEffect, useRef } from 'react'

/**
 * <video> de fondo con autoplay, muted, loop y playsinline, sin poster: se
 * ve desde el primer frame. React no siempre baja el atributo `muted` al
 * DOM (issue conocido) y Safari lo exige para el autoplay, así que se fuerza
 * imperativamente antes de llamar a play(). Con prefers-reduced-motion el
 * video queda quieto en su primer frame.
 */

type AutoplayVideoProps = React.ComponentPropsWithoutRef<'video'>

export default function AutoplayVideo({ children, ...props }: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    el.muted = true
    el.setAttribute('muted', '')
    el.playsInline = true
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.pause()
      return
    }
    // Si el dispositivo bloquea el autoplay (p. ej. Low Power Mode) queda el
    // primer frame, que ya está cargado por preload="auto".
    el.play()?.catch(() => undefined)
  }, [])

  return (
    <video ref={videoRef} muted playsInline autoPlay {...props}>
      {children}
    </video>
  )
}
