"use client"
import AvatarBox from '@/components/avatarbox';
import useOtherUser from '@/hooks/useOtherUser'
import { useChatDrawer } from '@/hooks/useSideBar';
import { Conversation, User } from '@prisma/client'
import Link from 'next/link';
import React, { useCallback, useEffect, useMemo } from 'react'
import { FaChevronLeft } from "react-icons/fa";
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import ChatDrawer from '../chatdrawer';

type ChatHeaderProps = {
    conversation: Conversation & {
        users: User[]
    }
}

export default function ChatHeader({
    conversation
}: ChatHeaderProps) {
    const otherUser = useOtherUser(conversation);
    const chatDrawerTrigger = useChatDrawer();
    
    const statusText = useMemo(() => {
        if(conversation.isGroup){
            return `${conversation.users.length} members`
        }

        return 'Active'
    },[conversation]);

  return (
    <div className='bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between
    items-center shadow-sm'>
        <div className='flex gap-3 items-center'>
            <Link className='lg:hidden block text-gray-800/60 hover:text-black
            transition cursor-pointer'
            href='/conversations'
            >
                <FaChevronLeft size={20} />
            </Link>
            <AvatarBox isActive image={otherUser?.image || '/noavatar.png'} alt={otherUser?.name || 'user'} label={otherUser?.name?.charAt(0).toUpperCase()}/>
            <div className='flex flex-col'>
                <div className='font-bold'>
                    {conversation.name || otherUser.name}
                </div>
                <div className='text-sm font-light text-gray-500'>
                    {statusText}
                </div>
            </div>
        </div>
        <ChatDrawer data={conversation}/>
        <HiEllipsisHorizontal size={25} onClick={() => {
            chatDrawerTrigger.onOpen();
        }} className='text-gray-800/60 hover:text-black
            transition cursor-pointer' />
    </div>
  )
}
