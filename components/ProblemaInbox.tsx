'use client'

import { m, useReducedMotion } from 'framer-motion'
import { PROBLEMA } from '@/content'
import { EASE } from '@/lib/motion'

/**
 * La pila de interrupciones (Problema): los fragmentos de un día operativo
 * —el WhatsApp, la llamada perdida, la planilla, el mail— apilándose uno
 * sobre otro como notificaciones. Complementa a la órbita de Solución sin
 * repetir su lenguaje: acá el nivel humano, allá el nivel sistemas.
 * La entrada escalonada de las cards es el momento orquestado.
 */

const POSITIONS = [
  { top: '0%',  left: '4%',  rotate: -2,   width: '62%' },
  { top: '19%', left: '34%', rotate: 1.5,  width: '60%' },
  { top: '39%', left: '8%',  rotate: -1,   width: '58%' },
  { top: '57%', left: '30%', rotate: 2,    width: '64%' },
  { top: '77%', left: '12%', rotate: -1.5, width: '60%' },
]

export default function ProblemaInbox({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      className={`relative w-full ${className ?? ''}`}
      style={{ aspectRatio: '560 / 470' }}
      aria-hidden="true"
    >
      {PROBLEMA.artefactos.map((artefacto, i) => {
        const pos = POSITIONS[i % POSITIONS.length]
        return (
          <m.div
            key={i}
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 26 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: i * 0.15, duration: 0.55, ease: EASE }}
            className="absolute rounded-lg border border-border bg-white p-3.5 shadow-[0_16px_40px_-18px_rgba(10,10,10,0.25)]"
            style={{
              top: pos.top,
              left: pos.left,
              width: pos.width,
              rotate: pos.rotate,
              zIndex: i,
            }}
          >
            <div className="mb-1.5 flex items-center gap-2">
              <span className="size-1.5 shrink-0 rounded-full bg-primary" />
              <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
                {artefacto.canal} · {artefacto.hora}
              </span>
            </div>
            <p className="font-sans text-[12.5px] font-light leading-snug text-ink">
              {artefacto.texto}
            </p>
          </m.div>
        )
      })}
    </div>
  )
}
