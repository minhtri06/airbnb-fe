import useCurrentUser, { CurrentUser } from '@/hooks/contexts/useCurrentUser'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const VerifyEmailClient = ({ user }: { user: CurrentUser }) => {
  const { setCurrentUser } = useCurrentUser()
  const router = useRouter()

  useEffect(() => {
    setCurrentUser(user)
    router.push('/')
  }, [])

  return <div></div>
}

export default VerifyEmailClient
