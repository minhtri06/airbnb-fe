'use client'

import Container from '@/components/Container'
import PaginationController from '@/components/PaginationController'
import PropertyCard from '@/components/PropertyCard'
import useAuthAxios from '@/hooks/useAuthAxios'
import { property, propertyPaginate } from '@/types'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home({ searchParams }: { searchParams: any }) {
  const authAxios = useAuthAxios()

  const [properties, setProperties] = useState<property[] | null>([])
  const [isLoading, setIsLoading] = useState(false)
  const [totalPage, setTotalPage] = useState<number | null>(1)

  const { categoryCode, page } = searchParams

  useEffect(() => setProperties(null), [categoryCode, page])

  useEffect(() => setTotalPage(null), [categoryCode])

  useEffect(() => {
    const searchProperties = async (params: any): Promise<propertyPaginate> => {
      const res = await authAxios.get('/properties', { params })
      return res.data
    }

    if (properties === null) {
      setIsLoading(true)
      searchProperties({
        categoryCode,
        page,
        limit: 16,
        checkPaginate: totalPage === null,
      })
        .then((results) => {
          setProperties(results.data)
          if (results.totalPage) setTotalPage(results.totalPage)
        })
        .catch((error) => {
          if (axios.isAxiosError(error)) console.log(error.response?.data)
          else console.log(error)
        })
        .finally(() => setIsLoading(false))
    }
  }, [categoryCode, page, authAxios, totalPage, properties])

  return (
    <div>
      <Container>
        <div
          className=" pt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
            2xl:grid-cols-5 gap-6"
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
                score={property.score}
                reviewCount={property.reviewCount}
                pricePerNight={
                  property.accommodations[0].pricePerNight as number
                }
                isLoading={isLoading}
                linkHref={`/properties/${property.pageName}`}
              />
            ))}
        </div>
        {totalPage !== null && totalPage > 1 && (
          <PaginationController
            currentPage={searchParams.page || 1}
            maxPage={totalPage}
          />
        )}
      </Container>
    </div>
  )
}
