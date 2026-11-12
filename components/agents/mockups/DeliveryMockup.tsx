import MockupPanel, { Bubble } from '@/components/product/MockupPanel'
import StatusPill from '@/components/product/StatusPill'
import { CheckIcon, PackageIcon, PinIcon, TruckIcon } from '@/components/product/icons'
import { MOCKUPS } from '@/content'

/** Agente 03: el chofer avisa por WhatsApp y el pedido queda confirmado, como la tarjeta de pedido de Control. */
export default function DeliveryMockup({ className }: { className?: string }) {
  const delivery = MOCKUPS.conductores
  return (
    <MockupPanel label={delivery.label} className={className}>
      <div className="px-3 py-3">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 font-mono text-xs font-semibold">
            <PackageIcon className="size-3.5 text-ink-muted" />
            {delivery.order}
          </span>
          <StatusPill state={delivery.state} />
        </div>
        <p className="mt-2.5 flex items-center gap-1.5 text-xs">
          <PinIcon className="size-3.5 text-ink-muted" />
          {delivery.destination}
        </p>
        <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-ink-muted">
          <TruckIcon className="size-3.5" />
          {delivery.driver}
        </p>
        <p className="mt-3 flex items-center gap-2 border-t border-line pt-2.5 text-[11px]">
          <span className="text-ink-muted line-through">{delivery.stageFrom}</span>
          <span className="text-ink-muted">→</span>
          <span className="font-medium">{delivery.stageTo}</span>
          <span className="ml-auto text-[10px] text-ink-muted">{delivery.updated}</span>
        </p>
      </div>
      <div className="border-t border-line bg-paper/50 px-3 py-3">
        <Bubble message={delivery.message} author={delivery.driver} />
        <p className="mt-2.5 flex items-center justify-end gap-1.5 text-[11px] font-medium">
          <CheckIcon className="size-3.5 text-state-resolved" />
          {delivery.confirmation}
        </p>
      </div>
    </MockupPanel>
  )
}
