import MockupPanel from '@/components/product/MockupPanel'
import StatusPill from '@/components/product/StatusPill'
import { MailIcon } from '@/components/product/icons'
import { MOCKUPS } from '@/content'

/** Agente 06: facturas que llegan por mail y quedan cargadas, como en Facturas procesadas de Control. */
export default function InvoiceMockup({ className }: { className?: string }) {
  const invoices = MOCKUPS.documentos
  return (
    <MockupPanel label={invoices.label} className={className}>
      <header className="flex items-center justify-between gap-3 border-b border-line px-3 py-2.5">
        <p className="text-xs font-semibold">{invoices.title}</p>
        <p className="flex items-center gap-1.5 text-[10px] text-ink-muted">
          <MailIcon className="size-3" />
          {invoices.source}
        </p>
      </header>
      <ul className="divide-y divide-line">
        {invoices.rows.map((row) => (
          <li key={row.title} className="px-3 py-2.5">
            <p className="text-xs font-medium">{row.title}</p>
            <div className="mt-1 flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
              <p className="text-[10px] text-ink-muted">{row.detail}</p>
              <StatusPill state={row.state} label={row.status} />
            </div>
          </li>
        ))}
      </ul>
    </MockupPanel>
  )
}
