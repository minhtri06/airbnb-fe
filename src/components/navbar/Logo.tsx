'use client'

import Image from 'next/image'
import Link from 'next/link'
import logo from '@/../public/img/airbnb-logo.svg'

const Logo = () => {
  return (
    <Link href="/">
      <Image
        priority
        alt="Logo"
        src={logo}
        className="hidden md:block cursor-pointer"
        style={{ height: 'auto' }}
        height={0}
        width={100}
      />
    </Link>
  )
}

export default Logo
