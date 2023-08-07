import { review, reviewPaginate } from '@/types'
import apiAxios from '@/utils/apiAxios'

const useReviewAction = () => {
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

  return { getReviews }
}

export default useReviewAction
