"use client"
import React, {useState, useCallback, useEffect} from 'react'
import MainCard from '../maincard';
import { FcGoogle } from "react-icons/fc";

import { OauthActions, OauthButton } from '../oauthbutton';
import { useRouter } from 'next/navigation';
import LoginForm from './forms/loginform';
import RegisterForm from './forms/rgisterform';
import { useSession } from 'next-auth/react';

type TVariant = 'LOGIN' | 'REGISTER'

export default function AuthForm() {

    const session = useSession();
    const [variant, setVariant] = useState<TVariant>('LOGIN')
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN'){
            setVariant('REGISTER')
        }else{
            setVariant('LOGIN')
        }
      },
      [variant],
    )

    useEffect(() => {
        if(session?.status === 'authenticated'){
            router.push('/dashboard')
        }
    }, [session?.status, router])

    
  return (
    <div className=' mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <MainCard full title={variant === 'LOGIN' ? "Sign in to your account" : "Register your account"}>
        <div className='flex flex-col space-y-5 w-full'>
        {
            variant === 'LOGIN' ? (
                <LoginForm />
            ): (
                <RegisterForm />
            )
        }
        
        <div className='mt-6'>
            <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                    <div className='w-full border-t border-2 border-gray-300 ' />
                </div>
                <div className='relative flex justify-center text-center text-sm'>
                    <span className='bg-white px-2 text-gray-500 rounded-lg'>
                        Or continue with
                    </span>
                </div>
            </div>
        </div>
        <OauthButton label='Sign in with Google' icon={FcGoogle} onClick={() => OauthActions("google",setIsLoading)} />
        <div className='flex flex-row justify-center items-center'>
            {
                variant === 'LOGIN' ? (
                    <h3 className='text-sm text-gray-700 font-semibold flex flex-row gap-2'>
                        New to chatapp
                    <span onClick={toggleVariant} 
                    className=' text-rose-600 hover:underline cursor-pointer'>Register</span>
                    </h3>
                ):(
                    <h3 className='text-sm text-gray-700 font-semibold flex flex-row gap-2'>
                        Already have an account
                    <span onClick={toggleVariant} 
                    className=' text-rose-600 hover:underline cursor-pointer'>Sign in</span>
                    </h3>
                )
            }
        </div>
        </div>
    </MainCard>
    </div>
  )
}
