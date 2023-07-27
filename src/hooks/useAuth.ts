'use client'

import apiAxios from '@/utils/apiAxios'
import useCurrentUser from './contexts/useCurrentUser'
import useAuthTokens from './useAuthTokens'
import { LOGIN_URL, LOGOUT_URL, REGISTER_URL } from '@/constants/urls'
import catchFetch from '@/utils/catchFetch'

const useAuth = () => {
  const { setCurrentUser } = useCurrentUser()
  const { removeAuthTokens, setAccessToken, setRefreshToken, getRefreshToken } =
    useAuthTokens()

  const register = async (body: object) =>
    catchFetch(async () => {
      const res = await apiAxios.post(REGISTER_URL, body)
      return { res }
    })

  const login = async (email: string, password: string) => {
    return catchFetch(async () => {
      const res = await apiAxios.post(LOGIN_URL, { email, password })

      setCurrentUser(res.data.user)

      const { accessToken, refreshToken } = res.data.authTokens
      setAccessToken(accessToken)
      setRefreshToken(refreshToken)

      return { res }
    })
  }
  const logout = () =>
    catchFetch(async () => {
      const refreshToken = getRefreshToken()
      const res = await apiAxios.post(LOGOUT_URL, { refreshToken })
      setCurrentUser(null)
      removeAuthTokens()
      return { res }
    })

  return {
    register,
    login,
    logout,
  }
}

export default useAuth
