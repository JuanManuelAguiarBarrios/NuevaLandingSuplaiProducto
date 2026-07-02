'use client'

import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { EMPRESAS } from '@/content'
import { EASE, fadeUpTight, staggerTight } from '@/lib/motion'

/**
 * "Hecho para tu operación" — índice editorial con spotlight.
 *
 * Desktop: la lista de verticales es el índice (títulos grandes en PP
 * Editorial); hover/focus/click activan una fila y el panel derecho revela
 * el glyph en grande + la descripción. La activa toma la itálica azul de
 * firma. Mobile: lista apilada con la descripción visible (sin hover, sin
 * acordeón — la info completa directa).
 */

type IconName = (typeof EMPRESAS.items)[number]['icon']

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const base = {
    width: size,
    height: size,
    viewBox: '0 0 20 20',
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  switch (name) {
    case 'truck':
      return (
        <svg {...base}>
          <rect x="1" y="4" width="11" height="9" rx="1" />
          <path d="M12 7h4l2 3v3h-6V7z" />
          <circle cx="4.5" cy="15" r="1.5" />
          <circle cx="15.5" cy="15" r="1.5" />
        </svg>
      )
    case 'package':
      return (
        <svg {...base}>
          <path d="M10 2L2 6v8l8 4 8-4V6l-8-4z" />
          <path d="M2 6l8 4 8-4" />
          <path d="M10 10v8" />
        </svg>
      )
    case 'ship':
      return (
        <svg {...base}>
          <path d="M3 11l7 5 7-5" />
          <path d="M5 8h10l-1 5H6L5 8z" />
          <path d="M10 2v6" />
          <path d="M8 4h4" />
          <path d="M1 17s3 2 9 2 9-2 9-2" />
        </svg>
      )
    case 'anchor':
      return (
        <svg {...base}>
          <circle cx="10" cy="5" r="2" />
          <path d="M10 7v11" />
          <path d="M5 9.5H3a7 7 0 0014 0h-2" />
        </svg>
      )
    case 'route':
      return (
        <svg {...base}>
          <circle cx="4" cy="5" r="2" />
          <circle cx="16" cy="15" r="2" />
          <path d="M4 7v3a4 4 0 004 4h4a4 4 0 014 4" />
        </svg>
      )
    case 'warehouse':
      return (
        <svg {...base}>
          <path d="M2 9l8-6 8 6v9H2V9z" />
          <path d="M7 18v-5h6v5" />
        </svg>
      )
  }
}

type EmpresaItem = (typeof EMPRESAS.items)[number]

function IndexRow({
  item,
  index,
  isActive,
  onActivate,
}: {
  item: EmpresaItem
  index: number
  isActive: boolean
  onActivate: () => void
}) {
  return (
    <m.li variants={fadeUpTight} className="border-b border-white/8 first:border-t">
      <button
        type="button"
        onMouseEnter={onActivate}
        onFocus={onActivate}
        onClick={onActivate}
        aria-current={isActive || undefined}
        className="group flex w-full items-baseline gap-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm lg:py-6"
      >
        <span
          className={`w-6 shrink-0 font-mono text-[11px] tabular-nums transition-colors duration-300 ${
            isActive ? 'text-primary' : 'text-white/30'
          }`}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <span
          className={`font-editorial font-normal transition-[color,transform] duration-300 ease-signature ${
            isActive
              ? 'accent lg:translate-x-1.5'
              : 'text-white/45 group-hover:text-white/75'
          }`}
          style={{
            fontSize: 'clamp(21px, 2.6vw, 34px)',
            lineHeight: 1.15,
            letterSpacing: '-0.018em',
          }}
        >
          {item.title}
        </span>
      </button>

      {/* Mobile: descripción siempre visible (no hay hover) */}
      <p className="pb-5 pl-11 font-sans text-[13px] font-light leading-relaxed text-white/55 lg:hidden">
        {item.desc}
      </p>
    </m.li>
  )
}

/** Panel derecho: glyph en grande + descripción de la vertical activa. */
function Spotlight({ item, index }: { item: EmpresaItem; index: number }) {
  return (
    <AnimatePresence mode="wait">
      <m.div
        key={item.key}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.32, ease: EASE }}
        className="relative"
      >
        {/* Número fantasma — segundo plano editorial */}
        <span
          className="pointer-events-none absolute -top-10 right-0 select-none font-editorial text-[140px] leading-none text-white/[0.05]"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <span className="block text-primary" aria-hidden="true">
          <Icon name={item.icon} size={92} />
        </span>

        <h3
          className="mt-10 font-editorial font-normal text-white text-wrap-balance"
          style={{ fontSize: 'clamp(20px, 2vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.016em' }}
        >
          {item.title}
        </h3>

        <p
          className="mt-4 max-w-[38ch] font-sans font-light leading-relaxed text-white/60"
          style={{ fontSize: 'clamp(14px, 1.5vw, 17px)' }}
        >
          {item.desc}
        </p>
      </m.div>
    </AnimatePresence>
  )
}

export default function EmpresasSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = EMPRESAS.items[activeIndex] ?? EMPRESAS.items[0]

  return (
    <section id="empresas" className="bg-[#0A0A0A] py-28 md:py-36">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-14 max-w-xl lg:mb-16"
        >
          <h2
            className="font-editorial font-normal text-white text-wrap-balance"
            style={{
              fontSize: 'clamp(28px, 3.6vw, 52px)',
              lineHeight: 1.1,
              letterSpacing: '-0.022em',
            }}
          >
            {EMPRESAS.headline.plain}{' '}
            <em className="accent">{EMPRESAS.headline.accent}</em>
          </h2>
          <p
            className="mt-4 font-sans font-light leading-relaxed text-white/65"
            style={{ fontSize: 'clamp(14px, 1.4vw, 16px)' }}
          >
            {EMPRESAS.subtitle}
          </p>
        </m.div>

        <div className="lg:grid lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          {/* Índice */}
          <m.ul
            variants={staggerTight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {EMPRESAS.items.map((item, i) => (
              <IndexRow
                key={item.key}
                item={item}
                index={i}
                isActive={i === activeIndex}
                onActivate={() => setActiveIndex(i)}
              />
            ))}
          </m.ul>

          {/* Spotlight — sólo desktop */}
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            className="hidden border-l border-white/8 pl-14 pt-2 lg:block"
          >
            <Spotlight item={active} index={activeIndex} />
          </m.div>
        </div>

      </div>
    </section>
  )
}
