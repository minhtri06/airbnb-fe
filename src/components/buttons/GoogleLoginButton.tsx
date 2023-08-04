'use client'

import { FcGoogle } from '@react-icons/all-files/fc/FcGoogle'
import Button from './Button'
import { usePathname, useRouter } from 'next/navigation'
import getGoogleOauthUrl from '@/utils/getGoogleOauthUrl'

interface GoogleLoginButtonProps {
  disabled?: boolean
  small?: boolean
  big?: boolean
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  disabled,
  small,
  big,
}) => {
  const router = useRouter()
  let pathname = usePathname()
  if (pathname === '/404' || pathname === '/500') {
    pathname = null
  }

  return (
    <Button
      outline
      label="Continue with Google"
      icon={FcGoogle}
      onClick={() => {
        router.push(getGoogleOauthUrl())
      }}
      disabled={disabled}
      small={small}
      big={big}
    />
  )
}

export default GoogleLoginButton
