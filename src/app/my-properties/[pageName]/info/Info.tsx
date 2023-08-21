'use client'

import ErrorText from '@/components/ErrorText'
import useAuthAxios from '@/hooks/useAuthAxios'
import { property } from '@/types'
import axios from 'axios'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ThumbnailSection from './ThumbnailSection'
import ImagesSection from './ImagesSection'
import CategoriesSection from './CategoriesSection'

interface PropertyInfoProps {
  property: null | property
  setProperty: React.Dispatch<React.SetStateAction<property | null>>
  isLoading: boolean
}

const PropertyInfo: React.FC<PropertyInfoProps> = ({
  property,
  setProperty,
  isLoading,
}) => {
  const router = useRouter()
  const authAxios = useAuthAxios()
  const pathname = usePathname()

  const [title, setTitle] = useState('')
  const [pageName, setPageName] = useState('')
  const [description, setDescription] = useState('')
  const [categoryCodes, setCategoryCodes] = useState<string[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (property) {
      setTitle(property.title)
      setPageName(property.pageName)
      setDescription(property.description)
      setCategoryCodes(property.categoryCodes)
    }
  }, [property])

  const handleFetchError = (error: any) => {
    if (axios.isAxiosError(error) && error.status !== 500)
      setError(error.response?.data.message)
    else router.push('/500')
  }

  const handleSaveTitle = () => {
    if (!property) return
    authAxios
      .patch(`/properties/${property._id}`, { title })
      .then(() => {
        property.title = title
        setProperty({ ...property })

        setError('')
      })
      .catch(handleFetchError)
  }

  const handleSavePageName = () => {
    if (!property) return
    authAxios
      .patch(`/properties/${property._id}`, { pageName })
      .then(() => {
        if (!pathname) return
        const pathnameParts = pathname?.split('/')
        pathnameParts[2] = pageName
        router.replace(pathnameParts.join('/') + '?tab=info')

        property.pageName = pageName
        setProperty({ ...property })

        setError('')
      })
      .catch(handleFetchError)
  }

  const handleSaveDescription = () => {
    if (!property) return
    authAxios
      .patch(`/properties/${property._id}`, { description })
      .then(() => {
        property.description = description
        setProperty({ ...property })
        setError('')
      })
      .catch(handleFetchError)
  }

  const isCategoryChanged = () => {
    return (
      categoryCodes.length !== property?.categoryCodes.length ||
      categoryCodes.some((cCodes) => !property.categoryCodes.includes(cCodes))
    )
  }

  const handleSaveCategory = () => {
    if (!property) return
    authAxios
      .patch(`/properties/${property._id}`, { categoryCodes })
      .then(() => {
        property.categoryCodes = categoryCodes
        setProperty({ ...property })
        setError('')
      })
      .catch(handleFetchError)
  }

  return (
    <div className="flex justify-center">
      <div className="w-[700px]">
        <div className="pt-14 pb-7">
          <span className="text-4xl text-gray-900 font-bold ">
            Property info
          </span>
        </div>
        <ErrorText error={error} size="big" />
        {isLoading && <div>Loading...</div>}
        {property && (
          <div className="text-lg pb-10">
            <div className="py-5">
              <div className="flex justify-between ">
                <div className="flex justify-between font-bold">Title</div>
                {title !== property.title && (
                  <div
                    className="font-bold underline cursor-pointer"
                    onClick={() => handleSaveTitle()}
                  >
                    Save
                  </div>
                )}
              </div>
              <input
                className="text-gray-900 bg-white outline-none py-1 border-[1px] 
                  px-2 rounded-md w-full mt-1"
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
            </div>

            <div className="py-5">
              <div className="flex justify-between ">
                <div className="font-bold flex justify-between">Page name</div>
                {pageName !== property.pageName && (
                  <div
                    className="font-bold underline cursor-pointer"
                    onClick={handleSavePageName}
                  >
                    Save
                  </div>
                )}
              </div>
              <input
                className="text-gray-900 bg-white outline-none py-1 border-[1px] 
                px-2 rounded-md w-full mt-1"
                value={pageName}
                onChange={(e) => {
                  setPageName(e.currentTarget.value.replaceAll(' ', '-'))
                }}
              />
            </div>

            <div className="py-5">
              <div className="flex justify-between ">
                <div className="font-bold flex justify-between">
                  Description
                </div>
                {description !== property.description && (
                  <div
                    className="font-bold underline cursor-pointer"
                    onClick={handleSaveDescription}
                  >
                    Save
                  </div>
                )}
              </div>
              <textarea
                className="text-gray-900 bg-white outline-none py-1 border-[1px] 
                  rounded-md px-2 w-full mt-1"
                rows={7}
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
            </div>

            <div className="py-5">
              <ThumbnailSection property={property} setProperty={setProperty} />
            </div>

            <div className="py-5">
              <ImagesSection property={property} setProperty={setProperty} />
            </div>

            <div className="py-5">
              <CategoriesSection
                isCategoryChanged={isCategoryChanged}
                handleSaveCategory={handleSaveCategory}
                categoryCodes={categoryCodes}
                setCategoryCodes={setCategoryCodes}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PropertyInfo
