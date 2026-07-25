import { DEMO_URL, HERO, HERO_VIDEO } from '@/content'
import HeroFlowLines from '@/components/hero/HeroFlowLines'
import HeroVideo from '@/components/hero/HeroVideo'
import HeroPreloader from '@/components/hero/HeroPreloader'

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden bg-[#0A0A0A] pt-16"
    >
      {/* Módulo 1: preloader con contador (solo primera visita de la sesión) */}
      <HeroPreloader />

      {/* Fondo: video loop si HERO_VIDEO está configurado en content;
          si no, el fondo actual (grid + glow + rutas de flujo). El wrapper
          "se enciende" durante la secuencia de entrada. */}
      <div className="hero-anim hero-bg-on">
      {HERO_VIDEO ? (
        <HeroVideo {...HERO_VIDEO} />
      ) : (
        <>
          {/* Subtle grid texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
            aria-hidden="true"
          />

          {/* Radial glow — azul, respira lento (transform+opacity vía .hero-breathe) */}
          <div
            className="hero-breathe pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[900px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, #2563EB 0%, transparent 70%)' }}
            aria-hidden="true"
          />

          {/* Rutas de flujo — CSS puro; fallback estático en mobile/reduced-motion */}
          <HeroFlowLines />
        </>
      )}
      </div>

      {/* Bottom fade to white for smooth transition */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32"
        style={{ background: 'linear-gradient(to bottom, transparent, #0A0A0A)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-center px-6 py-28 md:px-10 md:py-36">
        {/* Headline — máscaras de línea (Módulo 2, ref. Terminal): cada línea
            sube desde su recorte; la itálica lleva máscara propia y llega
            última. Todo CSS — el texto está en el DOM desde el primer paint. */}
        <h1 className="type-display max-w-[880px] font-editorial font-normal text-white">
          {HERO.headline.plain.split('\n').map((line, i, lines) => {
            const isLast = i === lines.length - 1
            return (
              <span key={i} className="block overflow-hidden">
                <span
                  className="hero-mask hero-anim block"
                  style={{ animationDelay: `${0.05 + i * 0.18}s` }}
                >
                  {line}
                  {isLast && (
                    <>
                      {' '}
                      <span className="inline-block overflow-hidden pr-[0.08em] align-bottom">
                        <em
                          className="hero-mask hero-anim accent inline-block"
                          style={{ animationDelay: '0.4s' }}
                        >
                          {HERO.headline.accent}
                        </em>
                      </span>
                    </>
                  )}
                </span>
              </span>
            )
          })}
        </h1>

        {/* Subtítulo */}
        <p
          className="hero-rise hero-anim mt-8 max-w-[540px] font-sans font-normal leading-relaxed text-white/90"
          style={{ fontSize: 'clamp(15px, 1.55vw, 18px)', animationDelay: '0.62s' }}
        >
          {HERO.subtitle}
        </p>

        {/* CTA — grupo con flecha que desliza en hover */}
        <div className="hero-rise hero-anim mt-10" style={{ animationDelay: '0.78s' }}>
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-primary py-3 pl-7 pr-6 font-sans text-[14px] font-semibold text-white transition-[background-color,transform] duration-300 ease-signature hover:bg-[#1D4ED8] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
          >
            {HERO.cta}
            <svg
              width="14" height="14" viewBox="0 0 14 14" fill="none"
              stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true"
              className="transition-transform duration-300 ease-signature group-hover:translate-x-0.5"
            >
              <path d="M2 7h9M7 3l4 4-4 4" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}
