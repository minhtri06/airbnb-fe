'use client'

import { review } from '@/types'
import Avatar from './Avatar'
import { useState } from 'react'

interface ReviewInterfaceProps {
  review: review
  showAll?: boolean
  showMoreOnClick?: () => void
}

const Review: React.FC<ReviewInterfaceProps> = ({
  review,
  showAll,
  showMoreOnClick = () => {},
}) => {
  const [isOverflow, setIsOverflow] = useState(false)

  return (
    <div className="overflow-hidden">
      <div className="flex items-center gap-3">
        <Avatar avatarUrl={review.reviewer.avatar} size="md" />
        <div>
          <div className="font-semibold">{review.reviewer.name}</div>
          <div className="text-sm">
            {(review.createdAt as Date).toLocaleDateString()}
          </div>
        </div>
      </div>
      <div
        className={`text-base mt-3 ${!showAll && 'line-clamp-3'}`}
        ref={(el) => {
          if (el && el.offsetHeight < el.scrollHeight) {
            setIsOverflow(true)
          }
        }}
      >
        {review.body.split('\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
      {isOverflow && (
        <div
          className="mt-3 font-semibold underline cursor-pointer select-none"
          onClick={() => showMoreOnClick()}
        >
          Show more
        </div>
      )}
    </div>
  )
}

export default Review
