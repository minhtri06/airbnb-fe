'use client'

import useCurrentUser from './contexts/useCurrentUser'
import useAuthTokens from './useAuthTokens'

const useAuth = () => {
  const { setCurrentUser } = useCurrentUser()
  const { removeAuthTokens } = useAuthTokens()

  const logout = () => {
    setCurrentUser(null)
    removeAuthTokens()
  }

  return { logout }
}

export default useAuth
