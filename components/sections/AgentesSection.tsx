'use client'

import { m } from 'framer-motion'
import { AGENTES, CONTACT_EMAIL } from '@/content'
import { EASE, fadeUp, stagger, revealOnce } from '@/lib/motion'
import AgentVignette from '@/components/agents/AgentVignette'

type Agent = (typeof AGENTES.agents)[number]

function AgentCard({ agent }: { agent: Agent }) {
  return (
    <m.article
      variants={fadeUp}
      whileHover={{
        y: -3,
        borderColor: 'rgba(255,255,255,0.18)',
        transition: { duration: 0.22, ease: EASE },
      }}
      className="flex flex-col rounded-xl border border-white/8 bg-white/[0.04] p-6 gap-5 transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="eyebrow text-white/65">
          {agent.category}
        </p>
        {agent.live && (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-primary/40 bg-primary/15 px-2.5 py-1 font-sans text-[10px] font-medium text-white/80">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
            {AGENTES.badge}
          </span>
        )}
      </div>

      <AgentVignette agentKey={agent.key} />

      <h3
        className="font-editorial font-normal text-white text-wrap-balance"
        style={{
          fontSize: 'clamp(17px, 1.7vw, 21px)',
          lineHeight: 1.22,
          letterSpacing: '-0.014em',
        }}
      >
        {agent.title}
      </h3>

      <p className="font-sans text-[13px] font-light leading-relaxed text-white/65 flex-1">
        {agent.desc}
      </p>

      {agent.results.length > 0 && (
        <ul className="flex flex-col gap-2 pt-1 border-t border-white/8">
          {agent.results.map((r, i) => (
            <li key={i} className="flex items-center gap-2 font-sans text-[12px] text-white/65">
              <span className="h-px w-3 bg-primary/60 shrink-0" aria-hidden="true" />
              {r}
            </li>
          ))}
        </ul>
      )}
    </m.article>
  )
}

/** Título del slot: si trae pregunta+respuesta ("¿…? …"), la respuesta va en
 *  itálica azul de firma. Robusto: sin "?", se renderiza entero sin accent. */
function SlotTitle({ title }: { title: string }) {
  const idx = title.indexOf('?')
  if (idx === -1 || idx === title.length - 1) return <>{title}</>
  return (
    <>
      {title.slice(0, idx + 1)}{' '}
      <em className="accent">{title.slice(idx + 1).trim()}</em>
    </>
  )
}

/** Slot vacío: borde punteado + ícono "+" — se lee como "el próximo lugar de
 *  la grilla es tuyo". La expandibilidad como remate, no como oferta principal. */
function ExpansionCard() {
  const { expansion } = AGENTES
  return (
    <m.div
      variants={fadeUp}
      whileHover={{
        y: -3,
        borderColor: 'rgba(37,99,235,0.5)',
        transition: { duration: 0.22, ease: EASE },
      }}
      className="flex flex-col rounded-xl border border-dashed border-white/18 bg-transparent p-6 gap-5 transition-colors"
    >
      <span
        className="flex size-7 items-center justify-center rounded-full border border-dashed border-white/25 text-white/45"
        aria-hidden="true"
      >
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M6 1v10M1 6h10" />
        </svg>
      </span>

      <h3
        className="font-editorial font-normal text-white/85 text-wrap-balance"
        style={{
          fontSize: 'clamp(17px, 1.7vw, 21px)',
          lineHeight: 1.22,
          letterSpacing: '-0.014em',
        }}
      >
        <SlotTitle title={expansion.title} />
      </h3>

      <p className="font-sans text-[13px] font-light leading-relaxed text-white/55 flex-1">
        {expansion.desc}
      </p>

      <m.a
        href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(AGENTES.expansion.mailSubject)}`}
        whileHover={{ x: 3, transition: { duration: 0.18 } }}
        className="inline-flex items-center gap-2 font-sans text-[12px] font-medium text-primary hover:text-primary/80 transition-colors mt-auto"
      >
        {expansion.cta}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <path d="M2 6h8M6 2l4 4-4 4" />
        </svg>
      </m.a>
    </m.div>
  )
}

export default function AgentesSection() {
  return (
    <section id="agentes" className="bg-[#0A0A0A]" style={{ paddingBlock: 'var(--section-py)' }}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">

        {/* Cabecera */}
        <m.div {...revealOnce} className="mb-14 max-w-2xl">
          <h2 className="type-h2 font-editorial font-normal text-white text-wrap-balance">
            {AGENTES.headline}{' '}
            <em className="accent">{AGENTES.accent}</em>
          </h2>
          <p
            className="mt-4 font-sans font-light leading-relaxed text-white/65"
            style={{ fontSize: 'clamp(14px, 1.4vw, 16px)' }}
          >
            {AGENTES.subtitle}
          </p>

        </m.div>

        {/* Grid */}
        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {AGENTES.agents.map((agent) => (
            <AgentCard key={agent.key} agent={agent} />
          ))}
          <ExpansionCard />
        </m.div>

      </div>
    </section>
  )
}
