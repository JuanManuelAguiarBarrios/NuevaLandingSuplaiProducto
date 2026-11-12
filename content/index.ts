/**
 * Copy centralizado de la landing.
 *
 * Reglas:
 *  - Español rioplatense con voseo.
 *  - Nunca: "agéntico", "LLM", "Studio", "Runtime", "flujo".
 *  - Quiebres de línea de titulares autorados con '\n' (nunca medidos en runtime).
 *  - `accent`: la palabra del titular que va en Newsreader itálica.
 *  - Sin dos puntos, guiones, punto y coma ni separadores tipo "·" en el
 *    texto visible. Cada frase se escribe para leerse bien sin ellos.
 *  - Datos sin verificar quedan como placeholder entre corchetes:
 *    [LOGO CLIENTE]. No inventar cifras, logos ni años.
 *  - Las vistas de producto (MOCKUPS, SOLUCION.control) usan los datos
 *    ficticios de la demo (Andarivel Logística, envío AND-1042), nunca
 *    clientes reales. Las horas y los códigos de envío son datos de interfaz
 *    y conservan su formato (10:42, AND-1042).
 */

export const DEMO_URL = 'https://calendly.com/mateo-getsuplai/30min'
export const CONTACT_EMAIL = 'contacto@getsuplai.com'
export const LINKEDIN_URL = 'https://linkedin.com/company/getsuplai'
/** Formato wa.me, sin "+" ni espacios. */
export const WHATSAPP_NUMBER = '59894412389'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

