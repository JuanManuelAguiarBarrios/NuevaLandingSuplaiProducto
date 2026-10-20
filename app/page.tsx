import Footer from '@/components/Footer'
import HeroSection from '@/components/sections/HeroSection'
import ClientesSection from '@/components/sections/ClientesSection'
import ProblemaSection from '@/components/sections/ProblemaSection'
import SolucionSection from '@/components/sections/SolucionSection'
import AgentesSection from '@/components/sections/AgentesSection'
import IndustriasSection from '@/components/sections/IndustriasSection'
import ComoTrabajamosSection from '@/components/sections/ComoTrabajamosSection'
import PrincipiosSection from '@/components/sections/PrincipiosSection'
import CierreSection from '@/components/sections/CierreSection'

/**
 * Recorrido: qué es y para quién (hero) → quién confía → el problema → la
 * solución → los agentes → por industria → cómo empezamos → cómo
 * acompañamos → cierre con contacto. Los tonos alternan claro y oscuro.
 */
export default function Home() {
  return (
    <>
      <main id="main-content">
        <HeroSection />
        <ClientesSection />
        <ProblemaSection />
        <SolucionSection />
        <AgentesSection />
        <IndustriasSection />
        <ComoTrabajamosSection />
        <PrincipiosSection />
        <CierreSection />
      </main>
      <Footer />
    </>
  )
}
