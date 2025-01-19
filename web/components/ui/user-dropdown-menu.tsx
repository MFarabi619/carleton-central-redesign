import type { ReactNode } from 'react'
import { cn } from "@/lib/utils"
import { cva } from 'class-variance-authority'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"


interface UserDropDownProps {
  name: string
  studentNumber: string
  variant?: 'default' | 'nested' | 'info'
  className?: string
}

const userDropDownVariants = cva(
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

export function UserDropDown({
  name,
  studentNumber,
  variant = 'default',
  className,
}: UserDropDownProps) {
  return (
    <div className={cn(userDropDownVariants({ variant, className }))}>
      <DropdownMenu>
        <DropdownMenuTrigger className='flex items-center gap-2 px-2'>
          <User size='24' className='text-primary-foreground' />
          <div className='hidden sm:block'>
            <div className='text-primary-foreground text-left '>{name}</div>
            <div className='text-primary-foreground text-xs text-left '>{studentNumber}</div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" />
              <Label htmlFor="airplane-mode">Dark Mode</Label>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
