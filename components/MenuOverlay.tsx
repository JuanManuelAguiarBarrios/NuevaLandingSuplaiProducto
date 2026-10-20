'use client'

import Image from 'next/image'
import { m } from 'framer-motion'
import { CONTACT_EMAIL, DEMO_URL, LINKEDIN_URL, NAV } from '@/content'
import type { MenuItem } from '@/content'
import { DURATION, EASE } from '@/lib/motion'

/**
 * Overlay full-screen del menú. Entra con un wipe de arriba hacia abajo
 * (clip-path) y los ítems suben escalonados. En hover/foco, la fila se
 * invierte a fondo claro y el label corre en loop junto a una imagen en
 * píldora. Lo monta/desmonta el Navbar dentro de AnimatePresence.
 */

interface MenuOverlayProps {
  id: string
  onNavigate: () => void
}

const REPEATS = 4

function ItemMarquee({ item }: { item: MenuItem }) {
  const sequence = Array.from({ length: REPEATS * 2 }, (_, i) => i)
  return (
    <span
      aria-hidden="true"
      className="absolute inset-0 flex items-center overflow-hidden bg-paper text-ink [clip-path:inset(100%_0_0_0)] transition-[clip-path] duration-500 ease-editorial group-hover:[clip-path:inset(0)] group-focus-visible:[clip-path:inset(0)]"
    >
      <span className="menu-marquee flex w-max items-center">
        {sequence.map((i) => (
          <span key={i} className="flex shrink-0 items-center">
            <span className="whitespace-nowrap px-6 lg:px-8">{item.label}</span>
            <Image
              src={item.image.src}
              alt=""
              width={160}
              height={72}
              sizes="160px"
              loading="eager"
              className="shrink-0 h-[clamp(2.4rem,4.6vw,4.4rem)] w-[clamp(5.5rem,10vw,10rem)] rounded-full object-cover"
            />
          </span>
        ))}
      </span>
    </span>
  )
}

export default function MenuOverlay({ id, onNavigate }: MenuOverlayProps) {
  return (
    <m.div
      id={id}
      initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: DURATION.base, ease: EASE }}
      className="pointer-events-auto fixed inset-0 -z-10 flex flex-col justify-between overflow-y-auto bg-night-raised px-5 pt-24 pb-8 text-ink-inverse sm:px-8 lg:px-12 lg:pt-28"
    >
      <nav aria-label="Menú principal">
        <ul className="border-b border-line-inverse">
          {NAV.items.map((item, i) => (
            <m.li
              key={item.href}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.base, ease: EASE, delay: 0.15 + i * 0.06 }}
              className="border-t border-line-inverse"
            >
              <a
                href={item.href}
                onClick={onNavigate}
                className="group relative flex items-center justify-between py-[clamp(0.75rem,2.6vh,2rem)] text-[clamp(2.25rem,4.8vw,4.75rem)] leading-none font-semibold tracking-[-0.04em] outline-none"
              >
                <span className="whitespace-nowrap">{item.label}</span>
                <span aria-hidden="true" className="text-[0.45em] text-caption">→</span>
                <ItemMarquee item={item} />
              </a>
            </m.li>
          ))}
        </ul>
      </nav>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DURATION.base, ease: EASE, delay: 0.5 }}
        className="mt-12 grid gap-6 text-sm sm:grid-cols-3"
      >
        <a href={`mailto:${CONTACT_EMAIL}`} className="link-line justify-self-start text-ink-inverse-muted">
          {CONTACT_EMAIL}
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="link-line justify-self-start text-ink-inverse-muted"
        >
          LinkedIn <span aria-hidden="true">↗</span>
        </a>
        <a
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="link-line justify-self-start font-medium text-ink-inverse sm:justify-self-end"
        >
          {NAV.cta} <span aria-hidden="true">→</span>
        </a>
      </m.div>
    </m.div>
  )
}
