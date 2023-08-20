import Container from '@/components/Container'
import Button from '@/components/buttons/Button'
import Link from 'next/link'

const NoConversation = () => {
  return (
    <div>
      <Container>
        <div className="flex flex-col items-center py-6">
          <div className="text-xl font-bold">You have no unread messages</div>
          <div className="text-gray-500 mt-3">
            When you book a trip or experience,
          </div>
          <div className="text-gray-500">
            messages from your host will show up here.
          </div>
          <div className="w-40 mt-3">
            <Link href="/">
              <Button label="Explore Airbnb" onClick={() => {}} outline />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default NoConversation
