"use client"
import React, { useState } from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
  import { toast } from 'sonner';
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { signIn } from 'next-auth/react'

import { useRouter } from 'next/navigation';
import { LoadingButton } from '@/components/mainbutton';

export default function LoginForm() {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const LoginInputSchema = z.object({
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(1, { message: 'Password is required' }),
    })
    type TLoginInputSchema = z.infer<typeof LoginInputSchema>

    const formLogin = useForm<TLoginInputSchema>({
        resolver: zodResolver(LoginInputSchema),
        defaultValues:{
            email: '',
            password: '',
        }
      })
    
    const loginSubmit: SubmitHandler<TLoginInputSchema> = (data) => {
        setIsLoading(true);
       
        signIn('credentials', {
            ...data,
            redirect:false
        })
        .then((callback) => {
            if (callback?.error){
                toast.error("Invalid credentials")
            }
            if (callback?.ok && !callback?.error){
                toast.success("Logged in successfully")
                router.refresh();
                formLogin.reset();
            }
        })
        .finally(() => {
            setIsLoading(false);
        })
    }
  return (
    <div className='w-full'>
        <Form {...formLogin}>
            <form onSubmit={formLogin.handleSubmit(loginSubmit)} className="flex flex-col w-full space-y-1 ">
                                    
                <FormField
                control={formLogin.control}
                name="email"
                render={({ field }) => (
                    <FormItem className='py-2'>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter your email" className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                control={formLogin.control}
                name="password"
                render={({ field }) => (
                    <FormItem className='py-2'>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="Enter your password" className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                
                
                <LoadingButton type="submit" styles={{
                    className: "mt-3"
                }} 
                isLoading={isLoading}
                label={"Sign In"}
                full onClick={formLogin.handleSubmit(loginSubmit)}/>

            </form>
        </Form>
    </div>
  )
}
