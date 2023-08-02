'use client'

import useNewHostingModalStore from '@/hooks/contexts/useNewHostingModalStore'
import Modal from '../Modal'
import { useState } from 'react'
import Step1 from './Step1'
import ErrorText from '@/components/ErrorText'

const NewHostingModal = () => {
  const modal = useNewHostingModalStore()
  const [step, setStep] = useState(1)

  const [selectedCategoryCodes, setSelectedCategoryCodes] = useState<string[]>(
    [],
  )

  const [errors, setErrors] = useState<{
    step1?: string
    step2?: string
    step3?: string
    step4?: string
    step5?: string
    step6?: string
  }>({})

  const validateForm = (step: number) => {
    if (step === 1) {
      if (selectedCategoryCodes.length === 0) {
        setErrors({ step1: 'You must select at least one category' })
        return false
      }
    }
    return true
  }

  const clearForm = () => {
    setSelectedCategoryCodes([])
    setErrors({})
  }

  const handleNextStep = () => {
    if (step !== 6) {
      setStep((pre) => pre + 1)
    }
  }

  const handleBackStep = () => {
    if (step !== 1) {
      setStep((pre) => pre - 1)
    }
  }

  const handleOnClose = () => {
    clearForm()
    modal.close()
  }

  const action = () => {
    if (!validateForm(step)) {
      return
    }
    if (step === 6) {
    } else {
      handleNextStep()
    }
  }
  const actionLabel = step === 6 ? 'Submit' : 'Next'

  const secondaryAction = step === 1 ? undefined : () => handleBackStep()
  const secondaryActionLabel = step === 1 ? undefined : 'Back'

  let bodyElement
  switch (step) {
    case 1:
      bodyElement = (
        <>
          <Step1
            selectedCategoryCodes={selectedCategoryCodes}
            setSelectedCategoryCodes={setSelectedCategoryCodes}
          />
          <ErrorText error={errors.step1} />
        </>
      )
      break
  }

  return (
    <Modal
      title="Airbnb your home"
      isOpen={modal.isOpen}
      onClose={handleOnClose}
      action={action}
      actionLabel={actionLabel}
      secondaryAction={secondaryAction}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyElement}
    />
  )
}

export default NewHostingModal
