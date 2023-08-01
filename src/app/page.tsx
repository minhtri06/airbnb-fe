'use client'

import Container from '@/components/Container'
import PaginationController from '@/components/PaginationController'
import PropertyCard from '@/components/PropertyCard'
import useSearchStore from '@/hooks/contexts/useSearchStore'
import useProperties from '@/hooks/useProperties'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home({
  searchParams,
}: {
  searchParams: { page: string | undefined }
}) {
  const searchStore = useSearchStore()
  const { searchProperties } = useProperties()

  useEffect(() => {
    searchProperties({ page: searchParams.page, limit: 16 }).catch((error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data)
      } else {
        console.log(error)
      }
    })
    console.log('call at page')
  }, [searchStore.params.categoryCode, searchParams.page])

  console.log(usePathname())
  return (
    <div>
      <Container>
        <div
          className=" pt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
            xl:grid-cols-5 2xl:grid-cols-6 gap-8"
        >
          {searchStore.properties &&
            searchStore.properties.map((property) => (
              <PropertyCard
                key={property._id}
                cardTitle={
                  property.address?.districtName +
                  ', ' +
                  property.address?.provinceName
                }
                subText1={property.title as string}
                thumbnail={property.thumbnail as string}
                score={property.score || 9}
                reviewCount={property.reviewCount}
                pricePerNight={property.accommodations[0].pricePerNight}
                isLoading={searchStore.isLoading}
              />
            ))}
        </div>
        <PaginationController currentPage={searchParams.page} maxPage={2} />
      </Container>
    </div>
  )
}
