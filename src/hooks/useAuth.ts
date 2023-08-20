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
  getRefreshToken,
  refreshAuthTokens,
  removeAuthTokens,
  setAccessToken,
  setRefreshToken,
} from '@/utils/tokenUtils'

let logoutProcess: null | Promise<any> = null
let refreshTokenProcess: null | Promise<any> = null

const useAuth = () => {
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
    const refreshToken = getRefreshToken()
    await apiAxios.post(LOGOUT_URL, { refreshToken })
    setIsLogin(false)
    removeAuthTokens()
  }, [setIsLogin])

  const handleLogout = useCallback(async () => {
    if (logoutProcess === null) logoutProcess = logout()
    await logoutProcess
    logoutProcess = null
  }, [logout])

  const handleRefreshToken = useCallback(async () => {
    try {
      if (refreshTokenProcess === null)
        refreshTokenProcess = refreshAuthTokens()
      await refreshTokenProcess
      refreshTokenProcess = null
    } catch (error) {
      await handleLogout()
    }
  }, [handleLogout])

  return {
    register,
    login,
    googleLogin,
    logout,
    handleLogout,
    handleRefreshToken,
  }
}

export default useAuth
