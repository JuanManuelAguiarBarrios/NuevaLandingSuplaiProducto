'use client'

import { useEffect, useState } from 'react'
import { NAV } from '@/content'
import SuplaiMark from '@/components/SuplaiMark'

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
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-300 ease-signature ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_#E5E7EB]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 md:px-10">

        {/* Logo — el isotipo escala sutilmente en hover */}
        <a
          href="#inicio"
          aria-label="Suplai — ir al inicio"
          className="group flex items-center gap-2.5 shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <SuplaiMark className="transition-transform duration-300 ease-signature group-hover:scale-105" />
          <span
            className={`font-sans font-semibold text-[15px] tracking-tight transition-colors duration-300 ${
              scrolled ? 'text-ink' : 'text-white'
            }`}
          >
            {NAV.brand}
          </span>
        </a>

        {/* CTA — hover y active alineados a la curva de firma */}
        <a
          href="mailto:admin@getsuplai.com?subject=Quiero%20una%20demo%20de%20Suplai"
          className={`inline-flex shrink-0 items-center rounded-full px-5 py-2.5 font-sans text-sm font-medium transition-[background-color,color,transform] duration-300 ease-signature active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            scrolled
              ? 'bg-primary text-white hover:bg-[#1D4ED8]'
              : 'bg-white text-ink hover:bg-accent'
          }`}
        >
          {NAV.cta}
        </a>

      </div>
    </header>
  )
}
