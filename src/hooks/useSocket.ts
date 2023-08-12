import { useEffect } from 'react'
import { Socket, io } from 'socket.io-client'
import useAuthStore from '@/stores/useAuthStore'
import useAuthService from './useAuthService'
import useAuthTokens from './useAuthTokens'

let chatSocket: Socket | null = null

const useSocket = () => {
  const { isLogin } = useAuthStore()
  const { logout } = useAuthService()
  const { getAccessToken } = useAuthTokens()

  useEffect(() => {
    if (!isLogin) chatSocket = null
    else if (chatSocket === null) {
      chatSocket = io(process.env.NEXT_PUBLIC_SERVER_URL + '/chat', {
        auth: { accessToken: getAccessToken() },
      })
      chatSocket.on('connect_error', (error) => {
        // if (error.message === '')
        console.log(error.message)
      })
    }
  }, [isLogin, getAccessToken])

  return { chatSocket }
}

export default useSocket
