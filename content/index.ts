/**
 * content/index.ts
 * Todo el copy de la landing de Suplai en un solo lugar.
 * Editá acá — los componentes sólo importan desde aquí.
 */

export const DEMO_URL = 'https://calendly.com/mateo-getsuplai/30min'

/** Único mail de contacto público — footer y CTA de expansión salen de acá. */
export const CONTACT_EMAIL = 'contacto@getsuplai.com'

/* ── Navbar ─────────────────────────────────────────────────── */
export const NAV = {
  brand: 'Suplai',
  links: [
    { label: 'Solución',        href: '#solucion' },
    { label: 'Agentes',         href: '#agentes' },
    { label: 'Empresas',        href: '#empresas' },
    { label: 'Cómo trabajamos', href: '#como-trabajamos' },
  ],
  cta: 'Agendá una demo',
} as const

/* ── Hero ───────────────────────────────────────────────────── */
/* Video de fondo del hero: poster inmediato, video montado post-first-paint,
   overlay de contraste, estático con reduced-motion. En null, el hero vuelve
   al fondo de grid + glow + rutas de flujo. */
export type HeroVideoConfig = {
  /** WebM (VP9) opcional — si existe, se sirve con prioridad sobre el mp4. */
  webm?: string
  /** MP4 (H.264). */
  mp4: string
  /** Poster liviano (webp) — primer frame del loop. */
  poster: string
}
export const HERO_VIDEO: HeroVideoConfig | null = {
  mp4: '/hero/hero.mp4',
  poster: '/hero/poster.webp',
}

export const HERO = {
  headline: {
    /* Quiebre autorado: cada '\n' es una línea del reveal de entrada. */
    plain:  'La capa de IA que ejecuta\ntu operación',
    accent: 'logística.',
  },
  subtitle:
    'Suplai construye agentes de inteligencia artificial que coordinan tu operación conectándose a los sistemas que ya usás.',
  cta: 'Agendá una demo',
} as const

/* ── Manifiesto ─────────────────────────────────────────────── */
/* Quiebres de línea autorados: cada '\n' es una línea del reveal. */
export const MANIFIESTO = {
  text: 'Tener los datos no alcanza.\nAlguien tiene que actuar\nsobre ellos.',
  accent: 'actuar',
} as const

/* ── Problema (pares causa → consecuencia) ──────────────────── */
export const PROBLEMA = {
  headline: {
    /* Quiebres autorados para el reveal por línea. */
    text: 'Información dispersa entre sistemas.\nCoordinación manual de todos los procesos.',
    accent: 'manual',
  },
  labels: { problema: 'Qué pasa hoy', costo: 'Qué cuesta' },
  /* La pila de interrupciones: fragmentos genéricos de un día operativo.
     Ilustrativos — sin nombres, empresas ni casos reales. */
  artefactos: [
    { canal: 'WhatsApp',        hora: '09:12', texto: '¿A qué hora llega el pedido de mañana?' },
    { canal: 'Llamada perdida', hora: '09:40', texto: 'Conductor · Ruta 8' },
    { canal: 'Archivo',         hora: '10:05', texto: 'planilla_entregas_v3_FINAL.xlsx' },
    { canal: 'Mail',            hora: '11:47', texto: 'RE: RE: RE: Turno depósito jueves' },
    { canal: 'TMS',             hora: '13:20', texto: 'Estado sin actualizar desde ayer' },
  ],
  pares: [
    {
      problema: 'Datos repartidos entre el TMS, planillas, WhatsApp y llamadas',
      costo:    'Errores por información incompleta o desactualizada',
    },
    {
      problema: 'Seguimiento manual de cada envío, uno por uno',
      costo:    'Retrasos y menor nivel de servicio',
    },
    {
      problema: 'Coordinación constante entre equipos y conductores',
      costo:    'Difícil escalar la operación sin sumar más gente',
    },
  ],
} as const

/* ── Solución ───────────────────────────────────────────────── */
export const SOLUCION = {
  headline: 'Una capa operativa de IA sobre los sistemas que ya usás.',
  steps: [
    {
      n:     '01',
      label: 'Integración',
      title: 'Conectamos tus sistemas',
      desc:  'Nos integramos a tu TMS, WMS, ERP, planillas y herramientas internas, sin cambiar tu forma de trabajar.',
    },
    {
      n:     '02',
      label: 'Interacción',
      title: 'El agente opera en tiempo real',
      desc:  'Los agentes se comunican y procesan información en tiempo real: llamadas, mensajería, captura de datos.',
    },
    {
      n:     '03',
      label: 'Ejecución',
      title: 'La operación se coordina sola',
      desc:  'Estados, envíos e incidencias se actualizan y coordinan solos. Vos supervisás las excepciones.',
    },
  ],
} as const

