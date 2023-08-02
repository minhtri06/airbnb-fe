'use client'

import Heading from '@/components/Heading'
import { CATEGORIES } from '@/constants/categories'
import Image from 'next/image'

interface Step1Props {
  selectedCategoryCodes: string[]
  setSelectedCategoryCodes: (value: any) => void
}

const Step1: React.FC<Step1Props> = ({
  selectedCategoryCodes,
  setSelectedCategoryCodes,
}) => {
  console.log(selectedCategoryCodes)
  const handleCategoryOnClick = (code: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedCategoryCodes((pre: string[]) =>
        pre.filter((value) => value !== code),
      )
    } else {
      setSelectedCategoryCodes((pre: string[]) => [...pre, code])
    }
  }

  return (
    <div>
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick categories"
      />
      <div
        className="grid grid-cols-3 gap-3 max-h-[50vh]
          overflow-y-auto mt-8"
      >
        {CATEGORIES.map((c) => {
          const isSelected = selectedCategoryCodes.includes(c.code)

          return (
            <div
              key={c.code}
              className={`flex flex-col items-center py-6 rounded-xl cursor-pointer 
                select-none gap-3 hover:bg-gray-200 ${
                  isSelected && 'border-[2px] border-gray-700'
                }`}
              onClick={() => handleCategoryOnClick(c.code, isSelected)}
            >
              <Image src={c.imageSrc} height={20} width={20} alt="Icon image" />
              <span>{c.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Step1
