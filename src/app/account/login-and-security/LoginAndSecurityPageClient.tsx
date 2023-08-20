'use client'

import useAuthStore from '@/stores/useAuthStore'
import SideBoard from './SideBoard'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ChangePasswordForm from './ChangePasswordForm'

const LoginAndSecurityPageClient = () => {
  const { currentUser, isLogin } = useAuthStore()
  const router = useRouter()
  const [isPasswordChanging, setIsPasswordChanging] = useState(false)

  const handleChangePasswordBtnOnClick = () => {
    if (currentUser?.authType === 'google') return
    setIsPasswordChanging(true)
  }

  if (isLogin === false) router.replace('/')

  return (
    <div className="px-28 pb-10 text-gray-700">
      <div className="text-3xl font-bold py-10">Login & security</div>
      <div className="flex gap-10">
        <div className="flex-1">
          {currentUser && (
            <>
              <div className="text-xl font-bold">Password</div>
              <div className="mt-3">
                <span
                  className={`underline font-bold cursor-pointer select-none
                    ${currentUser.authType === 'google' && 'text-gray-500'}`}
                  onClick={handleChangePasswordBtnOnClick}
                >
                  Change your password
                </span>
              </div>
              {isPasswordChanging && (
                <ChangePasswordForm
                  isPasswordChanging={isPasswordChanging}
                  setIsPasswordChanging={setIsPasswordChanging}
                />
              )}
            </>
          )}
        </div>
        <SideBoard />
      </div>
    </div>
  )
}

export default LoginAndSecurityPageClient
