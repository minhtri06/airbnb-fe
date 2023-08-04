'use client'

import { AiOutlineMinus } from '@react-icons/all-files/ai/AiOutlineMinus'
import { AiOutlinePlus } from '@react-icons/all-files/ai/AiOutlinePlus'

interface CounterProps {
  title: string
  subTitle?: string
  number: number
  onIncrease: () => void
  onDecrease: () => void
}

const Counter: React.FC<CounterProps> = ({
  title,
  subTitle,
  number,
  onIncrease,
  onDecrease,
}) => {
  return (
    <>
      <div className="flex justify-between items-center py-5">
        <div>
          <div className="font-bold">{title}</div>
          {subTitle && <div className="text-gray-500">{subTitle}</div>}
        </div>
        <div className="flex items-center w-24 select-none">
          <div
            className="border-[1px] p-2 rounded-full border-gray-600 cursor-pointer"
            onClick={() => onDecrease()}
          >
            <AiOutlineMinus size={14} />
          </div>
          <span className="mx-auto">{number}</span>
          <div
            className="border-[1px] p-2 rounded-full border-gray-600 cursor-pointer"
            onClick={() => onIncrease()}
          >
            <AiOutlinePlus size={14} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Counter
