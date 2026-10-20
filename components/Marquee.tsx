import type { ReactNode } from 'react'

/**
 * Loop horizontal infinito (CSS). La pista lleva el contenido dos veces y
 * se desplaza -50%, así el loop cierra sin costura; la segunda copia es
 * aria-hidden. Se pausa en hover y con `isPaused`. Con
 * prefers-reduced-motion queda estático.
 */

interface MarqueeProps {
  children: ReactNode
  isPaused?: boolean
  /** Duración del ciclo como utilidad arbitraria, p. ej. "[--marquee-duration:40s]". */
  durationClass?: string
  className?: string
}

export default function Marquee({ children, isPaused = false, durationClass = '', className = '' }: MarqueeProps) {
  return (
    <div data-paused={isPaused} className={`marquee overflow-hidden ${durationClass} ${className}`}>
      <div className="marquee-track flex w-max">
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
