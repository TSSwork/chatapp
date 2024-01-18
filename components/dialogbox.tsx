"use client"
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { cn } from '@/lib/utils';

  type DialogBoxProps = {
    title: string,
    description?: string,
    children: React.ReactNode;
    trigger?: React.ReactElement;
    footer?:React.ReactElement
    isOpen?:boolean;
    onClose?: () => void;
    size?: 'xs' |'sm' | 'md' | 'lg' | 'xl'
  }

export default function DialogBox({
    title,description,children,trigger,footer,isOpen,onClose,
    size = 'xs'
}: DialogBoxProps) {

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        {
            trigger && (
                <DialogTrigger asChild>
                    {trigger}
                </DialogTrigger>
            )
        }
    <DialogContent className={cn(
      size === 'xs' && 'w-full md:w-3/5 lg:w-2/5 2xl:w-1/4 min-w-[80%] md:min-w-[60%] lg:min-w-[40%] 2xl:min-w-[25%] max-w-[80%] md:max-w-[60%] lg:max-w-[40%] 2xl:max-w-[25%]',
      size === 'sm' && 'w-full md:w-2/3 lg:w-2/4 2xl:w-1/3 min-w-[80%] md:min-w-[60%] lg:min-w-[40%] 2xl:min-w-[25%] max-w-[80%] md:max-w-[60%] lg:max-w-[40%] 2xl:max-w-[25%]',
      size === 'md' && 'w-full md:w-3/4 lg:w-3/5 2xl:w-2/5 min-w-[80%] md:min-w-[66.666667%] lg:min-w-[50%] 2xl:min-w-[33.333333%] max-w-[80%] md:max-w-[66.666667%] lg:max-w-[50%] 2xl:max-w-[33.333333%]',
      size === 'lg' && 'w-full md:w-5/6 lg:w-3/4 2xl:w-3/5 min-w-[90%] md:min-w-[75%] lg:min-w-[60%] 2xl:min-w-[40%] max-w-[90%] md:max-w-[75%] lg:max-w-[60%] 2xl:max-w-[40%]',
      size === 'xl' && 'w-full md:w-5/6 2xl:w-3/4 min-w-[90%] md:min-w-[83.333333%] lg:min-w-[75%] 2xl:min-w-[60%] max-w-[90%] md:max-w-[83.333333%] lg:max-w-[75%] 2xl:max-w-[60%]',
    )}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>

        {
            description && (
                <DialogDescription>
                    {description}
                </DialogDescription>
            )
        }
        
      </DialogHeader>
      <div className='flex w-full flex-row flex-grow'>
        {children}
      </div>
      {
        footer && (
            <DialogFooter>
                {footer}
            </DialogFooter>
        )
      }
      
    </DialogContent>
  </Dialog>
  )
}
