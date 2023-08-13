'use client'

import Button from '@/components/buttons/Button'
import BookingInput from '@/components/inputs/BookingInput'
import useOutSideListener from '@/hooks/useOutSideListener'
import { accommodation, property } from '@/types'
import { FaAngleDown } from '@react-icons/all-files/fa/FaAngleDown'
import { FaDoorOpen } from '@react-icons/all-files/fa/FaDoorOpen'
import { BsFillHouseFill } from '@react-icons/all-files/bs/BsFillHouseFill'
import { FaHome } from '@react-icons/all-files/fa/FaHome'
import { useRef, useState } from 'react'
import ErrorText from '@/components/ErrorText'

interface ReserveBoardProps {
  bookIn: Date | null
  bookOut: Date | null
  bookingOnChange: (newBookIn: Date, newBookOut: Date) => void
  accommodations: accommodation[]
  selectedAccom: accommodation | null
  selectedAccomOnChange: (value: accommodation | null) => void
  isAvailable: boolean | undefined
}

const AccommodationSelect = (accommodations: accommodation[]) => {
  return <div></div>
}

const ReserveBoard: React.FC<ReserveBoardProps> = ({
  bookIn,
  bookOut,
  bookingOnChange,
  accommodations,
  selectedAccom,
  selectedAccomOnChange,
  isAvailable,
}) => {
  const [isBookingInputShowed, setIsBookingInputShowed] = useState(false)
  const [isAccomSelectorOpen, setIsAccomSelectorOpen] = useState(false)

  const haveBooking = bookIn !== null && bookOut !== null

  const bookingInputRef = useRef(null)
  const accomSelectorButtonRef = useRef(null)
  useOutSideListener('mousedown', [bookingInputRef], () => {
    setIsBookingInputShowed(false)
  })
  useOutSideListener('mousedown', [accomSelectorButtonRef], () => {
    setIsAccomSelectorOpen(false)
  })

  return (
    <div
      className="w-5/6 h-fit sticky top-24 bottom-0 
        shadow-[0px_4px_15px_6px_rgba(0,0,0,0.1)] rounded-lg p-7"
    >
      <div className="font-bold">
        {!haveBooking ? 'Pick your booking date' : 'Choose your accommodation'}
      </div>
      <div
        className="border-[1px] border-gray-500 rounded-lg mt-3 select-none
          relative text-sm"
      >
        {/* Booking input */}
        <div
          className="flex w-full cursor-pointer border-b-[1px]
            border-gray-500 font-semibold"
          onClick={() => setIsBookingInputShowed(true)}
        >
          <div
            className="h-11 px-5 flex-1 flex items-center border-r-[1px] 
              border-gray-500"
          >
            {!bookIn ? (
              <div>Book in</div>
            ) : (
              <div className="text-sm">
                <div className=" font-semibold">Book in</div>
                <div>{bookIn?.toLocaleDateString()}</div>
              </div>
            )}
          </div>
          <div className="h-11 px-5 flex-1 flex items-center border-gray-500">
            {!bookOut ? (
              <div>Book out</div>
            ) : (
              <div className="text-sm">
                <div className="font-semibold">Book in</div>
                <div>{bookOut?.toLocaleDateString()}</div>
              </div>
            )}
          </div>
          {isBookingInputShowed && (
            <div
              className="absolute -top-2 -right-1   z-10"
              ref={bookingInputRef}
            >
              <BookingInput
                bookIn={bookIn}
                bookOut={bookOut}
                bookingOnChange={bookingOnChange}
              />
            </div>
          )}
        </div>
        {/* Accommodation select */}
        <div
          className={`flex justify-between items-center w-full font-semibold h-11 px-5 
            relative ${
              !isAvailable ? 'text-gray-400 cursor-default' : 'cursor-pointer '
            }`}
          onClick={() => {
            if (!isAvailable) {
              return
            }
            setIsAccomSelectorOpen((pre) => !pre)
          }}
          ref={accomSelectorButtonRef}
        >
          <span>Accommodations</span>
          <FaAngleDown size={16} />

          {isAccomSelectorOpen && (
            <div
              className="absolute right-0 left-0 top-14 border-[1px] border-gray-500
                rounded-lg overflow-hidden bg-white z-10 max-h-80 overflow-y-auto"
            >
              {accommodations.map((a, i) => (
                <div key={a._id}>
                  {i !== 0 && <hr />}
                  <div
                    className={`py-3 px-5 flex items-center justify-between
                    hover:bg-gray-200 font-medium ${
                      !a.isAvailable && 'text-gray-400 cursor-default'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (a.isAvailable) {
                        selectedAccomOnChange(a)
                        setIsAccomSelectorOpen(false)
                      }
                    }}
                  >
                    <span>{a.title}</span>
                    <span className="text-rose-600">{`$${a.pricePerNight}`}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Error text */}
      {isAvailable === false && (
        <div className="mt-3">
          <ErrorText error="Sorry, this booking isn't available" />
        </div>
      )}
      <div className="min-h-[100px] mt-3 flex flex-col gap-2">
        {selectedAccom !== null && (
          <>
            <div className="flex justify-between">
              <span>{selectedAccom.title}</span>
              <span className="text-rose-600">{`$${selectedAccom.pricePerNight}`}</span>
            </div>
            <div className="flex justify-between">
              Type:
              {selectedAccom.type === 'entire-house' ? (
                <span>Entire house</span>
              ) : (
                <span>Specific rooms</span>
              )}
            </div>
            {selectedAccom.numberOfRooms && (
              <div className="flex justify-between">
                Rooms: <span>{selectedAccom.numberOfRooms}</span>
              </div>
            )}
            <div>
              <span>Beds:</span>
              <div className="grid grid-cols-2 border-[1px] border-gray-500 rounded-md">
                <div
                  className="p-2 font-base text-sm flex justify-between border-b-[1px]
                  border-r-[1px] border-gray-500"
                >
                  <span>Double: </span>
                  <span>{selectedAccom.bed.double}</span>
                </div>

                <div
                  className="p-2 font-base text-sm flex justify-between border-b-[1px]
                    border-gray-500"
                >
                  <span>Single: </span>
                  <span>{selectedAccom.bed.single}</span>
                </div>

                <div
                  className="p-2 font-base text-sm flex justify-between border-r-[1px]
                    border-gray-500"
                >
                  <span>Queen: </span>
                  <span>{selectedAccom.bed.queen}</span>
                </div>

                <div className="p-2 font-base text-sm flex justify-between">
                  <span>Sofa: </span>
                  <span>{selectedAccom.bed.sofaBed}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Reserve button */}
      <div className="mt-7">
        <Button
          label="Reserve"
          onClick={() => {}}
          disabled={!selectedAccom || !selectedAccom.isAvailable}
        />
      </div>
    </div>
  )
}

export default ReserveBoard
