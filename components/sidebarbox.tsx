"use client"
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"

  type SidebarBoxProps = {
    title: string;
    description?: string;
    children: React.ReactNode;
    trigger?: React.ReactElement;
    footer?:React.ReactElement;
    side?: 'top' | 'left' | 'right' | 'bottom';
    isOpen?:boolean;
    onClose?: () => void;
  }

export default function SidebarBox({
    title,description,children,trigger,footer,isOpen,onClose,
    side = 'right'
}: SidebarBoxProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
        {
            trigger && (
                <SheetTrigger asChild>
                    {trigger}
                </SheetTrigger>
            )
        }
      
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {
            description && (
                <SheetDescription>
                    {description}
                </SheetDescription>
            )
          }
          
        </SheetHeader>
        <div className='flex flex-row flex-grow  w-full py-3'>
        {children}
        </div>
        
        {
            footer && (
                <SheetFooter>
                    {footer}
                </SheetFooter>
            )
        }
        
      </SheetContent>
    </Sheet>
  )
}
