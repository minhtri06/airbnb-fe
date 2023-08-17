'use client'

import PropertyCard from '@/components/PropertyCard'
import Button from '@/components/buttons/Button'
import useAuthStore from '@/stores/useAuthStore'
import useLoginModalStore from '@/stores/useLoginModalStore'
import { property, propertyPaginate } from '@/types'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useAuthAxios from '@/hooks/useAuthAxios'

const HostingPage: React.FC = () => {
  const authAxios = useAuthAxios()
  const authStore = useAuthStore()
  const loginModal = useLoginModalStore()
  const router = useRouter()

  const [myProperties, setMyProperties] = useState<property[]>([])

  useEffect(() => {
    const getMyProperties = async (): Promise<propertyPaginate> => {
      const res = await authAxios.get('/me/properties')
      return res.data
    }

    if (authStore.isLogin) {
      getMyProperties().then((result) => setMyProperties(result.data))
    } else setMyProperties([])
  }, [authStore.isLogin, authAxios])

  console.log('my properties', myProperties)

  if (authStore.isLoading) {
    return <></>
  }

  return (
    <div className="px-16">
      {authStore.isLogin === false && (
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
      )}
      {authStore.isLogin === true && (
        <div>
          <div className="flex justify-between items-center py-16">
            <div className="text-3xl font-bold">
              Welcome, {authStore.currentUser?.name}! 🍁
            </div>
            <div className="w-44">
              <Button
                label="New property"
                onClick={() => router.push('/new-property')}
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
                      key={p._id}
                      cardTitle={p.title}
                      thumbnail={p.thumbnail}
                      isLoading={false}
                      linkHref={`/my-properties/${p.pageName}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-2xl font-bold pb-7">
                No property, let&apos;s create a new one
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default HostingPage
