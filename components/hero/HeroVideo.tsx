'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import type { HeroVideoConfig } from '@/content'

/**
 * Fondo de video del hero (B1). Protege el LCP: el poster pinta de entrada
 * y el <video> se monta recién después del primer paint, para no competir
 * con el headline ni con la fuente. Con prefers-reduced-motion el video no
 * se monta nunca — queda el poster estático. El overlay garantiza el
 * contraste del texto sobre cualquier footage.
 */

const VIDEO_MOUNT_DELAY_MS = 300

export default function HeroVideo({ webm, mp4, poster }: HeroVideoConfig) {
  const [isVideoMounted, setIsVideoMounted] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    const id = window.setTimeout(() => setIsVideoMounted(true), VIDEO_MOUNT_DELAY_MS)
    return () => window.clearTimeout(id)
  }, [prefersReducedMotion])

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {/* Poster siempre montado: primer frame inmediato y fallback estático */}
      {/* eslint-disable-next-line @next/next/no-img-element -- fondo full-bleed
          sin optimización de next/image a propósito: no debe disputar prioridad
          de red con el LCP (headline) */}
      <img
        src={poster}
        alt=""
        fetchPriority="low"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {isVideoMounted && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={webm} type="video/webm" />
          <source src={mp4} type="video/mp4" />
        </video>
      )}

      {/* Overlay de contraste: base + scrim lateral sobre la zona del texto */}
      <div className="absolute inset-0 bg-[#0A0A0A]/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 via-[#0A0A0A]/40 to-[#0A0A0A]/25" />
    </div>
  )
}
