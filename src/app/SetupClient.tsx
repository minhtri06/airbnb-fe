'use client'

import useAppSideStore from '@/stores/useAppSideStore'
import useAuthStore from '@/stores/useAuthStore'
import useAuthTokens from '@/hooks/useAuthTokens'
import useUserAction from '@/hooks/useUserAction'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { ACCESS_TOKEN } from '@/constants/auth'
import dynamic from 'next/dynamic'
import { useLocalStorage } from '@/hooks/useStorage'

const SetupClient = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, setCurrentUser, setIsLoading, isLogin, setIsLogin } =
    useAuthStore()
  const { getCurrentUser } = useUserAction()
  const { getAccessToken } = useAuthTokens()
  const [accessToken] = useLocalStorage(ACCESS_TOKEN, null)
  const router = useRouter()

  const { appSide, setAppSide } = useAppSideStore()

  const pathname = usePathname()

  useEffect(() => {
    if (pathname?.startsWith('/hosting')) {
      if (appSide !== 'hosting') {
        setAppSide('hosting')
      }
    } else {
      if (appSide !== 'traveling') {
        setAppSide('traveling')
      }
    }
  }, [pathname])

  useEffect(() => {
    setIsLogin(accessToken !== null)
  }, [])

  useEffect(() => {
    if (isLogin) {
      getCurrentUser()
        .then((user) => setCurrentUser(user))
        .catch((err) => router.push('/500'))
        .finally(() => setIsLoading(false))
    } else if (isLogin === false) {
      setCurrentUser(null)
      setIsLoading(false)
    }
  }, [isLogin])

  console.log(isLogin)

  return <>{children}</>
}

export default SetupClient
