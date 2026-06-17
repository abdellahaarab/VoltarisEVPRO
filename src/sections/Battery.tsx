import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '@/components/SectionHeader'
import { Zap, Shield, Recycle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: Zap,
    title: 'Ultra-Fast Charging',
    desc: '10% to 80% in just 15 minutes. The 800V architecture enables charging speeds that redefine convenience.',
  },
  {
    icon: Shield,
    title: 'Intelligent Thermal Management',
    desc: 'Liquid-cooled battery system maintains optimal temperature across all climates, from desert highways to alpine passes.',
  },
  {
    icon: Recycle,
    title: 'Regenerative Braking',
    desc: 'Recapture up to 30% of energy during deceleration. Every stop becomes a charge.',
  },
]

export default function Battery() {
  const sectionRef = useRef<HTMLElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const percentRef = useRef<HTMLSpanElement>(null)
  const batteryContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Left column entrance
      gsap.from(el.querySelector('.battery-left'), {
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      })

      // Right column entrance
      gsap.from(el.querySelector('.battery-right'), {
        opacity: 0,
        x: 40,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      })

      // Battery fill animation
      const fillEl = fillRef.current
      const percentEl = percentRef.current
      if (fillEl && percentEl) {
        const obj = { pct: 0 }
        gsap.to(obj, {
          pct: 100,
          duration: 3,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: el,
            start: 'top 70%',
            once: true,
          },
          onUpdate: () => {
            fillEl.style.height = `${obj.pct}%`
            percentEl.textContent = `${Math.round(obj.pct)}%`
          },
        })
      }

      // Feature list stagger
      gsap.from(el.querySelectorAll('.battery-feature'), {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="battery"
      ref={sectionRef}
      className="w-full py-24 md:py-32 px-5 md:px-10"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left column */}
        <div className="battery-left">
          <div className="lg:text-left">
            <SectionHeader
              caption="BATTERY"
              heading="Intelligent Energy Architecture"
              subtitle="800V system. 10 minutes to 80%. Zero compromise."
              align="left"
            />
          </div>

          <div className="mt-12 space-y-6">
            {features.map((feat) => (
              <div
                key={feat.title}
                className="battery-feature flex gap-4 items-start"
              >
                <div className="w-10 h-10 rounded-lg glass flex items-center justify-center flex-shrink-0">
                  <feat.icon size={20} className="text-electric-blue" />
                </div>
                <div>
                  <h3 className="font-body text-lg font-medium text-white mb-1">
                    {feat.title}
                  </h3>
                  <p className="font-body text-sm text-silver leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column - Battery visualization */}
        <div className="battery-right flex justify-center">
          <div
            ref={batteryContainerRef}
            className="glass rounded-3xl p-10 backdrop-blur-xl"
          >
            {/* Battery terminal */}
            <div className="flex justify-center mb-2">
              <div className="w-12 h-3 border-2 border-white/15 rounded-t-md" />
            </div>

            {/* Battery body */}
            <div className="relative w-48 h-72 md:w-52 md:h-80 border-3 border-white/15 rounded-3xl overflow-hidden">
              {/* Charge fill */}
              <div
                ref={fillRef}
                className="absolute bottom-0 left-0 right-0 rounded-b-3xl"
                style={{
                  height: '0%',
                  background:
                    'linear-gradient(180deg, #00D4FF 0%, #00F5FF 100%)',
                  transition: 'none',
                }}
              />

              {/* Percentage text */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <span
                  ref={percentRef}
                  className="font-mono text-5xl md:text-6xl text-white font-light tabular-nums drop-shadow-lg"
                >
                  0%
                </span>
              </div>

              {/* Glass overlay */}
              <div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{ backdropFilter: 'blur(1px)' }}
              />
            </div>

            <p className="text-center font-body text-sm text-silver mt-6">
              800V Architecture
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
