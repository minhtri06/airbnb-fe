'use client'

import axios from 'axios'

import useAuthTokens from './useAuthTokens'
import useAuth from './useAuth'

const usePrivateAxios = () => {
  const privateAxios = axios.create({
    baseURL: process.env.SERVER_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  })

  const { logout } = useAuth()
  const { getAccessToken, getRefreshToken, isTokenExpired, refreshAuthTokens } =
    useAuthTokens()

  privateAxios.interceptors.request.use(async (config) => {
    const accessToken = getAccessToken()

    if (accessToken) {
      // If access token expired => we refresh tokens
      if (isTokenExpired(accessToken)) {
        const refreshToken = getRefreshToken()

        // If refresh token is not available or expired => logout user
        if (!refreshToken || isTokenExpired(refreshToken)) {
          logout()
        } else {
          await refreshAuthTokens(accessToken, refreshToken)
        }
      }

      config.headers.Authorization = accessToken
    }

    return config
  })

  return privateAxios
}

export default usePrivateAxios
