'use client'

import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

interface CounterProps {
  title: string
  subTitle: string
  number: number
  setNumber: (setter: any) => void
}

const Counter: React.FC<CounterProps> = ({
  title,
  subTitle,
  number,
  setNumber,
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

export default Counter
