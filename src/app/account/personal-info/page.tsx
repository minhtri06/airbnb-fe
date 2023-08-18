import ClientOnly from '@/components/ClientOnly'
import PersonalInfoPageClient from './PersonalInfoPageClient'

const PersonalInfoPage = () => {
  return (
    <ClientOnly>
      <PersonalInfoPageClient />
    </ClientOnly>
  )
}

export default PersonalInfoPage
