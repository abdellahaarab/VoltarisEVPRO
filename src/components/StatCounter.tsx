import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface StatCounterProps {
  value: number
  unit: string
  label: string
  decimals?: number
  suffix?: string
}

export default function StatCounter({
  value,
  unit,
  label,
  decimals = 1,
  suffix = '',
}: StatCounterProps) {
  const numberRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = numberRef.current
    if (!el) return

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        if (hasAnimated.current) return
        hasAnimated.current = true
        const obj = { val: 0 }
        gsap.to(obj, {
          val: value,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent =
              (decimals > 0
                ? obj.val.toFixed(decimals)
                : Math.round(obj.val).toString()) + suffix
          },
        })
      },
    })

    return () => trigger.kill()
  }, [value, decimals, suffix])

  return (
    <div className="text-center">
      <span
        ref={numberRef}
        className="font-mono text-5xl font-light text-neon-cyan tabular-nums"
      >
        0{suffix}
      </span>
      <p className="font-body text-lg text-silver mt-1">{unit}</p>
      <p className="font-body text-sm text-dim mt-1">{label}</p>
    </div>
  )
}
