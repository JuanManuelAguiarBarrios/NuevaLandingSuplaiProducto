import { DEMO_URL, HERO } from '@/content'
import HeroFlowLines from '@/components/hero/HeroFlowLines'

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden bg-[#0A0A0A] pt-16"
    >
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

      {/* Bottom fade to white for smooth transition */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32"
        style={{ background: 'linear-gradient(to bottom, transparent, #0A0A0A)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-center px-6 py-28 md:px-10 md:py-36">
        {/* Headline — sin delay para no penalizar el LCP */}
        <h1 className="hero-rise type-display max-w-[880px] font-editorial font-normal text-white text-wrap-balance">
          {HERO.headline.plain}{' '}
          <em className="accent">{HERO.headline.accent}</em>
        </h1>

        {/* Subtítulo */}
        <p
          className="hero-rise mt-8 max-w-[540px] font-sans font-light leading-relaxed text-white/70"
          style={{ fontSize: 'clamp(15px, 1.55vw, 18px)', animationDelay: '0.12s' }}
        >
          {HERO.subtitle}
        </p>

        {/* CTA — grupo con flecha que desliza en hover */}
        <div className="hero-rise mt-10" style={{ animationDelay: '0.22s' }}>
          <a
            href={DEMO_URL}
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
