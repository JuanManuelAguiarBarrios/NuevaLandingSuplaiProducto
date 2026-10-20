import Image from 'next/image'
import { CONTACT_EMAIL, FOOTER, LINKEDIN_URL } from '@/content'

/**
 * Footer: lockup y tagline, dos columnas de links (Producto, Empresa) y la
 * línea legal. Las páginas legales se suman cuando existan.
 * Flechas: → en acciones (demo), ↗ en links a otros sitios.
 */

export default function Footer() {
  return (
    <footer data-tone="dark" className="border-t border-line-inverse bg-night px-5 pt-20 pb-8 text-ink-inverse sm:px-8 lg:px-12">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Image src="/brand/suplai-lockup-white.png" alt="Suplai" width={110} height={30} className="h-[30px] w-auto" />
          <p className="mt-6 max-w-xs text-ink-inverse-muted">{FOOTER.tagline}</p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 lg:col-span-5 lg:col-start-8">
          {FOOTER.columns.map((column) => (
            <div key={column.title}>
              <h2 className="eyebrow text-caption">{column.title}</h2>
              <ul className="mt-5 space-y-3 text-sm">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...('arrow' in link ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-ink-inverse-muted transition-colors hover:text-ink-inverse"
                    >
                      {link.label}
                      {'arrow' in link && <span aria-hidden="true"> {link.arrow}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="mt-20 flex flex-col gap-4 border-t border-line-inverse pt-6 text-xs text-caption sm:flex-row sm:items-center sm:justify-between">
        <p>{FOOTER.legal}</p>
        <div className="flex gap-6">
          <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-ink-inverse">
            {CONTACT_EMAIL}
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink-inverse">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
