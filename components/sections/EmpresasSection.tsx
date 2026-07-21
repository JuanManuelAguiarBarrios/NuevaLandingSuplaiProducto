'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, m } from 'framer-motion'
import { EMPRESAS } from '@/content'
import { EASE, fadeUpTight, staggerTight } from '@/lib/motion'
import { VerticalGlyph } from '@/components/logos'

/**
 * "Hecho para tu operación" — índice editorial con spotlight.
 *
 * Desktop: la lista de verticales es el índice (títulos grandes en PP
 * Editorial); hover/focus/click activan una fila y el panel derecho revela
 * el glyph en grande + la descripción. La activa toma la itálica azul de
 * firma. Mobile: lista apilada con la descripción visible (sin hover, sin
 * acordeón — la info completa directa).
 */

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
          className={`font-editorial font-normal transition-colors duration-300 ease-signature ${
            isActive ? 'text-primary' : 'text-white/45 group-hover:text-white/75'
          }`}
          style={{
            fontSize: 'clamp(18px, 2.1vw, 27px)',
            lineHeight: 1.18,
            letterSpacing: '-0.016em',
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

/**
 * Panel derecho: foto de la vertical activa en duotono azul (grayscale +
 * tinte con mix-blend) con Ken Burns sutil, y el texto debajo con crossfade.
 * Las 6 fotos quedan montadas y se alternan por opacidad → el cambio es
 * instantáneo (nada de esperar el fetch en cada hover).
 */
function Spotlight({ activeIndex }: { activeIndex: number }) {
  const active = EMPRESAS.items[activeIndex] ?? EMPRESAS.items[0]

  return (
    <div>
      {/* Foto — stack con crossfade. Aspect más bajo en mobile (foto compacta arriba del índice). */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl lg:aspect-[4/3]">
        {EMPRESAS.items.map((item, i) => {
          const isActive = i === activeIndex
          return (
            <div
              key={item.key}
              className={`absolute inset-0 transition-opacity duration-500 ease-signature ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden={!isActive}
            >
              <Image
                src={`/empresas/${item.key}.webp`}
                alt={item.alt}
                fill
                quality={65}
                sizes="(min-width: 1024px) 460px, 100vw"
                className={`object-cover grayscale contrast-[1.08] brightness-[0.85] ${
                  isActive ? 'kenburns' : ''
                }`}
              />
              {/* Tinte duotono azul sobre el grayscale */}
              <div className="absolute inset-0 bg-primary/30 mix-blend-color" aria-hidden="true" />
              {/* Fade inferior hacia el fondo de la sección */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/75 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>
          )
        })}

        {/* Chip glyph + índice sobre la foto */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2.5 text-white">
          <span className="flex size-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm" aria-hidden="true">
            <VerticalGlyph name={active.icon} size={17} />
          </span>
          <span className="font-mono text-[11px] tabular-nums text-white/80" aria-hidden="true">
            {String(activeIndex + 1).padStart(2, '0')} / {String(EMPRESAS.items.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Texto — crossfade al cambiar */}
      <AnimatePresence mode="wait">
        <m.div
          key={active.key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.28, ease: EASE }}
        >
          <h3
            className="mt-6 font-editorial font-normal text-white text-wrap-balance"
            style={{ fontSize: 'clamp(20px, 2vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.016em' }}
          >
            {active.title}
          </h3>
          <p
            className="mt-3 max-w-[42ch] font-sans font-light leading-relaxed text-white/60"
            style={{ fontSize: 'clamp(14px, 1.5vw, 17px)' }}
          >
            {active.desc}
          </p>
        </m.div>
      </AnimatePresence>
    </div>
  )
}

export default function EmpresasSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="empresas" className="bg-[#0A0A0A]" style={{ paddingBlock: 'var(--section-py)' }}>
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

        <div className="flex flex-col lg:grid lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          {/* Spotlight — primero en mobile (foto compacta), columna derecha en desktop */}
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            className="mb-10 lg:order-2 lg:mb-0 lg:pt-2"
          >
            <Spotlight activeIndex={activeIndex} />
          </m.div>

          {/* Índice — columna izquierda en desktop */}
          <m.ul
            variants={staggerTight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:order-1"
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
        </div>

      </div>
    </section>
  )
}
