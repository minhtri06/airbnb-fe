import useSearch from '@/hooks/contexts/useSearch'
import Image from 'next/image'

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
  const { setParams, params } = useSearch()

  return (
    <div
      onClick={() => {
        if (code !== params.categoryCode) {
          setParams({ categoryCode: code })
        }
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
