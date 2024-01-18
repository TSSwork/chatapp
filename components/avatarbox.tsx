"use client"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

  type AvatarBoxProps = {
    alt?: string,
    image?: string,
    label?: string,
    isActive?: boolean
  }
  
  export default function AvatarBox({
    alt,image,label,isActive
  }: AvatarBoxProps) {
    return (
      <div className="relative w-fit rounded-full">
        <Avatar>
          {
            image ? (
              <AvatarImage src={image || '/noavatar.png'} alt={alt || 'avatar image'} />
            ): (
              <AvatarFallback className="text-xl font-semibold text-white bg-gray-800 flex items-center">{label || 'A'}</AvatarFallback>
            )
          }
        </Avatar>
        {isActive ? (
        <span 
          className="
            absolute 
            block 
            rounded-full 
            bg-green-500 
            ring-2 
            ring-white 
            top-0 
            right-0
            h-2 
            w-2 
            md:h-3 
            md:w-3
          " 
        />
      ) : null}
      </div>
    )
  }
  