/** Link a WhatsApp con el mensaje ya escrito (wa.me con ?text=). */
export function whatsappUrl(message: string): string {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`
}

export const WHATSAPP = {
  cta: 'Escribinos por WhatsApp',
  /** Texto del botón flotante. En mobile solo se ve el ícono y esto queda como nombre accesible. */
  floatLabel: 'Escribinos por WhatsApp',
  /** Mensaje precargado de los accesos generales (hero y botón flotante). */
  message: 'Hola, quiero saber más sobre los agentes de Suplai.',
  /** Mensaje precargado de cada "Quiero este agente". {agente} se reemplaza por el nombre. */
  agentMessage: 'Hola, me interesa el agente de {agente} para mi operación.',
}

export interface Headline {
  text: string
  accent?: string
}

export interface MediaImage {
  src: string
  alt: string
}

/* ── Navegación ─────────────────────────────── */

export interface MenuItem {
  label: string
  href: string
  image: MediaImage
}

export const NAV = {
  homeLabel: 'Suplai, ir al inicio',
  cta: 'Agendá una demo',
  ctaShort: 'Demo',
  menuOpen: 'Menú',
  menuClose: 'Cerrar',
  items: [
    { label: 'Solución', href: '#solucion', image: { src: '/hero/poster.webp', alt: '' } },
    { label: 'Agentes', href: '#agentes', image: { src: '/empresas/logistica.webp', alt: '' } },
    { label: 'Industrias', href: '#industrias', image: { src: '/empresas/distribuidoras.webp', alt: '' } },
    { label: 'Cómo trabajamos', href: '#como-trabajamos', image: { src: '/empresas/flota.webp', alt: '' } },
    { label: 'Contacto', href: '#contacto', image: { src: '/empresas/portuarias.webp', alt: '' } },
  ] satisfies MenuItem[],
}

/* ── Posicionamiento ────────────────────────── */

/**
 * Una sola propuesta para el hero, el <title>, la description y la imagen
 * Open Graph. Si cambia, cambia acá y en todos lados a la vez.
 */
export const POSITIONING = {
  headline: {
    text: 'Agentes de IA que atienden\nWhatsApp, llamadas y mails,\ny dejan todo cargado\nen tus sistemas.',
    accent: 'sistemas',
  } satisfies Headline,
  support: 'Se conectan a tu TMS, WMS, ERP y planillas. Sin migrar nada.',
  title: 'Suplai, agentes de IA que atienden WhatsApp, llamadas y mails',
  description:
    'Agentes de IA que atienden WhatsApp, llamadas y mails, y dejan todo cargado en tus sistemas. Se conectan a tu TMS, WMS, ERP y planillas. Sin migrar nada.',
}

/* ── Hero ───────────────────────────────────── */

export type PinKey = 'uruguay' | 'argentina' | 'chile' | 'paraguay'

export const HERO = {
  /** Titular principal: la propuesta. Es lo primero que se lee. */
  proposition: POSITIONING.headline,
  /** Línea secundaria sobre el titular: entrada fija y la industria que rota. */
  statement: {
    fixed: 'Para',
    /** Las industrias de la sección Industrias, y al final "tu equipo". */
    rotating: [
      'empresas de logística.',
      'distribuidoras.',
      'importadoras.',
      'empresas portuarias.',
      'flotas propias.',
      'centros de distribución.',
      'tu equipo.',
    ],
    /** Versión completa para lectores de pantalla. */
    label: 'Para empresas de logística, distribuidoras, importadoras, empresas portuarias, flotas propias, centros de distribución y tu equipo.',
  },
  intro: POSITIONING.support,
  countries: [
    { n: '01', name: 'Uruguay', note: 'Sede', pin: 'uruguay' },
    { n: '02', name: 'Argentina', pin: 'argentina' },
    { n: '03', name: 'Chile', pin: 'chile' },
    { n: '04', name: 'Paraguay', pin: 'paraguay' },
  ] satisfies { n: string; name: string; note?: string; pin: PinKey }[],
  scrollHint: 'Desplazá para entrar en la operación',
  /** Titular del segundo acto, sobre el video. */
  headline: { text: 'Mientras tu equipo opera,\nlos agentes responden.', accent: 'responden' },
  subtitle: 'Atienden consultas, confirman entregas y agendan turnos todo el día.',
  ctaPrimary: 'Agendá una demo',
  ctaWhatsapp: WHATSAPP.cta,
  ctaSecondary: { label: 'Ver agentes', href: '#agentes' },
  /** Video del segundo acto y su poster (el primer cuadro del mismo video). */
  video: {
    mp4: '/hero/operacion.mp4',
    poster: '/hero/operacion-poster.webp',
  },
}

/* ── Clientes ───────────────────────────────── */

export interface ClientLogo {
  name: string
  src: string
  /** Ancho / alto del SVG recortado. */
  ratio: number
}

export const CLIENTES = {
  title: 'Ya trabajan con Suplai',
  logos: [
    { name: 'Costa Oriental', src: '/clientes/costa-oriental.svg', ratio: 1376 / 289 },
    { name: 'El Naranjo', src: '/clientes/el-naranjo.svg', ratio: 1500 / 340 },
    { name: 'Fraylog', src: '/clientes/fraylog.svg', ratio: 1500 / 386 },
  ] satisfies ClientLogo[],
}

/** Respaldos institucionales: van aparte de los clientes. */
export const APOYOS = {
  title: 'Apoyados por',
  /** `ratio` = ancho / alto del SVG recortado; `height` iguala el peso visual entre formatos distintos. */
  items: [
    { name: 'ANII', fullName: 'Agencia Nacional de Investigación e Innovación', src: '/apoyos/anii.svg', ratio: 1313 / 722, height: 52 },
    { name: 'ANDE', fullName: 'Agencia Nacional de Desarrollo', src: '/apoyos/ande.svg', ratio: 1384 / 478, height: 44 },
    { name: 'CIE ORT', fullName: 'Centro de Innovación y Emprendimientos de la Universidad ORT', src: '/apoyos/cie-ort.svg', ratio: 1201 / 198, height: 28 },
  ] satisfies { name: string; fullName: string; src: string; ratio: number; height: number }[],
}

/* ── Problema ───────────────────────────────── */

export const PROBLEMA = {
  eyebrow: 'El problema',
  headline: {
    text: 'Tu equipo pasa el día\nrespondiendo lo mismo.',
    accent: 'mismo',
  } satisfies Headline,
  intro: 'Consultas por WhatsApp, llamadas de choferes y datos que alguien pasa a mano de un sistema a otro.',
  labels: { problema: 'Qué pasa hoy', costo: 'Qué cuesta' },
  rows: [
    {
      problema: 'Datos repartidos entre el TMS, planillas, WhatsApp y llamadas',
      costo: 'Errores por información incompleta o desactualizada',
    },
    {
      problema: 'Seguimiento manual de cada envío, uno por uno',
      costo: 'Retrasos y menor nivel de servicio',
    },
    {
      problema: 'Coordinación constante entre equipos y choferes',
      costo: 'Difícil escalar la operación sin sumar más gente',
    },
  ],
}

/* ── Agentes ────────────────────────────────── */

export type AgentKey = 'whatsapp' | 'voice' | 'conductores' | 'agenda' | 'incidencias' | 'documentos' | 'custom'

export interface Agent {
  key: AgentKey
  n: string
  name: string
  bullets: string[]
  link: string
  /** Mensaje de WhatsApp propio. Si falta, se arma con WHATSAPP.agentMessage y el nombre. */
  message?: string
}

/** Link de WhatsApp de un agente, con el mensaje que lo nombra. */
export function agentWhatsappUrl(agent: Agent): string {
  return whatsappUrl(agent.message ?? WHATSAPP.agentMessage.replace('{agente}', agent.name))
}

export const AGENTES = {
  eyebrow: 'Agentes',
  headline: { text: 'Un agente para cada\nproceso.', accent: 'agente' } satisfies Headline,
  subtitle:
    'Elegí el proceso que más te cuesta y empezá por ese agente.',
  allLink: 'Agendá una demo',
  items: [
    {
      key: 'whatsapp',
      n: '01',
      name: 'Atención por WhatsApp',
      bullets: [
        'Responde a toda hora sin sumar personas',
        'Deriva solo lo que necesita criterio humano',
        'Cada conversación queda trazada en el panel',
      ],
      link: 'Quiero este agente',
    },
    {
      key: 'voice',
      n: '02',
      name: 'Voz para estado de pedidos',
      bullets: [
        'Atiende la llamada y responde con datos del sistema',
        'Estado del pedido sin esperas ni transferencias',
        'Libera al equipo de llamadas repetitivas',
      ],
      link: 'Quiero este agente',
    },
    {
      key: 'conductores',
      n: '03',
      name: 'Coordinación con choferes',
      bullets: [
        'Confirma entregas sin perseguir choferes',
        'Detecta demoras apenas ocurren',
        'El chofer usa el canal que ya conoce',
      ],
      link: 'Quiero este agente',
    },
    {
      key: 'agenda',
      n: '04',
      name: 'Agenda y turnos',
      bullets: [
        'Agenda y confirma turnos sin intervención',
        'Reprograma cancelaciones al instante',
        'Elimina la planilla paralela',
      ],
      link: 'Quiero este agente',
    },
    {
      key: 'incidencias',
      n: '05',
      name: 'Seguimiento de incidencias',
      bullets: [
        'Detecta la excepción antes de que el cliente llame',
        'Avisa a la persona indicada sin que nadie lo pida',
        'Registro completo de cada evento',
      ],
      link: 'Quiero este agente',
    },
    {
      key: 'documentos',
      n: '06',
      name: 'Facturas y documentos por mail',
      bullets: [
        'Lee las facturas y documentos que llegan por mail',
        'Extrae los datos y los deja cargados',
        'Marca para revisar lo que no cierra',
      ],
      link: 'Quiero este agente',
    },
    {
      key: 'custom',
      n: '07',
      name: '¿No lo ves acá? Lo construimos',
      bullets: [
        'Cada operación es distinta.',
        'Si tu proceso necesita un agente que no está en la lista, lo diseñamos a medida para tu operación.',
      ],
      link: 'Contanos qué necesitás',
      message: 'Hola, necesito un agente a medida para mi operación.',
    },
  ] satisfies Agent[],
}

/* ── Vistas de producto de cada agente ──────── */

export interface ChatMessage {
  from: 'contact' | 'agent'
  text: string
  time: string
}

export const MOCKUPS = {
  agentLabel: 'Agente',
  whatsapp: {
    label: 'Vista de una conversación de WhatsApp. Una clienta consulta por su envío y el agente le responde con el estado y la llegada estimada.',
    contact: 'María Pérez',
    initials: 'MP',
    channel: 'WhatsApp',
    attendedBy: 'Atendida por el agente',
    messages: [
      { from: 'contact', text: 'Hola, quiero saber por dónde viene mi envío AND-1042', time: '10:41' },
      { from: 'agent', text: 'Tu envío AND-1042 está en camino de Montevideo a Salto. Llega mañana.', time: '10:41' },
      { from: 'contact', text: 'Perfecto, gracias', time: '10:42' },
    ] satisfies ChatMessage[],
    state: 'resolved' as FlowState,
  },
  voice: {
    label: 'Vista de una llamada atendida por el agente, con la transcripción de lo que se habló.',
    status: 'En llamada',
    caller: 'María Pérez',
    detail: 'Consulta por el pedido AND-1042',
    transcript: 'Transcripción',
    turns: [
      { from: 'contact', text: 'Buenas, ¿cuándo llega mi pedido?', time: '11:05' },
      { from: 'agent', text: 'Ya salió del depósito y llega hoy por la tarde.', time: '11:05' },
    ] satisfies ChatMessage[],
    state: 'running' as FlowState,
  },
  conductores: {
    label: 'Vista de un pedido. El chofer avisa por WhatsApp que descargó y el agente deja la entrega confirmada.',
    order: 'AND-1042',
    destination: 'Salto',
    driver: 'Raúl Sosa',
    updated: 'Actualizado',
    stageFrom: 'En camino',
    stageTo: 'Descargado',
    message: { from: 'contact', text: 'Listo, ya descargué en Salto', time: '15:20' } satisfies ChatMessage,
    confirmation: 'Entrega confirmada',
    state: 'resolved' as FlowState,
  },
  agenda: {
    label: 'Vista de la agenda de turnos del día, con turnos confirmados, uno en curso y un horario libre.',
    title: 'Turnos de hoy',
    slots: [
      { time: '08:00', title: 'Descarga de contenedor', who: 'Raúl Sosa', state: 'resolved' },
      { time: '09:30', title: 'Retiro de mercadería', who: 'Lucía Benítez', state: 'running' },
      { time: '11:00', title: 'Reprogramado por el agente', who: 'Daniel Acosta', state: 'resolved' },
    ] satisfies { time: string; title: string; who: string; state: FlowState }[],
    free: { time: '12:30', title: 'Horario disponible' },
  },
  documentos: {
    label: 'Vista de facturas procesadas. Llegan por mail, el agente extrae los datos y marca la que una persona tiene que revisar.',
    title: 'Facturas procesadas',
    source: 'Recibidas por mail',
    rows: [
      { title: 'Factura de fletes', detail: 'Datos cargados en la planilla', state: 'resolved', status: 'Resuelta' },
      { title: 'Factura de combustible', detail: 'Para revisar por una persona', state: 'escalated', status: 'Requiere verificación' },
      { title: 'Factura de repuestos', detail: 'Leyendo el documento', state: 'running', status: 'En curso' },
    ] satisfies { title: string; detail: string; state: FlowState; status: string }[],
  },
  incidencias: {
    label: 'Vista de una incidencia. El agente detecta una demora, avisa al cliente y la escala a una persona del equipo.',
    title: 'Demora en el envío AND-1042',
    detail: 'El chofer avisó que llega más tarde de lo previsto',
    timeline: ['Demora detectada por el agente', 'Cliente avisado por WhatsApp', 'Escalada a tu equipo'],
    action: 'Tomar conversación',
    state: 'escalated' as FlowState,
  },
}

/* ── Cómo trabajamos ────────────────────────── */

/** Cada paso lleva una foto o una vista de producto. */
export type ProcessStep = { n: string; label: string; title: string; body: string } & (
  | { image: MediaImage }
  | { mockup: 'whatsapp' | 'control' }
)

export const COMO_TRABAJAMOS = {
  eyebrow: 'Cómo trabajamos',
  headline: { text: 'Tu primer agente,\nsin frenar\ntu operación.', accent: 'operación' } satisfies Headline,
  intro: 'Arrancamos por un proceso, lo ponemos a funcionar y después sumamos más.',
  cta: 'Agendá una demo',
  steps: [
    {
      n: '01',
      label: 'Conocemos',
      title: 'Primero, entender\ncómo operás hoy.',
      body: 'Entendemos tu TMS, WMS, ERP, planillas y procesos actuales.',
      image: { src: '/proceso/conocemos.webp', alt: 'Pasillo de un depósito con estanterías altas y mercadería en pallets' },
    },
    {
      n: '02',
      label: 'Identificamos',
      title: 'Elegimos el proceso\nque más te cuesta.',
      body: 'Mapeamos tus procesos y dónde está el mayor impacto.',
      image: { src: '/proceso/identificamos.webp', alt: 'Camión en los muelles de carga de un centro logístico al atardecer' },
    },
    {
      n: '03',
      label: 'Implementamos',
      title: 'Activamos el agente\nsobre tus sistemas.',
      body: 'Trabajamos junto a tu equipo y lo ponemos a andar sin cortar el día a día.',
      mockup: 'whatsapp',
    },
    {
      n: '04',
      label: 'Mejoramos',
      title: 'Medimos, ajustamos\ny escalamos.',
      body: 'Evaluamos y ajustamos el agente con el tiempo, y lo llevamos a más procesos.',
      mockup: 'control',
    },
  ] satisfies ProcessStep[],
}

/* ── Solución (posicionamiento) ─────────────── */

export type PlaneKey = 'canales' | 'suplai' | 'sistemas'
/** Estados de Suplai Control usados en el diagrama. */
export type FlowState = 'running' | 'resolved' | 'escalated'

/** Etiquetas de los tres estados, tal como se ven en Suplai Control. */
export const CONTROL_STATES: Record<FlowState, string> = {
  running: 'En curso',
  resolved: 'Resuelto',
  escalated: 'Escalación',
}

export type ChannelKey = 'whatsapp' | 'voice' | 'email'

export interface ActivityItem {
  channel: ChannelKey
  title: string
  detail: string
  state: FlowState
  time: string
}

export const SOLUCION = {
  eyebrow: 'Solución',
  headline: {
    text: 'Entre tus canales\ny tus sistemas,\nSuplai opera.',
    accent: 'opera',
  } satisfies Headline,
  /** Diagrama de tres planos apilados (canales, Suplai, sistemas). */
  diagram: {
    label: 'Diagrama de tres planos. Arriba tus canales, en el medio Suplai y abajo tus sistemas, conectados entre sí.',
    canales: { title: 'Tus canales', items: ['WhatsApp', 'Llamadas', 'Mail'] },
    suplai: { title: 'Suplai', caption: 'Agentes de IA' },
    sistemas: { title: 'Tus sistemas', items: ['TMS', 'WMS', 'ERP', 'Planillas'] },
    /** Eventos que viajan entre planos, con los estados de Suplai Control. */
    flow: {
      inbound: { label: 'Consulta entrante', state: 'running' },
      reply: { label: 'Respuesta enviada', state: 'resolved' },
      update: { label: 'Turno agendado', state: 'resolved' },
      lookup: { label: 'Datos del pedido', state: 'running' },
    } satisfies Record<string, { label: string; state: FlowState }>,
    escalation: { label: 'Tu equipo', caption: 'Solo las excepciones' },
  },
  /** Vista del panel Suplai Control con los tres estados. */
  control: {
    eyebrow: 'Suplai Control',
    title: 'Todo lo que hacen los agentes queda a la vista.',
    body: 'Desde el panel seguís cada conversación, llamada y documento, y tomás el caso cuando hace falta una persona.',
    label: 'Vista del panel Suplai Control con la actividad reciente de los agentes. Cada evento muestra su estado, que puede ser en curso, resuelto o escalación.',
    nav: ['Inicio', 'Llamadas', 'Conversaciones', 'Mensajes de voz', 'Facturas procesadas'],
    page: 'Inicio',
    live: 'Actualización automática',
    heading: 'Así viene la operación hoy',
    feedTitle: 'Actividad reciente',
    feedBody: 'Lo último que resolvieron los agentes.',
    items: [
      { channel: 'whatsapp', title: 'María Pérez', detail: 'Consultó el estado del envío AND-1042', state: 'resolved', time: '10:42' },
      { channel: 'voice', title: 'Llamada a Raúl Sosa', detail: 'Seguimiento del pedido AND-1042', state: 'running', time: '10:38' },
      { channel: 'email', title: 'Factura de un proveedor', detail: 'Llegó por mail y quedó cargada', state: 'resolved', time: '10:15' },
      { channel: 'whatsapp', title: '099 000 102', detail: 'Pidió hablar con una persona', state: 'escalated', time: '09:57' },
    ] satisfies ActivityItem[],
    legend: [
      { state: 'running', body: 'El agente lo está atendiendo ahora.' },
      { state: 'resolved', body: 'Quedó cerrado y registrado.' },
      { state: 'escalated', body: 'Pasó a una persona de tu equipo.' },
    ] satisfies { state: FlowState; body: string }[],
  },
  steps: [
    {
      n: '01',
      label: 'Se conecta',
      plane: 'sistemas',
      title: 'Conectamos tus sistemas',
      body: 'Nos conectamos a tu TMS, WMS, ERP, planillas y herramientas internas.',
    },
    {
      n: '02',
      label: 'Atiende',
      plane: 'canales',
      title: 'El agente atiende',
      body: 'Contesta llamadas, WhatsApp y mails con los datos de tus sistemas, a cualquier hora.',
    },
    {
      n: '03',
      label: 'Resuelve',
      plane: 'suplai',
      title: 'Todo queda cargado',
      body: 'Estados, envíos e incidencias se actualizan en tus sistemas. A tu equipo le llegan solo las excepciones.',
    },
  ] satisfies { n: string; label: string; plane: PlaneKey; title: string; body: string }[],
}

/* ── Industrias ─────────────────────────────── */

export const INDUSTRIAS = {
  eyebrow: 'Industrias',
  headline: { text: 'Lo que resolvemos\nen tu industria.', accent: 'industria' } satisfies Headline,
  subtitle: 'Elegí la tuya y mirá qué resuelve primero.',
  painsLabel: 'Dónde duele hoy',
  items: [
    {
      key: 'logistica',
      title: 'Empresas de logística',
      pains: ['Llamadas cruzadas con choferes', 'Clientes preguntando por su pedido', 'Estados que nadie actualiza'],
      image: { src: '/empresas/logistica.webp', alt: 'Camión con semirremolque en una ruta de montaña' },
    },
    {
      key: 'distribuidoras',
      title: 'Distribuidoras',
      pains: ['Cientos de entregas por confirmar', 'Remitos perdidos', 'Cierres del día trabados'],
      image: { src: '/empresas/distribuidoras.webp', alt: 'Vista aérea de un depósito de distribuidora con camiones en los muelles' },
    },
    {
      key: 'importadoras',
      title: 'Importadoras',
      pains: ['Miles de facturas y documentos', 'Llamadas a navieras y despachantes', 'Trámites dispersos en mails'],
      image: { src: '/empresas/importadoras.webp', alt: 'Contenedores de carga y un buque en una terminal portuaria' },
    },
    {
      key: 'portuarias',
      title: 'Empresas portuarias',
      pains: ['Turnos de camiones por teléfono', 'Movimientos sin registrar', 'Coordinación con agencias a mano'],
      image: { src: '/empresas/portuarias.webp', alt: 'Grúa portuaria recortada contra el cielo al atardecer' },
    },
    {
      key: 'flota',
      title: 'Flota propia',
      pains: ['Choferes que no reportan', 'Demoras descubiertas tarde', 'Planillas de viajes a mano'],
      image: { src: '/empresas/flota.webp', alt: 'Flota de camiones propia estacionada en un centro logístico' },
    },
    {
      key: 'cds',
      title: 'Centros de distribución',
      pains: ['Remitos en papel', 'Ingresos sin registrar en el WMS', 'Coordinación con proveedores por WhatsApp'],
      image: { src: '/empresas/cds.webp', alt: 'Centro de distribución con estanterías de ingreso y egreso de mercadería' },
    },
  ],
}

/* ── Principios ─────────────────────────────── */

export const PRINCIPIOS = {
  headline: { text: 'Automatizar\ntambién es\nacompañar.', accent: 'acompañar' } satisfies Headline,
  items: [
    {
      title: 'Sin migraciones',
      body: 'Nos integramos a tu TMS, WMS, ERP y planillas tal como están, sin cambiar tu forma de trabajar.',
    },
    {
      title: 'Vos supervisás las excepciones',
      body: 'Lo repetitivo lo resuelve el agente. Lo que se sale del guion pasa a tu equipo.',
    },
    {
      title: 'Trazabilidad completa',
      body: 'Registro completo de lo que el agente hizo y por qué.',
    },
    {
      title: 'Empezás por un agente y escalás',
      body: 'Empezá por un agente. Escalá a más procesos cuando veas el resultado.',
    },
  ],
}

/* ── Preguntas frecuentes ───────────────────── */

/**
 * Solo se responde con lo que ya está respaldado en PRODUCT.md, el copy de
 * la landing o la demo. Lo que falta va entre corchetes para completar.
 */
export const FAQ = {
  eyebrow: 'Preguntas frecuentes',
  headline: { text: 'Lo que conviene saber\nantes de arrancar.', accent: 'arrancar' } satisfies Headline,
  items: [
    {
      question: '¿Con qué sistemas se integra?',
      answer: [
        'Con los que ya usás. Nos conectamos a tu TMS, WMS, ERP, planillas y herramientas internas, y los agentes atienden por WhatsApp, llamadas y mail. No hace falta migrar nada ni cambiar tu forma de trabajar.',
        '[COMPLETAR sistemas y marcas con integración ya probada]',
      ],
    },
    {
      question: '¿Qué pasa con mis datos?',
      answer: [
        'Queda el registro completo de lo que hizo cada agente y por qué, y lo ves en el panel.',
        '[COMPLETAR dónde se alojan los datos, quién puede verlos, cuánto tiempo se guardan y qué acuerdo de confidencialidad se firma]',
      ],
    },
    {
      question: '¿Qué pasa cuando el agente no sabe o se equivoca?',
      answer: [
        'Lo repetitivo lo resuelve el agente. Lo que se sale del guion pasa a una persona de tu equipo. En el panel aparece como escalación, tomás la conversación, respondés vos y después se la devolvés al agente.',
        'Con el registro de cada caso evaluamos y ajustamos el agente con el tiempo.',
      ],
    },
    {
      question: '¿Cómo se cobra?',
      answer: ['[COMPLETAR modelo de precios, qué incluye y cómo cambia al sumar más agentes]'],
    },
    {
      question: '¿Qué necesita mi equipo para arrancar?',
      answer: [
        'Elegir un proceso. Primero entendemos cómo operás hoy y qué sistemas usás, después activamos el agente junto a tu equipo, sin cortar el día a día.',
        '[COMPLETAR accesos, personas y dedicación que necesitamos de tu lado]',
      ],
    },
  ] satisfies { question: string; answer: string[] }[],
}

/* ── Cierre y contacto ────────────────────── */

export const CIERRE = {
  headline: 'Empezá por un proceso.',
  /** Única línea entera en itálica de la landing. */
  accentLine: 'El resto lo sumamos juntos.',
  subtitle: 'En 30 minutos miramos tu operación y te decimos por dónde arrancaría el primer agente.',
  ctaPrimary: 'Agendá 30 minutos',
  ctaWhatsapp: WHATSAPP.cta,
  emailLabel: 'O escribinos a',
  image: { src: '/cierre.webp', alt: 'Terminal portuaria iluminada al anochecer, con grúas y un buque en la bahía' },
}

/* ── Footer ─────────────────────────────────── */

export const FOOTER = {
  tagline: 'Agentes de IA para la operación logística.',
  columns: [
    {
      title: 'Producto',
      links: [
        { label: 'Solución', href: '#solucion' },
        { label: 'Agentes', href: '#agentes' },
        { label: 'Industrias', href: '#industrias' },
        { label: 'Cómo trabajamos', href: '#como-trabajamos' },
        { label: 'Preguntas frecuentes', href: '#preguntas' },
      ],
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Contacto', href: '#contacto' },
        { label: 'Agendá una demo', href: DEMO_URL, arrow: '→' },
        { label: WHATSAPP.cta, href: whatsappUrl(WHATSAPP.message), arrow: '→' },
        { label: 'LinkedIn', href: LINKEDIN_URL, arrow: '↗' },
      ],
    },
  ],
  legal: '© 2026 Suplai. Todos los derechos reservados.',
}
