'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence } from 'framer-motion'
import MenuOverlay from '@/components/MenuOverlay'
import { DEMO_URL, NAV } from '@/content'
import { getLenis } from '@/lib/providers'

/**
 * Header fijo: lockup a la izquierda; CTA de demo y botón "Menú" a la
 * derecha. El tono (logo blanco o negro) sigue a la sección que está
 * debajo del header: cada sección declara data-tone="dark" | "light".
 * El menú es un overlay full-screen con foco atrapado y Escape para cerrar.
 */

type Tone = 'dark' | 'light'

const LOGO_H = 24
const LOGO_W = 89 // lockup 426×116
const MENU_ID = 'menu-principal'
/** Línea de muestreo del tono: a la altura del centro del header. */
const PROBE_Y = 36

function readTone(): Tone {
  const sections = document.querySelectorAll<HTMLElement>('[data-tone]')
  let tone: Tone = 'dark'
  sections.forEach((section) => {
    const { top, bottom } = section.getBoundingClientRect()
    if (top <= PROBE_Y && bottom > PROBE_Y) tone = section.dataset.tone as Tone
  })
  return tone
}

export default function Navbar() {
  const [tone, setTone] = useState<Tone>('dark')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setTone(readTone()))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Menú abierto: frena el scroll de fondo, atrapa el foco, Escape cierra.
  useEffect(() => {
    if (!isMenuOpen) return
    const lenis = getLenis()
    const toggle = toggleRef.current
    lenis?.stop()
    document.documentElement.style.overflow = 'hidden'

    const header = headerRef.current
    const focusables = () =>
      Array.from(header?.querySelectorAll<HTMLElement>('a[href], button') ?? [])
    focusables().find((el) => el.closest(`#${MENU_ID}`))?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false)
        return
      }
      if (e.key !== 'Tab') return
      const items = focusables()
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last?.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.documentElement.style.overflow = ''
      lenis?.start()
      toggle?.focus({ preventScroll: true })
    }
  }, [isMenuOpen])

  const isDark = isMenuOpen || tone === 'dark'
  const menuLabel = isMenuOpen ? NAV.menuClose : NAV.menuOpen
  const plate = isDark ? 'text-ink-inverse' : 'bg-night text-ink-inverse'

  return (
    <header
      ref={headerRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between px-5 pt-5 sm:px-8 lg:px-12"
    >
      <a
        href="#inicio"
        aria-label={NAV.homeLabel}
        onClick={() => setIsMenuOpen(false)}
        className="pointer-events-auto relative mt-2 block h-6 w-[89px]"
      >
        <Image
          src="/brand/suplai-lockup-white.png"
          alt=""
          width={LOGO_W}
          height={LOGO_H}
          priority
          className={`absolute inset-0 h-full w-auto transition-opacity duration-300 ${isDark ? 'opacity-100' : 'opacity-0'}`}
        />
        <Image
          src="/brand/suplai-lockup-black.png"
          alt=""
          width={LOGO_W}
          height={LOGO_H}
          className={`absolute inset-0 h-full w-auto transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-100'}`}
        />
      </a>

      <div className="pointer-events-auto flex items-center gap-2">
        <a
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-accent-strong"
        >
          {/* En mobile el texto corto, para que entre al lado de "Menú". */}
          <span className="sm:hidden">{NAV.ctaShort}</span>
          <span className="hidden sm:inline">{NAV.cta}</span>
          <span aria-hidden="true">→</span>
        </a>
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls={MENU_ID}
          onClick={() => setIsMenuOpen((open) => !open)}
          className={`inline-flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors duration-300 ${plate}`}
        >
          {menuLabel}
          <span aria-hidden="true" className="relative block h-2.5 w-4">
            <span
              className={`absolute left-0 block h-px w-4 bg-current transition-transform duration-300 ${isMenuOpen ? 'top-1/2 rotate-45' : 'top-0'}`}
            />
            <span
              className={`absolute left-0 block h-px w-4 bg-current transition-transform duration-300 ${isMenuOpen ? 'top-1/2 -rotate-45' : 'bottom-0'}`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && <MenuOverlay id={MENU_ID} onNavigate={() => setIsMenuOpen(false)} />}
      </AnimatePresence>
    </header>
  )
}
