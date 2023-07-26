'use client'

import apiAxios from '@/utils/apiAxios'
import useCurrentUser from './contexts/useCurrentUser'
import useAuthTokens from './useAuthTokens'
import { BASE_URL, REGISTER_URL } from '@/constants/urls'

const useAuth = () => {
  const { setCurrentUser } = useCurrentUser()
  const { removeAuthTokens } = useAuthTokens()

  const logout = () => {
    setCurrentUser(null)
    removeAuthTokens()
  }

  const register = async (body: object) => {
    const res = await apiAxios.post(REGISTER_URL, body)
    return res
  }

  return { logout, register }
}

export default useAuth
