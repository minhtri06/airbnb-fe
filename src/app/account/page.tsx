import ClientOnly from '@/components/ClientOnly'
import AccountPageClient from './AccountPageClient'

const AccountPage = () => {
  return (
    <ClientOnly>
      <AccountPageClient />
    </ClientOnly>
  )
}

export default AccountPage
