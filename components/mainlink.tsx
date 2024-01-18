"use client"
import Link from 'next/link'
import React from 'react'
import { ButtonProps, buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'
import { FaArrowRight } from "react-icons/fa6";

type MainLinkProps = {
    styles?: ButtonProps,
    label: string,
    href: string
    full?: boolean,
    noArrow?: boolean,
}

export default function MainLink({
    styles,label,href,full,noArrow
}: MainLinkProps) {
  return (
    <Link href={href || '#'} className={buttonVariants({
        variant: styles?.variant || 'link',
        size: styles?.size || 'default',
        className: cn('group flex flex-row items-center justify-center gap-2 transition-all', full && 'w-full')
    })}>
        {label}
        {
            !noArrow && (
                <span className='group-hover:translate-x-1 transition-all'>
                    <FaArrowRight size={11} />
                </span>
            )
        }

    </Link>
  )
}
