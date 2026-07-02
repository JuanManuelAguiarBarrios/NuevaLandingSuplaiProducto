'use client'

import { useEffect, useState } from 'react'
import { NAV } from '@/content'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_#E5E7EB]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 md:px-10">

        {/* Logo */}
        <a
          href="#inicio"
          aria-label="Suplai — ir al inicio"
          className="flex items-center gap-2.5 shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <SuplaiIcon />
          <span
            className={`font-sans font-semibold text-[15px] tracking-tight transition-colors ${
              scrolled ? 'text-ink' : 'text-white'
            }`}
          >
            {NAV.brand}
          </span>
        </a>

        {/* CTA */}
        <a
          href="mailto:admin@getsuplai.com?subject=Quiero%20una%20demo%20de%20Suplai"
          className={`inline-flex shrink-0 items-center rounded-full px-5 py-2.5 font-sans text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            scrolled
              ? 'bg-primary text-white hover:opacity-90'
              : 'bg-white text-ink hover:bg-accent'
          }`}
        >
          {NAV.cta}
        </a>

      </div>
    </header>
  )
}

function SuplaiIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect width="28" height="28" rx="7" fill="#2563EB" />
      <path
        d="M8 14C8 10.686 10.686 8 14 8C17.314 8 20 10.686 20 14"
        stroke="white" strokeWidth="2.5" strokeLinecap="round"
      />
      <path
        d="M20 14C20 17.314 17.314 20 14 20C10.686 20 8 17.314 8 14"
        stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.4"
      />
    </svg>
  )
}
