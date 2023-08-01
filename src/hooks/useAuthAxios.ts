import axios from 'axios'

import useAuthTokens from './useAuthTokens'
import useAuthService from './useAuthService'
import { BASE_URL } from '@/constants/urls'

const useAuthAxios = () => {
  const privateAxios = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
  })

  const { logout } = useAuthService()
  const { getAccessToken, getRefreshToken, isTokenExpired, refreshAuthTokens } =
    useAuthTokens()

  privateAxios.interceptors.request.use(async (config) => {
    let accessToken = getAccessToken()

    if (accessToken) {
      // If access token expired => we refresh tokens
      if (isTokenExpired(accessToken)) {
        let refreshToken = getRefreshToken()
        // If refresh token is not available or expired => logout user
        if (refreshToken && !isTokenExpired(refreshToken)) {
          const newTokens = await refreshAuthTokens(accessToken, refreshToken)

          accessToken = newTokens.newAccessToken
          refreshToken = newTokens.newRefreshToken
        }
      }

      config.headers.Authorization = accessToken
    }

    return config
  })

  privateAxios.interceptors.response.use(
    (config) => config,
    (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        console.log(error.response.data)
        logout()
      }
    },
  )

  return privateAxios
}

export default useAuthAxios
