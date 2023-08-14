import useChat from '@/hooks/useChat'

const MessageInput = () => {
  const { currentChat, chats, setChats, handleSendMessage } = useChat()

  if (!currentChat) return <></>

  const setNewMessage = (value: string) => {
    if (!currentChat) {
      return
    }
    currentChat.newMessage = value
    setChats([...chats])
  }

  return (
    <div
      className="h-[70px] flex items-center px-5 border-t-[1px]"
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleSendMessage()
      }}
    >
      <input
        className="w-full outline-none border-[1px] h-12 px-5 rounded-full bg-gray-200"
        value={currentChat.newMessage}
        onChange={(e) => setNewMessage(e.currentTarget.value)}
        placeholder="Message..."
      />
    </div>
  )
}

export default MessageInput
