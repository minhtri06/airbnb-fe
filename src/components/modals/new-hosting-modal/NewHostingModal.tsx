'use client'

import useNewHostingModalStore from '@/hooks/contexts/useNewHostingModalStore'
import Modal from '../Modal'
import { useEffect, useState } from 'react'
import CategoryStep from './CategoryStep'
import LocationStep from './LocationStep'
import useDivisions, { district, province } from '@/hooks/useDivisions'
import BasicInfoStep from './BasicInfoStep'
import usePropertyAction from '@/hooks/usePropertyAction'

enum STEPS {
  BASIC_INFO = 1,
  CATEGORY = 2,
  LOCATION = 3,
  IMAGES = 4,
  DESCRIPTION = 5,
  PRICE = 6,
}

const NewHostingModal = () => {
  const modal = useNewHostingModalStore()
  const { getAllDistricts, getAllProvinces } = useDivisions()
  const propertyAction = usePropertyAction()

  const [step, setStep] = useState<number>(1)

  // Step 1
  const [title, setTitle] = useState('')
  const [pageName, setPageName] = useState('')

  // Step 2
  const [selectedCategoryCodes, setSelectedCategoryCodes] = useState<string[]>(
    [],
  )

  // Step 3
  const [provinces, setProvinces] = useState<province[]>([])
  const [districts, setDistricts] = useState<district[]>([])
  const [selectedProvince, setSelectedProvince] = useState<province | null>(
    null,
  )
  const [selectedDistrict, setSelectedDistrict] = useState<district | null>(
    null,
  )
  const [address, setAddress] = useState('')

  const [errors, setErrors] = useState<{
    basicInfo?: string
    category?: string
    location?: string
    images?: string
    description?: string
    price?: string
  }>({})

  // Fetch province and district data
  useEffect(() => {
    Promise.all([getAllProvinces(), getAllDistricts()]).then(
      ([pData, dData]) => {
        setProvinces(pData.provinces)
        setDistricts(dData.districts)
      },
    )
  }, [])

  const handleSelectedDistrictOnChange = (district: district | null) => {
    setSelectedDistrict(district)
  }
  const handleSelectedProvinceOnChange = (province: province | null) => {
    handleSelectedDistrictOnChange(null)
    setSelectedProvince(province)
  }
  const handleAddressOnChange = (value: string) => {
    setAddress(value)
  }

  const clearForm = () => {
    setTitle('')
    setPageName('')
    setSelectedCategoryCodes([])
    setSelectedDistrict(null)
    setSelectedProvince(null)
    setAddress('')
    setStep(1)
    setErrors({})
  }

  const handleNextStep = async () => {
    if (!(await validateForm())) {
      return
    }
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
    if (step === 6) {
      // Submit
    } else {
      handleNextStep()
    }
  }
  const actionLabel = step === 6 ? 'Submit' : 'Next'

  const secondaryAction = step === 1 ? undefined : () => handleBackStep()
  const secondaryActionLabel = step === 1 ? undefined : 'Back'

  let bodyElement
  switch (step) {
    case STEPS.BASIC_INFO:
      bodyElement = (
        <BasicInfoStep
          title={title}
          titleOnChange={(e) => setTitle(e.currentTarget.value)}
          pageName={pageName}
          pageNameOnChange={(e) => setPageName(e.currentTarget.value)}
          error={errors.basicInfo}
          setErrors={setErrors}
        />
      )
      break
    case STEPS.CATEGORY:
      bodyElement = (
        <CategoryStep
          selectedCategoryCodes={selectedCategoryCodes}
          setSelectedCategoryCodes={setSelectedCategoryCodes}
          error={errors.category}
        />
      )
      break
    case STEPS.LOCATION:
      bodyElement = (
        <LocationStep
          error={errors.location}
          provinces={provinces}
          districts={districts}
          selectedProvince={selectedProvince}
          selectedProvinceOnChange={handleSelectedProvinceOnChange}
          selectedDistrict={selectedDistrict}
          selectedDistrictOnChange={handleSelectedDistrictOnChange}
          address={address}
          addressOnChange={handleAddressOnChange}
        />
      )
      break
  }

  const isPageNameExists = async () => {
    const { doesExist } = await propertyAction.checkPageNameExists(pageName)
    return doesExist
  }

  const validateForm = async () => {
    switch (step) {
      case STEPS.BASIC_INFO:
        if (title === '' || pageName === '') {
          setErrors({ basicInfo: 'Title and page name is required' })
          return false
        }
        if (await isPageNameExists()) {
          setErrors({ basicInfo: 'Page name already exists' })
          return false
        }
        break
      case STEPS.CATEGORY:
        if (selectedCategoryCodes.length === 0) {
          setErrors({ category: 'You must select at least one category' })
          return false
        }
        break
      case STEPS.LOCATION:
        if (!selectedDistrict || !selectedProvince || !address) {
          setErrors({
            location: 'You must complete location ',
          })
          return false
        }
        break
    }
    setErrors({})
    return true
  }

  useEffect(() => {
    setErrors({})
  }, [
    title,
    pageName,
    selectedCategoryCodes,
    selectedProvince,
    selectedDistrict,
    address,
  ])

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
