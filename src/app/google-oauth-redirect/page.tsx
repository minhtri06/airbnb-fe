import ClientOnly from '@/components/ClientOnly'
import GoogleOauthRedirectClient from './GoogleOauthRedirectClient'

const GoogleOauthRedirectPage = () => {
  return (
    <ClientOnly>
      <GoogleOauthRedirectClient />
    </ClientOnly>
  )
}

export default GoogleOauthRedirectPage
