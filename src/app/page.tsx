'use client'

import Container from '@/components/Container'
import PropertyCard from '@/components/PropertyCard'
import useSearch from '@/hooks/contexts/useSearch'
import useProperties from '@/hooks/useProperties'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const { params, setProperties, properties } = useSearch()
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
  }, [params])

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
                title={property.title}
                thumbnail={property.thumbnail as string}
                address={property.address}
                score={property.score || 9}
                reviewCount={property.reviewCount}
                accommodations={property.accommodations}
                isLoading={isLoading}
              />
            ))}
        </div>
      </Container>
    </div>
  )
}
