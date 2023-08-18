import ClientOnly from '@/components/ClientOnly'
import MyPropertyPageClient from './MyPropertyPageClient'

const MyPropertyPage = ({ params }: { params: { pageName: string } }) => {
  return (
    <ClientOnly>
      <MyPropertyPageClient params={params} />
    </ClientOnly>
  )
}

export default MyPropertyPage
