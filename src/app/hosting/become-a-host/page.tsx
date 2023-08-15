'use client'

import useAuthStore from '@/stores/useAuthStore'
import useNotificationModalStore from '@/stores/useNotificationModalStore'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import BasicInfoStep from './BasicInfoStep'
import Button from '@/components/buttons/Button'
import CategoryStep from './CategoryStep'
import AccommodationStep from './AccommodationStep'
import DescriptionStep from './DescriptionStep'
import { accommodation, district, newProperty, province } from '@/types'
import apiAxios from '@/utils/apiAxios'
import dynamic from 'next/dynamic'
import LocationStep from './LocationStep/LocationStep'
import useAuthAxios from '@/hooks/useAuthAxios'

enum STEPS {
  BASIC_INFO = 1,
  CATEGORY = 2,
  LOCATION = 3,
  DESCRIPTION = 4,
  ACCOMMODATIONS = 5,
}

export type addressState = {
  province: province | null
  district: district | null
  address: string
  latitude: number | null
  longitude: number | null
}

const BecomeAHostPage = () => {
  const authStore = useAuthStore()
  const authAxios = useAuthAxios()
  const router = useRouter()
  const notificationModal = useNotificationModalStore()

  if (authStore.isLogin === false) {
    router.push('/hosting')
  }

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
  const [address, setAddress] = useState<addressState>({
    province: null,
    district: null,
    address: '',
    latitude: null,
    longitude: null,
  })

  // Step 4
  const [description, setDescription] = useState(
    "You'll always remember your time at this unique place to stay.",
  )

  // Step 5
  const accommodationDefaultValue = {
    title: '',
    pricePerNight: '',
    maximumOfGuests: 2,
    type: null,
    bed: {
      double: 0,
      sofaBed: 0,
      single: 0,
      queen: 0,
    },
  }
  const [accommodations, setAccommodations] = useState<accommodation[]>([
    accommodationDefaultValue,
  ])

  const [errors, setErrors] = useState<{
    basicInfo?: string
    category?: string
    location?: string
    images?: string
    description?: string
    accommodation?: string
  }>({})

  const createProperty = async (property: newProperty) => {
    const res = await authAxios.post('/properties', property)
    return res
  }

  const handleSubmit = () => {
    createProperty({
      title,
      isClosed: false,
      pageName,
      categoryCodes: selectedCategoryCodes,
      facilityCodes: ['Non-smoking rooms', 'Airport shuttle', 'Family rooms'],
      address: {
        province: address.province?._id as string,
        district: address.district?._id as string,
        address: address.address,
        latitude: address.latitude as number,
        longitude: address.longitude as number,
      },
      description,
      accommodations: accommodations.map((a) => ({
        ...a,
        pricePerNight: Number(a.pricePerNight),
      })),
    }).then(() => {
      notificationModal.open({
        title: 'Congratulation 🎉',
        body: (
          <div className="text-base flex justify-center">
            You have successfully created a new hosting, let&apos;s check it
            out!!
          </div>
        ),
        callWhenClose: () => {
          router.push('/hosting')
        },
      })
    })
  }

  const handleNextStep = async () => {
    if (!(await validateForm())) {
      return
    }
    if (step === 5) {
      handleSubmit()
    } else {
      setStep((pre) => pre + 1)
    }
  }

  const handleBackStep = () => {
    if (step !== 1) {
      setStep((pre) => pre - 1)
    }
  }

  // Setup body element
  let bodyElement
  switch (step) {
    case STEPS.BASIC_INFO:
      bodyElement = (
        <BasicInfoStep
          title={title}
          titleOnChange={(v) => setTitle(v)}
          pageName={pageName}
          pageNameOnChange={(v) => setPageName(v.replaceAll(' ', '-'))}
          error={errors.basicInfo}
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
          address={address}
          setAddress={setAddress}
        />
      )
      break

    case STEPS.DESCRIPTION:
      bodyElement = (
        <DescriptionStep
          description={description}
          descriptionOnChange={(v) => setDescription(v)}
        />
      )
      break

    case STEPS.ACCOMMODATIONS:
      const handleAccommodationOnChange = (
        value: accommodation,
        index: number,
      ) => {
        setAccommodations((pre) => {
          if (value.type === 'specific-room') {
            value.numberOfRooms = undefined
          }
          if (value.type === 'entire-house' && !value.numberOfRooms) {
            value.numberOfRooms = 1
          }
          pre[index] = value
          return [...pre]
        })
      }

      const handleAccommodationOnAdd = () => {
        setAccommodations((pre) => [...pre, accommodationDefaultValue])
      }

      const handleAccommodationOnRemove = (i: number) => {
        if (accommodations.length === 1) {
          return
        }
        setAccommodations((pre) => {
          pre.splice(i, 1)
          return [...pre]
        })
      }

      bodyElement = (
        <AccommodationStep
          accommodations={accommodations}
          accommodationOnChange={handleAccommodationOnChange}
          accommodationOnAdd={handleAccommodationOnAdd}
          accommodationOnRemove={handleAccommodationOnRemove}
          error={errors.accommodation}
        />
      )
      break
  }

  // Validate funcs
  const validatePageNameExists = useCallback(async () => {
    const checkPageNameExists = async (
      pageName: string,
    ): Promise<{ doesExist: boolean }> => {
      const res = await apiAxios.post('/properties/check-page-name-exits', {
        pageName,
      })
      return res.data
    }

    const { doesExist } = await checkPageNameExists(pageName)
    if (doesExist) {
      setErrors({ basicInfo: 'Page name already exists' })
      return false
    }
    return true
  }, [pageName])

  const validateForm = async () => {
    switch (step) {
      case STEPS.BASIC_INFO:
        if (title === '' || pageName === '') {
          setErrors({ basicInfo: 'Title and page name is required' })
          return false
        }
        if (!(await validatePageNameExists())) {
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
        if (!address.district || !address.province || address.address === '') {
          setErrors({ location: 'You must complete your location' })
          return false
        }
        break

      case STEPS.DESCRIPTION:
        break

      case STEPS.ACCOMMODATIONS:
        for (let i in accommodations) {
          const a = accommodations[i]
          if (a.title === '') {
            setErrors({
              accommodation: `Missing title at accommodation #${i + 1}`,
            })
            return false
          }
          if (!a.type) {
            setErrors({
              accommodation: `You must specify type at accommodation #${i + 1}`,
            })
            return false
          }
          if (isNaN(a.pricePerNight as number) || Number(a.pricePerNight) < 0) {
            setErrors({ accommodation: `Invalid price at accommodation #${i}` })
            return false
          }
        }
        break
    }

    setErrors({})
    return true
  }

  // Fetch province and district data
  useEffect(() => {
    const getAllProvinces = async () => {
      const res = await apiAxios.get('/divisions/p')
      return res.data
    }
    const getAllDistricts = async () => {
      const res = await apiAxios.get('/divisions/d')
      return res.data
    }

    Promise.all([getAllProvinces(), getAllDistricts()]).then(
      ([pData, dData]) => {
        setProvinces(pData.provinces)
        setDistricts(dData.districts)
      },
    )
  }, [])

  // Clear error on change
  useEffect(() => {
    setErrors({})
  }, [title, pageName, selectedCategoryCodes, address, address, accommodations])

  // Check page name exists after user stop typing
  useEffect(() => {
    const validateDelay = setTimeout(() => {
      if (pageName !== '') {
        validatePageNameExists()
      }
    }, 500)

    return () => clearTimeout(validateDelay)
  }, [pageName, validatePageNameExists])

  return (
    <div>
      <div className="pt-10 pb-28 flex justify-center">
        <div className="w-[650px]">{bodyElement}</div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-20 border-t-[1px] z-10 bg-white">
        <div className="h-full px-20 flex justify-between items-center ">
          <div className="w-32">
            {step !== 1 && (
              <Button
                outline
                big
                label="Back"
                onClick={() => handleBackStep()}
              />
            )}
          </div>
          <div className="w-32">
            <Button
              label={step === 5 ? 'Submit' : 'Next'}
              big
              onClick={() => handleNextStep()}
              black
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BecomeAHostPage
