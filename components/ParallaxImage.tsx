'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { m, useScroll } from 'framer-motion'
import { clipUp, VIEWPORT } from '@/lib/motion'
import { usePrefersReducedMotion, useScrollRange } from '@/lib/useScrollMotion'

/**
 * Imagen que se descubre de abajo hacia arriba al entrar en viewport
 * (clip-path) y se desplaza suave con el scroll (parallax). Con
 * prefers-reduced-motion queda estática.
 */

interface ParallaxImageProps {
  src: string
  alt: string
  sizes: string
  /** Clases del contenedor: define tamaño/aspecto. */
  className?: string
  /** Revela con clip-path al entrar en viewport. */
  reveal?: boolean
  priority?: boolean
}

export default function ParallaxImage({
  src,
  alt,
  sizes,
  className = '',
  reveal = true,
  priority = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useScrollRange(scrollYProgress, [0, 1], ['-7%', '7%'])

  // El clip va en un hijo: Chrome cuenta el clip-path del propio elemento
  // en el IntersectionObserver, y con inset(100%) nunca entraría en viewport.
  return (
    <m.div
      ref={ref}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className={`relative overflow-hidden ${className}`}
    >
      <m.div variants={reveal ? clipUp : undefined} className="absolute inset-0 overflow-hidden">
        <m.div style={prefersReducedMotion ? undefined : { y }} className="absolute -inset-y-[8%] inset-x-0">
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
        </m.div>
      </m.div>
    </m.div>
  )
}
