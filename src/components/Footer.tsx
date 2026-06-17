import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const vehicleLinks = ['Vehicles', 'Technology', 'Charging', 'Support']
const companyLinks = ['About', 'Careers', 'Press', 'Investors']
const legalLinks = ['Privacy', 'Terms', 'Cookies']

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = footerRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const cols = el.querySelectorAll('.footer-col')
      gsap.from(cols, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="w-full bg-night-navy py-20 px-5 md:px-10"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {/* Column 1: Brand */}
        <div className="footer-col">
          <h3 className="font-display text-2xl text-white mb-2">AETHER</h3>
          <p className="font-body text-sm text-silver mb-6">
            The future of electric performance
          </p>
          <div className="flex flex-col gap-2">
            {vehicleLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="font-body text-sm text-silver hover:text-white transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Company & Legal */}
        <div className="footer-col grid grid-cols-2 gap-8">
          <div>
            <h4 className="font-body text-xs uppercase tracking-[0.08em] text-white mb-4">
              Company
            </h4>
            <div className="flex flex-col gap-2">
              {companyLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-body text-sm text-silver hover:text-white transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-body text-xs uppercase tracking-[0.08em] text-white mb-4">
              Legal
            </h4>
            <div className="flex flex-col gap-2">
              {legalLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-body text-sm text-silver hover:text-white transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Column 3: Connect & Newsletter */}
        <div className="footer-col">
          <h4 className="font-body text-xs uppercase tracking-[0.08em] text-white mb-4">
            Connect
          </h4>
          <div className="flex gap-4 mb-6">
            {/* Social icons as simple text for now */}
            {['X', 'IG', 'LI', 'YT'].map((social) => (
              <a
                key={social}
                href="#"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs text-silver hover:text-neon-cyan hover:border-neon-cyan/50 transition-all duration-300"
              >
                {social}
              </a>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 glass rounded-full px-4 py-2.5 font-body text-sm text-white placeholder:text-dim bg-transparent focus:outline-none focus:border-electric-blue/50"
            />
            <button className="w-10 h-10 rounded-full bg-electric-blue flex items-center justify-center hover:scale-105 transition-transform">
              <ArrowRight size={16} className="text-deep-space" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="font-body text-xs uppercase tracking-[0.08em] text-dim">
          2026 AETHER Motors
        </span>
        <span className="font-body text-xs uppercase tracking-[0.08em] text-dim">
          All rights reserved
        </span>
      </div>
    </footer>
  )
}
