'use client'

import Image from 'next/image'

interface AvatarProps {
  size: 'sm' | 'md' | 'lg'
  avatarUrl?: string
}

const Avatar: React.FC<AvatarProps> = ({ size, avatarUrl }) => {
  let style = ''
  switch (size) {
    case 'sm':
      style = 'h-8 w-8'
      break
    case 'md':
      style = 'h-12 w-12'
      break
    case 'lg':
      style = 'h-16 w-16'
      break
  }

  return (
    <div
      className={`${style} relative rounded-full overflow-hidden select-none`}
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
