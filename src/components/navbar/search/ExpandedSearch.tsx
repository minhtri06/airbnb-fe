'use client'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { useEffect, useState } from 'react'
import { BiSearch } from '@react-icons/all-files/bi/BiSearch'
import DateInput from './DateInput'
import LocationInput from './LocationInput'
import GuestInput from './GuestInput'
import { usePathname, useRouter } from 'next/navigation'
import { division } from '@/hooks/useDivisionAction'

interface ExpandedSearchProps {
  isExpanded: boolean
  setIsExpanded: (value: boolean) => void
}

const ExpandedSearch: React.FC<ExpandedSearchProps> = ({
  isExpanded,
  setIsExpanded,
}) => {
  const [divisions, setDivisions] = useState<division[]>([])

  // Search filters
  const [provinceId, setProvinceId] = useState<string | null>(null)
  const [districtId, setDistrictId] = useState<string | null>(null)
  const [bookIn, setBookIn] = useState<Date | null>(null)
  const [bookOut, setBookOut] = useState<Date | null>(null)

  const router = useRouter()
  const pathname = usePathname()

  // Selected inputs
  const [selectedInput, setSelectedInput] = useState<
    'location' | 'book-in' | 'book-out' | 'who'
  >('location')
  const [locationSearch, setLocationSearch] = useState('')

  const selectedInputStyle =
    'bg-white rounded-full text-sm pl-8 flex flex-col justify-center \
      shadow-[0px_4px_15px_6px_rgba(0,0,0,0.1)]'

  const notSelectedInputStyle =
    'hover:bg-neutral-300 rounded-full text-sm pl-8 flex flex-col justify-center'

  let input
  switch (selectedInput) {
    case 'location':
      input = (
        <LocationInput
          divisions={divisions}
          setDivisions={setDivisions}
          setDistrictId={setDistrictId}
          setProvinceId={setProvinceId}
          setSelectedInput={setSelectedInput}
          locationSearch={locationSearch}
          setLocationSearch={setLocationSearch}
        />
      )
      break
    case 'book-in':
    case 'book-out':
      input = (
        <DateInput
          bookIn={bookIn}
          setBookIn={setBookIn}
          bookOut={bookOut}
          setBookOut={setBookOut}
          selectedInput={selectedInput}
          setSelectedInput={setSelectedInput}
        />
      )
      break
    case 'who':
      input = <GuestInput />
      break
  }

  const clearSearch = () => {
    setProvinceId(null)
    setDistrictId(null)
    setBookIn(null)
    setBookOut(null)
    setSelectedInput('location')
    setLocationSearch('')
  }

  const handleSearchBtnOnClick = () => {
    const options: any = {}
    if (bookIn && bookOut) {
      options.bookIn = bookIn.toISOString()
      options.bookOut = bookOut.toISOString()
    }
    if (districtId) {
      options.districtId = districtId
    }
    if (provinceId) {
      options.provinceId = provinceId
    }
    const params = new URLSearchParams(options)
    setIsExpanded(false)
    clearSearch()
    router.push(`/search?${params.toString()}`)
  }

  useEffect(() => {
    clearSearch()
  }, [pathname])

  return (
    <>
      {isExpanded && (
        <div
          onClick={() => setIsExpanded(false)}
          className="fixed inset-0 z-10 bg-neutral-800/30"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="h-40 bg-white w-screen z-0"
          >
            <div
              className="h-20 w-full flex items-center justify-center gap-5
                text-lg text-gray-500"
            >
              <div
                className="cursor-pointer text-gray-900
                  font-medium underline"
              >
                Stay
              </div>
              <div className="cursor-pointer hover:text-gray-900 hover:font-medium">
                Experiences
              </div>
              <div className="cursor-pointer hover:text-gray-900 hover:font-medium">
                Online Experiences
              </div>
            </div>
            <div className="h-20 flex justify-center">
              <div
                className="h-16 w-2/3 rounded-full bg-neutral-200 flex flex-row
              relative min-w-[700px]"
              >
                <div
                  className={`w-4/12 xl:w-80 lg:w-80 ${
                    selectedInput === 'location'
                      ? selectedInputStyle
                      : notSelectedInputStyle
                  }`}
                  onClick={() => setSelectedInput('location')}
                >
                  <span className="font-bold">Where</span>
                  <input
                    className="text-gray-700 w-5/6 bg-inherit outline-none"
                    placeholder="Search destination"
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    autoFocus
                  />
                </div>
                <div
                  className={`w-32 ${
                    selectedInput === 'book-in'
                      ? selectedInputStyle
                      : notSelectedInputStyle
                  }`}
                  onClick={() => setSelectedInput('book-in')}
                >
                  <span className="font-bold">Book in</span>
                  <span className="text-gray-700">
                    {!bookIn ? 'Add dates' : `${bookIn.toLocaleDateString()}`}
                  </span>
                </div>
                <div
                  className={`w-32 ${
                    selectedInput === 'book-out'
                      ? selectedInputStyle
                      : notSelectedInputStyle
                  }`}
                  onClick={() => setSelectedInput('book-out')}
                >
                  <span className="font-bold">Book out</span>
                  <span className="text-gray-700">
                    {!bookOut ? 'Add dates' : `${bookOut.toLocaleDateString()}`}
                  </span>
                </div>
                <div
                  className={`flex-1 ${
                    selectedInput === 'who'
                      ? selectedInputStyle
                      : notSelectedInputStyle
                  }`}
                  onClick={() => setSelectedInput('who')}
                >
                  <div className="flex flex-col justify-center">
                    <span className="font-bold">Who</span>
                    <span className="text-gray-700">Add guests</span>
                  </div>
                </div>
                <div
                  className="h-12 px-3 bg-gradient-to-r from-rose-500 to-pink-700 
                    rounded-full flex items-center justify-center text-base text-white
                    font-bold cursor-pointer absolute right-2 top-2 select-none"
                  onClick={() => {
                    handleSearchBtnOnClick()
                  }}
                >
                  <BiSearch size={20} />
                  <span className="ml-1">Search</span>
                </div>
                {input}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ExpandedSearch
