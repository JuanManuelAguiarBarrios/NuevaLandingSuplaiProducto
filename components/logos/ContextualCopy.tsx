'use client'

import { Fragment } from 'react'
import { m } from 'framer-motion'
import { BrandLogo } from './BrandLogo'
import type { LogoKey } from './registry'
import { EASE, DURATION } from '@/lib/motion'

/**
 * Muestra el logo de una herramienta inline, justo después de la palabra que la
 * nombra en el copy — reveal on-scroll. El copy queda intacto (fuente única en
 * /content): esto sólo lo *aumenta* visualmente.
 *
 * Los logos son decorativos (la palabra ya está en el texto) → aria-hidden, para
 * no duplicar el anuncio en lectores de pantalla.
 */

const KEYWORDS: { word: string; key: LogoKey }[] = [
  { word: 'WhatsApp', key: 'whatsapp' },
  { word: 'Excel', key: 'excel' },
  { word: 'Sheets', key: 'sheets' },
  { word: 'Gmail', key: 'gmail' },
  { word: 'Outlook', key: 'outlook' },
  { word: 'llamadas', key: 'voz' },
]

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const PATTERN_SOURCE = `\\b(${KEYWORDS.map((k) => escapeRegExp(k.word)).join('|')})\\b`

function keyFor(word: string): LogoKey | undefined {
  const lower = word.toLowerCase()
  return KEYWORDS.find((k) => k.word.toLowerCase() === lower)?.key
}

function InlineLogo({ name, size }: { name: LogoKey; size: number }) {
  return (
    <m.span
      initial={{ opacity: 0, scale: 0.4 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: DURATION.fast, ease: EASE }}
      className="ml-1 inline-flex -translate-y-px align-middle"
    >
      <BrandLogo name={name} size={size} decorative />
    </m.span>
  )
}

type Props = {
  text: string
  /** Lado del logo inline en px. Default 16. */
  logoSize?: number
}

export function ContextualCopy({ text, logoSize = 16 }: Props) {
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let matchIndex = 0

  // Regex local por render → no mutamos estado compartido (regla immutability).
  const regex = new RegExp(PATTERN_SOURCE, 'gi')
  for (const match of text.matchAll(regex)) {
    const matched = match[0]
    const start = match.index

    if (start > lastIndex) {
      parts.push(<Fragment key={`t-${matchIndex}`}>{text.slice(lastIndex, start)}</Fragment>)
    }

    const key = keyFor(matched)
    parts.push(
      // whitespace-nowrap: el logo no se separa de su palabra al hacer wrap.
      <span key={`m-${matchIndex}`} className="whitespace-nowrap">
        {matched}
        {key && <InlineLogo name={key} size={logoSize} />}
      </span>,
    )

    lastIndex = start + matched.length
    matchIndex++
  }

  if (lastIndex < text.length) {
    parts.push(<Fragment key="t-end">{text.slice(lastIndex)}</Fragment>)
  }

  return <>{parts}</>
}
