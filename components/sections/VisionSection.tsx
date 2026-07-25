'use client'

import React from 'react'
import Image from 'next/image'
import { m } from 'framer-motion'
import { DEMO_URL, VISION, FOOTER } from '@/content'
import { fadeUp } from '@/lib/motion'
import LineReveal from '@/components/LineReveal'

/** Subtítulo y CTA entran después de que el headline terminó su reveal
 *  por línea — mismo fadeUp del sistema, con arranque diferido. */
const followUp = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
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

const LINK_ICONS: Record<string, React.ReactNode> = {
  'LinkedIn · getsuplai':   <IconLinkedIn />,
  'contacto@getsuplai.com': <IconMail />,
}

export default function VisionSection() {
  return (
    <>
      {/* Visión — cierre full-bleed (B7 opción B): puerto en blue hour con
          overlay oscuro + duotono azul, mismo tratamiento que Empresas. */}
      <section
        id="vision"
        className="relative isolate overflow-hidden bg-[#0A0A0A]"
        style={{ paddingBlock: 'var(--section-py-lg)' }}
      >
        <Image
          src="/cierre.webp"
          alt=""
          fill
          quality={65}
          sizes="100vw"
          className="object-cover grayscale contrast-[1.08] brightness-[0.5]"
          aria-hidden="true"
        />
        {/* Tinte duotono azul + oscurecimiento para contraste del texto */}
        <div className="absolute inset-0 bg-primary/25 mix-blend-color" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/95 via-[#0A0A0A]/60 to-[#0A0A0A]/75"
          aria-hidden="true"
        />
        {/* Scrim lateral: protege la zona izquierda donde vive el texto,
            dejando la foto legible a la derecha */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/85 via-[#0A0A0A]/40 to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10">
          <LineReveal
            text={`${VISION.headline}\n${VISION.accent}`}
            accent={VISION.accent}
            as="h2"
            className="type-h1 max-w-3xl font-editorial font-normal text-white"
          />

          <m.div
            variants={followUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <m.p
              variants={fadeUp}
              className="mt-7 font-sans font-light leading-relaxed text-white/85 max-w-lg"
              style={{ fontSize: 'clamp(14px, 1.5vw, 17px)' }}
            >
              {VISION.subtitle}
            </m.p>

            <m.div variants={fadeUp} className="mt-10">
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-primary px-7 py-3 font-sans text-[14px] font-semibold text-white transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
              >
                {VISION.cta}
              </a>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-[#0A0A0A]">
        <div className="mx-auto max-w-[1200px] px-6 py-10 md:px-10">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">

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
                  className="inline-flex items-center gap-2 py-1.5 font-sans text-[12px] text-white/65 transition-colors hover:text-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded"
                >
                  {LINK_ICONS[link.label]}
                  {link.label}
                </a>
              ))}
            </nav>

          </div>

          <div className="mt-8 border-t border-white/[0.06] pt-6 text-center font-sans text-[11px] text-white/60">
            {FOOTER.legal.replace('{year}', String(new Date().getFullYear()))}
          </div>
        </div>
      </footer>
    </>
  )
}
