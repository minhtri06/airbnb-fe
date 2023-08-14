'use client'

import Container from '@/components/Container'
import Button from '@/components/buttons/Button'
import useAuthAxios from '@/hooks/useAuthAxios'
import { booking } from '@/types'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import NoTrip from './NoTrip'
import BookingSection from './BookingSection'
import PaginationController from '@/components/PaginationController'

const TripsPage = ({ searchParams }: { searchParams: any }) => {
  const authAxios = useAuthAxios()

  const [bookings, setBookings] = useState<booking[] | null>(null)
  const [totalPage, setTotalPage] = useState<number | null>(null)

  const { page } = searchParams

  useEffect(() => setBookings(null), [page])
  useEffect(() => setTotalPage(null), [])

  useEffect(() => {
    const getMyBookings = async (): Promise<{
      data: booking[]
      totalPage: number
    }> => {
      const res = await authAxios.get('/me/bookings', {
        params: { page, limit: 5, checkPaginate: totalPage === null },
      })
      for (let b of res.data.data as booking[]) {
        b.bookIn = new Date(b.bookIn)
        b.bookOut = new Date(b.bookOut)
      }
      return res.data
    }

    if (bookings === null) {
      getMyBookings().then(({ data, totalPage }) => {
        setBookings(data)
        if (totalPage) setTotalPage(totalPage)
      })
    }
  }, [authAxios, bookings, page, totalPage])

  console.log(bookings)

  return (
    <div>
      <Container>
        <div className="pt-9 pb-6 text-3xl font-bold">Your trips</div>
        <hr />
        <div className="pt-6 pb-10">
          {bookings && bookings.length !== 0 && (
            <div className="">
              {bookings.map((b, i) => (
                <div key={b._id} className="w-fit">
                  <BookingSection booking={b} />
                  {i < bookings.length - 1 && <hr />}
                </div>
              ))}
            </div>
          )}
          {totalPage && totalPage > 1 && (
            <PaginationController maxPage={totalPage} currentPage={page} />
          )}
          {bookings && bookings.length === 0 && <NoTrip />}
        </div>
      </Container>
    </div>
  )
}

export default TripsPage
