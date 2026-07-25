'use client'

import { useEffect, useState } from 'react'
import type { MotionValue } from 'framer-motion'

/**
 * Cuenta cuántos pasos están activos según un progreso de scroll [0..1].
 * Solo dispara re-render cuando ese número cambia (unas pocas veces en
 * total), no en cada frame. Compartido por Solución (scroll-jack) y la
 * timeline de "Así trabajamos".
 */
export function useActiveStepCount(mv: MotionValue<number>, total: number): number {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const compute = (p: number) => {
      let c = 0
      for (let i = 0; i < total; i++) {
        if (p >= i / total - 0.05) c = i + 1
      }
      setCount((prev) => (prev === c ? prev : c))
    }
    compute(mv.get())
    return mv.on('change', compute)
  }, [mv, total])
  return count
}
