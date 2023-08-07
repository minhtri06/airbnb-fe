'use client'

import PropertyCard from '@/components/PropertyCard'
import Button from '@/components/buttons/Button'
import useCurrentUserStore from '@/hooks/contexts/useCurrentUserStore'
import useLoginModalStore from '@/hooks/contexts/useLoginModalStore'
import usePropertyAction from '@/hooks/usePropertyAction'
import { property } from '@/types'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Hosting: React.FC = () => {
  const currentUserStore = useCurrentUserStore()
  const loginModal = useLoginModalStore()
  const router = useRouter()
  const propertyAction = usePropertyAction()

  const [myProperties, setMyProperties] = useState<property[]>([])

  useEffect(() => {
    if (currentUserStore.currentUser) {
      propertyAction.getMyProperties().then((result) => {
        setMyProperties(result.data)
      })
    }
  }, [currentUserStore.currentUser])

  console.log(myProperties)

  if (currentUserStore.isLoading) {
    return <></>
  }

  return (
    <div className="px-16">
      {currentUserStore.currentUser === null ? (
        <>
          <div className="text-3xl font-bold pb-8 pt-20">
            Welcome to Airbnb 🍁
          </div>
          <div className="text-xl pb-8">
            Login to create a new hosting, are you ready!
          </div>
          <div className="w-32">
            <Button
              label="Login"
              onClick={() => loginModal.open()}
              big
              outline
            />
          </div>
        </>
      ) : (
        <div>
          <div className="flex justify-between items-center py-16">
            <div className="text-3xl font-bold">
              Welcome, {currentUserStore.currentUser?.name}! 🍁
            </div>
            <div className="w-44">
              <Button
                label="New property"
                onClick={() => router.push('/hosting/become-a-host')}
                outline
                big
              />
            </div>
          </div>
          <div className="">
            {myProperties.length !== 0 ? (
              <>
                <div className="text-2xl font-bold pb-7">Your property</div>
                <div className="grid grid-cols-4 gap-10 text-lg">
                  {myProperties.map((p, i) => (
                    <PropertyCard
                      key={i}
                      cardTitle={p.title}
                      thumbnail={p.thumbnail}
                      isLoading={false}
                      linkHref={`/hosting/my-properties/${p.pageName}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-2xl font-bold pb-7">
                No property, let's create a new one
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Hosting
