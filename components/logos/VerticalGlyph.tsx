import type { LogoProps } from './types'

/**
 * Glyphs monocromos para los rubros/verticales de "Empresas" (logística,
 * distribuidoras, importadoras, etc.). Mismo lenguaje de línea que
 * CategoryGlyph, pero para rubros de industria en vez de categorías de
 * sistema — viven separados para no mezclar los dos vocabularios.
 */

export type VerticalName =
  | 'truck'
  | 'package'
  | 'ship'
  | 'anchor'
  | 'route'
  | 'warehouse'

type Props = LogoProps & { name: VerticalName }

const PATHS: Record<VerticalName, React.ReactNode> = {
  truck: (
    <>
      <rect x="1" y="4" width="11" height="9" rx="1" />
      <path d="M12 7h4l2 3v3h-6V7z" />
      <circle cx="4.5" cy="15" r="1.5" />
      <circle cx="15.5" cy="15" r="1.5" />
    </>
  ),
  package: (
    <>
      <path d="M10 2L2 6v8l8 4 8-4V6l-8-4z" />
      <path d="M2 6l8 4 8-4" />
      <path d="M10 10v8" />
    </>
  ),
  ship: (
    <>
      <path d="M3 11l7 5 7-5" />
      <path d="M5 8h10l-1 5H6L5 8z" />
      <path d="M10 2v6" />
      <path d="M8 4h4" />
      <path d="M1 17s3 2 9 2 9-2 9-2" />
    </>
  ),
  anchor: (
    <>
      <circle cx="10" cy="5" r="2" />
      <path d="M10 7v11" />
      <path d="M5 9.5H3a7 7 0 0014 0h-2" />
    </>
  ),
  route: (
    <>
      <circle cx="4" cy="5" r="2" />
      <circle cx="16" cy="15" r="2" />
      <path d="M4 7v3a4 4 0 004 4h4a4 4 0 014 4" />
    </>
  ),
  warehouse: (
    <>
      <path d="M2 9l8-6 8 6v9H2V9z" />
      <path d="M7 18v-5h6v5" />
    </>
  ),
}

export function VerticalGlyph({ name, size = 18, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  )
}
