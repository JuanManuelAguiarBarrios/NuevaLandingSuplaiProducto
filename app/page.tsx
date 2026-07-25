import HeroSection          from '@/components/sections/HeroSection'
import ManifiestoSection    from '@/components/sections/ManifiestoSection'
import ProblemaSection      from '@/components/sections/ProblemaSection'
import SolucionSection      from '@/components/sections/SolucionSection'
import AgentesSection       from '@/components/sections/AgentesSection'
import EmpresasSection      from '@/components/sections/EmpresasSection'
import ComoTrabajamosSection from '@/components/sections/ComoTrabajamosSection'
import ControlSection       from '@/components/sections/ControlSection'
import VisionSection        from '@/components/sections/VisionSection'

export default function Home() {
  return (
    <main id="main-content">
      <HeroSection />
      <ManifiestoSection />
      <ProblemaSection />
      <SolucionSection />
      <AgentesSection />
      <EmpresasSection />
      <ComoTrabajamosSection />
      <ControlSection />
      <VisionSection />
    </main>
  )
}
