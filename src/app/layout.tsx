import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import SetupClient from './SetupClient'
import Navbar from '@/components/navbar/Navbar'
import NotificationModal from '@/components/modals/NotificationModal'
import RegisterModal from '@/components/modals/RegisterModal'
import LoginModal from '@/components/modals/LoginModal'
import { usePathname } from 'next/navigation'
import NewHostingModal from '@/components/modals/new-hosting-modal/NewHostingModal'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${nunito.className} text-gray-900`}
        suppressHydrationWarning={true}
      >
        <SetupClient>
          <Navbar />
          <NotificationModal />
          <RegisterModal />
          <LoginModal />
          <NewHostingModal />
          {children}
        </SetupClient>
      </body>
    </html>
  )
}
