import { CATEGORY_MAP } from '@/constants/categories'
import { property } from '@/types'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import SupportShowMore from './SupportShowMore'

interface CategoriesProps {
  property: property
}

const Categories: React.FC<CategoriesProps> = ({ property }) => {
  const [isCategoriesShowedAll, setIsCategoriesShowedAll] = useState<
    boolean | null
  >(null)

  useEffect(() => {
    setIsCategoriesShowedAll(property.categoryCodes.length > 6 ? false : null)
  }, [property])

  const categoryElements = property.categoryCodes.map((c) => {
    const category = CATEGORY_MAP.get(c)
    return (
      <div
        className="h-16 px-5 flex items-center justify-start gap-3 border-[1px] 
        border-gray-300 rounded-lg"
      >
        <Image
          src={category?.imageSrc || ''}
          alt="Facility icon"
          height={28}
          width={28}
        />
        <span className="font-semibold">{category?.label}</span>
      </div>
    )
  })

  return (
    <>
      {isCategoriesShowedAll && (
        <SupportShowMore
          body={
            <>
              <div className="text-2xl font-bold pb-8">What this place is</div>
              <div className="grid grid-cols-3 gap-5">{categoryElements}</div>
            </>
          }
          onClose={() => setIsCategoriesShowedAll(false)}
        />
      )}

      <div className="grid grid-cols-3 gap-5">
        {categoryElements.slice(0, 6)}
      </div>

      {isCategoriesShowedAll !== null && (
        <div className="mt-5">
          <span
            className="font-bold underline cursor-pointer select-none"
            onClick={() => setIsCategoriesShowedAll(true)}
          >
            Show all
          </span>
        </div>
      )}
    </>
  )
}

export default Categories
