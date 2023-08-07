'use client'

import Container from '@/components/Container'
import usePropertyAction from '@/hooks/usePropertyAction'
import { accommodation, ownerObj, property, review } from '@/types'
import axios from 'axios'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ReserveBoard from './ReserveBoard'
import ImageGallery from './ImageGallery'
import Heading from './Heading'
import Categories from './Categories'
import Description from './Description'
import Reviews from './Reviews'

const Properties = ({ params }: { params: { pageName: string } }) => {
  const propertyAction = usePropertyAction()
  const router = useRouter()
  const searchParams = useSearchParams()

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

  useEffect(() => {
    propertyAction
      .getPropertyByPageName(params.pageName, {
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
  }, [bookIn])

  useEffect(() => {
    setSelectedAccom(null)
  }, [property])

  const handleBookingOnChange = (newBookIn: Date, newBookOut: Date) => {
    setBookIn(newBookIn)
    setBookOut(newBookOut)
  }

  const handleSelectedAccomOnChange = (value: accommodation | null) => {
    setSelectedAccom(value)
  }

  if (!property) {
    return <div>Loading...</div>
  }

  const owner = property.owner as ownerObj

  return (
    <div>
      <Container>
        <Heading property={property} />

        <ImageGallery property={property} />

        <div className="flex pt-14">
          <div className="w-3/5 min-w-1000px">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">
                  Hosted by {(property.owner as ownerObj).name}
                </div>
                <div>10 guests . 5 bedrooms . 8 beds . 5 baths</div>
              </div>
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={
                    owner.avatar && owner.avatar !== ''
                      ? owner.avatar
                      : '/img/avatar-placeholder.svg'
                  }
                  alt="Host avatar"
                  fill
                  sizes="100px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>

            <hr className="my-7" />

            <Categories property={property} />

            <hr className="my-7" />

            <Description property={property} />

            <hr className="my-7" />
          </div>

          <div className="w-2/5 min-w-[300px] flex justify-end">
            <ReserveBoard
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

        <hr className="my-7" />
      </Container>
    </div>
  )
}

export default Properties
