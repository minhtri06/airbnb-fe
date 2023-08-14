import { useCallback, useEffect, useMemo } from 'react'
import { io } from 'socket.io-client'
import useAuthStore from '@/stores/useAuthStore'
import { getAccessToken } from '@/utils/tokenUtils'
import useChatStore from '@/stores/useChatStore'
import { useSearchParams } from 'next/navigation'
import useAuthAxios from './useAuthAxios'
import apiAxios from '@/utils/apiAxios'
import useAuth from './useAuth'

const useChat = () => {
  const { isLogin } = useAuthStore()
  const authAxios = useAuthAxios()
  const {
    chats,
    conversations,
    setChats,
    setConversations,
    chatSocket,
    setChatSocket,
  } = useChatStore()
  const { currentUser } = useAuthStore()
  const searchParams = useSearchParams()
  const { handleRefreshToken } = useAuth()

  const findChat = useCallback(
    (userId: string) => chats.find((c) => c.user._id === userId) || null,
    [chats],
  )
  const findConversation = useCallback(
    (userId: string) =>
      conversations.find((c) => c.withUser._id === userId) || null,
    [conversations],
  )

  const toUserId = useMemo(() => searchParams?.get('t'), [searchParams])
  const currentChat = useMemo(
    () => (toUserId ? findChat(toUserId) : null),
    [findChat, toUserId],
  )
  const currentConversation = useMemo(
    () => (toUserId ? findConversation(toUserId) : null),
    [findConversation, toUserId],
  )

  const initSocket = useCallback(() => {
    const socket = io(process.env.NEXT_PUBLIC_SERVER_URL + '/chat', {
      auth: { accessToken: getAccessToken() },
    })
    socket.on('connect_error', (error) => socket.disconnect())
    return socket
  }, [])

  const handleSendMessage = useCallback(() => {
    if (!currentChat || !currentUser || currentChat.newMessage.length === 0) {
      return
    }

    chatSocket?.emit('send-message', {
      receiverId: currentChat?.user._id,
      body: currentChat?.newMessage,
    })

    if (currentConversation) {
      currentConversation.latestMessage = {
        body: currentChat.newMessage,
        sender: currentUser._id,
      }
      setConversations([
        currentConversation,
        ...conversations.filter((c) => c._id !== currentConversation._id),
      ])
    } else {
      setConversations([
        {
          latestMessage: {
            body: currentChat.newMessage,
            sender: currentUser._id,
          },
          withUser: currentChat.user,
        },
        ...conversations,
      ])
    }

    authAxios.post('/chats/messages', {
      toUserId: currentChat.user._id,
      body: currentChat.newMessage,
    })

    currentChat.messages.unshift({
      body: currentChat.newMessage,
      userIds: [currentUser._id, currentChat.user._id],
    })
    currentChat.newMessage = ''
    setChats([...chats])
  }, [
    authAxios,
    chatSocket,
    chats,
    conversations,
    currentChat,
    currentConversation,
    currentUser,
    setChats,
    setConversations,
  ])

  const handleReceiveMessage = useCallback(
    ({ senderId, body }: { senderId: string; body: string }) => {
      if (!currentUser) return

      const chat = findChat(senderId)
      if (chat) {
        chat.messages.unshift({ body, userIds: [senderId, currentUser._id] })
        setChats([...chats])
      }

      const conversation = findConversation(senderId)
      if (conversation) {
        conversation.latestMessage = { body, sender: senderId }
        setConversations([
          conversation,
          ...conversations.filter((c) => c._id !== conversation._id),
        ])
      } else {
        apiAxios.get('/users/' + senderId).then((res) => {
          const { user } = res.data
          setConversations([
            { latestMessage: { body, sender: senderId }, withUser: user },
            ...conversations,
          ])
        })
      }
    },
    [
      chats,
      conversations,
      currentUser,
      findChat,
      findConversation,
      setChats,
      setConversations,
    ],
  )

  useEffect(() => {
    if (!isLogin || !currentUser) setChatSocket(null)
    else if (chatSocket === null) setChatSocket(initSocket())
  }, [chatSocket, currentUser, initSocket, isLogin, setChatSocket])

  useEffect(() => {
    chatSocket?.off('receive-message')
    chatSocket?.on('receive-message', handleReceiveMessage)
  }, [chatSocket, handleReceiveMessage])

  return {
    chatSocket,
    toUserId,
    currentChat,
    chats,
    setChats,
    handleSendMessage,
  }
}

export default useChat
