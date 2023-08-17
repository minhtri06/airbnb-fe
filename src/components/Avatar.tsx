'use client'

import Image from 'next/image'

interface AvatarProps {
  size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  avatarUrl?: string | null
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
    case 'xl':
      style = 'h-20 w-20'
      break
    case '2xl':
      style = 'h-24 w-24'
      break
    case '3xl':
      style = 'h-28 w-28'
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
