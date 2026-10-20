'use client'

import { useEffect, useRef, useState } from 'react'
import { m, useScroll } from 'framer-motion'
import AgentVignette from '@/components/agents/AgentVignette'
import LineReveal from '@/components/LineReveal'
import { AGENTES, DEMO_URL } from '@/content'
import type { Agent } from '@/content'
import { fadeUp, stagger } from '@/lib/motion'
import { useScrollMotion, useScrollRange } from '@/lib/useScrollMotion'

/**
 * Agentes: 6 cards numeradas. En desktop la sección queda fija y el scroll
 * vertical desplaza la pista en horizontal, con una barra de progreso
 * abajo. En mobile / reduced-motion las cards se apilan.
 */

function AgentCard({ agent }: { agent: Agent }) {
  return (
    <article className="flex w-full max-w-[860px] shrink-0 flex-col group-data-[motion=on]/agentes:w-[min(52vw,820px)]">
      <div className="relative aspect-[16/9] overflow-hidden border border-line-inverse bg-night-raised group-data-[motion=on]/agentes:aspect-auto group-data-[motion=on]/agentes:h-[32svh]">
        <span
          aria-hidden="true"
          className="absolute top-5 left-6 font-sans text-[clamp(4rem,8vw,7.5rem)] leading-none font-light tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_var(--color-caption)]"
        >
          {agent.n}
        </span>
        <div className="absolute right-[8%] bottom-[14%] w-[44%]">
          <AgentVignette agentKey={agent.key} />
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 sm:gap-8">
        <h3 className="text-h3 font-semibold text-ink-inverse">{agent.name}</h3>
        <div>
          <ul className="space-y-2 text-ink-inverse-muted">
            {agent.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <a
            href={DEMO_URL}
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
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const isScrollMotion = useScrollMotion()
  const [distance, setDistance] = useState(0)

  const { scrollYProgress: p } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useScrollRange(p, [0, 1], [0, -distance])
  const progress = useScrollRange(p, [0, 1], [0, 1])

  // Distancia horizontal a recorrer = ancho de la pista − ancho visible.
  useEffect(() => {
    if (!isScrollMotion) return
    const track = trackRef.current
    if (!track) return
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(track)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [isScrollMotion])

  const pinnedHeight = isScrollMotion ? { height: `calc(100svh + ${distance}px)` } : undefined

  return (
    <section
      ref={sectionRef}
      id="agentes"
      data-tone="dark"
      aria-labelledby="agentes-title"
      data-motion={isScrollMotion ? 'on' : 'off'}
      style={pinnedHeight}
      className="group/agentes relative bg-night text-ink-inverse"
    >
      <div className="group-data-[motion=on]/agentes:sticky group-data-[motion=on]/agentes:top-0 group-data-[motion=on]/agentes:flex group-data-[motion=on]/agentes:h-svh group-data-[motion=on]/agentes:flex-col group-data-[motion=on]/agentes:justify-between group-data-[motion=on]/agentes:overflow-hidden">
        <header className="grid gap-8 px-5 pt-24 sm:px-8 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-caption">{AGENTES.eyebrow}</p>
            <div id="agentes-title">
              <LineReveal
                text={AGENTES.headline.text}
                accent={AGENTES.headline.accent}
                className="mt-5 text-h1 font-semibold"
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

        <m.div
          ref={trackRef}
          style={isScrollMotion ? { x } : undefined}
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-16 flex flex-col gap-16 px-5 pb-24 sm:px-8 lg:px-12 group-data-[motion=on]/agentes:mt-10 group-data-[motion=on]/agentes:w-max group-data-[motion=on]/agentes:flex-row group-data-[motion=on]/agentes:gap-10 group-data-[motion=on]/agentes:pb-10"
        >
          {AGENTES.items.map((agent) => (
            <m.div key={agent.key} variants={fadeUp}>
              <AgentCard agent={agent} />
            </m.div>
          ))}
        </m.div>

        <div className="hidden px-12 pb-8 group-data-[motion=on]/agentes:block" aria-hidden="true">
          <div className="h-px bg-line-inverse">
            <m.div style={{ scaleX: progress }} className="h-px origin-left bg-accent-inverse" />
          </div>
        </div>
      </div>
    </section>
  )
}
