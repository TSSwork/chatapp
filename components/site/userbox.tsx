"use client"
import { User } from '@prisma/client'
import React, { useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import AvatarBox from '../avatarbox'
import useActiveList from '@/hooks/useActivelist'

type UserBoxprops = {
    data: User
}

export default function UserBox({
    data
}: UserBoxprops ) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)

    const {members} = useActiveList();
    const isActive = useMemo(() => {
      if (!data?.email){
        return false;
      }
      return members.indexOf(data?.email) !== -1 
    },[data?.email,members])

    const handleClick = useCallback(() => {
        setIsLoading(true);

        axios.post('/api/conversations', {
            userId: data.id
        })
        .then((data) => {
            router.push(`/conversations/${data.data.id}`)
        })
        .finally(() => setIsLoading(false))
    }, [data,router])
  return (
    <div
        onClick={handleClick}
        className='w-full relative flex items-center space-x-3
        bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer'
    >
        <AvatarBox isActive={isActive} image={data?.image || '/noavatar.png'} alt={data?.name || 'user'} label={data?.name?.charAt(0).toUpperCase()}/>
        <div className='min-w-0 flex-1'>
            <div className='focus:outline-now' >
                <div className='flex justify-between items-center mb-1'>
                    <p
                        className='text-sm font-medium text-gray-900'
                    >
                        {
                            data.name
                        }
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}
