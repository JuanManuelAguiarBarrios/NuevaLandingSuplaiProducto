'use client'

import { m } from 'framer-motion'
import { EASE, fadeUp } from '@/lib/motion'

/**
 * MAQUETAS TEMPORALES del rediseño de "Qué pasa hoy / Qué cuesta".
 * Esta preview se elimina al elegir dirección. El copy de acá es
 * PROPUESTA — el copy real sigue intacto en /content hasta aprobar
 * el diff correspondiente.
 */

const HEADLINE = { plain: 'Hoy todo se sostiene', accent: 'a pulmón.' }

const PARES = [
  {
    problema: 'Información dispersa entre sistemas, WhatsApp y llamadas',
    costo: 'Errores por información incompleta o desactualizada',
  },
  {
    problema: 'Seguimiento manual de cada envío, uno por uno',
    costo: 'Retrasos y menor nivel de servicio',
  },
  {
    problema: 'Coordinación constante entre equipos y conductores',
    costo: 'Difícil escalar la operación sin sumar más gente',
  },
]

const rowStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

/* El conector se dibuja después de que aparecen los dos textos de la fila. */
const drawLineX = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { delay: 0.4, duration: 0.5, ease: EASE } },
}

const drawLineY = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { delay: 0.4, duration: 0.4, ease: EASE } },
}

const dotIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { delay: 0.85, duration: 0.2 } },
}

function SectionHeadline() {
  return (
    <h2 className="type-h2 mb-12 font-editorial font-normal text-ink text-wrap-balance">
      {HEADLINE.plain} <em className="accent">{HEADLINE.accent}</em>
    </h2>
  )
}

function Connector() {
  return (
    <span className="relative hidden h-px self-center bg-border md:block" aria-hidden="true">
      <m.span variants={drawLineX} className="absolute inset-0 origin-left bg-primary/50" />
      <m.span
        variants={dotIn}
        className="absolute -right-0.5 top-1/2 size-[5px] -translate-y-1/2 rounded-full bg-primary"
      />
    </span>
  )
}

/* ── Dirección A: pares conectados problema → costo ─────────── */
function DireccionA({ costoTone }: { costoTone: 'primary' | 'ink' }) {
  const costoClass =
    costoTone === 'primary'
      ? 'font-sans text-[15px] font-normal leading-relaxed text-primary'
      : 'font-sans text-[15px] font-medium leading-relaxed text-ink'

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <SectionHeadline />

        {/* Cabecera de columnas — una sola vez, no por fila */}
        <div className="mb-2 hidden md:grid md:grid-cols-[2.5rem_1fr_88px_1fr] md:gap-x-6">
          <span />
          <span className="eyebrow text-muted">Qué pasa hoy</span>
          <span />
          <span className="eyebrow text-muted">Qué cuesta</span>
        </div>

        {PARES.map((par, i) => (
          <m.div
            key={i}
            variants={rowStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="grid gap-x-6 gap-y-2 border-t border-border py-7 md:grid-cols-[2.5rem_1fr_88px_1fr] md:items-center"
          >
            <m.span
              variants={fadeUp}
              className="font-mono text-[11px] font-medium text-muted"
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, '0')}
            </m.span>
            <m.p
              variants={fadeUp}
              className="font-sans text-[15px] font-light leading-relaxed text-ink"
            >
              {par.problema}
            </m.p>
            <Connector />
            {/* Conector vertical en mobile */}
            <m.span
              variants={drawLineY}
              className="h-4 w-px origin-top bg-primary/50 md:hidden"
              aria-hidden="true"
            />
            <m.p variants={fadeUp} className={costoClass}>
              {par.costo}
            </m.p>
          </m.div>
        ))}
      </div>
    </section>
  )
}

/* ── Dirección B: editorial compacta de una columna ─────────── */
function DireccionB() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[900px] px-6 md:px-10">
        <SectionHeadline />

        <m.div
          variants={rowStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {PARES.map((par, i) => (
            <m.div
              key={i}
              variants={fadeUp}
              className="grid gap-x-8 gap-y-3 border-t border-border py-8 md:grid-cols-[110px_1fr] md:items-start"
            >
              <span
                className="select-none font-editorial leading-none text-[#E5E7EB]"
                style={{ fontSize: 'clamp(44px, 6vw, 76px)' }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="type-h4 font-editorial font-normal text-ink text-wrap-balance">
                  {par.problema}
                </p>
                <p className="mt-3 flex items-start gap-2 font-sans text-[14px] font-light leading-relaxed text-muted">
                  <span className="mt-[9px] h-px w-4 shrink-0 bg-primary/60" aria-hidden="true" />
                  {par.costo}
                </p>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  )
}

/* ── Página de preview ──────────────────────────────────────── */
function PreviewLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-y border-white/10 bg-[#0A0A0A] px-6 py-3 md:px-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
        {children}
      </p>
    </div>
  )
}

export default function ProblemaPreview() {
  return (
    <main className="bg-white pt-16">
      <div className="bg-[#0A0A0A] px-6 py-10 md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
          Preview temporal — se borra al elegir dirección
        </p>
        <p className="mt-4 max-w-2xl font-sans text-sm font-light leading-relaxed text-white/80">
          Opciones de headline (las maquetas usan la 1): 1) “Hoy todo se
          sostiene <em className="accent">a pulmón</em>.” · 2) “La operación
          avanza porque alguien la <em className="accent">empuja</em>.” · 3)
          “Coordinar sigue siendo un trabajo{' '}
          <em className="accent">manual</em>.”
        </p>
      </div>

      <PreviewLabel>Dirección A · pares conectados — costo en tinta (recomendada)</PreviewLabel>
      <DireccionA costoTone="ink" />

      <PreviewLabel>Dirección A · variante — costo en azul</PreviewLabel>
      <DireccionA costoTone="primary" />

      <PreviewLabel>Dirección B · editorial compacta de una columna</PreviewLabel>
      <DireccionB />
    </main>
  )
}
