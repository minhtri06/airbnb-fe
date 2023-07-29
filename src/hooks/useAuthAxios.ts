import axios from 'axios'

import useAuthTokens from './useAuthTokens'
import useAuth from './useAuth'
import { BASE_URL } from '@/constants/urls'

const useAuthAxios = () => {
  const privateAxios = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
  })

  const { logout } = useAuth()
  const { getAccessToken, getRefreshToken, isTokenExpired, refreshAuthTokens } =
    useAuthTokens()

  privateAxios.interceptors.request.use(async (config) => {
    let accessToken = getAccessToken()

    if (accessToken) {
      // If access token expired => we refresh tokens
      if (isTokenExpired(accessToken)) {
        let refreshToken = getRefreshToken()

        // If refresh token is not available or expired => logout user
        if (!refreshToken || isTokenExpired(refreshToken)) {
          logout()
        } else {
          const newTokens = await refreshAuthTokens(accessToken, refreshToken)
          accessToken = newTokens.newAccessToken
          refreshToken = newTokens.newRefreshToken
        }
      }

      config.headers.Authorization = accessToken
    }

    return config
  })

  return privateAxios
}

export default useAuthAxios
