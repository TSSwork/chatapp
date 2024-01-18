import React, { Children } from 'react'
import DesktopSidebar from './sidebar/desktopsidebar'
import MobileFooter from './sidebar/mobilefooter'

export default async function SideBar({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <div className='h-full'>
        <DesktopSidebar />
        <MobileFooter />
        <section id="side-bar" className='lg:pl-20 h-full'>
            {children}
        </section>  
    </div>
  )
}
