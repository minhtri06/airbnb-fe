'use client'

import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href="/">
      <Image
        priority
        alt="Logo"
        src="/img/airbnb-logo.svg"
        className="hidden md:block cursor-pointer"
        style={{ height: 'auto' }}
        height={0}
        width={100}
      />
    </Link>
  )
}

export default Logo
