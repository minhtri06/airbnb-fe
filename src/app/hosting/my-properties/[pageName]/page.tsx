'use client'

import { usePathname, useRouter } from 'next/navigation'

const MyPropertyPage = () => {
  const router = useRouter()
  const pathname = usePathname()
  router.replace(pathname + '/info')
  return <div></div>
}

export default MyPropertyPage
