'use client'

import { useEffect, useRef, useState } from 'react'
import { m, useMotionValue, useSpring } from 'framer-motion'
import { BrandLogo } from '@/components/logos'
import type { LogoKey } from '@/components/logos'
import { EASE, DURATION } from '@/lib/motion'

/**
 * Hub de integraciones de Suplai.
 *
 * Capa SVG (líneas + dots de datos + pulsos del centro) por debajo, chips HTML
 * con los logos reales por encima. Todo el movimiento es `transform`/`opacity`.
 *
 * Fallback: en mobile / `prefers-reduced-motion` / pointer coarse se apaga el
 * movimiento perpetuo (float, dots, parallax) y queda una constelación estática.
 * MotionConfig(reducedMotion="user") ya neutraliza los loops de Framer; el flag
 * `animated` además evita montar los listeners de parallax y los dots en mobile.
 */

/* ── Layout de la constelación (coordenadas en el viewBox 0..100) ──
   Ángulo en grados, radio como % desde el centro (0..50). Anillo interno
   con las marcas más reconocibles, anillo externo con categorías de sistema. */
type Node = { key: LogoKey; angle: number; r: number }

const NODES: Node[] = [
  { key: 'whatsapp', angle: -90, r: 31 },
  { key: 'excel', angle: -30, r: 33 },
  { key: 'sheets', angle: 30, r: 31 },
  { key: 'gmail', angle: 90, r: 33 },
  { key: 'tms', angle: 150, r: 31 },
  { key: 'erp', angle: 210, r: 33 },
  { key: 'wms', angle: -125, r: 46 },
  { key: 'crm', angle: -55, r: 46 },
  { key: 'voz', angle: 55, r: 46 },
  { key: 'db', angle: 180, r: 46 },
]

const CENTER = 50
const LINE_COLOR = '#BFDBFE'

function polar(angleDeg: number, r: number): { dx: number; dy: number } {
  const a = (angleDeg * Math.PI) / 180
  return { dx: Math.cos(a) * r, dy: Math.sin(a) * r }
}

/* ── Detección de "modo animado" ──
   SSR y primer paint → false (constelación estática = fallback seguro, sin
   mismatch de hidratación). El cliente hace upgrade si corresponde. */
function useAnimated(): boolean {
  const [animated, setAnimated] = useState(false)
  useEffect(() => {
    const motionOk = window.matchMedia('(min-width: 768px) and (pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setAnimated(motionOk.matches && !reduce.matches)
    update()
    motionOk.addEventListener('change', update)
    reduce.addEventListener('change', update)
    return () => {
      motionOk.removeEventListener('change', update)
      reduce.removeEventListener('change', update)
    }
  }, [])
  return animated
}

/* ── Parallax sutil siguiendo el mouse (desktop) ──
   Devuelve dos springs de rotación aplicables al layer del hub. Máx ~5°. */
const TILT_MAX = 5

function usePointerTilt(ref: React.RefObject<HTMLDivElement | null>, enabled: boolean) {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 90, damping: 18 })
  const springY = useSpring(rotateY, { stiffness: 90, damping: 18 })

  useEffect(() => {
    if (!enabled) {
      rotateX.set(0)
      rotateY.set(0)
      return
    }
    const el = ref.current
    if (!el) return

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      rotateY.set(px * TILT_MAX * 2)
      rotateX.set(-py * TILT_MAX * 2)
    }
    const onLeave = () => {
      rotateX.set(0)
      rotateY.set(0)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [ref, enabled, rotateX, rotateY])

  return { rotateX: springX, rotateY: springY }
}

/* ── Chip de un nodo ── */
function NodeChip({ node, index, animated }: { node: Node; index: number; animated: boolean }) {
  const { dx, dy } = polar(node.angle, node.r)
  // Float perpetuo: amplitud/tempo variados por índice para que no lata al unísono.
  const amplitude = 3 + (index % 3)
  const floatDuration = 3.2 + (index % 4) * 0.45

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${CENTER + dx}%`, top: `${CENTER + dy}%` }}
    >
      <m.div
        variants={{
          hidden: { opacity: 0, scale: 0.5 },
          show: { opacity: 1, scale: 1, transition: { duration: DURATION.fast, ease: EASE } },
        }}
      >
        <m.div
          animate={animated ? { y: [0, -amplitude, 0] } : undefined}
          transition={
            animated
              ? { duration: floatDuration, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }
              : undefined
          }
        >
          <div className="flex size-11 items-center justify-center rounded-[26%] bg-white text-ink/70 ring-1 ring-black/[0.05] shadow-[0_6px_16px_-8px_rgba(15,23,42,0.35)] sm:size-12">
            <BrandLogo name={node.key} size={26} />
          </div>
        </m.div>
      </m.div>
    </div>
  )
}

export default function OperationsHub() {
  const ref = useRef<HTMLDivElement>(null)
  const animated = useAnimated()
  const { rotateX, rotateY } = usePointerTilt(ref, animated)

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[420px]"
      style={{ perspective: 900 }}
      aria-hidden="true"
    >
      <m.div className="absolute inset-0" style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
        {/* Capa SVG: líneas + dots de datos + pulsos del centro */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          {NODES.map((node, i) => {
            const { dx, dy } = polar(node.angle, node.r)
            return (
              <m.line
                key={`line-${node.key}`}
                x1={CENTER}
                y1={CENTER}
                x2={CENTER + dx}
                y2={CENTER + dy}
                stroke={LINE_COLOR}
                strokeWidth={0.5}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: DURATION.slow, delay: 0.1 + i * 0.05, ease: EASE }}
                viewport={{ once: true }}
              />
            )
          })}

          {/* Dots de datos viajando hacia el hub (solo modo animado) */}
          {animated &&
            NODES.map((node, i) => {
              const { dx, dy } = polar(node.angle, node.r)
              return (
                <m.circle
                  key={`dot-${node.key}`}
                  cx={CENTER}
                  cy={CENTER}
                  r={0.9}
                  fill="#2563EB"
                  initial={{ x: dx, y: dy, opacity: 0 }}
                  animate={{ x: [dx, 0], y: [dy, 0], opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.35,
                    times: [0, 0.15, 0.85, 1],
                  }}
                />
              )
            })}

          {/* Pulsos concéntricos del centro (scale, no r → transform puro) */}
          {animated && (
            <>
              <m.circle
                cx={CENTER}
                cy={CENTER}
                r={9}
                fill="none"
                stroke="#2563EB"
                strokeWidth={0.5}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                animate={{ scale: [1, 2.6], opacity: [0.4, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut' }}
              />
              <m.circle
                cx={CENTER}
                cy={CENTER}
                r={9}
                fill="none"
                stroke="#2563EB"
                strokeWidth={0.35}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                animate={{ scale: [1, 3.2], opacity: [0.25, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut', delay: 1.4 }}
              />
            </>
          )}
        </svg>

        {/* Nodos con logos (stagger reveal on-scroll) */}
        <m.div
          className="absolute inset-0"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
        >
          {NODES.map((node, i) => (
            <NodeChip key={node.key} node={node} index={i} animated={animated} />
          ))}
        </m.div>

        {/* Nodo central: Suplai */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <m.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: DURATION.base, ease: EASE }}
            className="flex size-16 items-center justify-center rounded-full bg-primary text-white shadow-[0_10px_30px_-8px_rgba(37,99,235,0.6)] sm:size-[70px]"
          >
            <span className="font-sans text-[12px] font-semibold tracking-tight">Suplai</span>
          </m.div>
        </div>
      </m.div>
    </div>
  )
}
