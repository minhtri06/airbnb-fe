import apiAxios from '@/utils/apiAxios'
import { VERIFY_EMAIL_URL } from '@/constants/urls'

const VerifyEmailPage = () => {
  return <div>Hii</div>
}

export default VerifyEmailPage

export const getServerSideProps = async (context: { [key: string]: any }) => {
  const { token } = context.params

  await apiAxios.post(VERIFY_EMAIL_URL + `?token=${token}`)

  return { props: {} }
}
