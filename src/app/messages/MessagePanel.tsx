'use client'

import useChatStore from '@/stores/useChatStore'
import useAuthStore from '@/stores/useAuthStore'
import { chat, message, user } from '@/types'
import { useCallback, useEffect } from 'react'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import Message from './Message'
import MessageInput from './MessageInput'
import Avatar from '@/components/Avatar'
import apiAxios from '@/utils/apiAxios'
import useAuthAxios from '@/hooks/useAuthAxios'
import useChat from '@/hooks/useChat'

const MessagePanel = () => {
  const { chats, setChats } = useChatStore()
  const { isLogin } = useAuthStore()
  const router = useRouter()
  const authAxios = useAuthAxios()
  const { toUserId, currentChat } = useChat()

  useEffect(() => {
    const getUserById = async (userId: string): Promise<{ user: user }> => {
      const res = await apiAxios.get(`/users/${userId}`)
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

    if (!isLogin) {
      if (chats.length !== 0) setChats([])
      return
    }
    if (toUserId && !currentChat) {
      Promise.all([getUserById(toUserId), getMessages(toUserId)])
        .then(([{ user }, { messages }]) => {
          const chat: chat = {
            user: { _id: user._id, name: user.name, avatar: user.avatar },
            messages: messages,
            newMessage: '',
          }
          setChats([...chats, chat])
        })
        .catch((error) => {
          if (!axios.isAxiosError(error)) {
            router.push('/500')
          }
        })
    }
  }, [isLogin, toUserId, authAxios, chats, currentChat, router, setChats])

  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-[70px] border-b-[1px] flex items-center px-5 gap-5">
        {currentChat && (
          <>
            <Avatar size="md" avatarUrl={currentChat?.user?.avatar} />
            <span className="font-bold">{currentChat?.user.name}</span>
          </>
        )}
      </div>
      {currentChat && (
        <>
          <div className="flex-1 flex flex-col-reverse px-5 overflow-y-auto">
            {currentChat &&
              currentChat.messages.map((m, i) => (
                <Message key={i} chatUser={currentChat!.user} message={m} />
              ))}
          </div>

          <MessageInput />
        </>
      )}
    </div>
  )
}

export default MessagePanel
