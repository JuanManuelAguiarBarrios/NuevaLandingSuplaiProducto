'use client'

import React from 'react'
import Image from 'next/image'
import { m } from 'framer-motion'
import { VISION, FOOTER } from '@/content'

const ease = [0.16, 1, 0.3, 1] as const

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
}

function IconLinkedIn() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function IconMail() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <polyline points="3.5,7.5 12,13 20.5,7.5" />
    </svg>
  )
}

function IconPhone() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function IconGlobe() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

const LINK_ICONS: Record<string, React.ReactNode> = {
  'getsuplai.com':        <IconGlobe />,
  'LinkedIn · getsuplai': <IconLinkedIn />,
  '+598 94412389':        <IconPhone />,
  'admin@getsuplai.com':  <IconMail />,
}

export default function VisionSection() {
  return (
    <>
      {/* Visión */}
      <section id="vision" className="bg-[#0A0A0A] py-32 md:py-44">
        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-[1200px] px-6 md:px-10"
        >
          <m.h2
            variants={fadeUp}
            className="font-editorial font-normal text-white text-wrap-balance max-w-3xl"
            style={{
              fontSize: 'clamp(30px, 4.2vw, 62px)',
              lineHeight: 1.08,
              letterSpacing: '-0.022em',
            }}
          >
            {VISION.headline}{' '}
            <em style={{ fontStyle: 'italic', color: '#2563EB' }}>
              {VISION.accent}
            </em>
          </m.h2>

          <m.p
            variants={fadeUp}
            className="mt-7 font-sans font-light leading-relaxed text-white/65 max-w-lg"
            style={{ fontSize: 'clamp(14px, 1.5vw, 17px)' }}
          >
            {VISION.subtitle}
          </m.p>

          <m.div variants={fadeUp} className="mt-10">
            <a
              href="mailto:admin@getsuplai.com?subject=Quiero%20una%20demo%20de%20Suplai"
              className="inline-flex items-center rounded-full bg-primary px-7 py-3 font-sans text-[14px] font-semibold text-white transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
            >
              {VISION.cta}
            </a>
          </m.div>
        </m.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-[#0A0A0A]">
        <div className="mx-auto max-w-[1200px] px-6 py-10 md:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            {/* Lockup oficial (blanco, ya incluye el wordmark) */}
            <Image
              src="/brand/suplai-lockup-white.png"
              alt={FOOTER.brand}
              width={90}
              height={24}
              className="h-6 w-auto"
            />

            <nav aria-label="Contacto" className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              {FOOTER.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex items-center gap-2 py-1.5 font-sans text-[12px] text-white/55 transition-colors hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded"
                >
                  {LINK_ICONS[link.label]}
                  {link.label}
                </a>
              ))}
            </nav>

          </div>

          <div className="mt-8 border-t border-white/[0.06] pt-6 text-center font-sans text-[11px] text-white/45">
            {FOOTER.legal.replace('{year}', String(new Date().getFullYear()))}
          </div>
        </div>
      </footer>
    </>
  )
}
