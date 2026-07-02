import { HERO } from '@/content'

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

      {/* Radial glow — blue, very subtle */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full opacity-[0.07]"
        style={{ background: 'radial-gradient(ellipse, #2563EB 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Bottom fade to white for smooth transition */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32"
        style={{ background: 'linear-gradient(to bottom, transparent, #0A0A0A)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-center px-6 py-28 md:px-10 md:py-36">
        {/* Headline — sin delay para no penalizar el LCP */}
        <h1
          className="hero-rise font-editorial font-normal text-white text-wrap-balance"
          style={{
            fontSize: 'clamp(38px, 5.4vw, 78px)',
            lineHeight: 1.05,
            letterSpacing: '-0.022em',
            maxWidth: 880,
          }}
        >
          {HERO.headline.plain}{' '}
          <em style={{ fontStyle: 'italic', color: '#2563EB' }}>
            {HERO.headline.accent}
          </em>
        </h1>

        {/* Subtítulo */}
        <p
          className="hero-rise mt-8 font-sans font-light leading-relaxed text-white/70"
          style={{ fontSize: 'clamp(15px, 1.55vw, 18px)', maxWidth: 540, animationDelay: '0.12s' }}
        >
          {HERO.subtitle}
        </p>

        {/* CTA */}
        <div className="hero-rise mt-10" style={{ animationDelay: '0.22s' }}>
          <a
            href="mailto:admin@getsuplai.com?subject=Quiero%20una%20demo%20de%20Suplai"
            className="inline-flex items-center rounded-full bg-primary px-7 py-3 font-sans text-[14px] font-semibold text-white transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
          >
            {HERO.cta}
          </a>
        </div>

        {/* Scroll hint */}
        <div className="hero-rise mt-24 flex items-center gap-3" style={{ animationDelay: '0.32s' }}>
          <span className="h-px w-8 bg-white/15" aria-hidden="true" />
          <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-white/25">
            Scroll
          </span>
        </div>
      </div>
    </section>
  )
}
