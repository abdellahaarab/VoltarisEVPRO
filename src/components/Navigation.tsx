import { useEffect, useState } from 'react'
import { getLenis } from '@/hooks/useLenis'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'VEHICLES', href: '#vehicles' },
  { label: 'TECHNOLOGY', href: '#technology' },
  { label: 'CHARGING', href: '#battery' },
  { label: 'CONTACT', href: '#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(href)
    }
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-5 md:px-10 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(5,8,22,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <button
          onClick={() => {
            const lenis = getLenis()
            if (lenis) lenis.scrollTo(0)
          }}
          className="font-display text-xl text-white tracking-wide"
        >
          AETHER
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="font-body text-sm font-medium uppercase tracking-[0.1em] text-silver hover:text-white transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('#contact')}
            className="font-body text-sm font-medium bg-electric-blue text-deep-space px-6 py-2 rounded-full hover:scale-105 hover:shadow-glow-btn transition-all duration-300"
          >
            Reserve
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-deep-space flex flex-col items-center justify-center"
          style={{ animation: 'fadeIn 0.3s ease' }}
        >
          <button
            className="absolute top-5 right-5 text-white"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={32} />
          </button>
          {navLinks.map((link, i) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="font-display text-3xl text-white my-4 hover:text-electric-blue transition-colors"
              style={{
                animation: `fadeInUp 0.4s ease ${i * 0.08}s both`,
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}
