import ClientOnly from '@/components/ClientOnly'
import HostingPageClient from './HostingPageClient'

const HostingPage = () => {
  return (
    <ClientOnly>
      <HostingPageClient />
    </ClientOnly>
  )
}

export default HostingPage
