import { property } from '@/types'
import Image from 'next/image'
import React from 'react'
import LoadingText from './texts/LoadingText'

interface PropertyCardProps extends property {
  isLoading: boolean
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  title,
  address,
  thumbnail,
  score,
  reviewCount,
  accommodations,
  isLoading,
}) => {
  return (
    <div className="w-full cursor-pointer">
      <div className="w-full pt-[100%] relative rounded-xl overflow-hidden bg-slate-200">
        {!isLoading && (
          <Image
            src={thumbnail || ''}
            alt="thumbnail"
            style={{ objectFit: 'cover' }}
            fill
            sizes="(max-width: 300px) 100vw, (max-width: 800px) 50vw, 33vw"
          />
        )}
      </div>
      <div className="pt-3">
        <div className="pb-1 h-7 font-semibold flex justify-between gap-3">
          <div className="overflow-hidden whitespace-nowrap truncate">
            <LoadingText
              text={address?.provinceName + ','}
              isLoading={isLoading}
              length={8}
            />{' '}
            <LoadingText
              text={address?.districtName || ''}
              isLoading={isLoading}
              length={8}
            />
          </div>
          <span className="whitespace-nowrap text-rose-700">
            <LoadingText
              text={`${score}/10 (${reviewCount})`}
              isLoading={isLoading}
              length={5}
            />
          </span>
        </div>

        <div className="pb-1 h-7 overflow-hidden whitespace-nowrap truncate">
          <LoadingText text={title || ''} isLoading={isLoading} length={20} />
        </div>

        <div className="font-semibold pb-3">
          <LoadingText
            text={`$${accommodations && accommodations[0].pricePerNight}`}
            isLoading={isLoading}
            length={3}
          />
        </div>
      </div>
    </div>
  )
}

export default PropertyCard
