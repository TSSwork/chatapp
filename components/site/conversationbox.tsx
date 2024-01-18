"use client"
import React, { useCallback, useMemo } from 'react'
import { format } from 'date-fns'
import { FullConversationType } from '@/types'
import useOtherUser from '@/hooks/useOtherUser'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AvatarBox from '../avatarbox'
import { cn } from '@/lib/utils'
import { useCurrentUser } from '@/context/currentusercontext'
import { IoCheckmarkDone } from "react-icons/io5";
import useActiveList from '@/hooks/useActivelist'

type ConversationBoxprops = {
    data: FullConversationType,
    selected?: boolean,

}

export default function ConversationBox({
    data, selected
}: ConversationBoxprops) {

    const otherUser = useOtherUser(data)
    const session = useSession()
    const router = useRouter()
    const { currentUser } = useCurrentUser()

    const {members} = useActiveList();
    const isActive = useMemo(() => {
      if (!otherUser?.email){
        return false;
      }
      return members.indexOf(otherUser?.email) !== -1 
    },[otherUser?.email,members])


    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`)
    }, [data.id, router])

    const lastMessage = useMemo(() => {
        const messages = data.messages || [];

        return messages[messages.length - 1]
    }, [data.messages])

    const userEmail = useMemo(() => {
        return session.data?.user?.email
    }, [session.data?.user?.email])


    const hasSeen = useMemo(() => {
        if (!lastMessage){
            return false
        }
        
        const seenArray = lastMessage.seen || []

        if  (!userEmail){
            return false
        }

        return seenArray
        .filter((user) => user.email !== userEmail).length !== 0;
    },[lastMessage, userEmail]);

    const unreadMessageCount = useMemo(() => {
        const messages = data.messages || []

        if (!currentUser){
            return 0
        }

        // if (hasSeen){
        //     return 0
        // }

        const unreadMessages = messages.filter((message) => !message.seenIds.includes(currentUser.id))

        return unreadMessages.length
        
    }, [data.messages,currentUser])

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image){
            return 'Sent a image'
        }

        if (lastMessage?.body){
            return lastMessage?.body
        }

        return 'Started a conversation'
    },[lastMessage])

  return (
    <div
        onClick={handleClick}
        className={cn('w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer',
        selected ? 'bg-neutral-100' : 'bg-white')}
    >
        <AvatarBox isActive={isActive} image={otherUser?.image || '/noavatar.png'} alt={data.name || otherUser?.name || 'user'} label={data.name?.charAt(0).toUpperCase() || otherUser?.name?.charAt(0).toUpperCase()}/>
        <div className='min-w-0 flex-1'>
            <div className='focus:outline-now' >
                <div className='flex justify-between items-center mb-1'>
                    <p
                        className='text-lg font-medium text-gray-900'
                    >
                        {
                           data.name || otherUser.name
                        }
                    </p>
                    {
                        lastMessage?.createdAt && (
                            <p
                            className='text-xs text-gray-400 font-normal'
                            >
                                {format(new Date(lastMessage.createdAt), 'p')}
                            </p>
                        )
                    }
                </div>
                <div className='flex flex-row justify-between items-center'>
                    <p
                    className={cn('truncate text-xs  font-normal overflow-hidden items-center flex flex-row flex-1 gap-2 ', hasSeen ? 'text-gray-500 font-semibold' : 'text-gray-800')}
                    >
                        {
                            lastMessage?.senderId && lastMessage?.senderId === currentUser?.id ? (
                                <IoCheckmarkDone size={12} className={cn(' font-semibold', hasSeen ? 'text-rose-600' : 'text-gray-400')}/>
                            ): null
                        }
                        {lastMessageText}
                    </p>
                    {
                        hasSeen ? (
                             <span className='bg-rose-600 rounded-full p-1 font-semibold text-white'/>
                        ): null
                    }
                </div>
                    
            </div>
        </div>
    </div>
  )
}
