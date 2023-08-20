import { property } from '@/types'
import Image from 'next/image'
import React from 'react'
import LoadingText from './texts/LoadingText'
import Link from 'next/link'
import useAuthStore from '@/stores/useAuthStore'
import useLoginModalStore from '@/stores/useLoginModalStore'
import useAuthAxios from '@/hooks/useAuthAxios'

interface PropertyCardProps {
  cardTitle: string
  subText1?: string
  subText2?: string
  thumbnail: string | undefined | null
  score?: number | null
  reviewCount?: number | null
  pricePerNight?: number
  isLoading: boolean
  linkHref: string
  isSaved?: boolean
  propertyId: string
  onSaveChange: (value: boolean) => void
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  cardTitle,
  subText1,
  subText2,
  thumbnail,
  score,
  reviewCount,
  pricePerNight,
  isLoading,
  linkHref,
  isSaved,
  propertyId,
  onSaveChange,
}) => {
  const { isLogin } = useAuthStore()
  const { open: openLoginModal } = useLoginModalStore()
  const authAxios = useAuthAxios()

  const saveProperty = () => {
    authAxios
      .post('/me/saved-properties', { propertyId: propertyId })
      .then(() => onSaveChange(true))
  }

  const unSaveProperty = () => {
    authAxios
      .delete(`/me/saved-properties/${propertyId}`)
      .then(() => onSaveChange(false))
  }

  const handleSaveOnClick = () => {
    if (isLogin === null) return
    if (isLogin === false) {
      openLoginModal()
      return
    }
    if (isSaved === false) saveProperty()
    if (isSaved === true) unSaveProperty()
  }

  return (
    <div className="relative">
      <Link href={linkHref}>
        <div className="w-full cursor-pointer">
          <div className="w-full pt-[100%] relative rounded-xl overflow-hidden bg-slate-200">
            {!isLoading && (
              <Image
                src={thumbnail || '/img/home-icon.png'}
                alt="thumbnail"
                style={{ objectFit: 'cover' }}
                fill
                sizes="(max-width: 300px) 100vw, (max-width: 800px) 50vw, 33vw"
              />
            )}
          </div>
          <div className="pt-3">
            <div className="h-6 font-semibold flex justify-between gap-3">
              <div className="overflow-hidden whitespace-nowrap truncate">
                <LoadingText
                  text={cardTitle}
                  isLoading={isLoading}
                  length={8}
                />
              </div>

              <span className="whitespace-nowrap text-rose-700">
                {score && (
                  <LoadingText
                    text={`${Math.round(score * 10) / 10}/10 (${reviewCount})`}
                    isLoading={isLoading}
                    length={5}
                  />
                )}
              </span>
            </div>

            {subText1 && (
              <div className="h-6 overflow-hidden whitespace-nowrap truncate text-gray-500">
                <LoadingText
                  text={subText1}
                  isLoading={isLoading}
                  length={20}
                />
              </div>
            )}
            {subText2 && (
              <div className="h-6 overflow-hidden whitespace-nowrap truncate">
                <LoadingText
                  text={subText2}
                  isLoading={isLoading}
                  length={20}
                />
              </div>
            )}
            {pricePerNight !== undefined && (
              <div className="font-semibold pb-3">
                <LoadingText
                  text={'$' + pricePerNight + ' night'}
                  isLoading={isLoading}
                  length={3}
                />
              </div>
            )}
          </div>
        </div>
      </Link>
      <div
        className="absolute right-3 top-3 cursor-pointer"
        onClick={handleSaveOnClick}
      >
        <HeartIcon isSaved={isSaved} />
      </div>
    </div>
  )
}

const HeartIcon = ({ isSaved }: { isSaved?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true"
    role="presentation"
    focusable="false"
    style={{
      display: 'block',
      fill: isSaved
        ? 'rgb(225 29 72 / var(--tw-text-opacity))'
        : 'rgba(0, 0, 0, 0.5)',
      height: 24,
      width: 24,
      stroke: '#fff8',
      strokeWidth: 2,
      overflow: 'visible',
    }}
  >
    <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
  </svg>
)

export default PropertyCard
