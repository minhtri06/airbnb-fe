'use client'

import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'

import Avatar from '../../Avatar'
import MenuItem from './MenuItem'
import useRegisterModal from '@/hooks/contexts/useRegisterModal'
import useLoginModal from '@/hooks/contexts/useLoginModal'
import useCurrentUser from '@/hooks/contexts/useCurrentUser'
import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import useAppSide from '@/hooks/contexts/useAppSide'

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { currentUser, isLoading } = useCurrentUser()
  const { appSide } = useAppSide()

  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const { logout } = useAuth()
  const router = useRouter()

  const toggleOpen = () => {
    setIsOpen((pre) => !pre)
  }

  const handleLogout = async () => {
    try {
      await logout()
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
          className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white 
            overflow-hidden right-0 top-12 text-base"
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
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
