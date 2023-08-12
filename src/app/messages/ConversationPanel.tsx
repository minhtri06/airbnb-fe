'use client'

import useChatStore from '@/stores/useChatStore'
import ConversationBox from './ConversationBox'
import { useEffect, useState } from 'react'
import useChatAction from '@/hooks/useChatAction'
import { useSearchParams } from 'next/navigation'
import useAuthService from '@/hooks/useAuthService'

const ConversationPanel = () => {
  const { conversations, setConversations } = useChatStore()
  const searchParams = useSearchParams()
  const { isAuthenticated } = useAuthService()
  const chatAction = useChatAction()

  const toUserId = searchParams?.get('t')

  useEffect(() => {
    if (isAuthenticated())
      chatAction
        .getConversations()
        .then(({ conversations }) => setConversations(conversations))
    else setConversations([])
  }, [])

  return (
    <div className="w-full h-full border-r-[1px]">
      <div className="h-[70px] border-b-[1px] flex items-center px-5 text-lg font-bold">
        Inbox
      </div>
      <div>
        {!conversations ? (
          <></>
        ) : (
          conversations.map((c) => (
            <ConversationBox
              key={c._id}
              isSelected={toUserId === c.withUser._id}
              conversation={c}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default ConversationPanel
