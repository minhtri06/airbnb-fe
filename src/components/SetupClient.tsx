'use client'

import useCurrentUser from '@/hooks/contexts/useCurrentUser'
import useAuthTokens from '@/hooks/useAuthTokens'
import useUser from '@/hooks/useUser'
import { GoogleOAuthProvider } from '@react-oauth/google'
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
          console.log(err.response?.data)
        })
    }
  }, [])

  return (
    <GoogleOAuthProvider clientId="945182692173-9kbmv5mst5lb4s8j8b7rjhqsq67ipk6a.apps.googleusercontent.com">
      {children}
    </GoogleOAuthProvider>
  )
}

export default SetupClient
