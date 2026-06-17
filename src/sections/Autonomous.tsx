import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '@/components/SectionHeader'
import GlassCard from '@/components/GlassCard'
import { Brain, ParkingCircle, Route, MapPin } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: Brain,
    title: 'AI Pilot',
    desc: 'Full self-driving capability on highways and urban environments. Neural network trained on 10 billion miles of real-world driving data.',
  },
  {
    icon: ParkingCircle,
    title: 'Smart Parking',
    desc: 'Parallel, perpendicular, and angle parking handled automatically. The vehicle identifies and navigates into any suitable space.',
  },
  {
    icon: Route,
    title: 'Highway Co-Pilot',
    desc: 'Lane keeping, adaptive cruise control, and automatic lane changes. Hands-free on approved highway segments.',
  },
  {
    icon: MapPin,
    title: 'Predictive Navigation',
    desc: 'AI predicts your destination based on patterns, optimizes routes for charging stops, and pre-conditions the battery.',
  },
]

export default function Autonomous() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll('.auto-card')
      gsap.from(cards, {
        opacity: 0,
        y: 50,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="autonomous"
      ref={sectionRef}
      className="w-full py-24 md:py-32 px-5 md:px-10 relative"
    >
      {/* Subtle radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,212,255,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          caption="AUTONOMOUS"
          heading="Drive Smarter. Not Harder."
          subtitle="AI-powered driving assistance that adapts to you."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {features.map((feat) => (
            <div key={feat.title} className="auto-card">
              <GlassCard padding="p-8">
                <feat.icon
                  size={32}
                  className="text-electric-blue mb-4"
                />
                <h3 className="font-body text-xl font-medium text-white mb-3">
                  {feat.title}
                </h3>
                <p className="font-body text-sm text-silver leading-relaxed">
                  {feat.desc}
                </p>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
