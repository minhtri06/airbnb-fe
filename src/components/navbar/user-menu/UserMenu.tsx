'use client'

import { AiOutlineMenu } from 'react-icons/ai'
import { useEffect, useRef, useState } from 'react'

import Avatar from '../../Avatar'
import MenuItem from './MenuItem'
import useRegisterModalStore from '@/hooks/contexts/useRegisterModalStore'
import useLoginModalStore from '@/hooks/contexts/useLoginModalStore'
import useCurrentUserStore from '@/hooks/contexts/useCurrentUserStore'
import useAuthService from '@/hooks/useAuthService'
import { useRouter } from 'next/navigation'
import useAppSideStore from '@/hooks/contexts/useAppSideStore'
import useOutSideListener from '@/hooks/useOutSideListener'

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { currentUser, isLoading } = useCurrentUserStore()
  const { appSide } = useAppSideStore()

  const registerModal = useRegisterModalStore()
  const loginModal = useLoginModalStore()
  const { logout } = useAuthService()
  const router = useRouter()

  const accountBtnRef = useRef(null)

  const toggleOpen = () => {
    setIsOpen((pre) => !pre)
  }

  useOutSideListener('mousedown', accountBtnRef, () => {
    if (isOpen) {
      setIsOpen(false)
    }
  })

  const handleLogout = async () => {
    try {
      await logout()
      setIsOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        {!isLoading && (
          <div
            onClick={() => {
              appSide !== null && appSide === 'traveling'
                ? router.push('/hosting')
                : router.push('/')
            }}
            className=" hidden lg:block text-base font-semibold px-4 py-2 
            hover:bg-neutral-100 transition cursor-pointer rounded-full h-10"
          >
            {appSide === 'traveling'
              ? 'Switch to hosting'
              : 'Switch to traveling'}
          </div>
        )}
        <div
          onClick={toggleOpen}
          ref={accountBtnRef}
          className=" p-1 border-[1px] border-neutral-200 hidden md:flex flex-row 
            items-center gap-2 rounded-full cursor-pointer hover:shadow-md transition
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
          className="absolute rounded-xl w-[40vw] md:w-3/4 bg-white 
            overflow-hidden right-0 top-12 text-base"
          style={{ boxShadow: '0px 4px 10px 4px rgb(0 0 0 / 0.1)' }}
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => {
                    router.push('/me')
                  }}
                  label="Account"
                />
                <MenuItem onClick={() => {}} label="My save" />
                <hr />
                <MenuItem onClick={() => {}} label="Help" />
                <MenuItem onClick={handleLogout} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    loginModal.open()
                    toggleOpen()
                  }}
                  label="Login"
                />
                <MenuItem
                  onClick={() => {
                    registerModal.open()
                    toggleOpen()
                  }}
                  label="Sign up"
                />
                <hr />
                <MenuItem onClick={() => {}} label="Airbnb your home" />
                <MenuItem onClick={() => {}} label="Help" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
