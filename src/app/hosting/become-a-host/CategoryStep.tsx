'use client'

import ErrorText from '@/components/ErrorText'
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
    <>
      <div className="font-bold text-3xl pb-3">
        Which of these best describes your place?
      </div>
      <div className="grid grid-cols-3 mt-4 gap-3 h-[52vh] xl:h-[57vh] overflow-y-auto">
        {CATEGORIES.map((c) => {
          const isSelected = selectedCategoryCodes.includes(c.code)

          return (
            <div
              key={c.code}
              className={`flex flex-col items-center justify-center h-28 w-full rounded-xl cursor-pointer 
                select-none gap-3 border-[1px] hover:border-[2px] hover:border-gray-700 ${
                  isSelected
                    ? 'bg-gray-200 border-gray-700 border-[2px]'
                    : 'border-gray-200'
                }`}
              onClick={() => handleCategoryOnClick(c.code, isSelected)}
            >
              <Image src={c.imageSrc} height={30} width={30} alt="Icon image" />
              <span className="text-lg">{c.label}</span>
            </div>
          )
        })}
      </div>
      <div className="py-5">
        <ErrorText error={error} size="big" />
      </div>
    </>
  )
}

export default CategoryStep
