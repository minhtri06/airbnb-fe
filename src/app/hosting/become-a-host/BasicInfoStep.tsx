'use client'

import ErrorText from '@/components/ErrorText'
import Input from '@/components/inputs/Input'

interface BasicInfoStepProps {
  title: string
  titleOnChange: (value: string) => void
  pageName: string
  pageNameOnChange: (value: string) => void
  error?: string
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  title,
  titleOnChange,
  pageName,
  pageNameOnChange,
  error,
}) => {
  return (
    <>
      <div className="font-bold text-3xl pb-3">Make your place stand out</div>
      <div className="text-xl text-gray-500">
        Start with some basic information
      </div>
      <div className="pt-4  text-xl">
        <div className="pb-2">
          <div className="font-semibold">Your home&apos;s title</div>
        </div>
        <Input
          value={title}
          onChange={(e) => titleOnChange(e.currentTarget.value)}
          size="big"
        />
      </div>
      <div className="pt-4 text-xl ">
        <div className="pb-2">
          <div className="font-semibold">Your page name</div>
          <div className="text-gray-600">
            something unique that identify your page
          </div>
        </div>
        <Input
          value={pageName}
          onChange={(e) => pageNameOnChange(e.currentTarget.value)}
          size="big"
        />
      </div>
      <ErrorText error={error} size="big" />
    </>
  )
}

export default BasicInfoStep
