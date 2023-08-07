import { property } from '@/types'
import { useEffect, useState } from 'react'
import SupportShowMore from './SupportShowMore'

interface DescriptionProps {
  property: property
}

const Description: React.FC<DescriptionProps> = ({ property }) => {
  const [isDescriptionShowedAll, setIsDescriptionShowedAll] = useState<
    boolean | null
  >(null)

  useEffect(() => {
    setIsDescriptionShowedAll(
      property.description.split('\n\n').length > 3 ? false : null,
    )
  }, [property])

  const descriptionElements = property.description
    .split('\n\n')
    .map((d) => <p className="text-base">{d}</p>)

  return (
    <>
      {isDescriptionShowedAll && (
        <SupportShowMore
          body={
            <>
              <div className="text-2xl font-bold pb-8">About this place</div>
              <div className="flex flex-col gap-5">{descriptionElements}</div>
            </>
          }
          onClose={() => setIsDescriptionShowedAll(false)}
        />
      )}

      <div className="flex flex-col gap-3">
        {descriptionElements.slice(0, 3)}
      </div>

      {isDescriptionShowedAll !== null && (
        <div className="mt-5">
          <span
            className="font-bold underline cursor-pointer select-none"
            onClick={() => setIsDescriptionShowedAll(true)}
          >
            Show all
          </span>
        </div>
      )}
    </>
  )
}

export default Description
