import Button from '@/components/buttons/Button'
import useAuthStore from '@/stores/useAuthStore'
import useLoginModalStore from '@/stores/useLoginModalStore'
import { user } from '@/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

interface AboutHostProps {
  owner: user
}

const AboutHost: React.FC<AboutHostProps> = ({ owner }) => {
  const loginModalStore = useLoginModalStore()
  const authStore = useAuthStore()
  const router = useRouter()

  const handleMessageButtonOnClick = () => {
    if (!authStore.isLogin) loginModalStore.open()
    else router.push(`/messages?t=${owner._id}`)
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <div className="text-2xl font-bold">Hosted by {owner.name}</div>
          <div>10 guests . 5 bedrooms . 8 beds . 5 baths</div>
        </div>
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <Image
            src={
              owner.avatar && owner.avatar !== ''
                ? owner.avatar
                : '/img/avatar-placeholder.svg'
            }
            alt="Host avatar"
            fill
            sizes="100px"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
      <div className="w-44 mt-5">
        <Button
          label="Message host"
          outline
          onClick={handleMessageButtonOnClick}
        />
      </div>
    </div>
  )
}

export default AboutHost
