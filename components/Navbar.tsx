'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { NAV } from '@/content'

/**
 * Navbar fija. Sobre el hero (oscuro) es transparente con lockup blanco;
 * al scrollear pasa a blanco con lockup negro — crossfade de opacidad entre
 * ambas versiones (solo opacity, nada de swaps que parpadeen).
 * Mobile: hamburguesa con panel desplegable; el header se fuerza a sólido
 * mientras el menú está abierto.
 */

/** Alto del lockup en px; anchos derivados del aspect real de cada asset. */
const LOGO_H = 26
const LOGO_BLACK = { src: '/brand/suplai-lockup-black.png', w: 96 } // 426×116
const LOGO_WHITE = { src: '/brand/suplai-lockup-white.png', w: 97 } // 425×114

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Sólido si scrolleó o si el panel mobile está abierto.
  const isSolid = scrolled || isMenuOpen

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-300 ease-signature ${
        isSolid
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_#E5E7EB]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-6 px-6 md:px-10">

        {/* Lockup Suplai — crossfade blanco/negro según fondo */}
        <a
          href="#inicio"
          aria-label="Suplai — ir al inicio"
          onClick={() => setIsMenuOpen(false)}
          className="group relative block shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          style={{ height: LOGO_H, width: LOGO_WHITE.w }}
        >
          <Image
            src={LOGO_WHITE.src}
            alt=""
            width={LOGO_WHITE.w}
            height={LOGO_H}
            priority
            className={`absolute left-0 top-0 h-full w-auto transition-[opacity,transform] duration-300 ease-signature group-hover:scale-[1.03] ${
              isSolid ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <Image
            src={LOGO_BLACK.src}
            alt=""
            width={LOGO_BLACK.w}
            height={LOGO_H}
            className={`absolute left-0 top-0 h-full w-auto transition-[opacity,transform] duration-300 ease-signature group-hover:scale-[1.03] ${
              isSolid ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </a>

        {/* Links — desktop */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Secciones">
          {NAV.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-sans text-[13.5px] font-medium transition-colors duration-300 ease-signature focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-primary ${
                isSolid
                  ? 'text-muted hover:text-ink'
                  : 'text-white/65 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* CTA */}
          <a
            href="mailto:admin@getsuplai.com?subject=Quiero%20una%20demo%20de%20Suplai"
            className={`inline-flex shrink-0 items-center rounded-full px-5 py-2.5 font-sans text-sm font-medium transition-[background-color,color,transform] duration-300 ease-signature active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              isSolid
                ? 'bg-primary text-white hover:bg-[#1D4ED8]'
                : 'bg-white text-ink hover:bg-accent'
            }`}
          >
            {NAV.cta}
          </a>

          {/* Hamburguesa — mobile */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="nav-mobile"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            className={`flex size-9 items-center justify-center rounded-md transition-colors duration-300 ease-signature focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:hidden ${
              isSolid ? 'text-ink' : 'text-white'
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              {isMenuOpen ? (
                <path d="M3 3l12 12M15 3L3 15" />
              ) : (
                <path d="M2 5h14M2 9h14M2 13h14" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Panel mobile */}
      {isMenuOpen && (
        <nav
          id="nav-mobile"
          aria-label="Secciones"
          className="border-t border-border bg-white/95 backdrop-blur-md md:hidden"
        >
          <div className="mx-auto flex max-w-[1200px] flex-col px-6 py-2">
            {NAV.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="border-b border-border-light py-3.5 font-sans text-[15px] font-medium text-ink last:border-b-0 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
