'use client'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/auth'
import jwtDecode from 'jwt-decode'
import moment, { Moment } from 'moment'
import axios from 'axios'
import { BASE_URL } from '@/constants/urls'
import { useCallback } from 'react'

interface TokenPayload {
  sub: string
  iat: number
  exp: number
  type: string
}

const refreshTokenProcess: {
  promise: null | Promise<any>
  isPending: boolean
} = {
  promise: null,
  isPending: false,
}

const useAuthTokens = () => {
  const getAccessToken = useCallback(
    (): string | null => localStorage.getItem(ACCESS_TOKEN),
    [],
  )

  const getRefreshToken = useCallback(
    (): string | null => localStorage.getItem(REFRESH_TOKEN),
    [],
  )

  const isTokenExpired = useCallback((token: string): boolean => {
    const expire = moment.unix(jwtDecode<TokenPayload>(token).exp)
    return moment().isAfter(expire)
  }, [])

  const setAccessToken = useCallback((newAccessToken: string) => {
    localStorage.setItem(ACCESS_TOKEN, newAccessToken)
  }, [])

  const setRefreshToken = useCallback((newRefreshToken: string) => {
    localStorage.setItem(REFRESH_TOKEN, newRefreshToken)
  }, [])

  const removeAuthTokens = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
  }, [])

  const refreshAuthTokens = useCallback(async () => {
    const accessToken = getAccessToken()
    const refreshToken = getRefreshToken()
    if (!accessToken || !refreshToken)
      return { newAccessToken: null, newRefreshToken: null }

    const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
      accessToken,
      refreshToken,
    })

    const newAccessToken = response.data.authTokens.accessToken
    const newRefreshToken = response.data.authTokens.refreshToken
    setAccessToken(newAccessToken)
    setRefreshToken(newRefreshToken)

    return { newAccessToken, newRefreshToken }
  }, [getAccessToken, getRefreshToken, setAccessToken, setRefreshToken])

  return {
    refreshTokenProcess,
    getAccessToken,
    getRefreshToken,
    isTokenExpired,
    setAccessToken,
    setRefreshToken,
    removeAuthTokens,
    refreshAuthTokens,
  }
}

export default useAuthTokens
