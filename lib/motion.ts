/**
 * lib/motion.ts
 * Fuente única de verdad para easing y variantes de Framer Motion.
 *
 * Antes cada sección redefinía `const ease = [...]` y sus propios objetos
 * `fadeUp`/`stagger` con valores levemente distintos (drift). Acá viven una
 * sola vez, calibrados de forma consistente.
 *
 * Reglas de la casa:
 *  - Solo animamos `transform` y `opacity` (sin jank).
 *  - Curva de firma expo-out — nada del spring/bounce por default de Framer.
 *  - `prefers-reduced-motion` lo gobierna MotionConfig reducedMotion="user"
 *    en lib/providers.tsx (Framer neutraliza transform/opacity automáticamente).
 */

import type { Variants } from 'framer-motion'

/** Curva de firma (expo-out). Espeja --ease-signature en globals.css. */
export const EASE = [0.16, 1, 0.3, 1] as const

/** Curva suave para micro-interacciones cortas (hover/tap). */
export const EASE_SOFT = [0.22, 1, 0.36, 1] as const

/** Duraciones estándar, en segundos. */
export const DURATION = {
  micro: 0.2,
  fast: 0.4,
  base: 0.6,
  slow: 0.75,
} as const

/** Distancia de entrada única (px) para los reveals de scroll. */
const RISE = 18

/** Reveal base: sube y aparece. Para elementos sueltos con whileInView. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: RISE },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE } },
}

/** Reveal más sutil (listas densas): recorrido más corto y rápido. */
export const fadeUpTight: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.fast, ease: EASE } },
}

/** Contenedor que escalona la entrada de sus hijos. */
export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
}

/** Stagger más ajustado para filas de lista. */
export const staggerTight: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

/**
 * Props de conveniencia para un reveal on-scroll de un solo elemento.
 * Uso: <m.h2 {...revealOnce} ... />
 */
export const revealOnce = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, amount: 0.4 },
  variants: fadeUp,
} as const
