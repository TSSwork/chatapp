"use client"
import SidebarBox from '../sidebarbox'
import { useSettingsDrawer } from '@/hooks/useSideBar'
import { useCurrentUser } from '@/context/currentusercontext';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
  import { z } from 'zod'
  import { zodResolver } from "@hookform/resolvers/zod"
  import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
  import axios from 'axios';
import { toast } from 'sonner'
import AxiosError from '@/lib/errors/axioserror';
import { LoadingButton, MainButton } from '@/components/mainbutton';
import AvatarBox from '@/components/avatarbox';
import { CldUploadButton } from 'next-cloudinary';
import { MdOutlineAddAPhoto } from "react-icons/md";

export default function SettingDrawer() {
    const SideBar = useSettingsDrawer();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { currentUser } = useCurrentUser();

    const SettingsSchema = z.object({
        name: z.string().min(1, { message: 'Name is required' }),
        image: z.string().optional()
    })
    type TSettingsSchema = z.infer<typeof SettingsSchema>

    const formSettings = useForm<TSettingsSchema>({
        resolver: zodResolver(SettingsSchema),
        defaultValues:{
            name: currentUser?.name || '',
            image: currentUser?.image || '',
        }
      })

      const newImage = useMemo(() => {
       const imageUrl = formSettings.watch('image')
       return imageUrl
      },[formSettings])

      const handleUplaod = useCallback((result:any) => {
        const uploadImg = result?.info?.secure_url;
        if (uploadImg && uploadImg !== ''){
            console.log(uploadImg)
            formSettings.setValue('image', uploadImg, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              });
        }
      },[formSettings])

      const settingsSubmit: SubmitHandler<TSettingsSchema> = (data) => {
        setIsLoading(true);
        
        axios.post('/api/settings', data)

        .then(() => {
            router.refresh();
            toast.success('Account Updated successfully');
            SideBar.onClose()
            formSettings.reset()
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

    if(!currentUser){
        return null
    }
  return (
    <SidebarBox
        title={'Chat info'}
        isOpen={SideBar.isOpen}
        onClose={SideBar.onClose}
        side='right'
    >
        <div className='flex flex-col w-full space-y-3'>
            <div className='flex flex-row items-center gap-4 justify-start'>
                <AvatarBox 
                    image={newImage || currentUser?.image || '/noavatar.png'} alt={currentUser?.name || 'user'} label={currentUser?.name?.charAt(0).toUpperCase()}
                />
                <CldUploadButton
                    options={{maxFiles: 1}}
                    uploadPreset='fuakpecs'
                    onUpload={handleUplaod}
                    className='z-10000'
                >
                    <MainButton 
                        label="Change avatar"
                        styles={{
                            variant: 'ghost'
                        }}
                        icon={MdOutlineAddAPhoto}
                    />
                </CldUploadButton>
            </div>
        
        <Form {...formSettings}>
            <form onSubmit={formSettings.handleSubmit(settingsSubmit)} className="flex flex-col w-full space-y-1 ">
                
                <FormField
                    control={formSettings.control}
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
                
                <LoadingButton type="submit" styles={{
                    className: "mt-3"
                }} 
                isLoading={isLoading}
                label={"Update"}
                full onClick={formSettings.handleSubmit(settingsSubmit)}/>

            </form>
        </Form>
        </div>

    </SidebarBox>
  )
}
