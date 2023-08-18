'use client'

import Container from '@/components/Container'
import { accommodation, ownerObj, property, review } from '@/types'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ReserveBoard from './ReserveBoard'
import ImageGallery from './ImageGallery'
import Heading from './Heading'
import Categories from './Categories'
import Description from './Description'
import Reviews from './Reviews'
import dynamic from 'next/dynamic'
import AboutHost from './AboutHost'
import apiAxios from '@/utils/apiAxios'
import useAuthAxios from '@/hooks/useAuthAxios'
import useAuthStore from '@/stores/useAuthStore'

const PropertyMap = dynamic(() => import('./PropertyMap'), { ssr: false })

const PropertyDetailPageClient = ({
  params,
}: {
  params: { pageName: string }
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const authAxios = useAuthAxios()
  const { isLogin } = useAuthStore()

  const bIn = searchParams?.get('bookIn')
  const bOut = searchParams?.get('bookOut')

  const [property, setProperty] = useState<property | null>(null)
  const [reviews, setReviews] = useState<review[]>([])
  const [reviewTotalPage, setReviewTotalPage] = useState<number>(-1)
  const [bookIn, setBookIn] = useState<Date | null>(bIn ? new Date(bIn) : null)
  const [bookOut, setBookOut] = useState<Date | null>(
    bOut ? new Date(bOut) : null,
  )
  const [selectedAccom, setSelectedAccom] = useState<accommodation | null>(null)

  console.log(property?.isSaved)
  useEffect(() => {
    const getPropertyByPageName = async (
      pageName: string,
      params: {
        bookIn?: Date | null
        bookOut?: Date | null
        includeReviews?: boolean
      } = {},
    ): Promise<{
      property: property
      reviews: { data: review[]; totalRecords?: number; totalPage?: number }
    }> => {
      const res = await authAxios.get(`/properties/page-name:${pageName}`, {
        params,
      })
      return res.data
    }

    getPropertyByPageName(params.pageName, {
      bookIn,
      bookOut,
      includeReviews: true,
    })
      .then((data) => {
        setProperty(data.property)
        setReviews(
          data.reviews.data.map((r) => {
            r.createdAt = new Date(r.createdAt)
            return r
          }),
        )
        setReviewTotalPage(data.reviews.totalPage as number)
      })
      .catch((e) => {
        if (axios.isAxiosError(e)) {
          if (e.response?.status === 404) {
            router.push('/404')
            return
          }
        }
        router.push('/500')
      })
  }, [authAxios, bookIn, bookOut, params.pageName, router, isLogin])

  useEffect(() => {
    setSelectedAccom(null)
  }, [property])

  const handleBookingOnChange = (
    newBookIn: Date | null,
    newBookOut: Date | null,
  ) => {
    setBookIn(newBookIn)
    setBookOut(newBookOut)
  }

  const handleSelectedAccomOnChange = (value: accommodation | null) => {
    setSelectedAccom(value)
  }

  if (!property) {
    return <div>Loading...</div>
  }

  return (
    <div className="mb-14">
      <Container>
        <Heading property={property} setProperty={setProperty} />

        <ImageGallery property={property} />

        <div className="flex pt-14">
          <div className="w-3/5 min-w-1000px">
            <AboutHost owner={property.owner as ownerObj} />

            <hr className="my-14" />

            <Categories property={property} />

            <hr className="my-14" />

            <Description property={property} />
          </div>

          <div className="w-2/5 min-w-[300px] flex justify-end">
            <ReserveBoard
              propertyId={property._id}
              bookIn={bookIn}
              bookOut={bookOut}
              bookingOnChange={handleBookingOnChange}
              accommodations={property.accommodations}
              isAvailable={property.isAvailable}
              selectedAccom={selectedAccom}
              selectedAccomOnChange={handleSelectedAccomOnChange}
            />
          </div>
        </div>
        <hr className="my-14" />
        <div>
          <Reviews
            reviews={reviews}
            setReviews={setReviews}
            reviewTotalPage={reviewTotalPage}
            propertyScore={property.score}
            reviewCount={property.reviewCount}
            propertyId={property._id}
          />
        </div>

        <hr className="my-14" />

        <PropertyMap property={property} />
      </Container>
    </div>
  )
}

export default PropertyDetailPageClient
