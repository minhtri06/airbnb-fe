'use client'

import axios, { AxiosResponse } from 'axios'

const catchFetch = async (
  fn: () => Promise<{ res: AxiosResponse }>,
): Promise<{
  res: AxiosResponse | null
  err?: { type?: string; message: string; isFetchError?: boolean }
}> => {
  try {
    return await fn()
  } catch (err: any) {
    if (axios.isAxiosError(err) && err.response) {
      const fetchErr = err.response?.data || {}
      fetchErr.isFetchError = true
      return { res: err.response, err: fetchErr }
    }

    console.log(err)
    return { res: null, err }
  }
}

export default catchFetch
