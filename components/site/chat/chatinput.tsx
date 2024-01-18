"use client"
import useConversation from '@/hooks/useConversation'
import React, { useCallback, useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { MainButton } from '@/components/mainbutton';
import axios from 'axios';
import { TbPhotoPlus } from "react-icons/tb";
import { RiSendPlaneLine } from "react-icons/ri";
import { CldUploadButton } from 'next-cloudinary'
import { useChatImageDialog } from '@/hooks/useDialog'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'




export default function ChatInput() {
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);
  const ImageDialog = useChatImageDialog()
  const router = useRouter();

  const ChatInputSchema = z.object({
    message: z.string().min(1, { message: 'Name is required' }),
  })
  type TChatInputSchema = z.infer<typeof ChatInputSchema>

  const formChat = useForm<TChatInputSchema>({
      resolver: zodResolver(ChatInputSchema),
      defaultValues:{
          message: '',
      }
    })

  const chatSubmit: SubmitHandler<TChatInputSchema> = (data) => {
    setIsLoading(true);
    
    axios.post('/api/messages', {
      ...data,
      conversationId
    })
    .then(() => {
      formChat.reset(); 
      router.refresh();       
    })
    .catch((err:any) => {
      toast.error('Message sending failed')
    })
    .finally(() => {
        setIsLoading(false); 
    })
    
  }

  const handleUplaod = useCallback((result:any) => {
    const uploadImg = result?.info?.secure_url;
    if (uploadImg && uploadImg !== ''){
      ImageDialog.storeImg(uploadImg)
      ImageDialog.onOpen()
    }
  },[ImageDialog])

  return (
    <div className='w-full py-4 px-4  border-t flex items-center gap-2 lg:gap-4 bg-white'
    >
      <CldUploadButton
      options={{maxFiles: 1}}
      onUpload={handleUplaod}
      uploadPreset='fuakpecs'
      >
        <TbPhotoPlus size={30} className='text-gray-800 hover:text-black cursor-pointer'/>
      </CldUploadButton>
      <Form {...formChat}>
            <form onSubmit={formChat.handleSubmit(chatSubmit)} className="flex flex-row gap-2 items-center flex-1">
                
                <FormField
                    control={formChat.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem className='py-2 w-full'>
                        <FormControl>
                            <Input placeholder="write your message" disabled={isLoading} className="w-full" {...field} />
                        </FormControl>
                        </FormItem>
                    )}
                />

                <MainButton 
                label={"send"}
                disabled={isLoading}
                onClick={formChat.handleSubmit(chatSubmit)}
                icon={RiSendPlaneLine}
                />
              </form>
        </Form>
    </div>
  )
}
