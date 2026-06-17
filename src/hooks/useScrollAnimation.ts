import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollAnimationOptions {
  y?: number
  x?: number
  opacity?: number
  scale?: number
  duration?: number
  delay?: number
  stagger?: number
  ease?: string
  start?: string
  end?: string
  scrub?: boolean | number
  once?: boolean
  rotate?: number
}

export function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const {
      y = 40,
      x = 0,
      opacity = 0,
      scale,
      duration = 0.8,
      delay = 0,
      stagger = 0,
      ease = 'power3.out',
      start = 'top 80%',
      scrub,
      rotate,
    } = options

    const fromVars: gsap.TweenVars = { opacity }
    if (y) fromVars.y = y
    if (x) fromVars.x = x
    if (scale !== undefined) fromVars.scale = scale
    if (rotate !== undefined) fromVars.rotate = rotate

    const toVars: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    }

    if (scale !== undefined) toVars.scale = 1
    if (rotate !== undefined) toVars.rotate = 0
    if (scrub !== undefined) {
      (toVars.scrollTrigger as ScrollTrigger.Vars).scrub = scrub
    }

    const targets = stagger > 0 ? el.children : el

    const ctx = gsap.context(() => {
      gsap.fromTo(targets, fromVars, {
        ...toVars,
        stagger: stagger > 0 ? stagger : undefined,
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return ref
}
