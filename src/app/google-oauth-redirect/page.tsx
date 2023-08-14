'use client'

import useAuth from '@/hooks/useAuth'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const GoogleOauthRedirect = () => {
  const router = useRouter()
  const params = useSearchParams()
  const { googleLogin } = useAuth()

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
        router.push('/500')
      })
  }, [googleLogin, params, router])

  return <div></div>
}

export default GoogleOauthRedirect
