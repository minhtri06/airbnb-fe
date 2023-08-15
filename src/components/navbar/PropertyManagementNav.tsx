'use client'

import { usePathname, useRouter } from 'next/navigation'

const PropertyManagementNav = () => {
  const router = useRouter()
  const pathname = usePathname()

  const pathnameParts = pathname?.split('/') || []
  const side = pathnameParts[4]

  return (
    <div className="flex gap-7 text-gray-500 font-bold select-none">
      <span
        className={`cursor-pointer hover:text-gray-950 hover:underline 
          ${side === 'info' && 'text-gray-950 underline'}`}
        onClick={() => {
          pathnameParts[4] = 'info'
          router.replace(pathnameParts.join('/'))
        }}
      >
        Info
      </span>
      <span
        className={`cursor-pointer hover:text-gray-950 hover:underline 
          ${side === 'calendar' && 'text-gray-950 underline'}`}
        onClick={() => {
          pathnameParts[4] = 'calendar'
          router.replace(pathnameParts.join('/'))
        }}
      >
        Calendar
      </span>
    </div>
  )
}

export default PropertyManagementNav
