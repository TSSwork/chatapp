"use client"
import DialogBox from '@/components/dialogbox'
import { useChatImageDialog } from '@/hooks/useDialog'
import Image from 'next/image'
import React, { useState } from 'react'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
  import { z } from 'zod'
  import { zodResolver } from "@hookform/resolvers/zod"
  import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
  import { MainButton } from '@/components/mainbutton';
  import axios from 'axios';
  import { RiSendPlaneLine } from "react-icons/ri";
import useConversation from '@/hooks/useConversation'
import { toast } from 'sonner'

  



export default function ChatImageDialog() {

    const { conversationId } = useConversation();
    const [isLoading, setIsLoading] = useState(false);

    const Dialog = useChatImageDialog()
    const imageUrl = Dialog.hasImg;

    const ChatImageSchema = z.object({
        message: z.string().optional(),
        image: z.string().optional(),
      })
      type TChatImageSchema = z.infer<typeof ChatImageSchema>
    
      const formChat = useForm<TChatImageSchema>({
          resolver: zodResolver(ChatImageSchema),
          defaultValues:{
              message: '',
              image: imageUrl || '',
          }
        })
        const chatSubmit: SubmitHandler<TChatImageSchema> = (data) => {
            //console.log("2.",data.image)

            if (!imageUrl || imageUrl === ''){
                return toast.error('No image found')
            }
        
            setIsLoading(true);
            axios.post('/api/messages', {
              ...data,
              image: imageUrl,
              conversationId
            })
            .catch((err:any) => {
                toast.error('Message sending failed')
            })
            .finally(() => {
                setIsLoading(false);
                Dialog.onClose();
                Dialog.storeImg(null)
                formChat.reset();
                
            })
            
          }

    if (!imageUrl) {
        return null;
    }

  return (
    <DialogBox
        title="Send image"
        isOpen={Dialog.isOpen}
        onClose={Dialog.onClose}
        size="md"
    >
        <div className='flex flex-col w-full'>
            <div className='flex flex-row items-center w-full border-2 border-gray-100 border-dotted overflow-hidden rounded-lg h-auto max-h-[300px]'>
                <Image src={imageUrl} alt={'uplaoding image'} width={800} height={800} />
            </div> 
            <div className='py-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full'>
            <Form {...formChat}>
                <form onSubmit={formChat.handleSubmit(chatSubmit)} className="flex flex-row gap-2 items-center w-full">
                    
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
        </div>
    </DialogBox>
  )
}
