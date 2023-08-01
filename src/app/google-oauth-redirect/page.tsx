'use client'

import useAuthService from '@/hooks/useAuthService'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const page = () => {
  const router = useRouter()
  const params = useSearchParams()
  const { googleLogin } = useAuthService()

  useEffect(() => {
    let code = params?.get('code')
    if (!code) {
      router.push('/500')
      return
    }
    googleLogin(code)
      .then(() => {
        router.push('/')
      })
      .catch((error) => {
        console.log(error.response.data)
        // router.push('/500')
      })
  }, [])

  return <div></div>
}

export default page
