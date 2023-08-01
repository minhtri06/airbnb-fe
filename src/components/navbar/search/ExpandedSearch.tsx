'use client'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import DateInput from './DateInput'
import LocationInput from './LocationInput'
import GuestInput from './GuestInput'
import useSearchStore from '@/hooks/contexts/useSearchStore'
import useProperties from '@/hooks/useProperties'
import axios from 'axios'

interface ExpandedSearchProps {
  isExpanded: boolean
  setIsExpanded: (value: boolean) => void
}

const ExpandedSearch: React.FC<ExpandedSearchProps> = ({
  isExpanded,
  setIsExpanded,
}) => {
  const [selectedInput, setSelectedInput] = useState<
    'location' | 'book-in' | 'book-out' | 'who'
  >('location')
  const [locationSearch, setLocationSearch] = useState('')
  const { params, setParams, setProperties } = useSearchStore()
  const { searchProperties } = useProperties()

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
          selectedInput={selectedInput}
          setSelectedInput={setSelectedInput}
        />
      )
      break
    case 'who':
      input = <GuestInput />
      break
  }

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
                    {!params.bookIn
                      ? 'Add dates'
                      : `${params.bookIn.toLocaleDateString()}`}
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
                    {!params.bookOut
                      ? 'Add dates'
                      : `${params.bookOut.toLocaleDateString()}`}
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
                    setParams({ categoryCode: null })
                    searchProperties()
                      .then(() => {
                        setIsExpanded(false)
                      })
                      .catch((error) => {
                        if (axios.isAxiosError(error)) {
                          console.log(error.response?.data)
                        } else {
                          console.log(error)
                        }
                      })
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
