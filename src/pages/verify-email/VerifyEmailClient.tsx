'use client'

import '@/app/globals.css'

import useCurrentUser, { CurrentUser } from '@/hooks/contexts/useCurrentUser'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'

const VerifyEmailClient = () => {
  const router = useRouter()

  const handleSignIn = () => {
    router.push('/')
  }

  return (
    <div className="h-screen flex justify-left items-center p-20">
      <div className="w-1/3">
        <div className="text-4xl">Welcome 🍁</div>
        <div className="text-lg py-7">
          Your email has been verified. Now you can sign in with your new
          account and discover
        </div>
        <Button label="Go to dashboard" onClick={handleSignIn} />
      </div>
    </div>
  )
}

export default VerifyEmailClient
