import { CATEGORIES } from '@/constants/categories'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'

interface CategoriesSectionProps {
  isCategoryChanged: () => boolean
  handleSaveCategory: () => void
  categoryCodes: string[]
  setCategoryCodes: Dispatch<SetStateAction<string[]>>
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  isCategoryChanged,
  handleSaveCategory,
  categoryCodes,
  setCategoryCodes,
}) => {
  return (
    <>
      <div className="flex justify-between">
        <div className="font-bold flex justify-between">Categories</div>
        {isCategoryChanged() && (
          <div
            className="font-bold underline cursor-pointer"
            onClick={handleSaveCategory}
          >
            Save
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 mt-4 py-1 gap-3 h-[375px] overflow-y-auto">
        {CATEGORIES.map((c) => {
          const isSelected = categoryCodes.includes(c.code)
          return (
            <div
              key={c.code}
              className={`flex flex-col items-center justify-center h-28 w-full 
          rounded-xl cursor-pointer select-none gap-3 border-[1px] 
          hover:border-[2px] hover:border-gray-700 ${
            isSelected
              ? 'bg-gray-200 border-gray-700 border-[2px]'
              : 'border-gray-200'
          }`}
              onClick={() => {
                if (isSelected) {
                  setCategoryCodes(
                    categoryCodes.filter((cCode) => cCode !== c.code),
                  )
                } else setCategoryCodes([...categoryCodes, c.code])
              }}
            >
              <Image src={c.imageSrc} height={30} width={30} alt="Icon image" />
              <span className="text-lg">{c.label}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default CategoriesSection
