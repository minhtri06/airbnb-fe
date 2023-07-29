import Image from 'next/image'

interface CategoryBoxProps {
  index: number
  icon: string
  label: string
  selected: boolean
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  index,
  icon,
  label,
  selected,
}) => {
  return (
    <div
      key={index}
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
