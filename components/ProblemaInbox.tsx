'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m, useInView, useReducedMotion } from 'framer-motion'
import { PROBLEMA } from '@/content'
import { EASE } from '@/lib/motion'

/**
 * La pila de interrupciones (Problema), versión viva: las notificaciones
 * no paran de llegar — cada TICK_MS cae una card nueva desde arriba sobre
 * la pila y la más vieja se desvanece. El feed encarna el problema: la
 * operación interrumpe todo el tiempo. Solo corre con la sección en
 * viewport; con prefers-reduced-motion queda la pila estática.
 */

const TICK_MS = 2400

const SLOTS = [
  { top: '0%',  left: '4%',  rotate: -2,   width: '62%' },
  { top: '19%', left: '34%', rotate: 1.5,  width: '60%' },
  { top: '39%', left: '8%',  rotate: -1,   width: '58%' },
  { top: '57%', left: '30%', rotate: 2,    width: '64%' },
  { top: '77%', left: '12%', rotate: -1.5, width: '60%' },
]
const COUNT = SLOTS.length

type Artefacto = (typeof PROBLEMA.artefactos)[number]

function Card({ artefacto }: { artefacto: Artefacto }) {
  return (
    <>
      <div className="mb-1.5 flex items-center gap-2">
        <span className="size-1.5 shrink-0 rounded-full bg-primary" />
        <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
          {artefacto.canal} · {artefacto.hora}
        </span>
      </div>
      <p className="font-sans text-[12.5px] font-light leading-snug text-ink">
        {artefacto.texto}
      </p>
    </>
  )
}

const mod = (n: number, m: number) => ((n % m) + m) % m

export default function ProblemaInbox({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { amount: 0.35 })
  // La pila arranca al entrar en viewport y de ahí en más sigue llegando.
  const hasEntered = useInView(containerRef, { amount: 0.35, once: true })
  const prefersReducedMotion = useReducedMotion()

  // tick = interrupciones llegadas en total; arranca con la pila completa.
  const [tick, setTick] = useState(COUNT)

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return
    const id = setInterval(() => setTick((t) => t + 1), TICK_MS)
    return () => clearInterval(id)
  }, [isInView, prefersReducedMotion])

  const { artefactos } = PROBLEMA
  // Las últimas COUNT llegadas, de la más vieja a la más nueva.
  const visible = Array.from({ length: COUNT }, (_, i) => tick - COUNT + i)

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className ?? ''}`}
      style={{ aspectRatio: '560 / 470' }}
      aria-hidden="true"
    >
      {hasEntered && (
        <AnimatePresence>
          {visible.map((k, order) => {
            const artefacto = artefactos[mod(k, artefactos.length)]
            const slot = SLOTS[mod(k, COUNT)]
            const isInitialBatch = k < COUNT
            return (
              <m.div
                key={k}
                initial={
                  prefersReducedMotion ? false : { opacity: 0, y: -28, scale: 0.98 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.35, ease: EASE } }}
                transition={{
                  delay: isInitialBatch ? k * 0.15 : 0,
                  duration: 0.55,
                  ease: EASE,
                }}
                className="absolute rounded-lg border border-border bg-white p-3.5 shadow-[0_16px_40px_-18px_rgba(10,10,10,0.25)]"
                style={{
                  top: slot.top,
                  left: slot.left,
                  width: slot.width,
                  rotate: slot.rotate,
                  zIndex: 10 + order,
                }}
              >
                <Card artefacto={artefacto} />
              </m.div>
            )
          })}
        </AnimatePresence>
      )}
    </div>
  )
}
