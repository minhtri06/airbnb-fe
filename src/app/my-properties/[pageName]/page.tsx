'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import PropertyInfo from './info/Info'
import PropertyBookings from './Bookings'
import { property } from '@/types'
import apiAxios from '@/utils/apiAxios'
import axios from 'axios'
import useAuthStore from '@/stores/useAuthStore'

const MyPropertyPage = ({ params }: { params: { pageName: string } }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { isLogin } = useAuthStore()

  const [property, setProperty] = useState<property | null>(null)

  const tab = searchParams?.get('tab')

  useEffect(() => {
    if (isLogin === false) router.replace('/')
  }, [isLogin, router])

  useEffect(() => {
    if (!tab) router.replace(pathname + '?tab=info')
  }, [pathname, router, tab])

  const fetchProperty = useCallback(async () => {
    const res = await apiAxios.get(`/properties/page-name:${params.pageName}`)
    return res.data.property
  }, [params.pageName])

  useEffect(() => {
    if (property === null) {
      fetchProperty()
        .then((property) => setProperty(property))
        .catch((error) => {
          if (axios.isAxiosError(error) && error.status === 404)
            router.push('/404')
        })
    }
  }, [fetchProperty, params.pageName, property, router])

  let body = <></>
  if (tab === 'info')
    body = (
      <PropertyInfo
        property={property}
        setProperty={setProperty}
        fetchProperty={fetchProperty}
      />
    )
  if (tab === 'bookings')
    body = <PropertyBookings property={property} setProperty={setProperty} />

  return <div>{body}</div>
}

export default MyPropertyPage
