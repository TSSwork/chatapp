import getUsers from '@/actions/getUsers';
import SideBar from '@/components/site/sidebar'
import UserList from '@/components/site/userlist';
import React from 'react'

export default async function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const users = await getUsers();
  return (
    //@ts-ignore
    <SideBar>
        <div className='h-full'>
          <UserList items={users} />
            {children}
        </div>
    </SideBar>
  )
}
