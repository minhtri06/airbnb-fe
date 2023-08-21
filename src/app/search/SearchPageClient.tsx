'use client'

import Container from '@/components/Container'
import PaginationController from '@/components/PaginationController'
import PropertyCard from '@/components/PropertyCard'
import useAuthAxios from '@/hooks/useAuthAxios'
import useAuthStore from '@/stores/useAuthStore'
import { property, propertyPaginate } from '@/types'
import pickFields from '@/utils/pickFields'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const SearchMap = dynamic(() => import('./SearchMap'), { ssr: false })

const SearchPageClient = ({ searchParams }: { searchParams: any }) => {
  const authAxios = useAuthAxios()
  const { isLogin } = useAuthStore()

  const [properties, setProperties] = useState<property[] | null>([])
  const [isLoading, setIsLoading] = useState(false)
  const [totalPage, setTotalPage] = useState<number | null>(1)

  const { provinceId, districtId, page, bookIn, bookOut, categoryCode } =
    searchParams

  useEffect(
    () => setProperties(null),
    [provinceId, districtId, page, bookIn, bookOut, categoryCode, isLogin],
  )
  useEffect(
    () => setTotalPage(null),
    [provinceId, districtId, bookIn, bookOut, categoryCode],
  )

  useEffect(() => {
    if (properties !== null) return

    const searchProperties = async (params: any): Promise<propertyPaginate> => {
      const res = await authAxios.get('/properties', { params })
      return res.data
    }

    setIsLoading(true)
    searchProperties({
      provinceId,
      districtId,
      page,
      bookIn,
      bookOut,
      categoryCode,
      limit: 15,
      checkPaginate: totalPage === null,
    })
      .then((result) => {
        setProperties(result.data)
        if (result.totalPage) setTotalPage(result.totalPage)
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) console.log(error.response?.data)
        else console.log(error)
      })
      .finally(() => setIsLoading(false))
  }, [
    totalPage,
    authAxios,
    properties,
    provinceId,
    districtId,
    page,
    bookIn,
    bookOut,
    categoryCode,
  ])

  return (
    <>
      <div className="flex">
        <div className="w-[62%] mr-0">
          <Container>
            <div className="">
              <div
                className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                  xl:grid-cols-5 2xl:grid-cols-6 gap-6"
              >
                {properties &&
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
                        score={property.score}
                        reviewCount={property.reviewCount}
                        pricePerNight={
                          property.accommodations[0].pricePerNight as number
                        }
                        isLoading={isLoading}
                        linkHref={linkHref}
                        isSaved={property.isSaved}
                        propertyId={property._id}
                        onSaveChange={(newSave) => {
                          property.isSaved = newSave
                          setProperties([...properties])
                        }}
                      />
                    )
                  })}
              </div>
              {properties && properties.length === 0 && (
                <div className="text-2xl font-semibold flex justify-center items-center mt-10">
                  No property found
                </div>
              )}

              {totalPage !== null && totalPage > 1 && (
                <PaginationController
                  currentPage={searchParams.page}
                  maxPage={totalPage}
                />
              )}
            </div>
          </Container>
        </div>
        <SearchMap properties={properties} />
      </div>
    </>
  )
}

export default SearchPageClient
