'use client'

import useAppSideStore from '@/hooks/contexts/useAppSideStore'
import useCurrentUserStore from '@/hooks/contexts/useCurrentUserStore'
import useAuthTokens from '@/hooks/useAuthTokens'
import useUser from '@/hooks/useUser'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const SetupClient = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, setCurrentUser, setIsLoading } = useCurrentUserStore()
  const { getCurrentUser } = useUser()
  const { getAccessToken } = useAuthTokens()

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
    console.log('get current user')
    if (!currentUser && getAccessToken()) {
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
