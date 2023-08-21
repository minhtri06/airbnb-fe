'use client'

import https from 'https'
import Button from '@/components/buttons/Button'
import useLoginModalStore from '@/stores/useLoginModalStore'
import apiAxios from '@/utils/apiAxios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface VerifyEmailClientProps {
  token: string | null | undefined
}

const VerifyEmailClient: React.FC<VerifyEmailClientProps> = ({ token }) => {
  const { open: openLoginModal } = useLoginModalStore()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      router.replace('/500')
      return
    }
    apiAxios
      .post(
        `/auth/verify-email?token=${token}`,
        {},
        { httpsAgent: new https.Agent({ rejectUnauthorized: false }) },
      )
      .then(() => setIsLoading(false))
  }, [router, token])

  if (isLoading) return <></>

  return (
    <div className="p-20">
      <div className="w-1/3">
        <div className="text-4xl font-semibold">Welcome 🍁</div>
        <div className="text-lg py-7 font-semibold">
          Your email has been verified. Now you can sign in with your new
          account and discover
        </div>
        <Button
          label="Go to dashboard"
          onClick={() => {
            router.replace('/')
            openLoginModal()
          }}
          big
          black
        />
      </div>
    </div>
  )
}

export default VerifyEmailClient
