import ErrorText from '@/components/ErrorText'
import Heading from '@/components/Heading'
import Input from '@/components/inputs/Input'
import { useEffect } from 'react'

interface BasicInfoStepProps {
  title: string
  titleOnChange: (e: React.FormEvent<HTMLInputElement>) => void
  pageName: string
  pageNameOnChange: (e: React.FormEvent<HTMLInputElement>) => void
  error?: string
  setErrors: (value: { basicInfo?: string }) => void
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  title,
  titleOnChange,
  pageName,
  pageNameOnChange,
  error,
  setErrors,
}) => {
  return (
    <div>
      <Heading
        title="Make your place stand out"
        subtitle="Start with some basic information"
      />
      <div className="pt-3">
        <div className="pb-2">
          <div className="font-semibold">Your home's title</div>
        </div>
        <Input value={title} onChange={titleOnChange} />
      </div>
      <div className="pt-3">
        <div className="pb-2">
          <label className="font-semibold">Your page name</label>
          <div className="text-gray-600">
            something unique that identify your page
          </div>
        </div>
        <Input value={pageName} onChange={pageNameOnChange} />
      </div>
      <ErrorText error={error} />
    </div>
  )
}

export default BasicInfoStep
