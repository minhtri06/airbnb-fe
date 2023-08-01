import { SEARCH_PROPERTIES } from '@/constants/urls'
import apiAxios from '@/utils/apiAxios'
import useSearchStore, { PropertyParams } from './contexts/useSearchStore'

const useProperties = () => {
  const searchStore = useSearchStore()

  const searchProperties = async ({
    page,
    limit,
  }: {
    page?: string | number | null
    limit?: string | number | null
  }) => {
    searchStore.setIsLoading(true)
    apiAxios
      .get(SEARCH_PROPERTIES, {
        params: { ...searchStore.params, page, limit },
      })
      .then((res) => {
        searchStore.setProperties(res.data.properties)
      })
      .finally(() => searchStore.setIsLoading(false))
  }

  return { searchProperties }
}

export default useProperties
