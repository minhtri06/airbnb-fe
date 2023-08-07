'use client'

import Avatar from '@/components/Avatar'
import Review from '@/components/Review'
import { review } from '@/types'
import { AiFillStar } from '@react-icons/all-files/ai/AiFillStar'
import { useState } from 'react'
import SupportShowMore from './SupportShowMore'
import useReviewAction from '@/hooks/useReviewAction'
import { useRouter } from 'next/navigation'

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
  const reviewAction = useReviewAction()
  const router = useRouter()

  const [isShowAllReviews, setIsShowAllReviews] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  let isLoadingReviews = false

  const handleScrollToBottom = (e: React.UIEvent) => {
    const isAtBottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop <
      e.currentTarget.clientHeight + 30

    if (isAtBottom && !isLoadingReviews && currentPage < reviewTotalPage) {
      isLoadingReviews = true
      reviewAction
        .getReviews({ propertyId, page: currentPage + 1 })
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
        <SupportShowMore
          body={
            <div>
              <div className="w-2/2 flex gap-5 text-3xl font-bold mb-7">
                <AiFillStar size={30} />
                <span>{`${propertyScore || '...'} / 5`}</span>
                <span>
                  {reviewCount !== 0
                    ? `${reviewCount} reviews`
                    : 'No review Yet'}
                </span>
              </div>
              <div className="">
                {reviews.map((r) => (
                  <div className="mb-7">
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
          <span>{`${propertyScore || '...'} / 5`}</span>
          <span>
            {reviewCount !== 0 ? `${reviewCount} reviews` : 'No review Yet'}
          </span>
        </div>
        <div className="grid grid-cols-2 mt-5 gap-y-10">
          {reviews.slice(0, 6).map((review) => (
            <div className="h-40 mr-24">
              <Review
                review={review}
                showMoreOnClick={() => setIsShowAllReviews(true)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Reviews