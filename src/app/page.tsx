'use client'

import Container from '@/components/Container'
import PaginationController from '@/components/PaginationController'
import PropertyCard from '@/components/PropertyCard'
import usePropertyAction from '@/hooks/usePropertyAction'
import { property } from '@/types'
import axios from 'axios'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home({ searchParams }: { searchParams: any }) {
  const { searchProperties } = usePropertyAction()
  const router = useRouter()

  const [properties, setProperties] = useState<property[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    searchProperties({ ...searchParams, limit: 16 })
      .then((data) => {
        setProperties(data.properties)
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data)
        } else {
          console.log(error)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [searchParams])

  return (
    <div>
      <Container>
        <div
          className=" pt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
            xl:grid-cols-5 2xl:grid-cols-6 gap-6"
        >
          {properties &&
            properties.map((property) => (
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
                isLoading={isLoading}
                onClick={() => {
                  router.push(`/properties/${property.pageName}`)
                }}
              />
            ))}
        </div>
        {properties.length !== 0 && (
          <PaginationController currentPage={searchParams.page} maxPage={6} />
        )}
      </Container>
    </div>
  )
}
