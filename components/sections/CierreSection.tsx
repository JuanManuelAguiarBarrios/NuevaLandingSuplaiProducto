'use client'

import { m } from 'framer-motion'
import LineReveal from '@/components/LineReveal'
import ParallaxImage from '@/components/ParallaxImage'
import ExecutionLine from '@/components/product/ExecutionLine'
import { CIERRE, CONTACT_EMAIL, DEMO_URL, EXECUTION, WHATSAPP, whatsappUrl } from '@/content'
import { fadeUp, VIEWPORT } from '@/lib/motion'

/**
 * Cierre y contacto en un solo bloque: imagen full-bleed con parallax,
 * titular, bajada y las dos vías de contacto (demo y WhatsApp), con el
 * email abajo. Lleva el id "contacto" para el menú.
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
        <ParallaxImage src={CIERRE.image.src} alt={CIERRE.image.alt} sizes="100vw" reveal={false} quality={75} className="h-full" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-night/55" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-night/20" />

      <div className="relative flex min-h-svh flex-col justify-end px-5 pt-32 pb-16 sm:px-8 lg:px-12 lg:pb-24">
        <ExecutionLine step={EXECUTION.cierre} tone="dark" className="mb-8" />
        <div id="cierre-title" className="max-w-5xl">
          <LineReveal text={CIERRE.headline.text} lowFrom={CIERRE.headline.lowFrom} className="text-h1 font-headline" />
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
              className="btn-primary"
            >
              {CIERRE.ctaPrimary} <span aria-hidden="true">↗</span>
            </a>
            <a
              href={whatsappUrl(WHATSAPP.message)}
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
