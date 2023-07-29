import apiAxios from '@/utils/apiAxios'
import VerifyEmailClient from './VerifyEmailClient'
import { VERIFY_EMAIL_URL } from '@/constants/urls'

const VerifyEmailPage = () => {
  return <VerifyEmailClient />
}

export default VerifyEmailPage

export const getServerSideProps = async (context: { [key: string]: any }) => {
  const token = context?.query?.token
  const res = context.res

  if (!token || !res) {
    res.setHeader('location', '/500')
    res.statusCode = 302
    res.end()
    return
  }

  try {
    await apiAxios.post(VERIFY_EMAIL_URL + `?token=${token}`)
  } catch (error: any) {
    console.log(error.response.data)
    res.setHeader('location', '/500')
    res.statusCode = 302
    res.end()
  }

  return { props: {} }
}
