/**
 * content/index.ts
 * Todo el copy de la landing de Suplai en un solo lugar.
 * Editá acá — los componentes sólo importan desde aquí.
 */

export const DEMO_URL = 'https://calendly.com/mateo-getsuplai/30min'

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
export const HERO = {
  headline: {
    plain:  'La capa de IA que ejecuta tu operación',
    accent: 'logística.',
  },
  subtitle:
    'Suplai construye agentes de inteligencia artificial que coordinan tu operación conectándose a los sistemas que ya usás.',
  cta: 'Agendá una demo',
} as const

/* ── Problema ───────────────────────────────────────────────── */
export const PROBLEMA = {
  anchor: 'Tener los datos no alcanza.\nAlguien tiene que actuar sobre ellos.',
  hoy: {
    label: 'Qué pasa hoy',
    items: [
      'Información dispersa entre sistemas, WhatsApp y llamadas',
      'Seguimiento manual de cada envío, uno por uno',
      'Coordinación constante entre equipos y conductores',
    ],
  },
  impacto: {
    label: 'Qué cuesta',
    items: [
      'Errores por información incompleta o desactualizada',
      'Retrasos y menor nivel de servicio',
      'Difícil escalar la operación sin sumar más gente',
    ],
  },
} as const

/* ── Solución ───────────────────────────────────────────────── */
export const SOLUCION = {
  headline: 'Una capa operativa de IA sobre los sistemas que ya usás.',
  integrations: 'TMS · WMS · ERP · WhatsApp · Llamadas · Excel / Sheets · CRM · y más',
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
      results:  ['Atención 24/7', 'Menos carga operativa', 'Trazabilidad completa'],
      live:     true,
    },
    {
      key:      'voice',
      title:    'Voz para estado de pedidos',
      category: 'Seguimiento operativo',
      desc:     'Atiende y actualiza el estado en tiempo real, sin migrar de sistema.',
      results:  ['Menos llamadas manuales', 'Información al instante', 'Sin fricción'],
      live:     true,
    },
    {
      key:      'conductores',
      title:    'Coordinación con conductores',
      category: 'Operaciones',
      desc:     'Confirmaciones, demoras y entregas por voz o mensajería, sin llamadas manuales.',
      results:  ['Menos llamadas manuales', 'Actualizaciones en tiempo real', 'Sin fricción para el conductor'],
      live:     false,
    },
    {
      key:      'agenda',
      title:    'Agenda y turnos',
      category: 'Administración',
      desc:     'Gestión de turnos y citas sin llamadas manuales ni planillas.',
      results:  ['Sin llamadas ni planillas', 'Confirmaciones automáticas', 'Menos errores de coordinación'],
      live:     false,
    },
    {
      key:      'incidencias',
      title:    'Seguimiento de incidencias',
      category: 'Control operativo',
      desc:     'Detecta, registra y escala excepciones operativas en tiempo real.',
      results:  ['Detección automática', 'Escalado sin intervención manual', 'Registro completo de cada evento'],
      live:     false,
    },
  ],
  expansion: {
    title: '¿No lo ves acá? Lo construimos.',
    desc:  'Cada operación es distinta. Si tu proceso necesita un agente que no está en la lista, lo diseñamos a medida y lo integramos igual: sin migraciones.',
    cta:   'Contanos qué necesitás',
  },
  highlights: [
    'Diseñado para tu proceso',
    'Integrado a tus sistemas actuales',
    'Medido por resultados reales',
  ],
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
      title: 'Empresas de logística',
      desc:  'Coordinación entre tráfico, choferes y clientes.',
      icon:  'truck',
      alt:   'Camiones de reparto en operación logística',
    },
    {
      key:   'distribuidoras',
      title: 'Distribuidoras',
      desc:  'Muchas entregas por día, confirmaciones que traban el cierre.',
      icon:  'package',
      alt:   'Depósito de distribuidora con mercadería lista para despacho',
    },
    {
      key:   'importadoras',
      title: 'Importadoras',
      desc:  'Seguimiento de cargas y trámites dispersos.',
      icon:  'ship',
      alt:   'Contenedores de carga en una operación de importación',
    },
    {
      key:   'portuarias',
      title: 'Empresas portuarias',
      desc:  'Coordinación de turnos y movimientos en tiempo real.',
      icon:  'anchor',
      alt:   'Dársena portuaria con movimiento de contenedores',
    },
    {
      key:   'flota',
      title: 'Flota propia',
      desc:  'Control de viajes sin sumar gente al equipo.',
      icon:  'route',
      alt:   'Flota de camiones propia en ruta',
    },
    {
      key:   'cds',
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
      desc:  'Mínima fricción, junto a tu equipo, sin interrumpir la operación.',
    },
    {
      n:     '04',
      title: 'Mejoramos de forma continua',
      desc:  'Evaluamos, ajustamos y optimizamos el agente con el tiempo.',
    },
  ],
  closing: {
    title: 'Si tu operación lo necesita, lo construimos.',
    desc:  'Cada empresa opera distinto. Diseñamos el agente que necesités y lo moldeamos a tus procesos.',
  },
} as const

/* ── Confianza ──────────────────────────────────────────────── */
export const CONFIANZA = {
  items: [
    { label: 'Sin migraciones',              desc: 'Nos conectamos a lo que ya tenés.' },
    { label: 'Se integra a lo que ya usás',  desc: 'TMS, WMS, ERP, planillas y más.' },
    { label: 'Vos aprobás antes de ejecutar', desc: 'Control y supervisión en todo momento.' },
    { label: 'Trazabilidad de cada acción',  desc: 'Registro completo de lo que el agente hizo.' },
  ],
} as const

/* ── Visión ─────────────────────────────────────────────────── */
export const VISION = {
  headline: 'La logística evoluciona hacia una operación autónoma.',
  accent:   'Construyamos esa capa juntos.',
  subtitle:
    'Queremos ser la capa que permite a las empresas ejecutar su operación de forma más eficiente, sin fricción y con capacidad de escalar.',
  cta: 'Empecemos a construir tu agente',
} as const

/* ── Footer ─────────────────────────────────────────────────── */
export const FOOTER = {
  brand: 'Suplai',
  links: [
    { label: 'LinkedIn · getsuplai', href: 'https://linkedin.com/company/getsuplai',  external: true  },
    { label: 'contacto@getsuplai.com', href: 'mailto:contacto@getsuplai.com',          external: false },
  ],
  legal: '© {year} Suplai. Todos los derechos reservados.',
} as const
