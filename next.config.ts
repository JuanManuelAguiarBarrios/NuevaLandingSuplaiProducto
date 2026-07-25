import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  images: {
    formats: ['image/avif', 'image/webp'],
    // Requerido a partir de Next 16 para el quality={65} de las fotos de Empresas.
    qualities: [65],
  },
  async headers() {
    return [
      {
        // Assets estáticos versionados por contenido (logos, fotos) — cache agresivo.
        source: '/:path*.(webp|png|jpg|jpeg|svg)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

export default nextConfig
