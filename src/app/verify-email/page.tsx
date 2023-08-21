import ClientOnly from '@/components/ClientOnly'
import VerifyEmailClient from './VerifyEmailClient'

const VerifyEmailPage = ({
  searchParams,
}: {
  searchParams: { token?: string | null }
}) => {
  return (
    <ClientOnly>
      <VerifyEmailClient token={searchParams.token} />
    </ClientOnly>
  )
}

export default VerifyEmailPage
