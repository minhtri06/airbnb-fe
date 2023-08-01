import { useState } from 'react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

const GuestInput = () => {
  const [numOfAdults, setNumOfAdults] = useState(0)
  const [numOfChildren, setNumOfChildren] = useState(0)
  const [numOfInfants, setNumOfInfants] = useState(0)
  const [numOfPets, setNumOfPets] = useState(0)

  const GuestInputItems = ({
    title,
    subTitle,
    number,
    setNumber,
  }: {
    title: string
    subTitle: string
    number: number
    setNumber: (setter: any) => void
  }) => {
    const handleOnIncrease = () => {
      setNumber((pre: number) => pre + 1)
    }

    const handleOnDecrease = () => {
      if (number > 0) {
        setNumber((pre: number) => pre - 1)
      }
    }

    return (
      <>
        <div className="flex justify-between items-center py-5">
          <div>
            <div className="font-bold">{title}</div>
            <div className="text-gray-500">{subTitle}</div>
          </div>
          <div className="flex items-center w-24 select-none">
            <div
              className="border-[1px] p-2 rounded-full border-gray-600 cursor-pointer"
              onClick={handleOnDecrease}
            >
              <AiOutlineMinus size={14} />
            </div>
            <span className="mx-auto">{number}</span>
            <div
              className="border-[1px] p-2 rounded-full border-gray-600 cursor-pointer"
              onClick={handleOnIncrease}
            >
              <AiOutlinePlus size={14} />
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div
      className="absolute top-20 right-0 px-10 py-5 w-1/2 bg-white rounded-3xl 
        flex flex-col shadow-[0px_0px_10px_5px_rgba(0,0,0,0.1)]"
    >
      <GuestInputItems
        title="Adults"
        subTitle="Ages 13 or above"
        number={numOfAdults}
        setNumber={setNumOfAdults}
      />
      <hr />
      <GuestInputItems
        title="Children"
        subTitle="Ages 2–12"
        number={numOfChildren}
        setNumber={setNumOfChildren}
      />
      <hr />
      <GuestInputItems
        title="Infants"
        subTitle="Under 2"
        number={numOfInfants}
        setNumber={setNumOfInfants}
      />
      <hr />
      <GuestInputItems
        title="Pets"
        subTitle="Bringing a service animal?"
        number={numOfPets}
        setNumber={setNumOfPets}
      />
    </div>
  )
}

export default GuestInput
