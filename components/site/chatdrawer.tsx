"use client"
import React, { useMemo } from 'react'
import SidebarBox from '../sidebarbox'
import { useChatDrawer } from '@/hooks/useSideBar'
import useOtherUser from '@/hooks/useOtherUser'
import { format } from 'date-fns'
import { Conversation, User } from '@prisma/client'
import { IoTrash } from 'react-icons/io5'
import AvatarBox from '../avatarbox'
import { useConfirmDialog } from '@/hooks/useDialog'

type ChatDrawerProps = {
    data: Conversation & {
        users: User[]
    }
}

export default function ChatDrawer({
    data
}:ChatDrawerProps) {
    const SideBar = useChatDrawer()
    const otherUser = useOtherUser(data)

    const confirmDialog = useConfirmDialog();

    const joinedDate = useMemo(() => {
        return format(new Date(otherUser.createdAt), 'PP');
      }, [otherUser.createdAt]);
      
      const title = useMemo(() => {
        return data.name || otherUser.name;
      }, [data.name, otherUser.name]);
    
    //   const { members } = useActiveList();
    //   const isActive = members.indexOf(otherUser?.email!) !== -1;
    
      const statusText = useMemo(() => {
        if (data?.isGroup) {
          return `${data.users.length} members`;
        }
        return 'Active'
        // return isActive ? 'Active' : 'Offline'
      }, [data]);

      if (!data){
        return null
      }

  return (
    <SidebarBox
        title={'Chat info'}
        isOpen={SideBar.isOpen}
        onClose={SideBar.onClose}
        side='right'
    >
        <div className="relative mt-6 flex-1 px-4 sm:px-6">
            <div className="flex flex-col items-center">
                <div className="mb-2">
                    {/* {data.isGroup ? <AvatarGroup users={data.users} /> : <Avatar user={otherUser} />} */}
                    <AvatarBox isActive image={otherUser?.image || '/noavatar.png'} alt={otherUser?.name || 'user'} label={otherUser?.name?.charAt(0).toUpperCase()}/>
                </div>
                <div>
                    {title}
                </div>
                <div className="text-sm text-gray-500">
                    {statusText}
                </div>
                <div className="flex gap-10 my-8">
                    <div onClick={() => {
                        confirmDialog.onOpen()
                    }} className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75">
                        <div className="w-10 h-10 bg-neutral-100 hover:text-rose-600 rounded-full flex items-center justify-center">
                            <IoTrash size={20} />
                        </div>
                        <div className="text-sm font-light text-neutral-600">
                            Delete
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
            <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                {data.isGroup && (
                <div>
                    <dt 
                    className="
                        text-sm 
                        font-medium 
                        text-gray-500 
                        sm:w-40 
                        sm:flex-shrink-0
                    "
                    >
                    Emails
                    </dt>
                    <dd 
                    className="
                        mt-1 
                        text-sm 
                        text-gray-900 
                        sm:col-span-2
                    "
                    >
                    {data.users.map((user) => user.email).join(', ')}
                    </dd>
                </div>
                )}
                {!data.isGroup && (
                <div>
                    <dt 
                    className="
                        text-sm 
                        font-medium 
                        text-gray-500 
                        sm:w-40 
                        sm:flex-shrink-0
                    "
                    >
                    Email
                    </dt>
                    <dd 
                    className="
                        mt-1 
                        text-sm 
                        text-gray-900 
                        sm:col-span-2
                    "
                    >
                    {otherUser.email}
                    </dd>
                </div>
                )}
                {!data.isGroup && (
                <>
                    <hr />
                    <div>
                    <dt 
                        className="
                        text-sm 
                        font-medium 
                        text-gray-500 
                        sm:w-40 
                        sm:flex-shrink-0
                        "
                    >
                        Joined
                    </dt>
                    <dd 
                        className="
                        mt-1 
                        text-sm 
                        text-gray-900 
                        sm:col-span-2
                        "
                    >
                        <time dateTime={joinedDate}>
                        {joinedDate}
                        </time>
                    </dd>
                    </div>
                </>
                )}
            </dl>
            </div>
        </div>
    </SidebarBox>
  )
}
