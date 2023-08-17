'use client'

import Avatar from '@/components/Avatar'
import Review from '@/components/Review'
import { review, reviewPaginate } from '@/types'
import { AiFillStar } from '@react-icons/all-files/ai/AiFillStar'
import { useState } from 'react'
import SupportShowMore from './SupportShowMore'
import { useRouter } from 'next/navigation'
import Button from '@/components/buttons/Button'
import apiAxios from '@/utils/apiAxios'

interface ReviewsProps {
  reviews: review[]
  setReviews: (value: any) => void
  reviewTotalPage: number
  propertyScore?: number
  reviewCount: number
  propertyId: string
}

const Reviews: React.FC<ReviewsProps> = ({
  reviews,
  setReviews,
  reviewTotalPage,
  propertyScore,
  reviewCount,
  propertyId,
}) => {
  const [isShowAllReviews, setIsShowAllReviews] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  let isLoadingReviews = false

  const getReviews = async ({
    propertyId,
    limit,
    page,
    sortBy,
  }: {
    propertyId: string
    limit?: number
    page?: number
    sortBy?: string
  }): Promise<reviewPaginate> => {
    const res = await apiAxios.get('/reviews', {
      params: { propertyId, limit, page, sortBy },
    })
    const reviews = res.data.data as review[]
    for (let review of reviews) {
      review.createdAt = new Date(review.createdAt)
    }
    return res.data
  }

  const handleScrollToBottom = (e: React.UIEvent) => {
    const isAtBottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop <
      e.currentTarget.clientHeight + 30

    if (isAtBottom && !isLoadingReviews && currentPage < reviewTotalPage) {
      isLoadingReviews = true
      getReviews({ propertyId, page: currentPage + 1 })
        .then((result) => {
          setReviews((pre: review[]) => [...pre, ...result.data])
          setCurrentPage((pre) => pre + 1)
        })
        .catch((e) => console.log(e))
        .finally(() => {
          isLoadingReviews = false
        })
    }
  }

  return (
    <>
      {isShowAllReviews && (
        // Show more board
        <SupportShowMore
          body={
            <div>
              <div className="w-2/2 flex gap-5 text-3xl font-bold mb-7">
                <AiFillStar size={30} />
                <span>{`${
                  propertyScore ? Math.round(propertyScore * 10) / 10 : '...'
                } / 10`}</span>
                <span>
                  {reviewCount !== 0
                    ? `${reviewCount} reviews`
                    : 'No review Yet'}
                </span>
              </div>
              <div className="">
                {reviews.map((r, i) => (
                  <div key={i} className="mb-7">
                    <Review review={r} showAll />
                  </div>
                ))}
              </div>
            </div>
          }
          onClose={() => setIsShowAllReviews(false)}
          onScroll={handleScrollToBottom}
        />
      )}

      <div>
        <div className="flex gap-5 text-2xl font-bold">
          <AiFillStar size={30} />
          <span>{`${
            propertyScore ? Math.round(propertyScore * 10) / 10 : '...'
          } / 10`}</span>
          <span>
            {reviewCount !== 0 ? `${reviewCount} reviews` : 'No review Yet'}
          </span>
        </div>
        <div className="grid grid-cols-2 mt-5 gap-y-10">
          {reviews.slice(0, 6).map((review, i) => (
            <div key={review._id} className="h-40 mr-24">
              <Review
                review={review}
                showMoreOnClick={() => setIsShowAllReviews(true)}
              />
            </div>
          ))}
        </div>
        {reviews.length > 6 && (
          <div className="w-44 mt-5">
            <Button
              label="Show all reviews"
              outline
              small
              onClick={() => setIsShowAllReviews(true)}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Reviews
