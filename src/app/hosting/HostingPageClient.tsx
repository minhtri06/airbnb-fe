'use client'

import PropertyCard from '@/components/PropertyCard'
import Button from '@/components/buttons/Button'
import useAuthStore from '@/stores/useAuthStore'
import useLoginModalStore from '@/stores/useLoginModalStore'
import { property, propertyPaginate } from '@/types'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useAuthAxios from '@/hooks/useAuthAxios'
import Image from 'next/image'
import Link from 'next/link'

const HostingPageClient: React.FC = () => {
  const authAxios = useAuthAxios()
  const authStore = useAuthStore()
  const loginModal = useLoginModalStore()
  const router = useRouter()

  const [myProperties, setMyProperties] = useState<property[]>([])

  useEffect(() => {
    const getMyProperties = async (): Promise<propertyPaginate> => {
      const res = await authAxios.get('/me/properties?limit=100')
      return res.data
    }

    if (authStore.isLogin) {
      getMyProperties().then((result) => setMyProperties(result.data))
    } else setMyProperties([])
  }, [authStore.isLogin, authAxios])

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
              />
            </div>
          </div>
          <div className="">
            {myProperties.length !== 0 ? (
              <>
                <div className="text-2xl font-bold pb-7">Your properties</div>
                <div className="grid grid-cols-4 gap-10">
                  {myProperties.map((p, i) => (
                    <Link key={p._id} href={`my-properties/${p.pageName}`}>
                      <div className="relative pt-[100%] rounded-lg overflow-hidden">
                        <Image
                          src={
                            p.thumbnail && p.thumbnail !== ''
                              ? p.thumbnail
                              : '/img/home-icon.png'
                          }
                          alt="thumbnail"
                          style={{ objectFit: 'cover' }}
                          fill
                          sizes="(max-width: 300px) 100vw, (max-width: 800px) 50vw, 33vw"
                        />
                      </div>
                      <div className="text-lg font-semibold mt-3">
                        {p.title}
                      </div>
                    </Link>
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

export default HostingPageClient
