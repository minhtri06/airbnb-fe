import ClientOnly from '@/components/ClientOnly'
import TripsPageClient from './TripsPageClient'

const TripsPage = ({ searchParams }: { searchParams: any }) => {
  return (
    <ClientOnly>
      <TripsPageClient searchParams={searchParams} />
    </ClientOnly>
  )
}

export default TripsPage
