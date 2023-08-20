'use client'

interface DescriptionStepProps {
  description: string
  descriptionOnChange: (v: string) => void
}

const DescriptionStep: React.FC<DescriptionStepProps> = ({
  description,
  descriptionOnChange,
}) => {
  return (
    <div>
      <div className="font-bold text-3xl pb-3">Create your description</div>
      <div className="text-xl text-gray-500 pb-3">
        Share what makes your place special.
      </div>
      <textarea
        value={description}
        onChange={(e) => descriptionOnChange(e.currentTarget.value)}
        className="w-full h-80 p-5 rounded-lg text-lg border-gray-700 outline-0
          border-[2px]"
      />
    </div>
  )
}

export default DescriptionStep
