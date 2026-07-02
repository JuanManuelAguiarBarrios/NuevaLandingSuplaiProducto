import HeroSection          from '@/components/sections/HeroSection'
import ManifiestoSection    from '@/components/sections/ManifiestoSection'
import IntegrationsMarquee  from '@/components/sections/IntegrationsMarquee'
import ProblemaSection      from '@/components/sections/ProblemaSection'
import SolucionSection      from '@/components/sections/SolucionSection'
import AgentesSection       from '@/components/sections/AgentesSection'
import EmpresasSection      from '@/components/sections/EmpresasSection'
import ComoTrabajamosSection from '@/components/sections/ComoTrabajamosSection'
import VisionSection        from '@/components/sections/VisionSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ManifiestoSection />
      <IntegrationsMarquee />
      <ProblemaSection />
      <SolucionSection />
      <AgentesSection />
      <EmpresasSection />
      <ComoTrabajamosSection />
      <VisionSection />
    </main>
  )
}
