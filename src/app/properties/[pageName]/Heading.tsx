import useAuthAxios from '@/hooks/useAuthAxios'
import useAuthStore from '@/stores/useAuthStore'
import useLoginModalStore from '@/stores/useLoginModalStore'
import { ownerObj, property } from '@/types'
import { AiFillStar } from '@react-icons/all-files/ai/AiFillStar'
import { BiShare } from '@react-icons/all-files/bi/BiShare'
import { BiUserPin } from '@react-icons/all-files/bi/BiUserPin'
import { BsHeart } from '@react-icons/all-files/bs/BsHeart'
import { BsHeartFill } from '@react-icons/all-files/bs/BsHeartFill'
import { Dispatch, SetStateAction } from 'react'

interface HeadingProps {
  property: property
  setProperty: Dispatch<SetStateAction<property | null>>
}

const Heading: React.FC<HeadingProps> = ({ property, setProperty }) => {
  const { open: openLoginModal } = useLoginModalStore()
  const { isLogin } = useAuthStore()
  const owner = property.owner as ownerObj
  const authAxios = useAuthAxios()

  const saveProperty = () => {
    authAxios
      .post('/me/saved-properties', { propertyId: property._id })
      .then(() => setProperty({ ...property, isSaved: true }))
  }

  const unSaveProperty = () => {
    authAxios
      .delete(`/me/saved-properties/${property._id}`)
      .then(() => setProperty({ ...property, isSaved: false }))
  }

  const handleSaveOnClick = () => {
    if (isLogin === null) return
    if (isLogin === false) {
      openLoginModal()
      return
    }
    if (property.isSaved === false) {
      saveProperty()
      return
    }
    if (property.isSaved === true) {
      unSaveProperty()
    }
  }

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
            {`${property.address.districtName}, ${property.address.provinceName}`}
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 cursor-pointer">
            <BiShare />
            <span className="underline">Share</span>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleSaveOnClick}
          >
            {property.isSaved ? (
              <span className="text-rose-600">
                <BsHeartFill />
              </span>
            ) : (
              <BsHeart />
            )}
            <span className="underline">save</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Heading
