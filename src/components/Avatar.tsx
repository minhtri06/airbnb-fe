'use client'

import useCurrentUser from '@/hooks/contexts/useCurrentUser'
import Image from 'next/image'
import { useEffect } from 'react'

interface AvatarProps {
  size: string
}

const Avatar: React.FC<AvatarProps> = ({ size }) => {
  const { currentUser } = useCurrentUser()

  return (
    <div
      className={`h-${size} w-${size} relative rounded-full overflow-hidden`}
    >
      <Image
        alt="avatar"
        src={
          currentUser && currentUser.avatar
            ? currentUser.avatar
            : '/img/avatar-placeholder.svg'
        }
        blurDataURL="/img/avatar-placeholder.svg"
        sizes="100px"
        fill
      />
    </div>
  )
}

export default Avatar
