'use client'

import { useEffect, useRef, useState } from 'react'
import { m, useScroll, MotionValue } from 'framer-motion'
import { SOLUCION } from '@/content'

const ease = [0.16, 1, 0.3, 1] as const

function useMotionSnapshot(mv: MotionValue<number>) {
  const [val, setVal] = useState(0)
  useEffect(() => mv.on('change', setVal), [mv])
  return val
}

/* ── Operations Hub ─────────────────────────────────────────── */

const NODE_POSITIONS: { angle: number; r: number }[] = [
  { angle: -90,  r: 38 },
  { angle: -30,  r: 42 },
  { angle:  30,  r: 38 },
  { angle:  90,  r: 42 },
  { angle: 150,  r: 38 },
  { angle: 210,  r: 42 },
  { angle: -120, r: 54 },
  { angle: -60,  r: 56 },
  { angle:  60,  r: 54 },
  { angle: 180,  r: 56 },
]

const NODES = [
  { key: 'whatsapp', label: 'WA'  },
  { key: 'email',    label: '✉'   },
  { key: 'tms',      label: 'TMS' },
  { key: 'erp',      label: 'ERP' },
  { key: 'wms',      label: 'WMS' },
  { key: 'sheets',   label: 'XLS' },
  { key: 'calls',    label: 'VOZ' },
  { key: 'crm',      label: 'CRM' },
  { key: 'portal',   label: 'WEB' },
  { key: 'db',       label: 'DB'  },
]

function toXY(angle: number, r: number) {
  const rad = (angle * Math.PI) / 180
  return { x: Math.cos(rad) * r, y: Math.sin(rad) * r }
}

function OperationsHub() {
  return (
    <div
      className="relative mx-auto flex w-full max-w-[300px] items-center justify-center sm:max-w-[380px] lg:max-w-[420px]"
      style={{ aspectRatio: '1' }}
      aria-hidden="true"
    >
      <svg viewBox="-65 -65 130 130" className="w-full h-full overflow-visible">
        {/* Connecting lines */}
        {NODES.map((node, i) => {
          const pos = NODE_POSITIONS[i]
          if (!pos) return null
          const { x, y } = toXY(pos.angle, pos.r)
          return (
            <m.line
              key={node.key}
              x1={0} y1={0} x2={x} y2={y}
              stroke="#BFDBFE"
              strokeWidth="0.6"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease: 'easeOut' }}
              viewport={{ once: true }}
            />
          )
        })}

        {/* Hub central */}
        <circle cx={0} cy={0} r={11} fill="#2563EB" />
        <text
          x={0} y={1.5}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="3.2"
          fontFamily="system-ui, sans-serif"
          fontWeight="700"
        >
          Suplai
        </text>

        {/* Pulse rings */}
        <m.circle
          cx={0} cy={0} r={12}
          fill="none" stroke="#2563EB" strokeWidth="0.7" strokeOpacity={0.4}
          animate={{ r: [12, 22], opacity: [0.4, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
        />
        <m.circle
          cx={0} cy={0} r={12}
          fill="none" stroke="#2563EB" strokeWidth="0.4" strokeOpacity={0.2}
          animate={{ r: [12, 28], opacity: [0.2, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: 0.8 }}
        />

        {/* Nodes */}
        {NODES.map((node, i) => {
          const pos = NODE_POSITIONS[i]
          if (!pos) return null
          const { x, y } = toXY(pos.angle, pos.r)
          return (
            <m.g
              key={node.key}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.25 + i * 0.07, ease }}
              viewport={{ once: true }}
            >
              <circle cx={x} cy={y} r={8} fill="white" stroke="#E5E7EB" strokeWidth="0.5" />
              <text
                x={x} y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#0A0A0A"
                fontSize="2.8"
                fontFamily="system-ui, sans-serif"
                fontWeight="600"
              >
                {node.label}
              </text>
            </m.g>
          )
        })}
      </svg>
    </div>
  )
}

function StepRow({
  step,
  index,
  progress,
  scrollActive,
}: {
  step: (typeof SOLUCION.steps)[number]
  index: number
  progress: number
  /** Solo en desktop los pasos se atenúan según el scroll; en mobile van siempre activos. */
  scrollActive: boolean
}) {
  const active = !scrollActive || progress >= index / 3 - 0.05

  return (
    <m.div
      animate={{ opacity: active ? 1 : 0.28, y: active ? 0 : 8 }}
      transition={{ duration: 0.4, ease }}
      className="flex items-start gap-6 py-8 border-t border-border"
    >
      <div className="shrink-0 mt-1 text-right" style={{ width: 28 }}>
        <span
          className="font-mono text-[11px] font-medium tracking-[0.12em] transition-colors duration-300"
          style={{ color: active ? '#2563EB' : '#D1D5DB' }}
        >
          {step.n}
        </span>
      </div>
      <div className="flex-1">
        <p
          className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] mb-1 transition-colors duration-300"
          style={{ color: active ? '#6B7280' : '#D1D5DB' }}
        >
          {step.label}
        </p>
        <h3
          className="font-editorial font-normal text-wrap-balance transition-colors duration-300"
          style={{
            fontSize: 'clamp(18px, 2vw, 26px)',
            lineHeight: 1.2,
            letterSpacing: '-0.016em',
            color: active ? '#0A0A0A' : '#D1D5DB',
          }}
        >
          {step.title}
        </h3>
        <p
          className="mt-2 font-sans font-light leading-relaxed transition-colors duration-300"
          style={{
            fontSize: 'clamp(13px, 1.2vw, 15px)',
            color: active ? '#6B7280' : '#E5E7EB',
          }}
        >
          {step.desc}
        </p>
      </div>
    </m.div>
  )
}

export default function SolucionSection() {
  const containerRef = useRef<HTMLElement>(null)
  // El scroll-jack (sticky 280vh) sólo tiene sentido en desktop.
  // En mobile todo el contenido no entra en 100vh y se recortaba.
  const [isDesktop, setIsDesktop] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const progress = useMotionSnapshot(scrollYProgress)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => setIsDesktop(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <section
      ref={containerRef}
      id="solucion"
      className="relative bg-white lg:h-[280vh]"
    >
      <div className="flex items-center py-20 lg:sticky lg:top-0 lg:h-screen lg:py-0">
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">

            {/* Izquierda: titular + hub */}
            <div>
              <m.h2
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease }}
                className="font-editorial font-normal text-ink text-wrap-balance mb-10"
                style={{
                  fontSize: 'clamp(26px, 3.2vw, 46px)',
                  lineHeight: 1.12,
                  letterSpacing: '-0.02em',
                }}
              >
                {SOLUCION.headline}
              </m.h2>

              <m.div
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease }}
              >
                <OperationsHub />
              </m.div>

              {/* Integrations strip */}
              <m.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-2 text-center font-mono text-[10px] text-muted leading-relaxed"
              >
                {SOLUCION.integrations}
              </m.p>
            </div>

            {/* Derecha: pasos con rail */}
            <div className="flex gap-5">
              {/* Rail de progreso */}
              <div className="relative w-px flex-none self-stretch bg-border">
                <m.div
                  className="absolute top-0 left-0 w-full bg-primary origin-top"
                  style={{ scaleY: isDesktop ? scrollYProgress : 1, height: '100%' }}
                />
              </div>

              <div className="flex-1">
                {SOLUCION.steps.map((step, i) => (
                  <StepRow key={step.n} step={step} index={i} progress={progress} scrollActive={isDesktop} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
