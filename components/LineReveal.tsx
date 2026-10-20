'use client'

import { m } from 'framer-motion'
import { lineUp, stagger, VIEWPORT } from '@/lib/motion'

/**
 * Reveal por línea para titulares: cada línea sube desde una máscara
 * (overflow hidden), escalonada. Las líneas se autoran con '\n' en
 * content/ — no se miden en runtime. Con prefers-reduced-motion,
 * MotionConfig (reducedMotion="user") hace el reveal instantáneo; la
 * estructura no cambia, así no hay hydration mismatch.
 */

type LineRevealElement = 'h1' | 'h2' | 'h3' | 'p'

interface LineRevealProps {
  /** Texto con quiebres autorados vía '\n'. */
  text: string
  /** Palabra que va en Newsreader itálica (clase .accent). */
  accent?: string
  as?: LineRevealElement
  className?: string
  /** Revela al montar en vez de al entrar en viewport. */
  immediate?: boolean
}

export function LineContent({ line, accent }: { line: string; accent?: string }) {
  if (!accent) return <>{line}</>
  const idx = line.indexOf(accent)
  if (idx === -1) return <>{line}</>
  return (
    <>
      {line.slice(0, idx)}
      <em className="accent">{accent}</em>
      {line.slice(idx + accent.length)}
    </>
  )
}

/* El padding/margen negativo evita que la máscara corte descendentes e itálicas. */
const MASK = 'block overflow-hidden pb-[0.12em] -mb-[0.12em]'

export default function LineReveal({
  text,
  accent,
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
          <m.span variants={lineUp} className="block">
            <LineContent line={line} accent={accent} />
          </m.span>
        </span>
      ))}
    </MotionTag>
  )
}
