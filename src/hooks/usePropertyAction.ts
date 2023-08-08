import apiAxios from '@/utils/apiAxios'
import useAuthAxios from './useAuthAxios'
import { newProperty, property, propertyPaginate, review } from '@/types'

const usePropertyAction = () => {
  const authAxios = useAuthAxios()

  const searchProperties = async (params: any): Promise<propertyPaginate> => {
    const res = await authAxios.get('/properties', { params })
    return res.data
  }

  const checkPageNameExists = async (
    pageName: string,
  ): Promise<{ doesExist: boolean }> => {
    const res = await apiAxios.post('/properties/check-page-name-exits', {
      pageName,
    })
    return res.data
  }

  const createProperty = async (property: newProperty) => {
    const res = await authAxios.post('/properties', property)
    return res
  }

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
    const res = await apiAxios.get(`/properties/page-name:${pageName}`, {
      params,
    })
    return res.data
  }

  const getMyProperties = async (): Promise<propertyPaginate> => {
    const res = await authAxios.get('/me/properties')
    return res.data
  }

  return {
    searchProperties,
    checkPageNameExists,
    createProperty,
    getMyProperties,
    getPropertyByPageName,
  }
}

export default usePropertyAction
