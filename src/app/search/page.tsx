import ClientOnly from '@/components/ClientOnly'
import React from 'react'
import SearchPageClient from './SearchPageClient'

const SearchPage = ({ searchParams }: { searchParams: any }) => {
  return (
    <ClientOnly>
      <SearchPageClient searchParams={searchParams} />
    </ClientOnly>
  )
}

export default SearchPage
