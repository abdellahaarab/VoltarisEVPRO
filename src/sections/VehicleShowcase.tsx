import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GlassCard from '@/components/GlassCard'
import PillButton from '@/components/PillButton'

gsap.registerPlugin(ScrollTrigger)

const specPills = ['1200 HP', '1000 km Range', '2.3s 0-100']

export default function VehicleShowcase() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Background parallax
      const bg = el.querySelector('.vehicle-bg')
      if (bg) {
        gsap.to(bg, {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        })
      }

      // Glass panel entrance
      const panel = el.querySelector('.vehicle-panel')
      if (panel) {
        gsap.from(panel, {
          opacity: 0,
          x: -60,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        })

        gsap.to(panel, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        })
      }
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="vehicles"
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* Background image */}
      <div className="vehicle-bg absolute inset-0 z-0">
        <img
          src="/images/hero-vehicle.jpg"
          alt="AETHER ONE electric vehicle"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-deep-space/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-end px-6 md:px-16 pb-16 md:pb-20">
        <div className="vehicle-panel max-w-lg">
          <GlassCard padding="p-8 md:p-10">
            <h2 className="font-display text-3xl md:text-4xl text-white mb-3">
              AETHER ONE
            </h2>
            <p className="font-body text-lg text-silver mb-6">
              The Defining Electric Grand Tourer
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {specPills.map((pill) => (
                <span
                  key={pill}
                  className="glass rounded-full px-5 py-2 font-body text-sm text-white"
                >
                  {pill}
                </span>
              ))}
            </div>

            <PillButton variant="primary">Configure Vehicle</PillButton>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
