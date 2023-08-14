import axios from 'axios'

import useAuth from './useAuth'
import { BASE_URL } from '@/constants/urls'
import { useMemo } from 'react'

import { getAccessToken } from '@/utils/tokenUtils'

const useAuthAxios = () => {
  const { handleRefreshToken } = useAuth()

  return useMemo(() => {
    const authAxios = axios.create({
      baseURL: BASE_URL,
      headers: { 'Content-Type': 'application/json' },
    })

    authAxios.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization)
          config.headers.Authorization = getAccessToken()
        return config
      },
      (error) => Promise.reject(error),
    )

    authAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (axios.isAxiosError(error)) {
          // Handle refresh token
          const preRequest = error.config
          if (error.response?.status === 401 && preRequest) {
            console.log('refresh')
            await handleRefreshToken()
            preRequest.headers.Authorization = getAccessToken()
            return authAxios(preRequest)
          }
          // Print error
          console.log(error.response?.data)
        } else {
          console.log(error)
        }
        return Promise.reject(error)
      },
    )

    return authAxios
  }, [handleRefreshToken])
}

export default useAuthAxios
