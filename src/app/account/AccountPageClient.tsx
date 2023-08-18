'use client'

import useAuthStore from '@/stores/useAuthStore'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import personalIcon from '@/../public/img/personal-info.svg'
import securityIcon from '@/../public/img/security-icon.svg'
import Image from 'next/image'

const AccountPageClient = () => {
  const { currentUser, isLogin } = useAuthStore()
  const pathname = usePathname()
  const router = useRouter()

  if (isLogin === false) router.push('/')
  if (!currentUser) return <></>

  return (
    <div className="">
      <div className="px-28">
        <div className="py-16">
          <div className="text-4xl font-bold">Account</div>
          <div className="text-lg mt-1">
            <span className="font-bold">{currentUser?.name}</span>,{' '}
            {currentUser.email}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <Link href="/account/personal-info">
            <div
              className="h-36 rounded-xl shadow-[0px_4px_15px_3px_rgba(0,0,0,0.1)]
            p-5 flex flex-col justify-between cursor-pointer select-none"
            >
              <Image src={personalIcon} alt="" />
              <div>
                <div className="font-bold">Personal info</div>
                <div className="text-sm text-gray-500">
                  Provide personal details and how we can reach you
                </div>
              </div>
            </div>
          </Link>
          <Link href="/account/login-and-security">
            <div
              className="h-36 rounded-xl shadow-[0px_4px_15px_3px_rgba(0,0,0,0.1)]
              p-5 flex flex-col justify-between cursor-pointer select-none"
            >
              <Image src={securityIcon} alt="" />
              <div>
                <div className="font-bold">Login & security</div>
                <div className="text-sm text-gray-500">
                  Update your password and secure your account
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AccountPageClient
