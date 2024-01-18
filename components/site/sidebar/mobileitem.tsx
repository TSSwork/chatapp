import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'

type MobileItemProps = {
    href: string;
    icon: any;
    active?: boolean;
    onClick?: () => void;
  }

export default function Mobileitem({ 
    href, 
    icon: Icon, 
    active,
    onClick
  }: MobileItemProps) {
    const handleClick = () => {
        if (onClick) {
          return onClick();
        }
      };
  return (
    <Link 
      onClick={handleClick} 
      href={href} 
      className={cn(`
        group 
        flex 
        gap-x-3 
        text-sm 
        leading-6 
        font-semibold 
        w-full 
        justify-center 
        p-4 
        text-gray-500 
        hover:text-black 
        hover:bg-gray-100
      `,
        active && 'bg-gray-100 text-black',
      )}>
      <Icon className="h-6 w-6" />
    </Link>
  )
}
