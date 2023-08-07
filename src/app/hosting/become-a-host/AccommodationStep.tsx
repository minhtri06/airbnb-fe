'use client'

import ErrorText from '@/components/ErrorText'
import Button from '@/components/buttons/Button'
import Counter from '@/components/inputs/Counter'
import Input from '@/components/inputs/Input'
import { useEffect, useRef } from 'react'
import { IconType } from '@react-icons/all-files'
import { AiOutlineHome } from '@react-icons/all-files/ai/AiOutlineHome'
import { BsHouseDoor } from '@react-icons/all-files/bs/BsHouseDoor'
import { accommodation, bed } from '@/types'

interface AccommodationStepProps {
  accommodations: accommodation[]
  accommodationOnChange: (value: accommodation, index: number) => void
  accommodationOnRemove: (index: number) => void
  accommodationOnAdd: () => void
  error: string | undefined
}

const AccommodationStep: React.FC<AccommodationStepProps> = ({
  accommodations,
  accommodationOnChange,
  accommodationOnRemove,
  accommodationOnAdd,
  error,
}) => {
  const errorElement = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (error && error !== '') {
      errorElement.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [error])

  const AccommodationTypeButton = ({
    title,
    subtitle,
    Icon,
    isSelected,
    onClick,
  }: {
    title: string
    subtitle: string
    Icon: IconType
    isSelected: boolean
    onClick: () => void
  }) => {
    return (
      <div
        className={`h-28 flex items-center justify-between border-[1px] 
          rounded-lg p-3 outline outline-[1px] outline-gray-500 
          hover:outline-[2px] hover:outline-gray-700 cursor-pointer hover:bg-gray-200
          select-none ${
            isSelected && 'bg-gray-200 outline-[2px] outline-gray-700'
          }`}
        onClick={() => onClick()}
      >
        <div>
          <div className="font-bold">{title}</div>
          <div className="text-base text-gray-600">{subtitle}</div>
        </div>
        <Icon size={32} />
      </div>
    )
  }

  const CountInput = ({
    bed,
    bedOnChange,
    maximumOfGuests,
    maximumOfGuestsOnChange,
    numberOfRooms,
    numberOfRoomsOnChange,
  }: {
    bed: bed
    bedOnChange: (v: bed) => void
    maximumOfGuests: number
    maximumOfGuestsOnChange: (v: number) => void
    numberOfRooms: number | undefined
    numberOfRoomsOnChange: (v: number) => void
  }) => {
    bed.double
    return (
      <>
        {numberOfRooms !== undefined && (
          <>
            <Counter
              title="Number of rooms"
              number={numberOfRooms}
              onIncrease={() => numberOfRoomsOnChange(numberOfRooms + 1)}
              onDecrease={() => numberOfRoomsOnChange(numberOfRooms - 1)}
            />
            <hr />
          </>
        )}
        <Counter
          title="Maximum of guest"
          number={maximumOfGuests}
          onIncrease={() => maximumOfGuestsOnChange(maximumOfGuests + 1)}
          onDecrease={() => maximumOfGuestsOnChange(maximumOfGuests - 1)}
        />
        <hr />
        <Counter
          title="Double"
          number={bed.double}
          onIncrease={() => bedOnChange({ ...bed, double: bed.double + 1 })}
          onDecrease={() => bedOnChange({ ...bed, double: bed.double - 1 })}
        />
        <hr />
        <Counter
          title="Queen"
          number={bed.queen}
          onIncrease={() => bedOnChange({ ...bed, queen: bed.queen + 1 })}
          onDecrease={() => bedOnChange({ ...bed, queen: bed.queen - 1 })}
        />
        <hr />
        <Counter
          title="Single"
          number={bed.single}
          onIncrease={() => bedOnChange({ ...bed, single: bed.single + 1 })}
          onDecrease={() => bedOnChange({ ...bed, single: bed.single - 1 })}
        />
        <hr />
        <Counter
          title="Sofa "
          number={bed.sofaBed}
          onIncrease={() => bedOnChange({ ...bed, sofaBed: bed.sofaBed + 1 })}
          onDecrease={() => bedOnChange({ ...bed, sofaBed: bed.sofaBed - 1 })}
        />
      </>
    )
  }

  return (
    <div>
      <div className="font-bold text-3xl pb-3">
        Places in your home you want to airbnb
      </div>
      <div className="text-xl text-gray-500 pb-3">
        Share some basics about your place
      </div>
      <div className="font-semibold">
        {accommodations.map((a, i) => (
          <div key={i} className="border-t-[2px] border-gray-500">
            <div
              className="h-28 text-xl font-bold flex justify-between items-center
                "
            >
              <span>Accommodation #{i + 1}</span>
              <div className="w-60">
                <Button
                  label="Remove accommodation"
                  onClick={() => accommodationOnRemove(i)}
                  outline
                />
              </div>
            </div>
            <div className="text-lg pb-3">Title</div>
            <div className="">
              <Input
                value={a.title}
                onChange={(e) => {
                  accommodationOnChange(
                    { ...a, title: e.currentTarget.value },
                    i,
                  )
                }}
                size="big"
              />
            </div>
            <div className="w-60">
              <div className="text-lg pb-3">Price per night</div>
              <Input
                value={`$ ${a.pricePerNight}`}
                onChange={(e) => {
                  accommodationOnChange(
                    { ...a, pricePerNight: e.currentTarget.value.slice(2) },
                    i,
                  )
                }}
                size="big"
              />
            </div>

            <div className="pt-5 text-lg">
              What type of place will guests have?
            </div>
            <div className="pt-3 flex flex-col justify-between gap-4">
              <AccommodationTypeButton
                title="An entire home"
                subtitle="Guests have the whole place to themselves"
                Icon={AiOutlineHome}
                isSelected={a.type === 'entire-house'}
                onClick={() =>
                  accommodationOnChange({ ...a, type: 'entire-house' }, i)
                }
              />
              <AccommodationTypeButton
                title="A room"
                subtitle="Guests have their own room in a home, plus access to shared
                  spaces"
                Icon={BsHouseDoor}
                isSelected={a.type === 'specific-room'}
                onClick={() =>
                  accommodationOnChange({ ...a, type: 'specific-room' }, i)
                }
              />
            </div>
            <CountInput
              bed={a.bed}
              bedOnChange={(value) => {
                if (
                  value.double < 0 ||
                  value.queen < 0 ||
                  value.single < 0 ||
                  value.sofaBed < 0
                ) {
                  return
                }
                accommodationOnChange({ ...a, bed: value }, i)
              }}
              maximumOfGuests={a.maximumOfGuests as number}
              maximumOfGuestsOnChange={(v) => {
                if (v < 1) {
                  return
                }
                accommodationOnChange({ ...a, maximumOfGuests: v }, i)
              }}
              numberOfRooms={a.numberOfRooms}
              numberOfRoomsOnChange={(v) => {
                if (v < 1) {
                  return
                }
                accommodationOnChange({ ...a, numberOfRooms: v }, i)
              }}
            />
          </div>
        ))}
        <div ref={errorElement}>
          <ErrorText error={error} size="big" />
        </div>
        <div className="w-60 pt-5">
          <Button
            label="Add accommodation"
            onClick={() => accommodationOnAdd()}
            black
          />
        </div>
      </div>
    </div>
  )
}

export default AccommodationStep
