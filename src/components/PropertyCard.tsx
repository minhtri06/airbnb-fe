import { property } from '@/types'
import Image from 'next/image'
import React from 'react'
import LoadingText from './texts/LoadingText'
import Link from 'next/link'

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
}) => {
  return (
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
              <LoadingText text={cardTitle} isLoading={isLoading} length={8} />
            </div>

            <span className="whitespace-nowrap text-rose-700">
              {score && (
                <LoadingText
                  text={`${score}/10 (${reviewCount})`}
                  isLoading={isLoading}
                  length={5}
                />
              )}
            </span>
          </div>

          {subText1 && (
            <div className="h-6 overflow-hidden whitespace-nowrap truncate text-gray-500">
              <LoadingText text={subText1} isLoading={isLoading} length={20} />
            </div>
          )}
          {subText2 && (
            <div className="h-6 overflow-hidden whitespace-nowrap truncate">
              <LoadingText text={subText2} isLoading={isLoading} length={20} />
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
  )
}

export default PropertyCard
