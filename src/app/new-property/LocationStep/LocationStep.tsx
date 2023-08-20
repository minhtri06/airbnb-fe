'use client'

import Select from 'react-select'
import ErrorText from '@/components/ErrorText'
import Input from '@/components/inputs/Input'

import { useEffect, useRef } from 'react'
import { addressState } from '../NewPropertyPageClient'
import { district, province } from '@/types'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('./Map'), { ssr: false })

interface LocationStepProps {
  error?: string
  provinces: province[]
  districts: district[]
  address: addressState
  setAddress: (
    setter: ((pre: addressState) => addressState) | addressState,
  ) => void
}

const LocationStep: React.FC<LocationStepProps> = ({
  error,
  provinces,
  districts,
  address,
  setAddress,
}) => {
  const errorElement = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (error && error !== '') {
      errorElement.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [error])

  const handleDistrictOnChange = (newDistrict: district) => {
    setAddress((pre) => ({
      ...pre,
      district: newDistrict,
      latitude: newDistrict.latitude,
      longitude: newDistrict.longitude,
    }))
  }

  const handleProvinceOnChange = (newProvince: province) => {
    setAddress((pre) => ({
      ...pre,
      province: newProvince,
      district: null,
      longitude: null,
      latitude: null,
    }))
  }

  const handleAddressOnChange = (newAddress: string) => {
    setAddress((pre) => ({ ...pre, address: newAddress }))
  }

  const selectStyle = {
    classNames: {
      control: () => 'p-1 border-[1px] font-semibold text-lg',
    },
    theme: function (theme: any) {
      theme.colors.primary = '#374151'
      theme.borderRadius = 10
      return theme
    },
  }

  let filteredDistricts =
    address.province !== null
      ? districts.filter((d) => d.province === address.province!._id)
      : districts

  return (
    <div>
      <div className="font-bold text-3xl pb-3">
        Where is your place located?
      </div>
      <div className="text-xl text-gray-500">Help guests find you</div>
      <div className="pt-7">
        <Select
          placeholder="Province"
          isSearchable
          options={provinces.map((p) => ({
            value: p,
            label: p.name,
          }))}
          value={
            address.province !== null
              ? { value: address.province, label: address.province.name }
              : null
          }
          onChange={(option) => handleProvinceOnChange(option!.value)}
          {...selectStyle}
        />
      </div>
      <div className="pt-7">
        <Select
          placeholder="District"
          isSearchable
          options={filteredDistricts.map((d) => ({
            value: d,
            label: d.name,
          }))}
          onChange={(option) => handleDistrictOnChange(option!.value)}
          value={
            address.district
              ? { value: address.district, label: address.district.name }
              : null
          }
          {...selectStyle}
        />
      </div>
      <div className="font-semibold pt-7 h-fit">
        <Input
          value={address.address}
          onChange={(e) => handleAddressOnChange(e.currentTarget.value)}
          label="Address"
          size="big"
        />
      </div>
      {address.longitude !== null && address.latitude !== null && (
        <Map
          position={{ lat: address.latitude, lng: address.longitude }}
          setPosition={(p) =>
            setAddress((pre) => ({ ...pre, latitude: p.lat, longitude: p.lng }))
          }
        />
      )}
      <div className="mt-3" ref={errorElement}>
        <ErrorText error={error} size="big" />
      </div>
    </div>
  )
}

export default LocationStep
