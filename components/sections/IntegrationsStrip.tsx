'use client'

import { m } from 'framer-motion'
import { BrandLogo } from '@/components/logos'
import type { LogoKey } from '@/components/logos'
import { EASE, DURATION } from '@/lib/motion'

/**
 * Leyenda de integraciones bajo el hub: cada token del copy se muestra con su
 * logo real + etiqueta, con reveal escalonado. Parsea el string de /content
 * (no duplica la lista) → si el copy cambia, esto se adapta.
 */

const TOKEN_LOGOS: Record<string, LogoKey[]> = {
  TMS: ['tms'],
  WMS: ['wms'],
  ERP: ['erp'],
  WhatsApp: ['whatsapp'],
  Llamadas: ['voz'],
  'Excel / Sheets': ['excel', 'sheets'],
  CRM: ['crm'],
}

const tokenVariant = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.fast, ease: EASE } },
}

export default function IntegrationsStrip({ text }: { text: string }) {
  const tokens = text
    .split('·')
    .map((t) => t.trim())
    .filter(Boolean)

  return (
    <m.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
      className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5"
    >
      {tokens.map((token) => {
        const logos = TOKEN_LOGOS[token]
        return (
          <m.span
            key={token}
            variants={tokenVariant}
            className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wide text-muted"
          >
            {logos?.map((key) => (
              <BrandLogo key={key} name={key} size={15} className="text-ink/50" decorative />
            ))}
            <span>{token}</span>
          </m.span>
        )
      })}
    </m.div>
  )
}
