import ClientOnly from '@/components/ClientOnly'
import PropertyDetailPageClient from './PropertyDetailPageClient'

const PropertyDetailPage = ({ params }: { params: { pageName: string } }) => {
  return (
    <ClientOnly>
      <PropertyDetailPageClient params={params} />
    </ClientOnly>
  )
}

export default PropertyDetailPage
