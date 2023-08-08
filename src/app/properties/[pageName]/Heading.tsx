import { ownerObj, property } from '@/types'
import { AiFillStar } from '@react-icons/all-files/ai/AiFillStar'
import { BiShare } from '@react-icons/all-files/bi/BiShare'
import { BiUserPin } from '@react-icons/all-files/bi/BiUserPin'
import { BsHeart } from '@react-icons/all-files/bs/BsHeart'

interface HeadingProps {
  property: property
}

const Heading: React.FC<HeadingProps> = ({ property }) => {
  const owner = property.owner as ownerObj
  return (
    <div className="py-5 font-bold">
      <div className="text-3xl">{property.title}</div>
      <div className="flex items-center justify-between pt-2">
        <div className="flex gap-3">
          <span className="flex items-center gap-1">
            <AiFillStar /> {property.score || 'New'}
          </span>
          <span className="underline">{property.reviewCount} reviews</span>
          <div className="flex gap-1 items-center">
            <BiUserPin />
            {owner.name}
          </div>
          <div className="underline">
            {`${property.address.address}, ${property.address.districtName}, ${property.address.provinceName}`}
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 cursor-pointer">
            <BiShare />
            <span className="underline">Share</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <BsHeart />
            <span className="underline">save</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Heading
