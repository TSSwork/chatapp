"use client"
import {ButtonProps, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import React from "react"
import { IconType } from "react-icons"
import LoadingWheel from "./loading"

type MainButtonProps = {
    styles?: ButtonProps,
    label: string,
    icon?: IconType
    onClick?: () => void,
    full?: boolean,
    type?: 'button' | 'submit' | 'reset'
    title?: string
    disabled?: boolean
}

type LoadingButtonProps = {
    styles?: ButtonProps,
    label: string,
    onClick?: () => void,
    full?: boolean,
    type?: 'button' | 'submit' | 'reset'
    title?: string
    isLoading?: boolean,
}
 
export function MainButton({
    styles,label,onClick,full,disabled,
    type = 'button',
    title = 'button',
    icon: Icon
}: MainButtonProps) {
  return( 
    <button 
    id={title}
    title={title}
    disabled={disabled}
    type={type}
    onClick={onClick}
    className={buttonVariants({
        variant: styles?.variant || 'default',
        size: styles?.size || 'default',
        className: cn('flex flex-row items-center justify-center gap-2 active:scale-95 transition-all px-3 py-2 ', full ? 'w-full' : 'w-fit')
    })}
    >
        {label}
        {
            Icon ? (
                <Icon />
            ):null
        }
    </button>
    )
}

export function LoadingButton({
    styles,label,onClick,full,
    type = 'button',
    title = 'button',
    isLoading
}: LoadingButtonProps) {
  return( 
    <button 
    id={title}
    title={title}
    disabled={isLoading}
    type={type}
    onClick={onClick}
    className={buttonVariants({
        variant: styles?.variant || 'default',
        size: styles?.size || 'default',
        className: cn('flex flex-row items-center justify-center gap-2 active:scale-95 transition-all px-3 py-2 ', full ? 'w-full' : 'w-fit')
    })}
    >
        {
            isLoading ? (
                <LoadingWheel />
            ):null
        }
        {label}
    </button>
    )
}