/* ── Agentes ────────────────────────────────────────────────── */
export const AGENTES = {
  headline: 'Tenemos el agente que tu operación',
  accent:   'necesita.',
  subtitle:
    'Elegí el cuello de botella más caro y activá el agente. Cada uno se integra al sistema que ya usás.',
  badge: 'En producción',
  agents: [
    {
      key:      'whatsapp',
      title:    'Atención por WhatsApp',
      category: 'Atención al cliente',
      desc:     'Responde y deriva consultas sin fricción, con panel central y trazabilidad completa.',
      results:  ['Responde 24/7 sin sumar personas', 'Deriva solo lo que necesita criterio humano', 'Cada conversación queda trazada en el panel'],
      live:     false,
    },
    {
      key:      'voice',
      title:    'Voz para estado de pedidos',
      category: 'Seguimiento operativo',
      desc:     'Atiende y actualiza el estado en tiempo real, sin migrar de sistema.',
      results:  ['Atiende la llamada y responde con datos del sistema', 'Estado del pedido sin esperas ni transferencias', 'Libera al equipo de llamadas repetitivas'],
      live:     false,
    },
    {
      key:      'conductores',
      title:    'Coordinación con conductores',
      category: 'Operaciones',
      desc:     'Confirmaciones, demoras y entregas por voz o mensajería, sin llamadas manuales.',
      results:  ['Confirma entregas sin perseguir choferes', 'Detecta demoras apenas ocurren', 'El conductor usa el canal que ya conoce'],
      live:     false,
    },
    {
      key:      'agenda',
      title:    'Agenda y turnos',
      category: 'Administración',
      desc:     'Gestión de turnos y citas sin llamadas manuales ni planillas.',
      results:  ['Agenda y confirma turnos sin intervención', 'Reprograma cancelaciones al instante', 'Elimina la planilla paralela'],
      live:     false,
    },
    {
      key:      'incidencias',
      title:    'Seguimiento de incidencias',
      category: 'Control operativo',
      desc:     'Detecta, registra y escala excepciones operativas en tiempo real.',
      results:  ['Detecta la excepción antes de que el cliente llame', 'Escala a la persona correcta, solo', 'Registro completo de cada evento'],
      live:     false,
    },
  ],
  expansion: {
    title: '¿No lo ves acá? Lo construimos.',
    desc:  'Cada operación es distinta. Si tu proceso necesita un agente que no está en la lista, lo diseñamos a medida y lo integramos igual: sin migraciones.',
    cta:   'Contanos qué necesitás',
    mailSubject: 'Hablemos de mi operación',
  },
} as const

/* ── Empresas ───────────────────────────────────────────────── */
export const EMPRESAS = {
  headline: {
    plain:  'Hecho para',
    accent: 'tu operación.',
  },
  subtitle: 'De distribuidoras a puertos: mismo agente, distinto cuello de botella.',
  items: [
    {
      key:   'logistica',
      video: '/empresas/logistica.mp4',
      title: 'Empresas de logística',
      desc:  'Coordinación entre tráfico, choferes y clientes.',
      icon:  'truck',
      alt:   'Camiones de reparto en operación logística',
    },
    {
      key:   'distribuidoras',
      video: '/empresas/distribuidoras.mp4',
      title: 'Distribuidoras',
      desc:  'Muchas entregas por día, confirmaciones que traban el cierre.',
      icon:  'package',
      alt:   'Depósito de distribuidora con mercadería lista para despacho',
    },
    {
      key:   'importadoras',
      video: '/empresas/importadoras.mp4',
      title: 'Importadoras',
      desc:  'Seguimiento de cargas y trámites dispersos.',
      icon:  'ship',
      alt:   'Contenedores de carga en una operación de importación',
    },
    {
      key:   'portuarias',
      video: '/empresas/portuarias.mp4',
      title: 'Empresas portuarias',
      desc:  'Coordinación de turnos y movimientos en tiempo real.',
      icon:  'anchor',
      alt:   'Dársena portuaria con movimiento de contenedores',
    },
    {
      key:   'flota',
      video: '/empresas/flota-2.mp4',
      title: 'Flota propia',
      desc:  'Control de viajes sin sumar gente al equipo.',
      icon:  'route',
      alt:   'Flota de camiones propia en ruta',
    },
    {
      key:   'cds',
      video: '/empresas/cds.mp4',
      title: 'Centros de distribución',
      desc:  'Ingreso y egreso de mercadería sin papel ni fricción.',
      icon:  'warehouse',
      alt:   'Centro de distribución con ingreso y egreso de mercadería',
    },
  ],
} as const

