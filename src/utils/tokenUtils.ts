'use client'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/auth'
import jwtDecode from 'jwt-decode'
import moment, { Moment } from 'moment'
import axios from 'axios'
import { BASE_URL } from '@/constants/urls'
import {} from 'react'

interface TokenPayload {
  sub: string
  iat: number
  exp: number
  type: string
}

export const getAccessToken = (): string | null =>
  localStorage.getItem(ACCESS_TOKEN)

export const getRefreshToken = (): string | null =>
  localStorage.getItem(REFRESH_TOKEN)

export const setAccessToken = (newAccessToken: string) =>
  localStorage.setItem(ACCESS_TOKEN, newAccessToken)

export const setRefreshToken = (newRefreshToken: string) =>
  localStorage.setItem(REFRESH_TOKEN, newRefreshToken)

export const removeAuthTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN)
  localStorage.removeItem(REFRESH_TOKEN)
}

export const refreshAuthTokens = async () => {
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
}
