'use client'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/auth'
import jwtDecode from 'jwt-decode'
import moment, { Moment } from 'moment'
import axios from 'axios'
import { BASE_URL } from '@/constants/urls'

interface TokenPayload {
  sub: string
  iat: number
  exp: number
  type: string
}

const useAuthTokens = () => {
  const getAccessToken = (): string | null => localStorage.getItem(ACCESS_TOKEN)

  const getRefreshToken = (): string | null =>
    localStorage.getItem(REFRESH_TOKEN)

  const isTokenExpired = (token: string): boolean => {
    const expire = moment.unix(jwtDecode<TokenPayload>(token).exp)
    return moment().isAfter(expire)
  }

  const setAccessToken = (newAccessToken: string) => {
    localStorage.setItem(ACCESS_TOKEN, newAccessToken)
  }

  const setRefreshToken = (newRefreshToken: string) => {
    localStorage.setItem(REFRESH_TOKEN, newRefreshToken)
  }

  const removeAuthTokens = () => {
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
  }

  const refreshAuthTokens = async (
    accessToken: string,
    refreshToken: string,
  ) => {
    const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
      accessToken,
      refreshToken,
    })

    const newAccessToken = response.data.authTokens.accessToken
    const newRefreshToken = response.data.authTokens.refreshToken
    setAccessToken(newAccessToken)
    setRefreshToken(newRefreshToken)

    return { newAccessToken, newRefreshToken }
  }

  return {
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
