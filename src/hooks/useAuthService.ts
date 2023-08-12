'use client'

import apiAxios from '@/utils/apiAxios'
import useAuthStore from '@/stores/useAuthStore'
import useAuthTokens from './useAuthTokens'
import {
  GOOGLE_LOGIN,
  LOGIN_URL,
  LOGOUT_URL,
  REGISTER_URL,
} from '@/constants/urls'
import useChatStore from '@/stores/useChatStore'
import { useCallback } from 'react'

const useAuthService = () => {
  const { setIsLogin } = useAuthStore()
  const {
    getAccessToken,
    removeAuthTokens,
    setAccessToken,
    setRefreshToken,
    getRefreshToken,
  } = useAuthTokens()
  const { setChats, setConversations } = useChatStore()

  const isAuthenticated = () => getAccessToken() !== null

  const register = async (body: object) => {
    await apiAxios.post(REGISTER_URL, body)
  }

  const login = async (email: string, password: string) => {
    const res = await apiAxios.post(LOGIN_URL, { email, password })

    setIsLogin(true)

    const { accessToken, refreshToken } = res.data.authTokens
    setAccessToken(accessToken)
    setRefreshToken(refreshToken)

    console.log('refresh??')

    return res.data
  }

  const googleLogin = async (code: string) => {
    const res = await apiAxios.post(GOOGLE_LOGIN + `?code=${code}`)

    const { authTokens } = res.data
    setIsLogin(true)

    const { accessToken, refreshToken } = authTokens
    setAccessToken(accessToken)
    setRefreshToken(refreshToken)
    setChats([])
    setConversations([])

    return res.data
  }

  const logout = useCallback(async () => {
    console.log('logout')
    const refreshToken = getRefreshToken()
    await apiAxios.post(LOGOUT_URL, { refreshToken })
    setIsLogin(false)
    setChats([])
    setConversations([])
    removeAuthTokens()
  }, [
    getRefreshToken,
    removeAuthTokens,
    setChats,
    setConversations,
    setIsLogin,
  ])

  return { isAuthenticated, register, login, googleLogin, logout }
}

export default useAuthService
