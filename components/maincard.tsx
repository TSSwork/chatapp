"use client"
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { cn } from '@/lib/utils'

type MainCardProps = {
    title: string,
    description?: string,
    children: React.ReactNode,
    footer?: React.ReactElement,
    full?: boolean,
    width?: string,
    minHeight?: string
}

export default function MainCard({
    title,description,children,footer,full,
    width = 'w-[350px]',
    minHeight
}: MainCardProps) {
  return (
    <Card className={cn('flex flex-col w-full',full ? 'w-full' : width, minHeight && `${minHeight}`)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {
            description && (
                <CardDescription>{description}</CardDescription>
            )
        }
        
      </CardHeader>
      
      <CardContent className='flex flex-row flex-1 flex-grow'>
        {children}
      </CardContent>
      {
        footer && (
            <CardFooter className="flex justify-between">
                {footer}
            </CardFooter>
        )
      }
    </Card>
  )
}
