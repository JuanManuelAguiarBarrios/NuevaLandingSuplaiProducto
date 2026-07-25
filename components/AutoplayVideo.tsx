'use client'

import { useEffect, useRef } from 'react'

/**
 * <video> de fondo con autoplay confiable en iOS. React no siempre baja el
 * atributo `muted` al DOM (issue conocido) y Safari lo exige para permitir
 * autoplay, así que acá se fuerza imperativamente y se llama a play()
 * explícito. Si el dispositivo bloquea igual (p. ej. Low Power Mode),
 * `onAutoplayBlocked` permite al padre caer a una imagen en vez de dejar
 * el glyph de play del sistema.
 */

type AutoplayVideoProps = React.ComponentPropsWithoutRef<'video'> & {
  onAutoplayBlocked?: () => void
}

export default function AutoplayVideo({
  onAutoplayBlocked,
  children,
  ...props
}: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    el.muted = true
    el.setAttribute('muted', '')
    el.playsInline = true
    const attempt = el.play()
    if (attempt) attempt.catch(() => onAutoplayBlocked?.())
  }, [onAutoplayBlocked])

  return (
    <video ref={videoRef} muted playsInline autoPlay {...props}>
      {children}
    </video>
  )
}
