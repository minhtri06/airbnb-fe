'use client'

import { usePathname } from 'next/navigation'
import HostingClient from './HostingClient'

const Hosting: React.FC = () => {
  console.log(usePathname())
  return <HostingClient />
}

export default Hosting
