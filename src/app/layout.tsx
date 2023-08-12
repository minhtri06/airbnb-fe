import 'leaflet/dist/leaflet.css'
import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from '@/components/navbar/Navbar'
import NotificationModal from '@/components/modals/NotificationModal'
import RegisterModal from '@/components/modals/RegisterModal'
import LoginModal from '@/components/modals/LoginModal'
import Footer from '@/components/Footer'
import dynamic from 'next/dynamic'

const SetupClient = dynamic(() => import('./SetupClient'), { ssr: true })

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
        className={`${nunito.className} text-gray-900 min-w-[900px]`}
        suppressHydrationWarning={true}
      >
        <SetupClient>
          <div className="min-h-[100vh]">
            <Navbar />
            <NotificationModal />
            <RegisterModal />
            <LoginModal />
            {children}
          </div>
          <Footer />
        </SetupClient>
      </body>
    </html>
  )
}
