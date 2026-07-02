'use client'

import { m } from 'framer-motion'
import { AGENTES } from '@/content'
import { ContextualCopy } from '@/components/logos'

const ease = [0.16, 1, 0.3, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
}

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09 } },
}

type Agent = (typeof AGENTES.agents)[number]

function AgentCard({ agent }: { agent: Agent }) {
  return (
    <m.article
      variants={fadeUp}
      whileHover={{
        y: -3,
        borderColor: 'rgba(255,255,255,0.18)',
        transition: { duration: 0.22, ease },
      }}
      className="flex flex-col rounded-xl border border-white/8 bg-white/[0.04] p-6 gap-5 transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-white/65">
          {agent.category}
        </p>
      </div>

      <h3
        className="font-editorial font-normal text-white text-wrap-balance"
        style={{
          fontSize: 'clamp(17px, 1.7vw, 21px)',
          lineHeight: 1.22,
          letterSpacing: '-0.014em',
        }}
      >
        <ContextualCopy text={agent.title} logoSize={18} />
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

function ExpansionCard() {
  const { expansion } = AGENTES
  return (
    <m.div
      variants={fadeUp}
      whileHover={{
        y: -3,
        borderColor: 'rgba(37,99,235,0.4)',
        transition: { duration: 0.22, ease },
      }}
      className="flex flex-col rounded-xl border border-primary/20 bg-primary/[0.07] p-6 gap-5 transition-colors"
    >
      <h3
        className="font-editorial font-normal text-white text-wrap-balance"
        style={{
          fontSize: 'clamp(17px, 1.7vw, 21px)',
          lineHeight: 1.22,
          letterSpacing: '-0.014em',
        }}
      >
        {expansion.title}
      </h3>

      <p className="font-sans text-[13px] font-light leading-relaxed text-white/65 flex-1">
        {expansion.desc}
      </p>

      <m.a
        href="mailto:admin@getsuplai.com?subject=Hablemos%20de%20mi%20operaci%C3%B3n"
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
    <section id="agentes" className="bg-[#0A0A0A] py-28 md:py-36">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">

        {/* Cabecera */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease }}
          className="mb-14 max-w-2xl"
        >
          <h2
            className="font-editorial font-normal text-white text-wrap-balance"
            style={{
              fontSize: 'clamp(28px, 3.6vw, 52px)',
              lineHeight: 1.1,
              letterSpacing: '-0.022em',
            }}
          >
            {AGENTES.headline}{' '}
            <em style={{ fontStyle: 'italic', color: '#2563EB' }}>
              {AGENTES.accent}
            </em>
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
