import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  images: {
    formats: ['image/avif', 'image/webp'],
    // Calidad alta para todas las fotos (el default de Next es 75). Next genera
    // srcset 1x/2x y variantes AVIF/WebP; nunca escala por encima del original.
    qualities: [90],
  },
  async headers() {
    return [
      {
        // Assets estáticos versionados por contenido (logos, fotos, videos) — cache agresivo.
        source: '/:path*.(webp|png|jpg|jpeg|svg|mp4|webm)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

export default nextConfig
