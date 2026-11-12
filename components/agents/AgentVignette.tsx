import AgendaMockup from '@/components/agents/mockups/AgendaMockup'
import CallMockup from '@/components/agents/mockups/CallMockup'
import ChatMockup from '@/components/agents/mockups/ChatMockup'
import DeliveryMockup from '@/components/agents/mockups/DeliveryMockup'
import IncidentMockup from '@/components/agents/mockups/IncidentMockup'
import InvoiceMockup from '@/components/agents/mockups/InvoiceMockup'
import type { AgentKey } from '@/content'

/**
 * Vista de cada agente en su card: mockups de producto fieles a Suplai
 * Control para los seis agentes de la lista. El agente a medida no tiene
 * pantalla propia y conserva una viñeta de línea.
 */

const BASE_STROKE = 'stroke-ink-inverse/30'
const ACCENT_STROKE = 'stroke-ink-inverse'

/** A medida: módulos existentes y uno nuevo que se suma. */
function CustomVignette() {
  return (
    <svg viewBox="0 0 96 44" fill="none" aria-hidden="true" className="mx-auto h-auto w-40">
      <rect x="4" y="12" width="20" height="20" rx="3" strokeWidth="1" className={BASE_STROKE} />
      <rect x="30" y="12" width="20" height="20" rx="3" strokeWidth="1" className={BASE_STROKE} />
      <path d="M50 22h10" strokeWidth="1" strokeDasharray="2 3" className={BASE_STROKE} />
      <rect x="62" y="8" width="28" height="28" rx="3" strokeWidth="1" strokeDasharray="3 3" className={ACCENT_STROKE} />
      <path d="M76 16v12M70 22h12" strokeWidth="1" strokeLinecap="round" className={ACCENT_STROKE} />
    </svg>
  )
}

const VIEWS: Record<AgentKey, (props: { className?: string }) => React.ReactNode> = {
  whatsapp: ChatMockup,
  voice: CallMockup,
  conductores: DeliveryMockup,
  agenda: AgendaMockup,
  incidencias: IncidentMockup,
  documentos: InvoiceMockup,
  custom: CustomVignette,
}

export default function AgentVignette({ agentKey }: { agentKey: AgentKey }) {
  const View = VIEWS[agentKey]
  return <View className="w-full" />
}
