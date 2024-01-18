"use client"
import useRoutes from '@/hooks/useRoutes'
import React, { useMemo } from 'react'
import DesktopItem from './desktopitem';
import AvatarBox from '@/components/avatarbox';
import { useCurrentUser } from '@/context/currentusercontext';
import { useSettingsDrawer } from '@/hooks/useSideBar';
import useActiveList from '@/hooks/useActivelist';

export default function DesktopSidebar() {

    const routes = useRoutes();
    const { currentUser } = useCurrentUser();
    const settingsDialog = useSettingsDrawer();

    const {members} = useActiveList();
    const isActive = useMemo(() => {
      if (!currentUser?.email){
        return false;
      }
      return members.indexOf(currentUser?.email) !== -1 
    },[currentUser?.email,members])


  return (
    <div className="
        hidden 
        lg:fixed 
        lg:inset-y-0 
        lg:left-0 
        lg:z-40 
        lg:w-20 
        xl:px-6
        lg:overflow-y-auto 
        lg:bg-white 
        lg:border-r-[1px]
        lg:pb-4
        lg:flex
        lg:flex-col
        justify-between
      ">
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>
        <nav className="mt-4 flex flex-col justify-between items-center">
          <div 
            className="cursor-pointer hover:opacity-75 transition"
            onClick={() => {settingsDialog.onOpen()}}
          >
            <AvatarBox 
            isActive={isActive} image={currentUser?.image || '/noavatar.png'} alt={currentUser?.name || 'user'} label={currentUser?.name?.charAt(0).toUpperCase()}/>
          </div>
        </nav>
      </div>
  )
}
