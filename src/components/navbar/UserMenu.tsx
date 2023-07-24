'use client'

import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'

import Avatar from '../Avatar'
import MenuItem from './MenuItem'

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen((pre) => !pre)
  }

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="
            hidden
            md:block
            text-base
            font-semibold
            px-4 py-2
            hover:bg-neutral-100
            transition
            cursor-pointer
            rounded-full
            h-10
          "
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="
            p-1
            border-[1px]
            border-neutral-200
            flex
            flex-row
            items-center
            gap-3
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
            h-10"
        >
          <div className="h-8 w-8 flex items-center justify-center">
            <AiOutlineMenu />
          </div>
          <Avatar size="8" />
        </div>
      </div>
      {isOpen && (
        <div
          className="absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-base"
        >
          <div className="flex flex-col cursor-pointer">
            <MenuItem onClick={() => {}} label="Logout" />
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
