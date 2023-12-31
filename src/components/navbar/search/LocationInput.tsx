import { IoLocationOutline } from '@react-icons/all-files/io5/IoLocationOutline'
import { useEffect, useState } from 'react'
import { division } from '@/types'
import { DIVISIONS } from '@/constants/divisions'

interface LocationInputProps {
  divisions: division[]
  setDivisions: (value: division[]) => void
  setDistrictId: (value: string | null) => void
  setProvinceId: (value: string | null) => void
  setSelectedInput: (value: any) => void
  locationSearch: string
  setLocationSearch: (value: string) => void
}

const LocationInput: React.FC<LocationInputProps> = ({
  divisions,
  setDivisions,
  setDistrictId,
  setProvinceId,
  setSelectedInput,
  locationSearch,
  setLocationSearch,
}) => {
  const [searchResult, setSearchResult] = useState<division[]>([])

  useEffect(() => {
    if (divisions.length === 0) {
      setDivisions(DIVISIONS)
    }
  }, [divisions.length, setDivisions])

  const handleLocationOnClick = (location: division) => {
    if (location.type === 'district') {
      setDistrictId(location._id)
      setProvinceId(null)
    } else {
      setDistrictId(null)
      setProvinceId(location._id)
    }
  }

  useEffect(() => {
    if (divisions && locationSearch.length !== 0) {
      setSearchResult(
        divisions.filter((d) =>
          d.name.toLowerCase().includes(locationSearch.toLowerCase()),
        ),
      )
    } else setSearchResult([])
  }, [locationSearch, divisions])

  return (
    <>
      {searchResult.length !== 0 && (
        <div
          className="absolute top-20 py-8 w-1/2 bg-white rounded-3xl flex flex-col
            shadow-[0px_0px_10px_5px_rgba(0,0,0,0.1)]"
        >
          {searchResult?.slice(0, 4)?.map((result, i) => (
            <div
              key={i}
              className="h-16 px-8 flex items-center gap-3 hover:bg-gray-100 
                cursor-pointer"
              onClick={() => {
                handleLocationOnClick(result)
                setSelectedInput('book-in')
                setLocationSearch(result.name)
              }}
            >
              <div className="p-3 bg-gray-200 rounded-xl">
                <IoLocationOutline size={22} />
              </div>
              <span className="text-base font-semibold">{result.name}</span>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default LocationInput
