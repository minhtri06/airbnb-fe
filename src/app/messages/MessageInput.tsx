import useSocket from '@/hooks/useSocket'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const MessageInput = () => {
  const searchParams = useSearchParams()
  // const { chatSocket } = useSocket()
  const router = useRouter()

  const [message, setMessage] = useState('')

  const toUserId = searchParams?.get('t') as string

  // console.log('???', chatSocket?.connected)
  useEffect(() => {
    console.log('rerender')
  }, [])
  const handleSendMessage = () => {
    router.refresh()
    console.log('refresh dau??')
    // console.log(chatSocket)
    console.log('send msg')
  }

  return (
    <div
      className="h-[70px] flex items-center px-5 border-t-[1px]"
      onKeyDown={handleSendMessage}
    >
      <input
        className="w-full outline-none border-[1px] h-12 px-5 rounded-full bg-gray-200"
        value={message}
        onChange={(e) => setMessage(e.currentTarget.value)}
        placeholder="Message..."
      />
    </div>
  )
}

export default MessageInput
