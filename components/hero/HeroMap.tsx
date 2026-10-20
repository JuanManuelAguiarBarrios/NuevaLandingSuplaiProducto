import type { Ref } from 'react'
import type { PinKey } from '@/content'
import { CONTEXT_PATHS, COUNTRY_PATHS, MAP_PINS, MAP_VIEWBOX } from './coneSur'

/**
 * Mapa minimalista del Cono Sur con un punto por país. Uruguay (sede) va
 * resaltado y es el punto hacia donde hace zoom el hero.
 */

interface HeroMapProps {
  labels: { pin: PinKey; name: string; note?: string }[]
  sedeRef?: Ref<SVGCircleElement>
}

const LABEL_OFFSET: Record<PinKey, { dx: number; anchor: 'start' | 'end' }> = {
  uruguay: { dx: 30, anchor: 'start' },
  argentina: { dx: 14, anchor: 'start' },
  chile: { dx: -14, anchor: 'end' },
  paraguay: { dx: 14, anchor: 'start' },
}

export default function HeroMap({ labels, sedeRef }: HeroMapProps) {
  return (
    <svg
      viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
      className="h-full w-full overflow-visible"
      role="img"
      aria-label="Mapa del Cono Sur con Uruguay, Argentina, Chile y Paraguay marcados"
    >
      <g className="fill-none stroke-line-inverse" strokeWidth={1}>
        {CONTEXT_PATHS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>

      <g strokeWidth={1.2} strokeLinejoin="round">
        <path d={COUNTRY_PATHS.argentina} className="fill-night-raised stroke-caption/50" />
        <path d={COUNTRY_PATHS.chile} className="fill-night-raised stroke-caption/50" />
        <path d={COUNTRY_PATHS.paraguay} className="fill-night-raised stroke-caption/50" />
        <path d={COUNTRY_PATHS.uruguay} className="fill-accent-inverse/20 stroke-accent-inverse" />
      </g>

      {labels.map(({ pin, name, note }) => {
        const { x, y } = MAP_PINS[pin]
        const { dx, anchor } = LABEL_OFFSET[pin]
        const isSede = pin === 'uruguay'
        return (
          <g key={pin}>
            <circle cx={x} cy={y} r={isSede ? 5 : 3.5} className="pin-pulse fill-accent-inverse/50" />
            <circle
              ref={isSede ? sedeRef : undefined}
              cx={x}
              cy={y}
              r={isSede ? 5 : 3.5}
              className={isSede ? 'fill-accent-inverse' : 'fill-ink-inverse'}
            />
            <text
              x={x + dx}
              y={y - 2}
              textAnchor={anchor}
              className="fill-ink-inverse font-sans text-[14px] font-medium"
            >
              {name}
            </text>
            {note && (
              <text
                x={x + dx}
                y={y + 14}
                textAnchor={anchor}
                className="fill-caption font-sans text-[10px] uppercase tracking-[0.2em]"
              >
                {note}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
