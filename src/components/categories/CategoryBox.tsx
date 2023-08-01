'use client'

import Image from 'next/image'
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'

interface CategoryBoxProps {
  icon: string
  label: string
  selected: boolean
  code: string
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon,
  label,
  selected,
  code,
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const handleOnSwitchCategory = (code: string) => {
    const currentParams = new URLSearchParams(
      Array.from(params?.entries() || []),
    )

    currentParams.delete('categoryCode')
    currentParams.delete('page')
    currentParams.set('categoryCode', code)

    const search = currentParams.toString()
    const query = search ? `?${search}` : ''

    router.push(`${pathname}${query}`)
  }

  return (
    <div
      onClick={() => {
        handleOnSwitchCategory(code)
      }}
      className={`h-full py-3 text-sm font-semibold flex flex-col 
        justify-between items-center cursor-pointer ${
          !selected && 'opacity-60'
        } hover:opacity-100`}
    >
      <Image src={icon} alt="Category icon" height={24} width={24} />
      <span className="inline-block whitespace-nowrap">{label}</span>
    </div>
  )
}

export default CategoryBox
