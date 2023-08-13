'use client'

import apiAxios from '@/utils/apiAxios'
import useAuthStore from '@/stores/useAuthStore'
import {
  GOOGLE_LOGIN,
  LOGIN_URL,
  LOGOUT_URL,
  REGISTER_URL,
} from '@/constants/urls'
import { useCallback } from 'react'
import {
  getAccessToken,
  getRefreshToken,
  removeAuthTokens,
  setAccessToken,
  setRefreshToken,
} from '@/utils/tokenUtils'

const useAuthService = () => {
  const { setIsLogin } = useAuthStore()

  const register = useCallback(async (body: object) => {
    await apiAxios.post(REGISTER_URL, body)
  }, [])

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await apiAxios.post(LOGIN_URL, { email, password })

      setIsLogin(true)

      const { accessToken, refreshToken } = res.data.authTokens
      setAccessToken(accessToken)
      setRefreshToken(refreshToken)

      return res.data
    },
    [setIsLogin],
  )

  const googleLogin = useCallback(
    async (code: string) => {
      const res = await apiAxios.post(GOOGLE_LOGIN + `?code=${code}`)

      const { authTokens } = res.data
      setIsLogin(true)

      const { accessToken, refreshToken } = authTokens
      setAccessToken(accessToken)
      setRefreshToken(refreshToken)

      return res.data
    },
    [setIsLogin],
  )

  const logout = useCallback(async () => {
    console.log('logout')
    const refreshToken = getRefreshToken()
    await apiAxios.post(LOGOUT_URL, { refreshToken })
    setIsLogin(false)
    removeAuthTokens()
  }, [setIsLogin])

  return { register, login, googleLogin, logout }
}

export default useAuthService
