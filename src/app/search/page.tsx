'use client'

import Container from '@/components/Container'
import PaginationController from '@/components/PaginationController'
import PropertyCard from '@/components/PropertyCard'
import usePropertyAction from '@/hooks/usePropertyAction'
import { property } from '@/types'
import pickFields from '@/utils/pickFields'
import axios from 'axios'
import { useEffect, useState } from 'react'
import SearchMap from './SearchMap'

const page = ({ searchParams }: { searchParams: any }) => {
  const [properties, setProperties] = useState<property[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { searchProperties } = usePropertyAction()

  useEffect(() => {
    setIsLoading(true)
    searchProperties({ ...searchParams, limit: 15 })
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

  console.log(properties)

  return (
    <div className="flex">
      <div className="w-[62%] mr-0">
        <Container>
          <div className="">
            <div
              className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3
            xl:grid-cols-5 2xl:grid-cols-6 gap-6"
            >
              {properties.length !== 0 &&
                properties.map((property) => {
                  const query = new URLSearchParams(
                    pickFields(searchParams, 'bookIn', 'bookOut'),
                  )
                  const linkHref = `/properties/${
                    property.pageName
                  }?${query.toString()}`
                  return (
                    <PropertyCard
                      key={property._id}
                      cardTitle={property.title}
                      subText1={
                        (property.address?.districtName +
                          ', ' +
                          property.address?.provinceName) as string
                      }
                      thumbnail={property.thumbnail as string}
                      score={property.score || 9}
                      reviewCount={property.reviewCount}
                      pricePerNight={
                        property.accommodations[0].pricePerNight as number
                      }
                      isLoading={isLoading}
                      linkHref={linkHref}
                    />
                  )
                })}
            </div>
            {properties.length !== 0 && (
              <PaginationController
                currentPage={searchParams.page}
                maxPage={2}
              />
            )}
          </div>
        </Container>
      </div>
      {properties.length !== 0 && <SearchMap properties={properties} />}
    </div>
  )
}

export default page
