import type { ReactNode } from 'react'
import { cn } from "@/lib/utils"
import { cva } from 'class-variance-authority'
import { CarletonLogo } from './carleton-logo'
import { LayoutGrid } from 'lucide-react'
import { UserDropDown } from './user-dropdown-menu'
import { useUser } from '@gadgetinc/react'

interface NavBarProps {
  variant?: 'default'
  className?: string
}

const navBarVariants = cva(
  'h-16 p-2 bg-primary flex items-center justify-between', 
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

export function NavBar({
  variant = 'default',
  className,
}: NavBarProps) {

  console.log(useUser.toString) 

  return (
    <div className={cn(navBarVariants({ variant, className }))}>
      <div className='h-full flex items-center'>
      <CarletonLogo variant='shield' className='h-full' />
      <div className='text-primary-foreground' > Carleton Central</div>
    </div>

    <div className='h-full flex items-center gap-2 sm:gap-4'>
    
    <a href={'/'} className="clickable">
    <LayoutGrid size='24' className='text-primary-foreground' />
</a>


    
    <UserDropDown name='Mumtahin Farabi' studentNumber='101233445' />
</div>
    </div>
  )
}
