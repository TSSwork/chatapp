"use client"
import React from 'react'
import { IconType } from 'react-icons'
import { toast } from 'sonner';
import { MainButton } from './mainbutton';
import { signIn } from 'next-auth/react';


interface OauthButtonProps {
    icon: IconType;
    onClick: () => void;
    label: string;
}

export function OauthButton({
    icon: Icon,
    onClick,
    label
}: OauthButtonProps) {
  return (
    <MainButton 
    label={label}
    styles={{
        variant: 'outline'
    }}
    full
    onClick={onClick}
    icon={Icon}
    />
    
  )
}

export const OauthActions = (action: string, setIsLoading: (status:boolean) => void ) => {


  setIsLoading(true);

  signIn(action, {
      redirect:false,
      callbackUrl: '/'
  })
  .then((callback) => {
      if (callback?.error){
          toast.error("Invalid credentials")
      }
      if (callback?.ok && !callback?.error){
          toast.success("Logged in successfully")
      }
  })
  .finally(() => {
      setIsLoading(false);
  })
}


