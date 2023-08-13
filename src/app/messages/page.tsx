'use client'

import { useEffect } from 'react'
import ConversationPanel from './ConversationPanel'
import MessagePanel from './MessagePanel'
import useAuthStore from '@/stores/useAuthStore'
import useLoginModalStore from '@/stores/useLoginModalStore'
import useSocket from '@/hooks/useSocket'

const MessagesPage = () => {
  const { isLogin } = useAuthStore()
  const loginModalStore = useLoginModalStore()
  const { chatSocket } = useSocket()

  useEffect(() => {
    if (isLogin === false) loginModalStore.open()
  }, [isLogin, loginModalStore])

  return (
    <div className="flex h-[calc(100vh-5rem)]">
      <div className="w-1/3">
        <ConversationPanel />
      </div>
      <div className="w-2/3">
        <MessagePanel />
      </div>
    </div>
  )
}

export default MessagesPage
