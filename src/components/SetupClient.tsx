'use client'

import useCurrentUser from '@/hooks/contexts/useCurrentUser'
import useAuthTokens from '@/hooks/useAuthTokens'
import useUser from '@/hooks/useUser'
import React, { useEffect } from 'react'

const SetupClient = ({ children }: { children: React.ReactNode }) => {
  const { getCurrentUser } = useUser()
  const { getAccessToken } = useAuthTokens()
  const { setCurrentUser } = useCurrentUser()

  useEffect(() => {
    if (getAccessToken()) {
      getCurrentUser()
        .then((user) => {
          setCurrentUser(user)
        })
        .catch((err) => {
          console.log(err.response.data)
        })
    }
  }, [])

  return <>{children}</>
}

export default SetupClient
