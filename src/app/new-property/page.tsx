import ClientOnly from '@/components/ClientOnly'
import NewPropertyPageClient from './NewPropertyPageClient'

const NewPropertyPage = () => {
  return (
    <ClientOnly>
      <NewPropertyPageClient />
    </ClientOnly>
  )
}

export default NewPropertyPage
