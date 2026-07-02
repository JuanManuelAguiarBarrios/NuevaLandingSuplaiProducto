'use client'

import { m } from 'framer-motion'
import { EMPRESAS } from '@/content'

const ease = [0.16, 1, 0.3, 1] as const

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07 } },
}

const rowVariant = {
  hidden: { opacity: 0, y: 10 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
}

type IconName = (typeof EMPRESAS.items)[number]['icon']

function Icon({ name }: { name: IconName }) {
  const base = {
    width: 18,
    height: 18,
    viewBox: '0 0 20 20',
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  switch (name) {
    case 'truck':
      return (
        <svg {...base}>
          <rect x="1" y="4" width="11" height="9" rx="1" />
          <path d="M12 7h4l2 3v3h-6V7z" />
          <circle cx="4.5" cy="15" r="1.5" />
          <circle cx="15.5" cy="15" r="1.5" />
        </svg>
      )
    case 'package':
      return (
        <svg {...base}>
          <path d="M10 2L2 6v8l8 4 8-4V6l-8-4z" />
          <path d="M2 6l8 4 8-4" />
          <path d="M10 10v8" />
        </svg>
      )
    case 'ship':
      return (
        <svg {...base}>
          <path d="M3 11l7 5 7-5" />
          <path d="M5 8h10l-1 5H6L5 8z" />
          <path d="M10 2v6" />
          <path d="M8 4h4" />
          <path d="M1 17s3 2 9 2 9-2 9-2" />
        </svg>
      )
    case 'anchor':
      return (
        <svg {...base}>
          <circle cx="10" cy="5" r="2" />
          <path d="M10 7v11" />
          <path d="M5 9.5H3a7 7 0 0014 0h-2" />
        </svg>
      )
    case 'route':
      return (
        <svg {...base}>
          <circle cx="4" cy="5" r="2" />
          <circle cx="16" cy="15" r="2" />
          <path d="M4 7v3a4 4 0 004 4h4a4 4 0 014 4" />
        </svg>
      )
    case 'warehouse':
      return (
        <svg {...base}>
          <path d="M2 9l8-6 8 6v9H2V9z" />
          <path d="M7 18v-5h6v5" />
        </svg>
      )
  }
}

type EmpresaItem = (typeof EMPRESAS.items)[number]

function EmpresaRow({ item, index }: { item: EmpresaItem; index: number }) {
  return (
    <m.div
      variants={rowVariant}
      className="group -mx-2 flex cursor-default items-start gap-5 border-b border-white/8 px-2 py-5 transition-colors hover:bg-white/[0.03] sm:items-center"
    >
      {/* Index */}
      <span className="w-5 shrink-0 pt-px font-mono text-[11px] tabular-nums text-white/35 transition-colors group-hover:text-primary sm:pt-0">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Icon */}
      <span className="shrink-0 pt-px text-white/45 transition-colors group-hover:text-white/60 sm:pt-0">
        <Icon name={item.icon} />
      </span>

      {/* Name + descriptor (mobile stacked, desktop split) */}
      <span className="flex min-w-0 flex-1 flex-col sm:flex-row sm:items-center sm:gap-4">
        <span
          className="font-editorial font-normal text-white/80 transition-colors group-hover:text-white sm:flex-1"
          style={{
            fontSize: 'clamp(15px, 1.5vw, 19px)',
            letterSpacing: '-0.012em',
            lineHeight: 1.25,
          }}
        >
          {item.title}
        </span>
        <span className="mt-1 font-sans text-[12px] font-light leading-relaxed text-white/55 sm:mt-0 sm:max-w-[46%] sm:text-right">
          {item.desc}
        </span>
      </span>
    </m.div>
  )
}

export default function EmpresasSection() {
  return (
    <section id="empresas" className="bg-[#0A0A0A] py-28 md:py-36">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease }}
          className="mb-12 max-w-xl"
        >
          <h2
            className="font-editorial font-normal text-white text-wrap-balance"
            style={{
              fontSize: 'clamp(28px, 3.6vw, 52px)',
              lineHeight: 1.1,
              letterSpacing: '-0.022em',
            }}
          >
            {EMPRESAS.headline.plain}{' '}
            <em style={{ fontStyle: 'italic', color: '#2563EB' }}>
              {EMPRESAS.headline.accent}
            </em>
          </h2>
          <p
            className="mt-4 font-sans font-light leading-relaxed text-white/65"
            style={{ fontSize: 'clamp(14px, 1.4vw, 16px)' }}
          >
            {EMPRESAS.subtitle}
          </p>
        </m.div>

        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="border-t border-white/8"
        >
          {EMPRESAS.items.map((item, i) => (
            <EmpresaRow key={item.key} item={item} index={i} />
          ))}
        </m.div>

      </div>
    </section>
  )
}
