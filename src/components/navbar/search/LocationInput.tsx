import useDivisionStore from '@/hooks/contexts/useDivisionStore'
import { useState } from 'react'

interface LocationInputProps {
  setSelectedInput: (value: any) => void
}

const LocationInput: React.FC<LocationInputProps> = ({ setSelectedInput }) => {
  const { divisions, fetchDivisions } = useDivisionStore()

  if (!divisions) {
    fetchDivisions()
  }
  console.log(divisions)
  return (
    <div className="py-8 w-1/2 bg-white rounded-3xl flex flex-col">
      <div className="h-14 px-8 flex items-center hover:bg-gray-100">
        Ho Chi Minh
      </div>
      <div className="h-14 px-8 flex items-center hover:bg-gray-100">
        Ho Chi Minh
      </div>
      <div className="h-14 px-8 flex items-center hover:bg-gray-200">
        Ho Chi Minh
      </div>
      <div className="h-14 px-8 flex items-center hover:bg-gray-200">
        Ho Chi Minh
      </div>
    </div>
  )
}

export default LocationInput
