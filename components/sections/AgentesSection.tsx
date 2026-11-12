'use client'

import { m } from 'framer-motion'
import AgentVignette from '@/components/agents/AgentVignette'
import LineReveal from '@/components/LineReveal'
import { AGENTES, agentWhatsappUrl, DEMO_URL } from '@/content'
import type { Agent } from '@/content'
import { fadeUp, stagger } from '@/lib/motion'

/**
 * Agentes: cards numeradas en una grilla de 1, 2 y 3 columnas. La última,
 * el agente a medida, cierra la grilla a todo el ancho. Sin pin
 * ni scroll horizontal: la sección se recorre con el scroll normal de la
 * página, para llegar rápido a Industrias.
 */

const TOTAL = String(AGENTES.items.length).padStart(2, '0')

const isCustom = (agent: Agent) => agent.key === 'custom'

function AgentCard({ agent }: { agent: Agent }) {
  const isWide = isCustom(agent)
  return (
    <article
      id={`agente-${agent.key}`}
      className={`flex h-full scroll-mt-24 flex-col ${isWide ? 'sm:flex-row sm:items-center sm:gap-8 lg:gap-12' : ''}`}
    >
      <div
        className={`flex items-center justify-center border border-line-inverse bg-night-raised p-5 sm:p-6 ${
          isWide ? 'min-h-48 sm:h-56 sm:w-1/3 sm:shrink-0' : 'min-h-80 sm:h-[27rem]'
        }`}
      >
        <div className="w-full max-w-[19rem]">
          <AgentVignette agentKey={agent.key} />
        </div>
      </div>

      <div className={`flex flex-1 flex-col ${isWide ? 'mt-6 sm:mt-0' : 'mt-6'}`}>
        <p aria-hidden="true" className="text-xs text-caption tabular-nums">
          {agent.n} de {TOTAL}
        </p>
        <h3 className="mt-3 text-h3 font-headline text-ink-inverse">{agent.name}</h3>
        <div className="mt-4 flex flex-1 flex-col items-start justify-between">
          <ul className="space-y-2 text-ink-inverse-muted">
            {agent.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <a
            href={agentWhatsappUrl(agent)}
            target="_blank"
            rel="noopener noreferrer"
            className="link-line mt-6 inline-block text-sm font-medium text-ink-inverse"
          >
            {agent.link} <span aria-hidden="true">→</span>
            <span className="sr-only"> sobre {agent.name}</span>
          </a>
        </div>
      </div>
    </article>
  )
}

export default function AgentesSection() {
  return (
    <section
      id="agentes"
      data-tone="dark"
      aria-labelledby="agentes-title"
      className="bg-night px-5 py-24 text-ink-inverse sm:px-8 lg:px-12 lg:py-36"
    >
      <header className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow text-caption">{AGENTES.eyebrow}</p>
          <div id="agentes-title">
            <LineReveal
              text={AGENTES.headline.text}
              lowFrom={AGENTES.headline.lowFrom}
              className="mt-5 text-h1 font-headline"
            />
          </div>
        </div>
        <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
          <p className="text-ink-inverse-muted">{AGENTES.subtitle}</p>
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="link-line mt-5 inline-block text-sm font-medium"
          >
            {AGENTES.allLink} <span aria-hidden="true">→</span>
          </a>
        </div>
      </header>

      <m.ul
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3"
      >
        {AGENTES.items.map((agent) => (
          <m.li key={agent.key} variants={fadeUp} className={isCustom(agent) ? 'sm:col-span-2 lg:col-span-3' : undefined}>
            <AgentCard agent={agent} />
          </m.li>
        ))}
      </m.ul>
    </section>
  )
}
