'use client'

import useAuthStore from '@/stores/useAuthStore'

interface LatestMessageProps {
  latestMessage?: { body: string; sender: string }
  withUser: { _id: string; name: string }
}

const LatestMessage: React.FC<LatestMessageProps> = ({
  latestMessage,
  withUser,
}) => {
  const { currentUser } = useAuthStore()

  if (!latestMessage) return <span></span>

  const name =
    latestMessage.sender === currentUser?._id
      ? 'Me'
      : withUser.name.split(' ').pop()

  return <span>{`${name}: ${latestMessage.body}`}</span>
}

export default LatestMessage
