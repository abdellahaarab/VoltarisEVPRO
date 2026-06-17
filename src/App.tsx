import { useLenisInit } from '@/hooks/useLenis'
import Navigation from '@/components/Navigation'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import PageBackground from '@/components/PageBackground'
import Footer from '@/components/Footer'
import Hero from '@/sections/Hero'
import Performance from '@/sections/Performance'
import VehicleShowcase from '@/sections/VehicleShowcase'
import Battery from '@/sections/Battery'
import Autonomous from '@/sections/Autonomous'
import Interior from '@/sections/Interior'
import TechnologyGrid from '@/sections/TechnologyGrid'
import Specifications from '@/sections/Specifications'
import CTA from '@/sections/CTA'

export default function App() {
  useLenisInit()

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      <PageBackground />
      <Navigation />
      <ScrollProgressBar />
      <main>
        <Hero />
        <Performance />
        <VehicleShowcase />
        <Battery />
        <Autonomous />
        <Interior />
        <TechnologyGrid />
        <Specifications />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
