import ClientOnly from '@/components/ClientOnly'
import LoginAndSecurityPageClient from './LoginAndSecurityPageClient'

const LoginAndSecurityPage = () => {
  return (
    <ClientOnly>
      <LoginAndSecurityPageClient />
    </ClientOnly>
  )
}

export default LoginAndSecurityPage
