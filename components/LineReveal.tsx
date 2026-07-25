'use client'

import { m, useReducedMotion } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/motion'

/**
 * Reveal por línea para titulares. Las líneas se autoran con '\n' en el copy
 * (content/) — no medimos líneas en runtime: el quiebre es editorial, no se
 * rompe con `text-wrap: balance` y no causa reflow.
 *
 * Spec B8: trigger al 30% del viewport, una sola vez, stagger ~90ms entre
 * líneas (vía `stagger` de lib/motion). Con prefers-reduced-motion el texto
 * se renderiza estático, sin animación de ningún tipo.
 */

type LineRevealElement = 'h1' | 'h2' | 'h3' | 'p'

type LineRevealProps = {
  /** Texto con quiebres autorados vía '\n' — cada línea revela por separado. */
  text: string
  /** Subcadena que va en itálica azul de firma (<em class="accent">). */
  accent?: string
  as?: LineRevealElement
  className?: string
}

function LineContent({ line, accent }: { line: string; accent?: string }) {
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

export default function LineReveal({
  text,
  accent,
  as = 'h2',
  className,
}: LineRevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const lines = text.split('\n')

  if (prefersReducedMotion) {
    const Tag = as
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            <LineContent line={line} accent={accent} />
          </span>
        ))}
      </Tag>
    )
  }

  const MotionTag = m[as]
  return (
    <MotionTag
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={className}
    >
      {lines.map((line, i) => (
        <m.span key={i} variants={fadeUp} className="block">
          <LineContent line={line} accent={accent} />
        </m.span>
      ))}
    </MotionTag>
  )
}
