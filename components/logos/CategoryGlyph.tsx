import type { LogoProps } from './types'

/**
 * Glyphs monocromos para las categorías de sistema que NO son una marca
 * (TMS, WMS, ERP, CRM, DB, Voz, Web). Heredan `currentColor` — nada de
 * inventar logos de terceros. Lenguaje de línea coherente con el resto del sitio.
 */

export type CategoryName =
  | 'tms'
  | 'wms'
  | 'erp'
  | 'crm'
  | 'db'
  | 'voz'
  | 'web'

type Props = LogoProps & { name: CategoryName }

const PATHS: Record<CategoryName, React.ReactNode> = {
  // Transporte — ruta con nodos
  tms: (
    <>
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="18" r="2" />
      <path d="M5 8v4a4 4 0 0 0 4 4h4a4 4 0 0 1 4 4" />
    </>
  ),
  // Depósito — nave con estanterías
  wms: (
    <>
      <path d="M3 10l9-6 9 6v10H3V10z" />
      <path d="M8 20v-6h8v6" />
      <path d="M8 17h8" />
    </>
  ),
  // ERP — capas apiladas
  erp: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </>
  ),
  // CRM — personas
  crm: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M16 6.5a3 3 0 0 1 0 6" />
      <path d="M18 20a6 6 0 0 0-3-5.2" />
    </>
  ),
  // Base de datos — cilindro
  db: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v12c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
      <path d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" />
    </>
  ),
  // Voz — waveform
  voz: (
    <>
      <path d="M4 12v0" />
      <path d="M7 9v6" />
      <path d="M10 6v12" />
      <path d="M13 8v8" />
      <path d="M16 5v14" />
      <path d="M19 10v4" />
    </>
  ),
  // Web / portal — globo
  web: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </>
  ),
}

export function CategoryGlyph({ name, size = 24, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
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
