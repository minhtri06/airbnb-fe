import {
  CHECK_PAGE_NAME_EXISTS,
  CREATE_PROPERTY,
  GET_MY_PROPERTIES,
  SEARCH_PROPERTIES,
} from '@/constants/urls'
import apiAxios from '@/utils/apiAxios'
import useAuthAxios from './useAuthAxios'

export type bed = {
  double: number
  queen: number
  single: number
  sofaBed: number
}

export type accommodation = {
  title: string
  pricePerNight: string | number
  maximumOfGuests: number | string
  type: 'specific-room' | 'entire-house' | null
  bed: bed
  numberOfRooms?: number
}

export type property = {
  title: string
  isClosed: boolean
  pageName: string
  owner: string | { name: string }
  description: string
  facilityCodes: string[]
  categoryCodes: string[]
  thumbnail?: string
  address: {
    address: string
    district: string
    province: string
  }
  accommodations: accommodation[]
}

const usePropertyAction = () => {
  const authAxios = useAuthAxios()

  const searchProperties = async (params: any) => {
    const res = await apiAxios.get(SEARCH_PROPERTIES, { params })
    return res.data
  }

  const checkPageNameExists = async (
    pageName: string,
  ): Promise<{ doesExist: boolean }> => {
    const res = await apiAxios.post(CHECK_PAGE_NAME_EXISTS, { pageName })
    return res.data
  }

  const createProperty = async (property: property) => {
    const res = await authAxios.post(CREATE_PROPERTY, property)
    return res
  }

  const getPropertyByPageName = async (pageName: string) => {
    const res = await apiAxios.get(`/properties/page-name:${pageName}`)
    return res.data
  }

  const getMyProperties = async () => {
    const res = await authAxios.get(GET_MY_PROPERTIES)
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
