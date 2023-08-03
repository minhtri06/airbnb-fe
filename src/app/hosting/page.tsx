'use client'

import Button from '@/components/buttons/Button'
import useCurrentUserStore from '@/hooks/contexts/useCurrentUserStore'
import useLoginModalStore from '@/hooks/contexts/useLoginModalStore'
import { useRouter } from 'next/navigation'

const Hosting: React.FC = () => {
  const currentUserStore = useCurrentUserStore()
  const loginModal = useLoginModalStore()
  const router = useRouter()

  if (currentUserStore.isLoading) {
    return <></>
  }

  return (
    <div className="p-20">
      {currentUserStore.currentUser === null ? (
        <>
          <div className="text-3xl font-bold pb-8">Welcome to Airbnb 🍁</div>
          <div className="text-xl pb-8">
            Login to create a new hosting, are you ready!
          </div>
          <div className="w-32">
            <Button label="Login" onClick={() => loginModal.open()} big />
          </div>
        </>
      ) : (
        <div className="flex justify-between items-center">
          <div className="text-3xl font-bold">
            Welcome, {currentUserStore.currentUser?.name}! 🍁
          </div>
          <div className="w-44">
            <Button
              label="New hosting"
              onClick={() => router.push('/hosting/become-a-host')}
              outline
              big
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Hosting
