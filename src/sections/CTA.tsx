import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PillButton from '@/components/PillButton'

gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Background parallax
      const bg = el.querySelector('.cta-bg')
      if (bg) {
        gsap.to(bg, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // Content entrance
      gsap.from(el.querySelector('.cta-heading'), {
        opacity: 0,
        y: 50,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from(el.querySelector('.cta-subtitle'), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
        delay: 0.2,
      })

      gsap.from(el.querySelector('.cta-buttons'), {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
        delay: 0.4,
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="cta-bg absolute inset-0 z-0">
        <img
          src="/images/cta-cityscape.jpg"
          alt="Night city with electric vehicle"
          className="w-full h-full object-cover scale-110"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(5,8,22,0.7)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <h2
          className="cta-heading font-display text-3xl sm:text-4xl md:text-5xl text-white tracking-wide"
          style={{
            textShadow: '0 0 60px rgba(0,212,255,0.3)',
          }}
        >
          DRIVE TOMORROW TODAY
        </h2>

        <p className="cta-subtitle font-body text-lg md:text-xl text-silver mt-4 max-w-lg mx-auto">
          Configure your AETHER One and join the electric revolution.
        </p>

        <div className="cta-buttons flex flex-row gap-4 justify-center mt-10">
          <PillButton variant="primary">Configure Vehicle</PillButton>
          <PillButton variant="secondary">Schedule Test Drive</PillButton>
        </div>
      </div>
    </section>
  )
}
