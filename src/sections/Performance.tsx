import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '@/components/SectionHeader'
import StatCounter from '@/components/StatCounter'
import GlassCard from '@/components/GlassCard'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 2.3, unit: '0–100 km/h', label: 'Dual-motor all-wheel drive', decimals: 1 },
  { value: 1200, unit: 'HP', label: 'Peak combined output', decimals: 0 },
  { value: 350, unit: 'km/h', label: 'Electronically limited', decimals: 0 },
  { value: 1000, unit: 'km', label: 'WLTP combined cycle', decimals: 0 },
]

export default function Performance() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll('.stat-card')
      gsap.from(cards, {
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      // Parallax for cards
      cards.forEach((card, i) => {
        const speed = 0.9 + i * 0.05
        gsap.to(card, {
          yPercent: -10 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="performance"
      ref={sectionRef}
      className="w-full py-24 md:py-32 px-5 md:px-10"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          caption="PERFORMANCE"
          heading="Engineered for the Extraordinary"
          subtitle="Every component optimized. Every millisecond matters."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 md:mt-20">
          {stats.map((stat, i) => (
            <div key={i} className="stat-card">
              <GlassCard>
                <StatCounter
                  value={stat.value}
                  unit={stat.unit}
                  label={stat.label}
                  decimals={stat.decimals}
                />
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
