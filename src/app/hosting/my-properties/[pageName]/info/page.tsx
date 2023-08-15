'use client'

import Container from '@/components/Container'
import ErrorText from '@/components/ErrorText'
import { CATEGORIES } from '@/constants/categories'
import useAuthAxios from '@/hooks/useAuthAxios'
import { property } from '@/types'
import apiAxios from '@/utils/apiAxios'
import pickFields from '@/utils/pickFields'
import axios from 'axios'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const PropertyInfoPage = ({ params }: { params: { pageName: string } }) => {
  const router = useRouter()
  const authAxios = useAuthAxios()
  const pathname = usePathname()

  const [property, setProperty] = useState<property | null>(null)
  const [error, setError] = useState('')

  const handleSave = () => {
    if (!property) return

    property.pageName = property.pageName.replaceAll(' ', '-')
    authAxios
      .patch(
        `/properties/${property?._id}`,
        pickFields(
          property,
          'title',
          'isClosed',
          'pageName',
          'description',
          'categoryCodes',
        ),
      )
      .then(() => {
        if (!pathname) return
        const pathnameParts = pathname?.split('/')
        pathnameParts[3] = property.pageName
        router.replace(pathnameParts.join('/'))
        setError('')
      })
      .catch((error) => {
        if (axios.isAxiosError(error) && error.status !== 500)
          setError(error.response?.data.message)
        else router.push('/500')
      })
  }

  useEffect(() => {
    apiAxios
      .get(`/properties/page-name:${params.pageName}`)
      .then((res) => res.data.property)
      .then((property) => setProperty(property))
      .catch((error) => {
        if (axios.isAxiosError(error) && error.status === 404)
          router.push('/404')
      })
  }, [params.pageName, router])

  return (
    <div className="flex justify-center">
      <div className="w-[700px]">
        <div className="pt-14 pb-7 flex justify-between items-end">
          <span className="text-4xl text-gray-700 font-bold ">
            Property info
          </span>
          <span
            className="text-lg font-bold underline cursor-pointer"
            onClick={() => handleSave()}
          >
            Save
          </span>
        </div>
        <ErrorText error={error} size="big" />
        {property && (
          <div className="text-lg">
            <div className="py-5">
              <div className="font-semibold flex justify-between">Title</div>
              <input
                className="text-gray-700 bg-white outline-none py-1 border-b-[1px] w-full"
                value={property.title}
                onChange={(e) => {
                  property.title = e.currentTarget.value
                  setProperty({ ...property })
                }}
              />
            </div>
            <div className="py-5">
              <div className="font-semibold flex justify-between">
                Page name
              </div>
              <input
                className="text-gray-700 bg-white outline-none py-1 border-b-[1px] w-full"
                value={property.pageName}
                onChange={(e) => {
                  property.pageName = e.currentTarget.value.replaceAll(' ', '-')
                  setProperty({ ...property })
                }}
              />
            </div>
            <div className="py-5">
              <div className="font-semibold flex justify-between">
                Description
              </div>
              <textarea
                className="text-gray-700 bg-white outline-none py-1 border-b-[1px] rounded-md 
                  w-full"
                rows={7}
                value={property.description}
                onChange={(e) => {
                  property.description = e.currentTarget.value
                  setProperty({ ...property })
                }}
              />
            </div>
            <div className="py-5">
              <div className="font-semibold flex justify-between">
                Categories
              </div>
              <div className="grid grid-cols-3 mt-4 py-1 gap-3 h-[375px] overflow-y-auto">
                {CATEGORIES.map((c) => {
                  const isSelected = property.categoryCodes.includes(c.code)
                  return (
                    <div
                      key={c.code}
                      className={`flex flex-col items-center justify-center h-28 w-full 
                        rounded-xl cursor-pointer select-none gap-3 border-[1px] 
                        hover:border-[2px] hover:border-gray-700 ${
                          isSelected
                            ? 'bg-gray-200 border-gray-700 border-[2px]'
                            : 'border-gray-200'
                        }`}
                      onClick={() => {
                        if (isSelected) {
                          property.categoryCodes =
                            property.categoryCodes.filter(
                              (cCode) => cCode !== c.code,
                            )
                        } else property.categoryCodes.push(c.code)
                        setProperty({ ...property })
                      }}
                    >
                      <Image
                        src={c.imageSrc}
                        height={30}
                        width={30}
                        alt="Icon image"
                      />
                      <span className="text-lg">{c.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PropertyInfoPage
