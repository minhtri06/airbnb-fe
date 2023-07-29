'use client'

import '@/app/globals.css'
import Button from '@/components/Button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const SomethingWentWrong = () => {
  const router = useRouter()

  return (
    <div className="h-screen pl-20 pt-16">
      <div className="w-1/2">
        <div className="text-4xl pb-5">Oh no! Something went wrong 😓</div>
        <div className="w-1/2  text-lg font-semibold">
          Go back to{' '}
          <Link className="underline" href="/">
            dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SomethingWentWrong
