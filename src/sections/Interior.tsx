import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Leaf, Hexagon, Lightbulb, Monitor } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const materials = [
  { icon: Leaf, label: 'Vegan Leather' },
  { icon: Hexagon, label: 'Carbon Fiber' },
  { icon: Lightbulb, label: 'Ambient LED' },
  { icon: Monitor, label: '8K Panoramic Display' },
]

export default function Interior() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Background parallax
      const bg = el.querySelector('.interior-bg')
      if (bg) {
        gsap.to(bg, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // Heading entrance
      gsap.from(el.querySelector('.interior-heading'), {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      })

      // Pills stagger
      gsap.from(el.querySelectorAll('.material-pill'), {
        opacity: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
        delay: 0.3,
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="interior"
      ref={sectionRef}
      className="relative w-full min-h-[80vh] overflow-hidden"
    >
      {/* Background image */}
      <div className="interior-bg absolute inset-0 z-0">
        <img
          src="/images/interior-cockpit.jpg"
          alt="AETHER ONE luxury interior cockpit"
          className="w-full h-full object-cover scale-110"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(transparent 40%, #050816 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-[80vh] flex flex-col items-center justify-end pb-16 md:pb-20 px-6">
        <h2 className="interior-heading font-display text-3xl md:text-4xl text-white text-center mb-6">
          Luxury Interior
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          {materials.map((mat) => (
            <div
              key={mat.label}
              className="material-pill glass rounded-full px-6 py-2.5 flex items-center gap-2"
            >
              <mat.icon size={16} className="text-electric-blue" />
              <span className="font-body text-sm text-white">
                {mat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
