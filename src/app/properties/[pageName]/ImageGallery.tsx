import Button from '@/components/buttons/Button'
import { property } from '@/types'
import Image from 'next/image'
import SupportShowMore from './SupportShowMore'
import { useEffect, useState } from 'react'

interface ImageGalleryProps {
  property: property
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ property }) => {
  const [isImagesShowedAll, setIsImagesShowedAll] = useState<boolean | null>(
    null,
  )

  useEffect(() => {
    if (property.images && property.images.length > 1) {
      setIsImagesShowedAll(false)
    }
  }, [property])

  const images = property.images || ([] as string[])

  return (
    <>
      {isImagesShowedAll && (
        <SupportShowMore
          title="Take a look at this place"
          body={
            <>
              {images &&
                images.map((img) => (
                  <div className="flex justify-center w-full h-96 mb-7">
                    <Image
                      className="rounded-lg overflow-hidden"
                      src={img}
                      width={0}
                      height={0}
                      sizes="100vh"
                      style={{ width: 'auto', height: '100%' }}
                      alt="Property image"
                    />
                  </div>
                ))}
            </>
          }
          onClose={() => setIsImagesShowedAll(false)}
        />
      )}

      <div className="flex gap-3 h-96 rounded-xl overflow-hidden relative">
        <div className="h-full w-full relative">
          <Image
            src={images[0] || '/img/home-icon.png'}
            alt="Property image"
            style={{ objectFit: 'cover' }}
            fill
            sizes="700px"
            priority
          />
        </div>
        <div className="h-full w-full grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div className="relative">
              <Image
                src={images[i] || '/img/home-icon.png'}
                alt="Property image"
                style={{ objectFit: 'cover' }}
                fill
                sizes="350px"
              />
            </div>
          ))}
        </div>
        {isImagesShowedAll !== null && (
          <div className="absolute bottom-5 right-5 w-40 text-sm">
            <Button
              label="Show all images"
              outline
              onClick={() => setIsImagesShowedAll(true)}
              small
            />
          </div>
        )}
      </div>
    </>
  )
}

export default ImageGallery
