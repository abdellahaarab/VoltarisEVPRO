import type { ReactNode } from 'react'

interface PillButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  className?: string
  href?: string
}

export default function PillButton({
  children,
  variant = 'primary',
  onClick,
  className = '',
  href,
}: PillButtonProps) {
  const baseStyles =
    'font-body font-medium text-sm px-8 py-3.5 rounded-full transition-all duration-300 inline-flex items-center justify-center'

  const variants = {
    primary: `${baseStyles} bg-electric-blue text-deep-space hover:scale-105 hover:shadow-glow-btn`,
    secondary: `${baseStyles} border border-electric-blue text-electric-blue hover:bg-electric-blue/10 hover:scale-105`,
  }

  if (href) {
    return (
      <a href={href} className={`${variants[variant]} ${className}`} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={`${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}
