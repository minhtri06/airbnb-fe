'use client'

import useAuthStore from '@/stores/useAuthStore'
import { useRouter } from 'next/navigation'
import React from 'react'
import SideBoard from './SideBoard'
import PersonalAvatar from './PersonalAvatar'
import PersonalFields from './PersonalFields'

const PersonalInfoPageClient = () => {
  const { currentUser, isLogin } = useAuthStore()
  const router = useRouter()

  if (isLogin === false) router.replace('/')

  return (
    <div className="px-28 pb-10 text-gray-800">
      <div className="text-3xl font-bold py-10">Personal info</div>
      <div className="flex gap-10">
        <div className="flex-1">
          {currentUser && (
            <>
              <PersonalAvatar />
              <PersonalFields />
            </>
          )}
        </div>
        <SideBoard />
      </div>
    </div>
  )
}

export default PersonalInfoPageClient
