/**
 * components/logos/types.ts
 * Contrato compartido por todos los logos de integración.
 * Cada logo es un SVG presentacional (Server Component) que recibe un tamaño
 * en px y hereda color sólo en el caso de las categorías monocromas.
 */

export type LogoProps = {
  /** Lado del cuadrado en px. Default 24. */
  size?: number
  className?: string
}
