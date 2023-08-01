import { GET_CURRENT_USER } from '@/constants/urls'
import useCurrentUserStore from '@/hooks/contexts/useCurrentUserStore'
import useAuthAxios from './useAuthAxios'

const useUser = () => {
  useCurrentUserStore()
  const authAxios = useAuthAxios()

  const getCurrentUser = async () => {
    const res = await authAxios.get(GET_CURRENT_USER)

    return res.data.myProfile
  }
  console.log('useUser')

  return { getCurrentUser }
}

export default useUser
