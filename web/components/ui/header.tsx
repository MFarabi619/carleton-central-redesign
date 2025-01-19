import { cn } from "@/lib/utils"
import { cva } from 'class-variance-authority'

interface HeaderProps {
  text: string
  variant?: 'default'
  className?: string
}

const headerVariants = cva(
  'flex flex-col sm:flex-row justify-center items-center sm:gap-3 overflow-hidden',
  {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export function Header({
  text,
  variant = 'default',
  className,
}: HeaderProps) {

  return (
    <div className={cn(headerVariants({ variant, className }))}>
      <p className="text-nowrap text-primary font-bold  text-3xl sm:text-4xl">{text}</p>
      <div className="h-1 w-full bg-primary" />
    </div>
  )
}