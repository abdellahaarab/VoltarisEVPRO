import { useEffect, useRef } from 'react'
import { Suspense, lazy } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PillButton from '@/components/PillButton'
import { getLenis } from '@/hooks/useLenis'

gsap.registerPlugin(ScrollTrigger)

const EnergyWaveform = lazy(() => import('@/components/EnergyWaveform'))

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    // Entrance animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      tl.from('.hero-caption', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
      })
        .from(
          '.hero-headline',
          {
            opacity: 0,
            y: 60,
            duration: 1.0,
            ease: 'power3.out',
          },
          0.2
        )
        .from(
          '.hero-subtitle',
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out',
          },
          0.6
        )
        .from(
          '.hero-cta',
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power3.out',
          },
          0.9
        )

      // Pin and exit on scroll
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=200',
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress
          gsap.set(content, {
            opacity: 1 - progress,
            y: -progress * 100,
          })
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const scrollToFeatures = () => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo('#performance')
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.08) 0%, transparent 60%), radial-gradient(ellipse at 50% 100%, #0B1120 0%, #050816 100%)',
        }}
      />

      {/* 3D Waveform */}
      <Suspense fallback={null}>
        <EnergyWaveform />
      </Suspense>

      {/* Content overlay */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
      >
        <p className="hero-caption font-body text-xs uppercase tracking-[0.15em] text-electric-blue mb-6">
          INTRODUCING AETHER ONE
        </p>

        <h1 className="hero-headline font-display text-4xl sm:text-5xl md:text-[56px] leading-[1.05] tracking-tight text-white">
          THE FUTURE OF{' '}
          <span className="text-electric-blue neon-glow">ELECTRIC</span>{' '}
          PERFORMANCE
        </h1>

        <p className="hero-subtitle font-body text-lg md:text-xl text-silver mt-5 max-w-xl mx-auto leading-relaxed">
          Unmatched Range. Instant Power. Pure Innovation.
        </p>

        <div className="hero-cta flex flex-row gap-4 justify-center mt-10">
          <PillButton variant="primary" onClick={scrollToFeatures}>
            Reserve Now
          </PillButton>
          <PillButton variant="secondary" onClick={scrollToFeatures}>
            Explore Features
          </PillButton>
        </div>
      </div>
    </section>
  )
}
