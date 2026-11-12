'use client'

import { m } from 'framer-motion'
import { lineUp, stagger, VIEWPORT } from '@/lib/motion'

/**
 * Reveal por línea para titulares: cada línea sube desde una máscara
 * (overflow hidden), escalonada. Las líneas se autoran con '\n' en
 * content/ — no se miden en runtime. Los titulares van en dos tonos:
 * desde `lowFrom` las líneas bajan de tono. Con prefers-reduced-motion,
 * MotionConfig (reducedMotion="user") hace el reveal instantáneo; la
 * estructura no cambia, así no hay hydration mismatch.
 */

type LineRevealElement = 'h1' | 'h2' | 'h3' | 'p'

interface LineRevealProps {
  /** Texto con quiebres autorados vía '\n'. */
  text: string
  /** Índice de la primera línea que va en el tono bajo (clase .tone-low). */
  lowFrom?: number
  as?: LineRevealElement
  className?: string
  /** Revela al montar en vez de al entrar en viewport. */
  immediate?: boolean
}

/** Clase de una línea del titular: pleno o tono bajo según su posición. */
export function lineTone(index: number, lowFrom?: number): string {
  return lowFrom !== undefined && index >= lowFrom ? 'tone-low' : ''
}

/* El padding/margen negativo evita que la máscara corte descendentes e itálicas. */
const MASK = 'block overflow-hidden pb-[0.12em] -mb-[0.12em]'

export default function LineReveal({
  text,
  lowFrom,
  as = 'h2',
  className,
  immediate = false,
}: LineRevealProps) {
  const lines = text.split('\n')

  const MotionTag = m[as]
  const trigger = immediate
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: VIEWPORT }

  return (
    <MotionTag variants={stagger} initial="hidden" {...trigger} className={className}>
      {lines.map((line, i) => (
        <span key={i} className={MASK}>
          <m.span variants={lineUp} className={`block ${lineTone(i, lowFrom)}`}>
            {line}
            {/* Espacio entre líneas: sin él, el texto plano del titular queda pegado. */}
            {i < lines.length - 1 && ' '}
          </m.span>
        </span>
      ))}
    </MotionTag>
  )
}
