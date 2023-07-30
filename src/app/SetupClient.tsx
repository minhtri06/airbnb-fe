'use client'

import useAppSide from '@/hooks/contexts/useAppSide'
import useCurrentUser from '@/hooks/contexts/useCurrentUser'
import useAuthTokens from '@/hooks/useAuthTokens'
import useUser from '@/hooks/useUser'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const SetupClient = ({ children }: { children: React.ReactNode }) => {
  const { getCurrentUser } = useUser()
  const { getAccessToken } = useAuthTokens()
  const { setCurrentUser, setIsLoading } = useCurrentUser()

  const { appSide, setAppSide } = useAppSide()

  const pathname = usePathname()

  useEffect(() => {
    console.log('check path name')
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
    console.log('get current user')
    if (getAccessToken()) {
      getCurrentUser()
        .then((user) => setCurrentUser(user))
        .catch((err) => console.log(err.response?.data))
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, [])

  return <>{children}</>
}

export default SetupClient
