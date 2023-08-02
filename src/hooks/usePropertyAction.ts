import { CHECK_PAGE_NAME_EXISTS, SEARCH_PROPERTIES } from '@/constants/urls'
import apiAxios from '@/utils/apiAxios'

const usePropertyAction = () => {
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

  return { searchProperties, checkPageNameExists }
}

export default usePropertyAction
