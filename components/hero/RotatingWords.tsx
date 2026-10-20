'use client'

import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '@/lib/useScrollMotion'

/**
 * Palabra que rota con efecto shuffle: cada letra pasa por caracteres al
 * azar y se va fijando de izquierda a derecha hasta formar la palabra
 * nueva. El texto se escribe directo en el nodo (sin re-render por frame).
 * Frena en hover y con la pestaña oculta. Es solo visual (aria-hidden): el
 * padre expone la frase completa a lectores de pantalla. Con
 * prefers-reduced-motion queda fija en la última palabra.
 */

const INTERVAL_MS = 4200
/** Retardo antes de que empiece a fijarse la primera letra. */
const SETTLE_DELAY_MS = 400
/** Tiempo entre que se fija una letra y la siguiente. */
const STEP_MS = 95
/** Cada cuánto cambian los caracteres al azar (más lento que 60fps, se lee mejor). */
const SHUFFLE_MS = 80
const CHARS = 'abcdefghijklmnopqrstuvwxyz'

const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)]
/** Espacios y puntuación no se mezclan: mantienen el ritmo de la palabra. */
const isStatic = (ch: string | undefined) => ch === ' ' || ch === '.'

interface RotatingWordsProps {
  words: string[]
  isPaused: boolean
  className?: string
}

export default function RotatingWords({ words, isPaused, className = '' }: RotatingWordsProps) {
  const [index, setIndex] = useState(0)
  const prefersReducedMotion = usePrefersReducedMotion()
  const nodeRef = useRef<HTMLSpanElement>(null)
  const shownRef = useRef(words[0])

  const word = prefersReducedMotion ? words[words.length - 1] : words[index]

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return
    const id = window.setInterval(() => {
      if (document.hidden) return
      setIndex((i) => (i + 1) % words.length)
    }, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [isPaused, prefersReducedMotion, words.length])

  // Shuffle desde la palabra visible hacia la nueva.
  useEffect(() => {
    const node = nodeRef.current
    if (!node || shownRef.current === word) return
    if (prefersReducedMotion) {
      node.textContent = word
      shownRef.current = word
      return
    }

    const from = shownRef.current
    const length = Math.max(from.length, word.length)
    const duration = SETTLE_DELAY_MS + length * STEP_MS
    const start = performance.now()
    let lastShuffle = 0
    let frame = 0
    let scrambled = from.split('')

    const tick = (now: number) => {
      const elapsed = now - start
      const reshuffle = now - lastShuffle >= SHUFFLE_MS
      if (reshuffle) lastShuffle = now
      scrambled = Array.from({ length }, (_, i) => {
        const target = word[i]
        if (elapsed >= SETTLE_DELAY_MS + i * STEP_MS) return target ?? ''
        if (isStatic(target)) return target as string
        return reshuffle ? randomChar() : (scrambled[i] ?? randomChar())
      })
      node.textContent = scrambled.join('')
      if (elapsed < duration) {
        frame = requestAnimationFrame(tick)
      } else {
        node.textContent = word
        shownRef.current = word
      }
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      node.textContent = word
      shownRef.current = word
    }
  }, [word, prefersReducedMotion])

  return (
    <span ref={nodeRef} aria-hidden="true" className={`block whitespace-nowrap ${className}`}>
      {words[0]}
    </span>
  )
}
