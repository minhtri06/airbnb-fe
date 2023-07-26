import axios from 'axios'

import useAuthTokens from './useAuthTokens'
import useAuth from './useAuth'

const useAuthAxios = () => {
  const privateAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL + '/api/v1',
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

export default useAuthAxios
