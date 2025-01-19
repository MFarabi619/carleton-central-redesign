import type { ReactNode } from 'react'
import { cn } from "@/lib/utils"
import { cva } from 'class-variance-authority'
import CarletonName from '@/assets/CarletonName.svg'
import CarletonShield from '@/assets/CarletonShield.svg'

interface CarletonLogoProps {
  variant?: 'default' | 'shield'
  className?: string
}

const carletonLogoVariants = cva(
  '',
  {
    variants: {
      variant: {
        default: 'flex items-center space-x-4',
        shield: 'px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export function CarletonLogo({
  variant = 'default',
  className,
}: CarletonLogoProps) {
  return (
    <div className={cn(carletonLogoVariants({ variant, className }))}>
      {variant === 'default' &&
      <img
      src={CarletonName}
      alt="Carleton Name"
      className="h-full w-auto object-cover"
    />
      }
      <img
          src={CarletonShield}
          alt="Carleton Shield"
          className="h-full w-auto object-cover"
        />

    </div>
  )
}
