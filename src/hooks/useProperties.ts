import { SEARCH_PROPERTIES } from '@/constants/urls'
import apiAxios from '@/utils/apiAxios'
import { PropertyParams } from './contexts/useSearch'

const useProperties = () => {
  const searchProperties = async (params: PropertyParams) => {
    const res = await apiAxios.get(SEARCH_PROPERTIES, { params })
    return res.data
  }

  return { searchProperties }
}

export default useProperties
