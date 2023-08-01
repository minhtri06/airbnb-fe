import { SEARCH_PROPERTIES } from '@/constants/urls'
import apiAxios from '@/utils/apiAxios'

const useProperties = () => {
  const searchProperties = async (params: any) => {
    const res = await apiAxios.get(SEARCH_PROPERTIES, { params })
    return res.data
  }

  return { searchProperties }
}

export default useProperties
