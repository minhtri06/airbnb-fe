'use client'

import Select from 'react-select'
import ErrorText from '@/components/ErrorText'
import Input from '@/components/inputs/Input'
import { district, province } from '@/hooks/useDivisionAction'

interface LocationStepProps {
  error?: string
  provinces: province[]
  districts: district[]
  selectedProvince: province | null
  selectedProvinceOnChange: (value: province | null) => void
  selectedDistrict: district | null
  selectedDistrictOnChange: (value: district | null) => void
  address: string
  addressOnChange: (value: string) => void
}

const LocationStep: React.FC<LocationStepProps> = ({
  error,
  provinces,
  districts,
  selectedProvince,
  selectedProvinceOnChange,
  selectedDistrict,
  selectedDistrictOnChange,
  address,
  addressOnChange,
}) => {
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

  const provinceOptions = provinces.map((p) => ({
    value: p,
    label: p.name,
  }))

  const districtsOptions = selectedProvince
    ? districts
        .filter((d) => d.province === selectedProvince._id)
        .map((d) => ({
          value: d,
          label: d.name,
        }))
    : districts.map((d) => ({
        value: d,
        label: d.name,
      }))

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
          options={provinceOptions}
          value={
            selectedProvince
              ? { value: selectedProvince, label: selectedProvince.name }
              : null
          }
          onChange={(option) => selectedProvinceOnChange(option?.value || null)}
          {...selectStyle}
        />
      </div>
      <div className="pt-7">
        <Select
          placeholder="District"
          isSearchable
          options={districtsOptions}
          onChange={(option) => selectedDistrictOnChange(option?.value || null)}
          value={
            selectedDistrict
              ? { value: selectedDistrict, label: selectedDistrict.name }
              : null
          }
          {...selectStyle}
        />
      </div>
      <div className="font-semibold py-7">
        <Input
          value={address}
          onChange={(e) => addressOnChange(e.currentTarget.value)}
          label="Address"
          size="big"
        />
      </div>
      <ErrorText error={error} size="big" />
    </div>
  )
}

export default LocationStep
