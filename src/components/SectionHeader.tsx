import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SectionHeaderProps {
  caption: string
  heading: string
  subtitle: string
  align?: 'center' | 'left'
  light?: boolean
}

export default function SectionHeader({
  caption,
  heading,
  subtitle,
  align = 'center',
  light = false,
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      tl.from(el.querySelector('.caption'), {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
      })
        .from(
          el.querySelector('.heading'),
          {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.45'
        )
        .from(
          el.querySelector('.subtitle'),
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.7'
        )
    }, el)

    return () => ctx.revert()
  }, [])

  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <div ref={ref} className={`flex flex-col ${alignClass} max-w-2xl mx-auto`}>
      <span
        className={`caption font-body text-xs uppercase tracking-[0.15em] text-electric-blue mb-4`}
      >
        {caption}
      </span>
      <h2
        className={`heading font-display text-4xl md:text-[40px] leading-tight tracking-tight ${
          light ? 'text-deep-space' : 'text-white'
        }`}
      >
        {heading}
      </h2>
      <p
        className={`subtitle font-body text-lg md:text-xl leading-relaxed mt-4 ${
          light ? 'text-deep-space/70' : 'text-silver'
        } ${align === 'center' ? 'max-w-xl' : 'max-w-lg'}`}
      >
        {subtitle}
      </p>
    </div>
  )
}
