'use client'

import useChatStore from '@/stores/useChatStore'
import useAuthStore from '@/stores/useAuthStore'
import useChatAction from '@/hooks/useChatAction'
import useUserAction from '@/hooks/useUserAction'
import { chat, message } from '@/types'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import Message from './Message'
import MessageInput from './MessageInput'
import Avatar from '@/components/Avatar'

const MessagePanel = () => {
  const { chats, setChats } = useChatStore()
  const { isLogin } = useAuthStore()
  const userAction = useUserAction()
  const chatAction = useChatAction()
  const router = useRouter()
  const searchParams = useSearchParams()

  const toUserId = searchParams?.get('t')

  const getCurrentChat = (userId: string) =>
    chats.find((c) => c.user._id === userId) || null

  useEffect(() => {
    if (!isLogin) {
      setChats([])
      return
    }
    if (toUserId && !getCurrentChat(toUserId)) {
      Promise.all([
        userAction.getUserById(toUserId),
        chatAction.getMessages(toUserId),
      ])
        .then(([{ user }, { messages }]) => {
          const chat: chat = {
            user: { _id: user._id, name: user.name, avatar: user.avatar },
            messages: messages,
          }
          setChats([...chats, chat])
        })
        .catch((err) => {
          if (axios.isAxiosError(err) && err.response?.status !== 404)
            router.push('/500')
        })
    }
  }, [isLogin, toUserId])

  let currentChat: chat | null = null
  if (toUserId) {
    currentChat = getCurrentChat(toUserId)
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-[70px] border-b-[1px] flex items-center px-5 gap-5">
        <Avatar size="md" avatarUrl={currentChat?.user?.avatar} />
        <span className="font-bold">{currentChat?.user.name}</span>
      </div>
      {currentChat && (
        <>
          <div className="flex-1 flex flex-col-reverse px-5">
            {currentChat &&
              currentChat.messages.map((m) => (
                <Message key={m._id} chatUser={currentChat!.user} message={m} />
              ))}
          </div>

          <MessageInput />
        </>
      )}
    </div>
  )
}

export default MessagePanel
