'use client'

import { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import ExpandedSearch from './ExpandedSearch'

const Search = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      <div
        onClick={() => setIsExpanded(true)}
        className="border-[1px] w-full md:w-auto rounded-full shadow-sm 
          hover:shadow-md transition cursor-pointer h-12"
      >
        <div className=" flex flex-row  items-center  justify-between h-full">
          <div className="text-sm font-bold px-6">Anywhere</div>
          <div className="text-sm font-bold px-6 border-x-[1px] flex-1 text-center">
            Any Week
          </div>
          <div
            className=" text-sm pl-6 pr-2 text-gray-600 font-bold flex flex-row 
            items-center gap-3"
          >
            <div className="font-normal">Add guest</div>
            <div
              className="
              p-2
              bg-rose-600
              rounded-full
              text-white
              font-bold"
            >
              <BiSearch size={18} />
            </div>
          </div>
        </div>
      </div>

      <ExpandedSearch isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
    </>
  )
}

export default Search
