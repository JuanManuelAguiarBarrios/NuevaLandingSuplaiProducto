'use client'

import { useReducedMotion } from 'framer-motion'

/**
 * Rodillo de dígito estilo odómetro: columna 0–9 que se desliza y frena en
 * el valor con la curva de firma. Compartido por el contador del preloader
 * y el número rotante de "Así trabajamos". Con prefers-reduced-motion el
 * dígito cambia sin transición.
 */

const EASE_CSS = 'cubic-bezier(0.16, 1, 0.3, 1)'

type DigitRollProps = {
  digit: number
  /** Duración del roll en ms. */
  transitionMs?: number
  /** Ancho de la columna (depende de la tipografía del contexto). */
  width?: string
}

export default function DigitRoll({
  digit,
  transitionMs = 320,
  width = '0.62em',
}: DigitRollProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <span className="inline-block overflow-hidden" style={{ height: '1em', width }}>
      <span
        className="block"
        style={{
          transform: `translateY(-${digit}em)`,
          transition: prefersReducedMotion
            ? 'none'
            : `transform ${transitionMs}ms ${EASE_CSS}`,
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
