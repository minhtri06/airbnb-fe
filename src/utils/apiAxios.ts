import { BASE_URL } from '@/constants/urls'
import axios from 'axios'

const apiAxios = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

export default apiAxios
