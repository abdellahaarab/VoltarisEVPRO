import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '@/components/SectionHeader'

gsap.registerPlugin(ScrollTrigger)

const specs = [
  { label: 'Drivetrain', value: 'Dual Motor All-Wheel Drive' },
  { label: 'Max Power', value: '1,200 HP' },
  { label: 'Max Torque', value: '1,500 Nm' },
  { label: '0–100 km/h', value: '2.3 seconds' },
  { label: 'Top Speed', value: '350 km/h' },
  { label: 'Range (WLTP)', value: '1,000 km' },
  { label: 'Battery Capacity', value: '150 kWh' },
  { label: 'Charging (800V)', value: '10%–80% in 15 min' },
  { label: 'Curb Weight', value: '2,250 kg' },
  { label: 'Drag Coefficient', value: '0.19 Cd' },
]

export default function Specifications() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const rows = el.querySelectorAll('.spec-row')
      gsap.from(rows, {
        opacity: 0,
        x: 30,
        stagger: 0.06,
        duration: 0.5,
        ease: 'power2.out',
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
      ref={sectionRef}
      className="w-full py-24 md:py-32 px-5 md:px-10 bg-night-navy"
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          caption="SPECIFICATIONS"
          heading="The Numbers Behind the Experience"
          subtitle="Every specification represents an engineering decision made in pursuit of perfection."
        />

        <div className="mt-16 space-y-0">
          {specs.map((spec, i) => (
            <div
              key={i}
              className="spec-row flex justify-between items-center py-5 border-b border-white/[0.06]"
            >
              <span className="font-body text-sm text-dim">
                {spec.label}
              </span>
              <span className="font-mono text-sm text-white tabular-nums">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
