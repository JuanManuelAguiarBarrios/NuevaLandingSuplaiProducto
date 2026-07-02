import { LOGO_REGISTRY } from './registry'
import type { LogoKey } from './registry'

type Props = {
  name: LogoKey
  /** Lado en px. Default 24. */
  size?: number
  className?: string
  /** Sobreescribe la etiqueta accesible (default: nombre de la marca/categoría). */
  title?: string
  /** Si es decorativo dentro de un contexto ya etiquetado, ocultá del a11y tree. */
  decorative?: boolean
}

/**
 * Punto de entrada único para renderizar un logo de integración por key.
 * El SVG interno es aria-hidden; este wrapper aporta la etiqueta accesible.
 */
export function BrandLogo({ name, size = 24, className, title, decorative }: Props) {
  const entry = LOGO_REGISTRY[name]
  const { Component } = entry

  return (
    <span
      className={className}
      style={{ display: 'inline-flex', lineHeight: 0 }}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : (title ?? entry.label)}
      aria-hidden={decorative ? true : undefined}
    >
      <Component size={size} />
    </span>
  )
}
