import { BASE_URL } from '@/constants/urls'
import axios from 'axios'

const apiAxios = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

apiAxios.interceptors.response.use(
  (config) => config,
  (error) => {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data)
    } else {
      console.log(error)
    }
    throw error
  },
)

export default apiAxios
