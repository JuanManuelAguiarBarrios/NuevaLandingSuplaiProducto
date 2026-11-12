import type { NextConfig } from 'next'

const ONE_DAY = 60 * 60 * 24
const PUBLIC_ASSET_CACHE = `public, max-age=${ONE_DAY}, stale-while-revalidate=${ONE_DAY * 7}`

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
        // Los archivos de public/ no llevan hash en el nombre: si se reemplaza
        // uno, la URL es la misma. Caché de un día y, pasado ese plazo, se sirve
        // la copia guardada mientras se revalida en segundo plano (hasta una semana).
        source: '/:path*.(webp|png|jpg|jpeg|svg|mp4|webm)',
        headers: [{ key: 'Cache-Control', value: PUBLIC_ASSET_CACHE }],
      },
    ]
  },
}

export default nextConfig
