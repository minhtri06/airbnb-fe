import { GET_CURRENT_USER } from '@/constants/urls'
import useAuthAxios from './useAuthAxios'

const useUser = () => {
  const authAxios = useAuthAxios()

  const getCurrentUser = async () => {
    const res = await authAxios.get(GET_CURRENT_USER)

    return res.data.myProfile
  }

  return { getCurrentUser }
}

export default useUser
