import ClientOnly from '@/components/ClientOnly'
import React from 'react'
import HomePageClient from './HomePageClient'

const HomePage = ({ searchParams }: { searchParams: any }) => {
  return (
    <ClientOnly>
      <HomePageClient searchParams={searchParams} />
    </ClientOnly>
  )
}

export default HomePage
