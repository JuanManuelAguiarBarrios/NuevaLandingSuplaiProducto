/**
 * lib/motion.ts
 * Fuente única de verdad para easing, duraciones y variantes de Framer Motion.
 *
 * Reglas de la casa:
 *  - Solo animamos `transform`, `opacity` y `clip-path`.
 *  - Curva editorial (salida rápida, frenado largo) para reveals y scroll;
 *    curva de firma expo-out para micro-interacciones.
 *  - `prefers-reduced-motion` lo gobierna MotionConfig reducedMotion="user"
 *    en lib/providers.tsx; los efectos ligados al scroll se apagan en cada
 *    componente con useReducedMotion.
 */

import type { Variants } from 'framer-motion'

/** Curva editorial. Espeja --ease-editorial en globals.css. */
export const EASE = [0.05, 0.7, 0.1, 1] as const

/** Curva de firma (expo-out). Espeja --ease-signature en globals.css. */
export const EASE_SIGNATURE = [0.16, 1, 0.3, 1] as const

/** Duraciones estándar, en segundos. */
export const DURATION = {
  micro: 0.25,
  fast: 0.5,
  base: 0.8,
  slow: 1.1,
} as const

/** Escalonado estándar entre hermanos (líneas, filas, cards). */
export const STAGGER = 0.08

/** Disparo de reveals: 30% visible, una sola vez. */
export const VIEWPORT = { once: true, amount: 0.3 } as const

/** Reveal base: sube y aparece. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE } },
}

/** Línea de titular dentro de una máscara (overflow hidden). */
export const lineUp: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: DURATION.slow, ease: EASE } },
}

/** Imagen que se descubre de abajo hacia arriba. */
export const clipUp: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: DURATION.slow * 1.2, ease: EASE } },
}

/** Contenedor que escalona la entrada de sus hijos. */
export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER } },
}
