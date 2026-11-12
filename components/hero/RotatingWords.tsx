'use client'

import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '@/lib/useScrollMotion'

/**
 * Palabra que rota: la nueva sube desde abajo dentro de una máscara y
 * reemplaza a la anterior (CSS, clase `.word-in`). Sobria a propósito, para
 * no competir con el titular. Frena en hover y con la pestaña oculta. Es
 * solo visual (aria-hidden): el padre expone la frase completa a lectores
 * de pantalla. Con prefers-reduced-motion queda fija en la última palabra.
 */

const INTERVAL_MS = 3600

type RotatingWordsProps = {
  words: string[]
  isPaused: boolean
  className?: string
}

export default function RotatingWords({ words, isPaused, className = '' }: RotatingWordsProps) {
  const [index, setIndex] = useState(0)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return
    const id = window.setInterval(() => {
      if (document.hidden) return
      setIndex((i) => (i + 1) % words.length)
    }, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [isPaused, prefersReducedMotion, words.length])

  const word = prefersReducedMotion ? words[words.length - 1] : words[index]

  return (
    <span aria-hidden="true" className={`inline-block overflow-hidden align-bottom whitespace-nowrap ${className}`}>
      {/* La key remonta el nodo en cada cambio y vuelve a disparar la animación. */}
      <span key={word} className={`inline-block ${index === 0 ? '' : 'word-in'}`}>
        {word}
      </span>
    </span>
  )
}
