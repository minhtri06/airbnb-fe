import ClientOnly from '@/components/ClientOnly'
import MessagesPageClient from './MessagesPageClient'

const MessagesPage = () => {
  return (
    <ClientOnly>
      <MessagesPageClient />
    </ClientOnly>
  )
}

export default MessagesPage