/* ── Cómo trabajamos ────────────────────────────────────────── */
export const COMO_TRABAJAMOS = {
  headline: 'Así trabajamos.',
  steps: [
    {
      n:     '01',
      title: 'Conocemos tus herramientas',
      desc:  'Entendemos tu TMS, WMS, ERP, planillas y procesos actuales.',
    },
    {
      n:     '02',
      title: 'Identificamos dónde ayudar',
      desc:  'Mapeamos los cuellos de botella y el mayor impacto posible.',
    },
    {
      n:     '03',
      title: 'Implementamos juntos',
      desc:  'Implementamos el agente que necesitás. Junto a tu equipo, sin migración: nos conectamos a lo que ya usás, sin interrumpir la operación.',
    },
    {
      n:     '04',
      title: 'Mejoramos de forma continua',
      desc:  'Evaluamos, ajustamos y optimizamos el agente con el tiempo.',
    },
  ],
  /* Compromiso incremental — quiebre autorado para el reveal por línea. */
  compromiso: {
    plain:  'Empezá por un agente.\nEscalá cuando veas el resultado.',
    accent: 'un agente',
  },
  /* Tabs del proceso + microcopy de los visuales de cada panel.
     Los valores numéricos son ILUSTRATIVOS (UI esqueleto, no claims). */
  paneles: {
    tabs: ['Conocemos', 'Identificamos', 'Implementamos', 'Mejoramos'],
    integracion: {
      badge:    'Sin migración',
      sistemas: ['TMS', 'ERP', 'WMS', 'Planillas'],
    },
    diagnostico: {
      chip: 'Mayor impacto',
      hallazgos: [
        'Llamadas de seguimiento manuales',
        'Confirmaciones sin registrar',
        'Estados desactualizados en el sistema',
        'Facturas y remitos cargados a mano',
        'Seguimiento de proveedores por mail y teléfono',
      ],
    },
    operacion: {
      chips: [
        { texto: 'Entregas confirmadas hoy',  valor: '32', actor: 'agente' },
        { texto: 'Excepciones para revisar',  valor: '3',  actor: 'equipo' },
      ],
    },
    mejora: {
      chip: '↑ vs. período anterior',
      ejes: ['Mes 1', 'Mes 2', 'Mes 3'],
    },
  },
} as const

/* ── Control (A4) — NO RENDERIZADO: la sección se probó y se quitó.
      El copy queda disponible por si se retoma en otro formato. ── */
export const CONTROL = {
  headline: { plain: 'Vos mantenés el', accent: 'control.' },
  items: [
    { label: 'Vos aprobás antes de ejecutar',     desc: 'El agente no ejecuta nada que no hayas autorizado.' },
    { label: 'Supervisión humana de excepciones', desc: 'Lo repetitivo lo resuelve el agente; lo fuera de guion escala a tu equipo.' },
    { label: 'Reglas definidas por tu operación', desc: 'Qué puede hacer, qué no y cuándo escalar lo definís vos.' },
    { label: 'Trazabilidad de cada acción',       desc: 'Registro completo de lo que el agente hizo y por qué.' },
  ],
} as const

/* ── Visión ─────────────────────────────────────────────────── */
export const VISION = {
  /* Quiebres autorados para el reveal por línea del cierre. */
  headline: 'La logística evoluciona\nhacia una operación autónoma.',
  accent:   'Construyamos esa capa juntos.',
  subtitle:
    'Queremos ser la capa que permite a las empresas ejecutar su operación de forma más eficiente, sin fricción y con capacidad de escalar.',
  cta: 'Empecemos a construir tu agente',
} as const

/* ── Footer ─────────────────────────────────────────────────── */
export const FOOTER = {
  brand: 'Suplai',
  links: [
    { label: 'LinkedIn · getsuplai', href: 'https://linkedin.com/company/getsuplai', external: true  },
    { label: CONTACT_EMAIL,          href: `mailto:${CONTACT_EMAIL}`,                external: false },
  ],
  legal: '© {year} Suplai. Todos los derechos reservados.',
} as const
