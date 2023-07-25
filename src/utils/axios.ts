'use client'

import axios from 'axios'

const apiAxios = axios.create({
  baseURL: process.env.SERVER_URL + '/api/v1',
  headers: { 'Content-Type': 'application/json' },
})

export default apiAxios
