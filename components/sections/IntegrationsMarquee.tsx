import { BrandLogo, LOGO_REGISTRY } from '@/components/logos'
import type { LogoKey } from '@/components/logos'

/**
 * Banda de integraciones: río de logos en loop infinito (estilo Arkimedes).
 * CSS puro → Server Component, cero JS. Refuerza "se conecta con lo que ya usás"
 * como transición antes de que el hub lo explique en detalle.
 *
 * Decorativo (aria-hidden): los nombres de integración ya viven en el copy de
 * Solución; acá sólo aportan textura visual.
 */

const ORDER: LogoKey[] = [
  'tms',
  'whatsapp',
  'excel',
  'erp',
  'sheets',
  'wms',
  'gmail',
  'crm',
  'voz',
  'outlook',
  'web',
  'db',
]

function MarqueeItem({ name }: { name: LogoKey }) {
  return (
    <li className="flex shrink-0 items-center gap-2.5 px-7">
      <BrandLogo name={name} size={22} decorative className="text-ink/55" />
      <span className="whitespace-nowrap font-mono text-[12px] tracking-wide text-muted">
        {LOGO_REGISTRY[name].label}
      </span>
    </li>
  )
}

export default function IntegrationsMarquee() {
  return (
    <section aria-hidden="true" className="border-y border-border bg-white py-7">
      <div
        className="group relative overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
        }}
      >
        <ul className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {/* Copia original */}
          {ORDER.map((name) => (
            <MarqueeItem key={`a-${name}`} name={name} />
          ))}
          {/* Copia duplicada para el loop sin costura */}
          {ORDER.map((name) => (
            <MarqueeItem key={`b-${name}`} name={name} />
          ))}
        </ul>
      </div>
    </section>
  )
}
