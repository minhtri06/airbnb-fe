'use client'

import ErrorText from '@/components/ErrorText'
import Heading from '@/components/Heading'
import { CATEGORIES } from '@/constants/categories'
import Image from 'next/image'

interface CategoryStepProps {
  selectedCategoryCodes: string[]
  setSelectedCategoryCodes: (value: any) => void
  error?: string
}

const CategoryStep: React.FC<CategoryStepProps> = ({
  selectedCategoryCodes,
  setSelectedCategoryCodes,
  error,
}) => {
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
                select-none gap-3 border-[2px] hover:border-gray-700 ${
                  isSelected ? 'bg-gray-200 border-gray-700' : 'border-white'
                }`}
              onClick={() => handleCategoryOnClick(c.code, isSelected)}
            >
              <Image src={c.imageSrc} height={20} width={20} alt="Icon image" />
              <span>{c.label}</span>
            </div>
          )
        })}
      </div>
      <ErrorText error={error} />
    </div>
  )
}

export default CategoryStep
