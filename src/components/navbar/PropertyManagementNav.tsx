'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const PropertyManagementNav = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const tab = searchParams?.get('tab')

  return (
    <div className="flex gap-7 text-gray-500 font-bold select-none">
      <span
        className={`cursor-pointer hover:text-gray-950 hover:underline 
          ${tab === 'info' && 'text-gray-950 underline'}`}
        onClick={() => router.replace(pathname + '?tab=info')}
      >
        Info
      </span>
      <span
        className={`cursor-pointer hover:text-gray-950 hover:underline 
          ${tab === 'bookings' && 'text-gray-950 underline'}`}
        onClick={() => router.replace(pathname + '?tab=bookings')}
      >
        Bookings
      </span>
    </div>
  )
}

export default PropertyManagementNav
