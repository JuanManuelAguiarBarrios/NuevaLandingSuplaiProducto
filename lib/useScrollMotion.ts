'use client'

import { useSyncExternalStore } from 'react'
import { transform, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'

/**
 * true cuando corresponde montar los efectos ligados al scroll (hero con
 * zoom, secciones pinned): viewport desktop y sin prefers-reduced-motion.
 * En el servidor y en mobile devuelve false → layout apilado simple.
 */
const QUERY = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)'

function subscribe(onChange: () => void): () => void {
  const mql = window.matchMedia(QUERY)
  mql.addEventListener('change', onChange)
  return () => mql.removeEventListener('change', onChange)
}

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'

function subscribeReduced(onChange: () => void): () => void {
  const mql = window.matchMedia(REDUCED_QUERY)
  mql.addEventListener('change', onChange)
  return () => mql.removeEventListener('change', onChange)
}

/**
 * prefers-reduced-motion sin hydration mismatch: hidrata con el valor del
 * servidor (false) y se actualiza después. useReducedMotion de Framer lee
 * el valor real en el primer render del cliente y desalinea el HTML.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  )
}

export function useScrollMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  )
}

/**
 * useTransform por función en vez de por rangos. Framer Motion 12 acelera
 * `opacity`/`clipPath` con un ScrollTimeline nativo cuando el valor sale de
 * useScroll + useTransform(rangos), y con target/offset sobre secciones
 * sticky calcula mal el progreso. La forma por función no se acelera.
 */
export function useScrollRange<T extends number | string>(
  progress: MotionValue<number>,
  input: number[],
  output: T[],
): MotionValue<T> {
  return useTransform(progress, (v) => transform(v, input, output) as T)
}
