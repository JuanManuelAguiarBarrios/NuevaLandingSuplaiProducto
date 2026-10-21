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
 */

export const DEMO_URL = 'https://calendly.com/mateo-getsuplai/30min'
export const CONTACT_EMAIL = 'contacto@getsuplai.com'
export const LINKEDIN_URL = 'https://linkedin.com/company/getsuplai'
/** Formato wa.me, sin "+" ni espacios. */
export const WHATSAPP_NUMBER = '59894412389'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

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

/* ── Hero ───────────────────────────────────── */

export type PinKey = 'uruguay' | 'argentina' | 'chile' | 'paraguay'

export const HERO = {
  /** Frase del hero: entrada fija y palabra que rota. */
  statement: {
    /** Entrada fija, en tamaño medio; la palabra rotativa va debajo, grande y en celeste. */
    fixed: 'Inteligencia operativa para',
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
    label: 'Inteligencia operativa para empresas de logística, distribuidoras, importadoras, empresas portuarias, flotas propias, centros de distribución y tu equipo.',
  },
  intro:
    'Agentes de IA que atienden WhatsApp, llamadas y mails, y dejan todo cargado en tus sistemas. Sin migrar nada.',
  countries: [
    { n: '01', name: 'Uruguay', note: 'Sede', pin: 'uruguay' },
    { n: '02', name: 'Argentina', pin: 'argentina' },
    { n: '03', name: 'Chile', pin: 'chile' },
    { n: '04', name: 'Paraguay', pin: 'paraguay' },
  ] satisfies { n: string; name: string; note?: string; pin: PinKey }[],
  scrollHint: 'Desplazá para entrar en la operación',
  headline: { text: 'Mientras tu equipo opera,\nlos agentes responden.', accent: 'responden' },
  subtitle: 'Atienden consultas, confirman entregas y agendan turnos todo el día.',
  ctaPrimary: 'Agendá una demo',
  ctaSecondary: { label: 'Ver agentes', href: '#agentes' },
  video: {
    mp4: '/empresas/logistica.mp4',
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
  title: 'Trabajamos con operaciones logísticas de la región',
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
    text: 'Tener los datos no alcanza.\nAlguien tiene que actuar\nsobre ellos.',
    accent: 'actuar',
  } satisfies Headline,
  intro: 'Tu equipo pasa el día respondiendo lo mismo, persiguiendo choferes y pasando datos de un sistema a otro.',
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
      problema: 'Coordinación constante entre equipos y conductores',
      costo: 'Difícil escalar la operación sin sumar más gente',
    },
  ],
}

/* ── Agentes ────────────────────────────────── */

export type AgentKey = 'whatsapp' | 'voice' | 'conductores' | 'agenda' | 'incidencias' | 'custom'

export interface Agent {
  key: AgentKey
  n: string
  name: string
  bullets: string[]
  link: string
}

export const AGENTES = {
  eyebrow: 'Agentes',
  headline: { text: 'Un agente para cada\nproceso.', accent: 'agente' } satisfies Headline,
  subtitle:
    'Elegí el proceso que más te cuesta y empezá por ese agente.',
  allLink: 'Agendá una demo',
  progressLabel: 'Progreso de la lista de agentes',
  items: [
    {
      key: 'whatsapp',
      n: '01',
      name: 'Atención por WhatsApp',
      bullets: [
        'Responde 24/7 sin sumar personas',
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
      name: 'Coordinación con conductores',
      bullets: [
        'Confirma entregas sin perseguir choferes',
        'Detecta demoras apenas ocurren',
        'El conductor usa el canal que ya conoce',
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
        'Escala a la persona correcta, solo',
        'Registro completo de cada evento',
      ],
      link: 'Quiero este agente',
    },
    {
      key: 'custom',
      n: '06',
      name: '¿No lo ves acá? Lo construimos',
      bullets: [
        'Cada operación es distinta.',
        'Si tu proceso necesita un agente que no está en la lista, lo diseñamos a medida para tu operación.',
      ],
      link: 'Contanos qué necesitás',
    },
  ] satisfies Agent[],
}

/* ── Cómo trabajamos ────────────────────────── */

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
      image: { src: '/proceso/implementamos.webp', alt: 'Camiones con las luces encendidas circulando por un playón mojado' },
    },
    {
      n: '04',
      label: 'Mejoramos',
      title: 'Medimos, ajustamos\ny escalamos.',
      body: 'Evaluamos y ajustamos el agente con el tiempo, y lo llevamos a más procesos.',
      image: { src: '/proceso/mejoramos.webp', alt: 'Grúa portuaria levantando un contenedor sobre un camión' },
    },
  ],
}

/* ── Solución (posicionamiento) ─────────────── */

export type PlaneKey = 'canales' | 'suplai' | 'sistemas'
/** Estados de Suplai Control usados en el diagrama. */
export type FlowState = 'running' | 'resolved' | 'escalated'

export const SOLUCION = {
  eyebrow: 'Solución',
  headline: {
    text: 'Entre tus canales\ny tus sistemas,\nSuplai opera.',
    accent: 'opera',
  } satisfies Headline,
  /** Diagrama de tres planos apilados (canales, Suplai, sistemas). */
  diagram: {
    label: 'Diagrama de tres planos. Arriba tus canales, en el medio Suplai y abajo tus sistemas, conectados entre sí.',
    canales: { title: 'Tus canales', items: ['WhatsApp', 'Voz', 'Email'] },
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
      title: 'El agente opera en tiempo real',
      body: 'Los agentes atienden llamadas, responden mensajes y capturan datos en tiempo real.',
    },
    {
      n: '03',
      label: 'Resuelve',
      plane: 'suplai',
      title: 'La operación se coordina sola',
      body: 'Estados, envíos e incidencias se actualizan y coordinan solos. Vos supervisás las excepciones.',
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

/* ── Cierre y contacto ────────────────────── */

export const CIERRE = {
  headline: 'Empezá por un proceso.',
  /** Única línea entera en itálica de la landing. */
  accentLine: 'El resto lo sumamos juntos.',
  subtitle: 'En 30 minutos miramos tu operación y te decimos por dónde arrancaría el primer agente.',
  ctaPrimary: 'Agendá 30 minutos',
  ctaWhatsapp: 'Escribinos por WhatsApp',
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
      ],
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Contacto', href: '#contacto' },
        { label: 'Agendá una demo', href: DEMO_URL, arrow: '→' },
        { label: 'Escribinos por WhatsApp', href: WHATSAPP_URL, arrow: '→' },
        { label: 'LinkedIn', href: LINKEDIN_URL, arrow: '↗' },
      ],
    },
  ],
  legal: '© 2026 Suplai. Todos los derechos reservados.',
}
