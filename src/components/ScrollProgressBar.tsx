import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const ctx = gsap.context(() => {
      gsap.to(bar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-40 h-[3px] bg-transparent">
      <div
        ref={barRef}
        className="h-full progress-gradient origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
