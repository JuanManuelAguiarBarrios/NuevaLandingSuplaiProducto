/**
 * components/logos/registry.tsx
 * Fuente única de verdad: key de integración → { etiqueta, tipo, componente }.
 * `brand` = logo oficial full-color · `category` = glyph monocromo (currentColor).
 */

import type { ComponentType } from 'react'
import type { LogoProps } from './types'
import { WhatsAppLogo } from './WhatsAppLogo'
import { ExcelLogo } from './ExcelLogo'
import { SheetsLogo } from './SheetsLogo'
import { GmailLogo } from './GmailLogo'
import { OutlookLogo } from './OutlookLogo'
import { CategoryGlyph } from './CategoryGlyph'
import type { CategoryName } from './CategoryGlyph'

export type LogoKind = 'brand' | 'category'

export type LogoEntry = {
  label: string
  kind: LogoKind
  Component: ComponentType<LogoProps>
}

/** Adaptador: fija el `name` de un glyph de categoría para cumplir LogoProps. */
function category(name: CategoryName, label: string): LogoEntry {
  function Glyph(props: LogoProps) {
    return <CategoryGlyph {...props} name={name} />
  }
  Glyph.displayName = `CategoryGlyph(${name})`
  return { label, kind: 'category', Component: Glyph }
}

export const LOGO_REGISTRY = {
  whatsapp: { label: 'WhatsApp', kind: 'brand', Component: WhatsAppLogo },
  excel: { label: 'Microsoft Excel', kind: 'brand', Component: ExcelLogo },
  sheets: { label: 'Google Sheets', kind: 'brand', Component: SheetsLogo },
  gmail: { label: 'Gmail', kind: 'brand', Component: GmailLogo },
  outlook: { label: 'Microsoft Outlook', kind: 'brand', Component: OutlookLogo },
  tms: category('tms', 'TMS'),
  wms: category('wms', 'WMS'),
  erp: category('erp', 'ERP'),
  crm: category('crm', 'CRM'),
  db: category('db', 'Base de datos'),
  voz: category('voz', 'Voz'),
  web: category('web', 'Portal web'),
} satisfies Record<string, LogoEntry>

export type LogoKey = keyof typeof LOGO_REGISTRY
