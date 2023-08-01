'use client'

import Container from '@/components/Container'
import PropertyCard from '@/components/PropertyCard'
import useSearchStore from '@/hooks/contexts/useSearchStore'
import useProperties from '@/hooks/useProperties'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const { params, setProperties, properties } = useSearchStore()
  const { searchProperties } = useProperties()

  useEffect(() => {
    setIsLoading(true)

    searchProperties(params)
      .then((data) => {
        setProperties(data.properties)
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data)
        }
        console.log(error)
      })
      .finally(() => setIsLoading(false))
  }, [])

  console.log(usePathname())
  return (
    <div>
      <Container>
        <div
          className=" pt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
              xl:grid-cols-5 2xl:grid-cols-6 gap-8"
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
              />
            ))}
        </div>
      </Container>
    </div>
  )
}
