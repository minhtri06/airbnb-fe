'use client'

import useChatStore from '@/stores/useChatStore'
import ConversationBox from './ConversationBox'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import useAuthAxios from '@/hooks/useAuthAxios'
import { conversation } from '@/types'
import useAuthStore from '@/stores/useAuthStore'

const ConversationPanel = () => {
  const { conversations, setConversations } = useChatStore()
  const authAxios = useAuthAxios()
  const searchParams = useSearchParams()
  const { isLogin } = useAuthStore()

  const toUserId = searchParams?.get('t')

  useEffect(() => {
    if (isLogin) {
      const getConversations = async (): Promise<{
        conversations: conversation[]
      }> => {
        const res = await authAxios.get('/me/conversations')
        return res.data
      }

      getConversations().then(({ conversations }) =>
        setConversations(conversations),
      )
    } else setConversations([])
  }, [authAxios, isLogin, setConversations])

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
