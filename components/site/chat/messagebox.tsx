'use client';

import Image from "next/image";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { FullMessageType } from "@/types";
import { cn } from "@/lib/utils";
import AvatarBox from "@/components/avatarbox";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import useActiveList from "@/hooks/useActivelist";
import { useMemo } from "react";


type MessageBoxProps = {
  data: FullMessageType;
  isLast?: boolean;
}

export default function MessageBox({ 
  data, 
  isLast
}: MessageBoxProps) {
  const session = useSession();

  const isOwn = session.data?.user?.email === data?.sender?.email
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(', ');

  const {members} = useActiveList();
  const isActive = useMemo(() => {
    if (!data.sender?.email){
      return false;
    }
    return members.indexOf(data.sender?.email) !== -1 
  },[data.sender?.email,members])

  const container = cn('flex gap-3 p-4', isOwn && 'justify-end');
  const avatar = cn(isOwn && 'order-2');
  const body = cn('flex flex-col gap-2', isOwn && 'items-end');
  const message = cn(
    'text-sm w-fit overflow-hidden flex flex-col', 
    isOwn ? 'bg-gray-900 text-white' : 'bg-gray-100', 
    data.image ? 'rounded-lg p-3' : 'rounded-lg py-2 px-3',
    data.image && data.body && 'space-y-2'
  );

  return ( 
    <div className={container}>
      <div className={avatar}>

        <AvatarBox isActive={isActive} image={data.sender?.image || '/noavatar.png'} alt={data.sender?.name || 'user'} label={data.sender?.name?.charAt(0).toUpperCase()}/>
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">
            {data.sender.name}
          </div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), 'p')}
          </div>
        </div>
        <div className={message}>
          {data.image ? (
            <Image
              alt="Image"
              height="288"
              width="288"
              src={data.image} 
              className="
                object-cover 
                cursor-pointer 
                hover:scale-105 
                transition 
                translate
                rounded-md
              "
            />
          ) : (
            null
          )
          }
          <div>{data?.body}</div>
        </div>
        {
            isOwn && seenList.length > 0 ? (
                <div 
                    className="
                    text-xs 
                    font-normal 
                    text-rose-500
                    gap-2 flex items-center
                    "
                >
                    <IoCheckmarkDoneSharp size={10}/>
                    seen
                </div>
            ):(
                <div 
                    className={cn(`
                    text-xs 
                    font-light 
                    text-gray-500
                    gap-2  items-center
                    `, isOwn ? 'flex' : 'hidden')}
                >
                    <IoCheckmarkDoneSharp size={10}/>
                    sent
                </div>
            )
        }
      </div>
    </div>
   );
}