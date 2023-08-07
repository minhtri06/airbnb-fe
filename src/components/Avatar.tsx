'use client'

import useCurrentUserStore from '@/hooks/contexts/useCurrentUserStore'
import Image from 'next/image'

interface AvatarProps {
  size: string
  avatarUrl?: string
}

const Avatar: React.FC<AvatarProps> = ({ size, avatarUrl }) => {
  return (
    <div
      className={`h-${size} w-${size} relative rounded-full overflow-hidden select-none`}
    >
      <Image
        priority
        alt="avatar"
        src={
          avatarUrl && avatarUrl !== ''
            ? avatarUrl
            : '/img/avatar-placeholder.svg'
        }
        blurDataURL="/img/avatar-placeholder.svg"
        sizes="max-width: 300px"
        fill
        style={{ objectFit: 'cover' }}
      />
    </div>
  )
}

export default Avatar
