'use client'

import ErrorText from '@/components/ErrorText'
import { CATEGORIES } from '@/constants/categories'
import useAuthAxios from '@/hooks/useAuthAxios'
import { property } from '@/types'
import pickFields from '@/utils/pickFields'
import axios from 'axios'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { AiFillCheckCircle } from '@react-icons/all-files/ai/AiFillCheckCircle'

interface PropertyInfoProps {
  property: null | property
  setProperty: (value: property | null) => void
  fetchProperty: () => Promise<property>
}

const PropertyInfo: React.FC<PropertyInfoProps> = ({
  property,
  setProperty,
  fetchProperty,
}) => {
  const router = useRouter()
  const authAxios = useAuthAxios()
  const pathname = usePathname()

  const [error, setError] = useState('')
  const [selectedImgInx, setSelectedImgInx] = useState<number[]>([])
  const [addedImages, setAddedImages] = useState<FileList | null>(null)
  const [newThumbnail, setNewThumbnail] = useState<File | null>(null)

  const handleSave = () => {
    if (!property) return

    property.pageName = property.pageName.replaceAll(' ', '-')
    authAxios
      .patch(
        `/properties/${property?._id}`,
        pickFields(
          property,
          'title',
          'isClosed',
          'pageName',
          'description',
          'categoryCodes',
        ),
      )
      .then(() => {
        if (!pathname) return
        const pathnameParts = pathname?.split('/')
        pathnameParts[2] = property.pageName
        router.replace(pathnameParts.join('/') + '?tab=info')
        setError('')
      })
      .catch((error) => {
        if (axios.isAxiosError(error) && error.status !== 500)
          setError(error.response?.data.message)
        else router.push('/500')
      })
  }

  const handleRemoveImages = () => {
    if (selectedImgInx.length === 0) return
    authAxios
      .delete(`/properties/${property?._id}/images`, {
        data: { deletedIndexes: selectedImgInx },
      })
      .then(() => {
        if (!property) return
        property.images = property.images?.filter(
          (img, i) => !selectedImgInx.includes(i),
        )
        setProperty({ ...property })
        setSelectedImgInx([])
      })
  }

  if (addedImages !== null) console.log(addedImages[0])

  const handleUploadImages = () => {
    if (!addedImages || addedImages.length === 0) return
    const fd = new FormData()
    for (let i = 0; i < addedImages.length; i++) {
      fd.append('images', addedImages[i])
    }
    console.log(fd)
    authAxios
      .post(`/properties/${property?._id}/images`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(() => {
        setAddedImages(null)
        setSelectedImgInx([])
        fetchProperty().then((property) => setProperty(property))
      })
  }

  const handleUploadThumbnail = () => {
    if (!newThumbnail) return
    const fd = new FormData()
    fd.append('thumbnail', newThumbnail)
    authAxios
      .put(`/properties/${property?._id}/thumbnail`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(() => {
        setNewThumbnail(null)
        fetchProperty().then((property) => setProperty(property))
      })
  }

  console.log(newThumbnail)

  return (
    <div className="flex justify-center">
      <div className="w-[700px]">
        <div className="pt-14 pb-7 flex justify-between items-end">
          <span className="text-4xl text-gray-900 font-bold ">
            Property info
          </span>
          <span
            className="text-lg font-bold underline cursor-pointer"
            onClick={() => handleSave()}
          >
            Save
          </span>
        </div>
        <ErrorText error={error} size="big" />
        {property && (
          <div className="text-lg">
            <div className="py-5">
              <div className="flex justify-between font-bold">Title</div>
              <input
                className="text-gray-900 bg-white outline-none py-1 border-b-[1px] w-full"
                value={property.title}
                onChange={(e) => {
                  property.title = e.currentTarget.value
                  setProperty({ ...property })
                }}
              />
            </div>
            <div className="py-5">
              <div className="font-bold flex justify-between">Page name</div>
              <input
                className="text-gray-900 bg-white outline-none py-1 border-b-[1px] w-full"
                value={property.pageName}
                onChange={(e) => {
                  property.pageName = e.currentTarget.value.replaceAll(' ', '-')
                  setProperty({ ...property })
                }}
              />
            </div>
            <div className="py-5">
              <div className="font-bold flex justify-between">Description</div>
              <textarea
                className="text-gray-900 bg-white outline-none py-1 border-b-[1px] rounded-md 
                  w-full"
                rows={7}
                value={property.description}
                onChange={(e) => {
                  property.description = e.currentTarget.value
                  setProperty({ ...property })
                }}
              />
            </div>
            <div className="py-5">
              <div className="font-bold flex justify-between">Thumbnail</div>
              <div className="h-64 mt-2 flex justify-center">
                <Image
                  className="rounded-lg overflow-hidden"
                  src={property.thumbnail || '/img/home-icon.png'}
                  height={0}
                  width={0}
                  sizes="100vh"
                  alt=""
                  style={{ width: 'auto', height: '100%' }}
                />
              </div>
              <div className="flex justify-between mt-5 text-base">
                <div
                  className="cursor-pointer font-bold underline"
                  onClick={(e) => {
                    e.currentTarget.querySelector('input')?.click()
                  }}
                >
                  New thumbnail
                  <input
                    type="file"
                    accept="image"
                    hidden
                    onChange={(e) => {
                      if (!e.currentTarget.files) return
                      setNewThumbnail(e.currentTarget.files[0])
                    }}
                  />
                </div>
                {newThumbnail && (
                  <div>
                    <span className="overflow-hidden whitespace-nowrap truncate mr-3">
                      {newThumbnail.name}
                    </span>
                    <button
                      className="font-bold underline cursor-pointer"
                      onClick={handleUploadThumbnail}
                    >
                      Upload
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="py-5">
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
                <div className="flex justify-between">
                  <div
                    className="text-rose-500 cursor-pointer font-bold underline"
                    onClick={handleRemoveImages}
                  >
                    Remove
                  </div>
                  {selectedImgInx.length !== 0 && (
                    <span>{selectedImgInx.length} images</span>
                  )}
                </div>
                <div className="flex justify-between mt-3">
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
                  {addedImages && addedImages.length !== 0 && (
                    <div>
                      <span className="">{addedImages.length} images</span>{' '}
                      <button
                        className="font-bold underline cursor-pointer"
                        onClick={handleUploadImages}
                      >
                        Upload
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="py-5">
              <div className="font-bold flex justify-between">Categories</div>
              <div className="grid grid-cols-3 mt-4 py-1 gap-3 h-[375px] overflow-y-auto">
                {CATEGORIES.map((c) => {
                  const isSelected = property.categoryCodes.includes(c.code)
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
                          property.categoryCodes =
                            property.categoryCodes.filter(
                              (cCode) => cCode !== c.code,
                            )
                        } else property.categoryCodes.push(c.code)
                        setProperty({ ...property })
                      }}
                    >
                      <Image
                        src={c.imageSrc}
                        height={30}
                        width={30}
                        alt="Icon image"
                      />
                      <span className="text-lg">{c.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PropertyInfo
