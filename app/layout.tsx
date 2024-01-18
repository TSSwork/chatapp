import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from 'sonner';
import SessionContext from '@/context/sessioncontext';
import getCurrentUser from '@/actions/getCurrentUser';
import CurrentUserContext from '@/context/currentusercontext';
import SettingDrawer from '@/components/site/settingdrawer';
import ActiveStatus from '@/components/activestatus';

const inter = Inter({ subsets:['latin']})

export const metadata: Metadata = {
  title: 'TSS chat app',
  description: 'Real time chat app made for practice purposes',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={cn(inter.className, 'min-h-scrren font-sans antialiased')}>
        <SessionContext>
          <CurrentUserContext currentUser={currentUser} >
            {children}
            <SettingDrawer />
            <ActiveStatus />
          </CurrentUserContext>
        </SessionContext>
        <Toaster position='top-center' richColors duration={2000}/>
      </body>
    </html>
  )
}
