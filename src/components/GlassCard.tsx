import type { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  padding?: string
}

export default function GlassCard({
  children,
  className = '',
  hover = true,
  padding = 'p-6',
}: GlassCardProps) {
  return (
    <div
      className={`
        glass rounded-2xl ${padding}
        ${hover ? 'glass-hover cursor-default' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
