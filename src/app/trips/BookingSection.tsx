import { booking } from '@/types'
import Image from 'next/image'
import React from 'react'

interface BookingSectionProps {
  booking: booking
}

const BookingSection: React.FC<BookingSectionProps> = ({ booking }) => {
  const address = booking.property.address

  return (
    <div className="h-48 my-6 flex w-full">
      <div className="flex gap-6">
        <div className="h-48 w-48 relative rounded-lg overflow-hidden">
          <Image
            src={booking.property.thumbnail}
            fill
            sizes="300px"
            style={{ objectFit: 'cover' }}
            alt=""
          />
        </div>
        <div className="w-[700px] flex flex-col justify-between font-semibold">
          <div className="text-xl font-bold overflow-hidden whitespace-nowrap truncate">
            {booking.property.title}
          </div>
          <div className="flex justify-between">
            <span>{booking.accomTitle}</span>
            <span>
              {booking.bookIn.toLocaleDateString()} -{' '}
              {booking.bookOut.toLocaleDateString()}
            </span>
          </div>
          <div>
            {address.districtName}, {address.provinceName}
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
