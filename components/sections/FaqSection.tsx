import LineReveal from '@/components/LineReveal'
import { FAQ } from '@/content'

/**
 * Preguntas frecuentes antes del cierre. Acordeón con <details> nativo:
 * funciona con teclado y lectores de pantalla sin JavaScript, y el
 * atributo `name` compartido deja una sola respuesta abierta a la vez.
 */

const GROUP = 'preguntas-frecuentes'

export default function FaqSection() {
  return (
    <section
      id="preguntas"
      data-tone="light"
      aria-labelledby="preguntas-title"
      className="border-t border-line bg-white px-5 py-24 text-ink sm:px-8 lg:px-12 lg:py-36"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <p className="eyebrow text-ink-muted">{FAQ.eyebrow}</p>
          <div id="preguntas-title">
            <LineReveal text={FAQ.headline.text} accent={FAQ.headline.accent} className="mt-5 text-h2 font-semibold" />
          </div>
        </div>

        <div className="border-b border-line lg:col-span-7">
          {FAQ.items.map((item, i) => (
            <details key={item.question} name={GROUP} open={i === 0} className="group border-t border-line">
              <summary className="flex cursor-pointer list-none items-baseline gap-5 py-6 [&::-webkit-details-marker]:hidden">
                <span aria-hidden="true" className="font-mono text-[11px] text-ink-muted tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="flex-1 text-lg font-semibold lg:text-xl">{item.question}</h3>
                <span
                  aria-hidden="true"
                  className="text-xl leading-none font-light text-ink-muted transition-transform duration-300 ease-editorial group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="max-w-2xl space-y-3 pb-8 pl-[2.375rem] text-ink-muted">
                {item.answer.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
