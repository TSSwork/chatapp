"use client"
import DialogBox from '@/components/dialogbox'
import { LoadingButton, MainButton } from '@/components/mainbutton';
import useConversation from '@/hooks/useConversation';
import { useConfirmDialog } from '@/hooks/useDialog'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'
import { toast } from 'sonner';
import { IoIosCloseCircleOutline } from "react-icons/io";


export default function ConfirmDialog() {
    const Dialog = useConfirmDialog();

    const router = useRouter();
    const { conversationId } = useConversation();
    const [isLoading, setIsLoading] = useState(false);
  
  const onDelete = useCallback(() => {
    setIsLoading(true);

    axios.delete(`/api/conversations/${conversationId}`)
    .then(() => {
    toast.success('Chat deleted successfully')
      Dialog.onClose();
      router.push('/conversations');
      router.refresh();
    })
    .catch(() => toast.error('Something went wrong!'))
    .finally(() => setIsLoading(false))
  }, [router, conversationId, Dialog]);

  return (
    <DialogBox
        title="Delete Chat"
        description='Are you sure you want delete this chat ?'
        isOpen={Dialog.isOpen}
        onClose={Dialog.onClose}
        size='md'
    >
        <div className="flex flex-row w-full items-center justify-end gap-2">
            <MainButton 
            label="Cancel"
            onClick={() => {
                Dialog.onClose()
            }}
            styles={{
                variant: 'outline'
            }}
            disabled={isLoading}
            />
            <LoadingButton 
            label='Delete'
            onClick={onDelete}
            styles={{
                variant: 'destructive'
            }}
            isLoading={isLoading} 
            />
        </div>
    </DialogBox>
  )
}
