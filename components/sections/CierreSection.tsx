'use client'

import { m } from 'framer-motion'
import LineReveal from '@/components/LineReveal'
import ParallaxImage from '@/components/ParallaxImage'
import { CIERRE, CONTACT_EMAIL, DEMO_URL, WHATSAPP_URL } from '@/content'
import { fadeUp, lineUp, VIEWPORT } from '@/lib/motion'

/**
 * Cierre y contacto en un solo bloque: imagen full-bleed con parallax,
 * titular, bajada y las dos vías de contacto (demo y WhatsApp), con el
 * email abajo. Lleva el id "contacto" para el menú. Única excepción a la
 * regla de una palabra en itálica: la segunda línea completa.
 */
export default function CierreSection() {
  return (
    <section
      id="contacto"
      data-tone="dark"
      aria-labelledby="cierre-title"
      className="relative overflow-hidden bg-night text-ink-inverse"
    >
      <div className="absolute inset-0">
        <ParallaxImage src={CIERRE.image.src} alt={CIERRE.image.alt} sizes="100vw" reveal={false} className="h-full" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-night/55" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-night/20" />

      <div className="relative flex min-h-svh flex-col justify-end px-5 pt-32 pb-16 sm:px-8 lg:px-12 lg:pb-24">
        <div id="cierre-title" className="max-w-5xl">
          <LineReveal text={CIERRE.headline} className="text-h1 font-semibold" />
          <m.p initial="hidden" whileInView="show" viewport={VIEWPORT} className="block overflow-hidden pb-[0.12em] text-h1">
            <m.em variants={lineUp} className="accent block leading-[1.05]">
              {CIERRE.accentLine}
            </m.em>
          </m.p>
        </div>

        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-12 grid gap-8 border-t border-line-inverse pt-8 lg:grid-cols-12"
        >
          <div className="lg:col-span-6">
            <p className="max-w-xl text-lead text-ink-inverse-muted">{CIERRE.subtitle}</p>
            <p className="mt-6 text-sm text-ink-inverse-muted">
              {CIERRE.emailLabel}{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="link-line text-ink-inverse">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6 lg:col-span-5 lg:col-start-8 lg:justify-end">
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-accent px-6 py-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-accent-strong"
            >
              {CIERRE.ctaPrimary} <span aria-hidden="true">→</span>
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link-line text-sm font-medium text-ink-inverse"
            >
              {CIERRE.ctaWhatsapp} <span aria-hidden="true">→</span>
            </a>
          </div>
        </m.div>
      </div>
    </section>
  )
}
