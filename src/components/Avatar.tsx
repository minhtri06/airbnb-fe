'use client'

import useCurrentUserStore from '@/hooks/contexts/useCurrentUserStore'
import Image from 'next/image'

interface AvatarProps {
  size: string
}

const Avatar: React.FC<AvatarProps> = ({ size }) => {
  const { currentUser } = useCurrentUserStore()

  return (
    <div
      className={`h-${size} w-${size} relative rounded-full overflow-hidden`}
    >
      <Image
        priority
        alt="avatar"
        src={
          currentUser && currentUser.avatar
            ? currentUser.avatar
            : '/img/avatar-placeholder.svg'
        }
        blurDataURL="/img/avatar-placeholder.svg"
        sizes="max-width: 300px"
        fill
      />
    </div>
  )
}

export default Avatar
