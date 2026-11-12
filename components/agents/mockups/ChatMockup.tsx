import MockupPanel, { Thread } from '@/components/product/MockupPanel'
import StatusPill, { StateDot } from '@/components/product/StatusPill'
import { MessageIcon } from '@/components/product/icons'
import { MOCKUPS } from '@/content'

/** Agente 01: conversación de WhatsApp atendida por el agente, como en Conversaciones de Control. */
export default function ChatMockup({ className }: { className?: string }) {
  const chat = MOCKUPS.whatsapp
  return (
    <MockupPanel label={chat.label} className={className}>
      <header className="flex items-center gap-2.5 border-b border-line px-3 py-2.5">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-paper text-[10px] font-semibold text-ink-muted">
          {chat.initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold">{chat.contact}</p>
          <p className="flex items-center gap-1.5 text-[10px] text-ink-muted">
            <MessageIcon className="size-3" />
            {chat.channel}
          </p>
          <p className="flex items-center gap-1.5 text-[10px] text-ink-muted">
            <StateDot state="running" />
            {chat.attendedBy}
          </p>
        </div>
        <StatusPill state={chat.state} />
      </header>
      <div className="bg-paper/50 px-3 py-3">
        <Thread messages={chat.messages} contact={chat.contact} />
      </div>
    </MockupPanel>
  )
}
