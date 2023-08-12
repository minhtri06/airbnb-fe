import { conversation, message, messagePaginate, user } from '@/types'
import useAuthAxios from './useAuthAxios'
import useChatStore from '@/stores/useChatStore'

const useChatAction = () => {
  const authAxios = useAuthAxios()
  const chatStore = useChatStore()

  const getConversations = async (): Promise<{
    conversations: conversation[]
  }> => {
    const res = await authAxios.get('/me/conversations')
    return res.data
  }

  const getMessages = async (
    withUserId: string,
  ): Promise<{ messages: message[] }> => {
    const res = await authAxios.get('/chats/messages', {
      params: { withUserId },
    })
    return res.data
  }

  return { getConversations, getMessages }
}

export default useChatAction
