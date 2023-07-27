import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import Navbar from '../components/navbar/Navbar'
import RegisterModal from '@/components/modals/RegisterModal'
import NotificationModal from '@/components/modals/NotificationModal'
import LoginModal from '@/components/modals/LoginModal'
import SetupClient from '@/components/SetupClient'

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
          {children}
        </SetupClient>
      </body>
    </html>
  )
}
