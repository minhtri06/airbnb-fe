'use client'

import useAuthAxios from '@/hooks/useAuthAxios'
import { property } from '@/types'
import Image from 'next/image'
import { useState } from 'react'
import { AiFillCheckCircle } from '@react-icons/all-files/ai/AiFillCheckCircle'

interface ImagesSectionProps {
  property: property
  setProperty: React.Dispatch<React.SetStateAction<property | null>>
}

const ImagesSection: React.FC<ImagesSectionProps> = ({
  property,
  setProperty,
}) => {
  const [selectedImgInx, setSelectedImgInx] = useState<number[]>([])
  const [addedImages, setAddedImages] = useState<FileList | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const authAxios = useAuthAxios()

  const handleUploadImages = () => {
    if (!addedImages || addedImages.length === 0 || !property) return

    const fd = new FormData()
    for (let i = 0; i < addedImages.length; i++) {
      fd.append('images', addedImages[i])
    }

    setIsUploading(true)
    authAxios
      .post(`/properties/${property?._id}/images`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        const { newImages } = res.data
        setAddedImages(null)
        setSelectedImgInx([])
        property?.images?.push(...newImages)
        setProperty({ ...property })
      })
      .finally(() => setIsUploading(false))
  }

  const handleRemoveImages = () => {
    if (!property || selectedImgInx.length === 0) return

    property.images = property.images?.filter(
      (img, i) => !selectedImgInx.includes(i),
    )
    setProperty({ ...property })
    setSelectedImgInx([])

    authAxios.delete(`/properties/${property?._id}/images`, {
      data: { deletedIndexes: selectedImgInx },
    })
  }

  return (
    <>
      <div className="font-bold flex justify-between">Images</div>

      <div className="mt-2 grid grid-cols-3 gap-3 h-[375px] overflow-y-auto">
        {property.images?.map((img, i) => {
          const isSelected = selectedImgInx.includes(i)
          return (
            <div
              key={i}
              className="pt-[100%] relative flex justify-center items-center"
            >
              <Image
                className="cursor-pointer"
                onClick={() => {
                  if (isSelected)
                    setSelectedImgInx([
                      ...selectedImgInx.filter((inx) => inx !== i),
                    ])
                  else setSelectedImgInx([...selectedImgInx, i])
                }}
                src={img}
                alt=""
                style={{ objectFit: 'contain' }}
                fill
                sizes="200px"
              />
              <div className="absolute top-[calc(50%-15px)] text-white">
                {isSelected && <AiFillCheckCircle size={40} />}
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-5 text-base">
        {selectedImgInx.length !== 0 && (
          <div className="flex gap-2">
            <div
              className="text-rose-500 cursor-pointer font-bold underline"
              onClick={handleRemoveImages}
            >
              Remove
            </div>
            <span>{selectedImgInx.length} images</span>
          </div>
        )}
        <div className="flex justify-between mt-3">
          {isUploading ? (
            <div className="font-bold">Uploading...</div>
          ) : (
            <>
              {!addedImages || addedImages.length === 0 ? (
                <div
                  className="cursor-pointer font-bold underline"
                  onClick={(e) =>
                    e.currentTarget.querySelector('input')?.click()
                  }
                >
                  Add images
                  <input
                    type="file"
                    multiple
                    accept="image"
                    hidden
                    onChange={(e) => setAddedImages(e.currentTarget.files)}
                  />
                </div>
              ) : (
                <div>
                  <button
                    className="font-bold underline cursor-pointer"
                    onClick={handleUploadImages}
                  >
                    Upload
                  </button>{' '}
                  <span className="">{addedImages.length} images</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default ImagesSection
