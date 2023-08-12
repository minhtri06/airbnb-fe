import axios from 'axios'

import useAuthService from './useAuthService'
import { BASE_URL } from '@/constants/urls'
import { useEffect, useMemo } from 'react'
const authAxios = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})
import {
  getAccessToken,
  refreshAuthTokens,
  refreshTokenProcess,
} from '@/utils/tokenUtils'

const useAuthAxios = () => {
  const { logout } = useAuthService()

  useEffect(() => {
    const requestInterceptor = authAxios.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization)
          config.headers.Authorization = getAccessToken()
        return config
      },
      (error) => Promise.reject(error),
    )

    const responseInterceptor = authAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log('response error')
        if (axios.isAxiosError(error)) {
          // Handle refresh token
          const preRequest = error.config
          if (error.response?.status === 401 && preRequest) {
            try {
              if (!refreshTokenProcess.isPending) {
                refreshTokenProcess.isPending = true
                refreshTokenProcess.promise = refreshAuthTokens()
              }
              const { newAccessToken } = await refreshTokenProcess.promise
              refreshTokenProcess.isPending = false
              preRequest.headers.Authorization = newAccessToken
              return await authAxios(preRequest)
            } catch (error) {
              logout()
            }
          }

          // Print error
          console.log(error.response?.data)
        } else {
          console.log(error)
        }
        return Promise.reject(error)
      },
    )

    return () => {
      authAxios.interceptors.request.eject(requestInterceptor)
      authAxios.interceptors.response.eject(responseInterceptor)
    }
  }, [logout])

  return useMemo(() => authAxios, [])
}

export default useAuthAxios
