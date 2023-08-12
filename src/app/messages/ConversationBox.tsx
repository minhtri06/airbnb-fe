import Avatar from '@/components/Avatar'
import { conversation } from '@/types'
import Link from 'next/link'
import useAuthStore from '@/stores/useAuthStore'

interface ConversationBoxProps {
  isSelected: boolean
  conversation: conversation
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  isSelected,
  conversation,
}) => {
  const { currentUser } = useAuthStore()

  const { latestMessage, withUser } = conversation

  if (!latestMessage) return <span></span>

  const name =
    latestMessage.sender === currentUser?._id
      ? 'Me'
      : withUser.name.split(' ').pop()

  return (
    <Link href={'/messages?t=' + withUser._id}>
      <div
        className={`px-5 h-[70px] flex items-center border-b-[1px] cursor-pointer 
        ${isSelected ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
      >
        <Avatar avatarUrl={conversation.withUser.avatar} size="md" />
        <div className="h-12 px-5 flex flex-col justify-between">
          <span className=" font-bold">{conversation.withUser.name}</span>
          <span className="text-base">{`${name}: ${latestMessage.body}`}</span>
        </div>
      </div>
    </Link>
  )
}

export default ConversationBox
