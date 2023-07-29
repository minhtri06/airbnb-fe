'use client'

import apiAxios from '@/utils/apiAxios'
import useCurrentUser from './contexts/useCurrentUser'
import useAuthTokens from './useAuthTokens'
import {
  GOOGLE_LOGIN,
  LOGIN_URL,
  LOGOUT_URL,
  REGISTER_URL,
} from '@/constants/urls'

const useAuth = () => {
  const { setCurrentUser } = useCurrentUser()
  const { removeAuthTokens, setAccessToken, setRefreshToken, getRefreshToken } =
    useAuthTokens()

  const register = async (body: object) => {
    await apiAxios.post(REGISTER_URL, body)
  }

  const login = async (email: string, password: string) => {
    const res = await apiAxios.post(LOGIN_URL, { email, password })

    setCurrentUser(res.data.user)

    const { accessToken, refreshToken } = res.data.authTokens
    setAccessToken(accessToken)
    setRefreshToken(refreshToken)

    return res.data
  }

  const googleLogin = async (code: string) => {
    const res = await apiAxios.post(GOOGLE_LOGIN + `?code=${code}`)

    const { user, authTokens } = res.data
    setCurrentUser(user)
    console.log(res.data)

    const { accessToken, refreshToken } = authTokens
    setAccessToken(accessToken)
    setRefreshToken(refreshToken)

    return res.data
  }

  const logout = async () => {
    const refreshToken = getRefreshToken()
    await apiAxios.post(LOGOUT_URL, { refreshToken })
    setCurrentUser(null)
    removeAuthTokens()
  }

  return {
    register,
    login,
    googleLogin,
    logout,
  }
}

export default useAuth
