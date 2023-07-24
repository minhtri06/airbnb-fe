'use client'

import Image from 'next/image'

interface AvatarProps {
  size: string
}

const Avatar: React.FC<AvatarProps> = ({ size }) => {
  return (
    <div className={`h-${size} w-${size}  relative`}>
      <Image
        alt="avatar"
        src="/img/user-avatar.jpeg"
        className="rounded-full"
        fill={true}
      />
    </div>
  )
}

export default Avatar
