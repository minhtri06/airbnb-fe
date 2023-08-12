import axios, { InternalAxiosRequestConfig } from 'axios'

import useAuthTokens from './useAuthTokens'
import useAuthService from './useAuthService'
import { BASE_URL } from '@/constants/urls'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'
const authAxios = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

const useAuthAxios = () => {
  const { logout } = useAuthService()
  const { refreshTokenProcess, getAccessToken, refreshAuthTokens } =
    useAuthTokens()

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
  }, [getAccessToken, logout, refreshAuthTokens, refreshTokenProcess])

  return useMemo(() => authAxios, [])
}

export default useAuthAxios
