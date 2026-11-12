import { MOCKUPS } from '@/content'
import { keepCodesTogether } from '@/lib/text'
import type { ChatMessage } from '@/content'

/**
 * Piezas base de las vistas de producto. Reconstruyen el lenguaje de Suplai
 * Control (superficie blanca, borde de 1 px, esquinas redondeadas, sombra
 * mínima) con los tokens de la landing. Son ilustraciones: el panel se
 * expone como una imagen con su descripción y el contenido queda oculto
 * para lectores de pantalla.
 */

interface MockupPanelProps {
  /** Descripción de la vista para lectores de pantalla. */
  label: string
  className?: string
  children: React.ReactNode
}

export default function MockupPanel({ label, className = '', children }: MockupPanelProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`overflow-hidden rounded-xl border border-line bg-white text-left font-sans text-ink shadow-sm ${className}`}
    >
      <div aria-hidden="true">{children}</div>
    </div>
  )
}

/** Burbuja de conversación: el contacto a la izquierda, el agente a la derecha. */
export function Bubble({ message, author }: { message: ChatMessage; author?: string }) {
  const isContact = message.from === 'contact'
  return (
    <div className={`flex flex-col gap-1 ${isContact ? 'items-start' : 'items-end'}`}>
      {author && (
        <span className="px-1 text-[10px] font-semibold tracking-wide text-ink-muted uppercase">{author}</span>
      )}
      <div
        className={`max-w-[86%] rounded-xl border border-line px-3 py-2 text-xs leading-[1.45] ${
          isContact ? 'rounded-tl-sm bg-white' : 'rounded-tr-sm bg-paper'
        }`}
      >
        <p>{keepCodesTogether(message.text)}</p>
        <span className="mt-0.5 block text-right text-[10px] text-ink-muted tabular-nums">{message.time}</span>
      </div>
    </div>
  )
}

/** Conversación completa, con la etiqueta de quién habla al cambiar de emisor. */
export function Thread({ messages, contact }: { messages: ChatMessage[]; contact: string }) {
  return (
    <div className="flex flex-col gap-2">
      {messages.map((message, i) => {
        const isNewSpeaker = messages[i - 1]?.from !== message.from
        const author = message.from === 'contact' ? contact : MOCKUPS.agentLabel
        return <Bubble key={message.text} message={message} author={isNewSpeaker ? author : undefined} />
      })}
    </div>
  )
}
