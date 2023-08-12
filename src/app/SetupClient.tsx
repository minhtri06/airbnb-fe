'use client'

import useAppSideStore from '@/stores/useAppSideStore'
import useAuthStore from '@/stores/useAuthStore'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { getAccessToken } from '@/utils/tokenUtils'
import useAuthAxios from '@/hooks/useAuthAxios'

const SetupClient = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, setCurrentUser, setIsLoading, isLogin, setIsLogin } =
    useAuthStore()
  const router = useRouter()
  const authAxios = useAuthAxios()

  const { appSide, setAppSide } = useAppSideStore()

  const pathname = usePathname()

  useEffect(() => {
    if (pathname?.startsWith('/hosting')) {
      if (appSide !== 'hosting') setAppSide('hosting')
    } else {
      if (appSide !== 'traveling') setAppSide('traveling')
    }
  }, [pathname, appSide, setAppSide])

  useEffect(() => {
    setIsLogin(getAccessToken() !== null)
  }, [setIsLogin])

  useEffect(() => {
    const getCurrentUser = async () => {
      const res = await authAxios.get('/me')
      return res.data.myProfile
    }

    if (isLogin) {
      getCurrentUser()
        .then((user) => setCurrentUser(user))
        .catch((err) => router.push('/500'))
        .finally(() => setIsLoading(false))
    } else if (isLogin === false) {
      setCurrentUser(null)
      setIsLoading(false)
    }
  }, [isLogin, authAxios, router, setCurrentUser, setIsLoading])

  return <>{children}</>
}

export default SetupClient
