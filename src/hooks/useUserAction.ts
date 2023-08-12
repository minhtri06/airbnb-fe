import useAuthAxios from './useAuthAxios'
import apiAxios from '@/utils/apiAxios'
import { user } from '@/types'

const useUserAction = () => {
  const authAxios = useAuthAxios()

  const getCurrentUser = async () => {
    const res = await authAxios.get('/me')

    return res.data.myProfile
  }

  const getUserById = async (userId: string): Promise<{ user: user }> => {
    const res = await apiAxios.get(`/users/${userId}`)
    return res.data
  }

  return { getCurrentUser, getUserById }
}

export default useUserAction
