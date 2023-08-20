import useAuthAxios from '@/hooks/useAuthAxios'
import { property } from '@/types'
import Image from 'next/image'
import { useState } from 'react'

interface ThumbnailSectionProps {
  property: property
  setProperty: React.Dispatch<React.SetStateAction<property | null>>
}

const ThumbnailSection: React.FC<ThumbnailSectionProps> = ({
  property,
  setProperty,
}) => {
  const [newThumbnail, setNewThumbnail] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const authAxios = useAuthAxios()

  const handleUploadThumbnail = () => {
    if (!newThumbnail || !property) return
    setIsLoading(true)
    const fd = new FormData()
    fd.append('thumbnail', newThumbnail)
    authAxios
      .put(`/properties/${property?._id}/thumbnail`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        setNewThumbnail(null)
        const { thumbnail } = res.data
        property.thumbnail = thumbnail
        setProperty({ ...property })
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      <div className="font-bold flex justify-between">Thumbnail</div>
      <div className="h-64 mt-2 flex justify-center">
        {!isLoading && (
          <Image
            className="rounded-lg overflow-hidden"
            src={property.thumbnail || '/img/home-icon.png'}
            height={0}
            width={0}
            sizes="100vh"
            alt=""
            style={{ width: 'auto', height: '100%' }}
          />
        )}
      </div>
      <div className="mt-5 text-base">
        {isLoading ? (
          <div className="font-bold">Uploading...</div>
        ) : (
          <>
            {!newThumbnail ? (
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
            ) : (
              <div>
                <button
                  className="font-bold underline cursor-pointer mr-2"
                  onClick={handleUploadThumbnail}
                >
                  Upload
                </button>
                <span className="overflow-hidden whitespace-nowrap truncate mr-3">
                  {newThumbnail.name}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default ThumbnailSection
