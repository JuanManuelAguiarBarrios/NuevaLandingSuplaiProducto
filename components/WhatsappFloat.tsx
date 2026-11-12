'use client'

import { useEffect, useState } from 'react'
import { MessageIcon } from '@/components/product/icons'
import { WHATSAPP, whatsappUrl } from '@/content'

/**
 * Acceso flotante a WhatsApp. Aparece al salir del hero y se retira en el
 * cierre, donde ya están los botones de contacto. En mobile es solo el
 * ícono, abajo a la derecha y respetando el área segura; en desktop suma
 * la etiqueta. Tono neutro: el azul queda para el CTA primario.
 */

/** Secciones que ya ofrecen contacto: mientras se ven, el botón se oculta. */
const HIDE_OVER = ['#inicio', '#contacto']
/** Una sección cuenta como visible recién cuando pasa el 40% inferior de la pantalla. */
const OBSERVER_OPTIONS: IntersectionObserverInit = { rootMargin: '0px 0px -40% 0px' }

export default function WhatsappFloat() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const targets = HIDE_OVER.map((selector) => document.querySelector(selector)).filter(
      (el): el is Element => el !== null,
    )
    const onScreen = new Set<Element>()
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target)
        else onScreen.delete(entry.target)
      }
      setIsVisible(onScreen.size === 0)
    }, OBSERVER_OPTIONS)
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  return (
    <a
      href={whatsappUrl(WHATSAPP.message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={WHATSAPP.floatLabel}
      aria-hidden={!isVisible}
      tabIndex={isVisible ? undefined : -1}
      data-tone="light"
      className={`fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 inline-flex size-12 items-center justify-center gap-2.5 rounded-full border border-line bg-white text-ink shadow-lg transition-[opacity,transform,visibility] duration-300 ease-editorial hover:bg-paper sm:right-6 sm:bottom-6 lg:size-auto lg:px-5 lg:py-3 ${
        isVisible ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-3 opacity-0'
      }`}
    >
      <MessageIcon className="size-5 lg:size-4" />
      <span aria-hidden="true" className="hidden text-sm font-medium lg:inline">
        {WHATSAPP.floatLabel}
      </span>
    </a>
  )
}
