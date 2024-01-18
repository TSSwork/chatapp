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
import axios from 'axios';
import AxiosError from '@/lib/errors/axioserror';

export default function RegisterForm() {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const RegisterInputSchema = z.object({
        name: z.string().min(1, { message: 'Name is required' }),
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(5, { message: 'Password must be at least 5 characters' }),
    })
    type TRegisterInputSchema = z.infer<typeof RegisterInputSchema>

    const formRegister = useForm<TRegisterInputSchema>({
        resolver: zodResolver(RegisterInputSchema),
        defaultValues:{
            name: '',
            email: '',
            password: '',
        }
      })

      const registerSubmit: SubmitHandler<TRegisterInputSchema> = (data) => {
        setIsLoading(true);
        
        axios.post('/api/register', data)

        .then(() => {
            signIn('credentials', data);
            router.refresh();
            toast.success('Account created successfully');
            formRegister.reset()
        })
        .catch((err:any) => {
            let axiosError = AxiosError(err);
            if (axiosError){
                toast.error(axiosError);
            }
        })
        .finally(() => {
            setIsLoading(false);
        })
        
    }

  return (
    <div className='w-full'>
        <Form {...formRegister}>
            <form onSubmit={formRegister.handleSubmit(registerSubmit)} className="flex flex-col w-full space-y-1 ">
                
                <FormField
                    control={formRegister.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className='py-2'>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter your name" className="w-full" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                    
                <FormField
                control={formRegister.control}
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
                control={formRegister.control}
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
                label={"Register"}
                full onClick={formRegister.handleSubmit(registerSubmit)}/>

            </form>
        </Form>
    </div>
  )
}
