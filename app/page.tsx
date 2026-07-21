import HeroSection          from '@/components/sections/HeroSection'
import ProblemaSection      from '@/components/sections/ProblemaSection'
import SolucionSection      from '@/components/sections/SolucionSection'
import AgentesSection       from '@/components/sections/AgentesSection'
import EmpresasSection      from '@/components/sections/EmpresasSection'
import ComoTrabajamosSection from '@/components/sections/ComoTrabajamosSection'
import VisionSection        from '@/components/sections/VisionSection'

export default function Home() {
  return (
    <main id="main-content">
      <HeroSection />
      <ProblemaSection />
      <SolucionSection />
      <AgentesSection />
      <EmpresasSection />
      <ComoTrabajamosSection />
      <VisionSection />
    </main>
  )
}
