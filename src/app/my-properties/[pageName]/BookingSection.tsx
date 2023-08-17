'use client'

import { booking } from '@/types'
import Image from 'next/image'
import React from 'react'

interface BookingSectionProps {
  booking: booking
}

const BookingSection: React.FC<BookingSectionProps> = ({ booking }) => {
  const guest = booking.guest as unknown as {
    _id: string
    name: string
    avatar: string
  }

  return (
    <div className="h-36 flex w-full">
      <div className="flex gap-6">
        <div className="h-20 w-20 relative rounded-full overflow-hidden">
          <Image
            src={guest.avatar}
            fill
            sizes="300px"
            style={{ objectFit: 'cover' }}
            alt=""
          />
        </div>
        <div className="flex flex-col justify-between ">
          <div className="font-bold overflow-hidden whitespace-nowrap truncate text-lg">
            {guest.name}
          </div>
          <div className="flex justify-between">
            {booking.bookIn.toLocaleDateString()} -{' '}
            {booking.bookOut.toLocaleDateString()}
          </div>
          <div>
            <span className="text-rose-600">${booking.pricePerNight}</span>
            <span className=""> x {booking.numberOfDays} night</span>
          </div>
          <div className="">
            Total price:{' '}
            <span className="text-rose-600">${booking.totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingSection
