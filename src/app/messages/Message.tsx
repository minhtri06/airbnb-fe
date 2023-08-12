'use client'

import Avatar from '@/components/Avatar'
import useAuthStore from '@/stores/useAuthStore'
import { message, user } from '@/types'

interface MessageProps {
  message: message
  chatUser: user
}

const Message: React.FC<MessageProps> = ({ message, chatUser }) => {
  const { currentUser } = useAuthStore()

  const isFromMe = message.userIds[0] === currentUser?._id

  return (
    <div
      className={`flex items-center gap-3  mb-2 ${isFromMe && 'justify-end'}`}
    >
      {!isFromMe && <Avatar size="sm" avatarUrl={chatUser.avatar} />}
      <div className="px-3 py-2 rounded-full bg-gray-200">{message.body}</div>
    </div>
  )
}

export default Message
