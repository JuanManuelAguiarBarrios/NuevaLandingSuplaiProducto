'use client'

import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import Image from 'next/image'
import { AnimatePresence, m } from 'framer-motion'
import LineReveal from '@/components/LineReveal'
import { INDUSTRIAS } from '@/content'
import { DURATION, EASE, fadeUp, stagger, VIEWPORT } from '@/lib/motion'

/**
 * Industrias: selector 01/06. En desktop, lista a la izquierda (tablist
 * accesible con flechas, Home y End) y panel a la derecha. En mobile,
 * acordeón: la industria se abre debajo de su nombre, a la vista.
 */

const ITEMS = INDUSTRIAS.items
const TOTAL = String(ITEMS.length).padStart(2, '0')

type Industry = (typeof ITEMS)[number]

/** Imagen de la vertical (entra con un wipe) y sus dolores escalonados. */
function IndustryPanel({ item, index }: { item: Industry; index: number }) {
  return (
    <>
      <div className="relative aspect-[4/3] overflow-hidden bg-night">
        <AnimatePresence initial={false}>
          <m.div
            key={item.key}
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ duration: DURATION.slow, ease: EASE }}
            className="absolute inset-0"
          >
            <m.div
              initial={{ scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: DURATION.slow * 1.6, ease: EASE }}
              className="absolute inset-0"
            >
              <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </m.div>
          </m.div>
        </AnimatePresence>
        <p aria-hidden="true" className="absolute top-5 right-5 z-10 bg-paper px-2.5 py-1 font-mono text-[11px] text-ink tabular-nums">
          {String(index + 1).padStart(2, '0')} de {TOTAL}
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-[10rem_1fr]">
        <p className="eyebrow pt-1 text-ink-muted">{INDUSTRIAS.painsLabel}</p>
        <m.ul key={item.key} variants={stagger} initial="hidden" animate="show" className="space-y-3">
          {item.pains.map((pain) => (
            <m.li key={pain} variants={fadeUp} className="border-b border-line pb-3 text-lg">
              {pain}
            </m.li>
          ))}
        </m.ul>
      </div>
    </>
  )
}

export default function IndustriasSection() {
  const [active, setActive] = useState(0)
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])
  const item = ITEMS[active]

  const focusTab = (index: number) => {
    const next = (index + ITEMS.length) % ITEMS.length
    setActive(next)
    tabsRef.current[next]?.focus()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, () => void> = {
      ArrowDown: () => focusTab(active + 1),
      ArrowRight: () => focusTab(active + 1),
      ArrowUp: () => focusTab(active - 1),
      ArrowLeft: () => focusTab(active - 1),
      Home: () => focusTab(0),
      End: () => focusTab(ITEMS.length - 1),
    }
    const action = keys[e.key]
    if (!action) return
    e.preventDefault()
    action()
  }

  return (
    <section
      id="industrias"
      data-tone="light"
      aria-labelledby="industrias-title"
      className="bg-paper px-5 py-24 text-ink sm:px-8 lg:px-12 lg:py-36"
    >
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow text-ink-muted">{INDUSTRIAS.eyebrow}</p>
          <div id="industrias-title">
            <LineReveal
              text={INDUSTRIAS.headline.text}
              accent={INDUSTRIAS.headline.accent}
              className="mt-5 text-display font-semibold"
            />
          </div>
        </div>
        <m.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="max-w-sm text-lead text-ink-muted lg:col-span-4 lg:col-start-9 lg:self-end"
        >
          {INDUSTRIAS.subtitle}
        </m.p>
      </div>

      {/* Desktop: pestañas a la izquierda, panel a la derecha. */}
      <div className="mt-24 hidden gap-8 lg:grid lg:grid-cols-12">
        <div role="tablist" aria-label={INDUSTRIAS.eyebrow} aria-orientation="vertical" className="col-span-5 border-b border-line">
          {ITEMS.map((industry, i) => {
            const isActive = i === active
            return (
              <button
                key={industry.key}
                ref={(el) => {
                  tabsRef.current[i] = el
                }}
                id={`industria-tab-${industry.key}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="industria-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={handleKeyDown}
                className={`group flex w-full items-baseline gap-6 border-t border-line py-5 text-left transition-colors duration-300 ${isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'}`}
              >
                <span className="font-mono text-[11px] tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-1 text-h3 font-medium">{industry.title}</span>
                <span
                  aria-hidden="true"
                  className={`text-accent transition-[opacity,transform] duration-500 ease-editorial ${isActive ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`}
                >
                  →
                </span>
              </button>
            )
          })}
        </div>

        <div
          id="industria-panel"
          role="tabpanel"
          aria-labelledby={`industria-tab-${item.key}`}
          className="col-span-6 col-start-7"
        >
          <IndustryPanel item={item} index={active} />
        </div>
      </div>

      {/* Mobile: acordeón, la industria se abre debajo de su nombre. */}
      <ul className="mt-16 border-b border-line lg:hidden">
        {ITEMS.map((industry, i) => {
          const isOpen = i === active
          const panelId = `industria-acordeon-${industry.key}`
          return (
            <li key={industry.key} className="border-t border-line">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setActive(i)}
                  className={`flex w-full items-baseline gap-5 py-5 text-left transition-colors duration-300 ${isOpen ? 'text-ink' : 'text-ink-muted'}`}
                >
                  <span className="font-mono text-[11px] tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex-1 text-h3 font-medium">{industry.title}</span>
                  <span aria-hidden="true" className={`text-accent transition-transform duration-500 ease-editorial ${isOpen ? 'rotate-90' : ''}`}>
                    →
                  </span>
                </button>
              </h3>
              {isOpen && (
                <div id={panelId} className="pb-8">
                  <IndustryPanel item={industry} index={i} />
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
