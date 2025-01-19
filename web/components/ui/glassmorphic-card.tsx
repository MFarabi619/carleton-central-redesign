import type { ReactNode } from 'react'
import { cn } from "@/lib/utils"
import { cva } from 'class-variance-authority'

interface GlassmorphicCardProps {
  children: ReactNode
  variant?: 'default' | 'nested' | 'info'
  className?: string
}

const glassmorphicCardVariants = cva(
  'relative border backdrop-blur-md rounded-xl shadow-lg border-border bg-opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-white/20 border-white/30',
        nested: 'bg-white/10 border-white/20',
        info: 'bg-blue-500/20 border-blue-500/30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export function GlassmorphicCard({
  children,
  variant = 'default',
  className,
}: GlassmorphicCardProps) {
  return (
    <div className={cn(glassmorphicCardVariants({ variant, className }))}>
      {children}
    </div>
  )
}
