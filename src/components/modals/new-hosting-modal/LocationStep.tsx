'use client'

import ErrorText from '@/components/ErrorText'
import Heading from '@/components/Heading'
import Select from 'react-select'
import { district, province } from '@/hooks/useDivisions'
import Input from '@/components/inputs/Input'

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
      control: () => 'p-1 border-[1px] font-semibold text-base',
    },
    theme: function (theme: any) {
      theme.colors.primary = '#374151'
      theme.borderRadius = 6
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
      <Heading
        title="Where is your place located?"
        subtitle="Help guest find you"
      />

      <div className="py-5">
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
      <div className="h-16">
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
      <div className="font-semibold">
        <Input
          value={address}
          onChange={(e) => addressOnChange(e.currentTarget.value)}
          label="Address"
        />
      </div>
      <ErrorText error={error} />
    </div>
  )
}

export default LocationStep
