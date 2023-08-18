'use client'

import { FaAngleLeft } from '@react-icons/all-files/fa/FaAngleLeft'
import { FaAngleRight } from '@react-icons/all-files/fa/FaAngleRight'

import Container from '@/components/Container'
import useAuthAxios from '@/hooks/useAuthAxios'
import { accommodation, booking, property } from '@/types'
import moment from 'moment'
import { useEffect, useState } from 'react'
import BookingSection from './BookingSection'

interface PropertyBookingsProps {
  property: null | property
  setProperty: (value: property) => void
}

const PropertyBookings: React.FC<PropertyBookingsProps> = ({
  property,
  setProperty,
}) => {
  const authAxios = useAuthAxios()

  const [selectedAccom, setSelectedAccom] = useState<null | accommodation>(null)
  const [bookings, setBookings] = useState<null | booking[]>([])
  const [time, setTime] = useState(moment())

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ]

  useEffect(() => {
    if (!selectedAccom) return

    authAxios
      .get(
        `/properties/${property?._id}/accommodations/${selectedAccom._id}/bookings`,
        { params: { month: time.get('month') + 1 } },
      )
      .then((res) => {
        for (let b of res.data.bookings as booking[]) {
          b.bookIn = new Date(b.bookIn)
          b.bookOut = new Date(b.bookOut)
        }
        setBookings(res.data.bookings)
      })
  }, [authAxios, property?._id, selectedAccom, time])

  if (!property) return <></>

  return (
    <div className="flex h-[calc(100vh-5rem)]">
      <div className="w-1/4 border-r-[1px] h-full">
        <div className="flex items-center border-b-[1px]">
          <Container>
            <div className="text-xl font-bold h-16 ">Accommodations</div>
          </Container>
        </div>
        <div className="py-3">
          <Container>
            {property?.accommodations.map((a) => (
              <div
                key={a._id}
                className={`py-3 cursor-pointer text-lg ${
                  selectedAccom?._id === a._id && 'font-bold underline'
                }`}
                onClick={() => setSelectedAccom(a)}
              >
                {a.title}
              </div>
            ))}
          </Container>
        </div>
      </div>
      <div className="flex-1">
        <div className="border-b-[1px] ">
          <Container>
            <div className="h-16 flex justify-between items-center">
              <div
                className="p-2 rounded-full bg-gray-200 cursor-pointer"
                onClick={() => setTime(moment(time.add(-1, 'month')))}
              >
                <FaAngleLeft />
              </div>
              <span className="text-xl font-bold">
                {monthNames[time.get('month')]} - {time.get('year')}
              </span>
              <div
                className="p-2 rounded-full bg-gray-200 cursor-pointer"
                onClick={() => setTime(moment(time.add(1, 'month')))}
              >
                <FaAngleRight />
              </div>
            </div>
          </Container>
        </div>
        <div className="py-5">
          <Container>
            {bookings?.map((b, i) => (
              <>
                {i !== 0 && <hr className="my-7" />}
                <BookingSection key={b._id} booking={b} />
              </>
            ))}
            {selectedAccom && bookings?.length === 0 && (
              <div className="flex justify-center text-xl pt-1">
                No bookings in this month
              </div>
            )}
          </Container>
        </div>
      </div>
    </div>
  )
}

export default PropertyBookings