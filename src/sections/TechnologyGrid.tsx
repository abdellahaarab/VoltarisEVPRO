import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '@/components/SectionHeader'
import GlassCard from '@/components/GlassCard'
import {
  BatteryCharging,
  Cpu,
  Wifi,
  Gauge,
  Eye,
  LayoutDashboard,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const techCards = [
  {
    icon: BatteryCharging,
    title: 'Battery Intelligence',
    desc: 'AI-optimized cell management extends battery life by 40%. Real-time health monitoring predicts maintenance before issues arise.',
  },
  {
    icon: Cpu,
    title: 'Neural Drive',
    desc: 'Onboard supercomputer processes 2,000 teraflops. Deep learning enables predictive handling and personalized driving dynamics.',
  },
  {
    icon: Wifi,
    title: 'Continuous Evolution',
    desc: 'Your vehicle improves over time. Monthly software updates add features, enhance performance, and refine the driving experience.',
  },
  {
    icon: Gauge,
    title: 'Energy Management',
    desc: 'Intelligent routing integrates charging stations, energy prices, and driving style to minimize costs and maximize efficiency.',
  },
  {
    icon: Eye,
    title: 'Sensor Fusion',
    desc: '12 cameras, 5 radars, and ultrasonic sensors create a 360-degree environmental model with centimeter-level precision.',
  },
  {
    icon: LayoutDashboard,
    title: '8K Interface',
    desc: 'Seamless 8K panoramic display replaces traditional gauges. Customizable layouts adapt to driving mode and personal preference.',
  },
]

export default function TechnologyGrid() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll('.tech-card')
      gsap.from(cards, {
        opacity: 0,
        y: 60,
        scale: 0.95,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="technology"
      ref={sectionRef}
      className="w-full py-24 md:py-32 px-5 md:px-10"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          caption="TECHNOLOGY"
          heading="Intelligence in Every System"
          subtitle="Six pillars of innovation that define the AETHER driving experience."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {techCards.map((card) => (
            <div key={card.title} className="tech-card group">
              <GlassCard
                padding="p-8"
                className="relative overflow-hidden h-full"
              >
                {/* Light sweep effect */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-600"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
                    transform: 'translateX(-100%)',
                    animation: 'none',
                  }}
                />
                <style>{`
                  .group:hover .light-sweep {
                    animation: sweep 0.6s ease forwards;
                  }
                  @keyframes sweep {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(100%); }
                  }
                `}</style>
                <div className="light-sweep absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100" />

                <card.icon
                  size={28}
                  className="text-electric-blue mb-4"
                />
                <h3 className="font-body text-lg font-medium text-white mb-3">
                  {card.title}
                </h3>
                <p className="font-body text-sm text-silver leading-relaxed">
                  {card.desc}
                </p>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
