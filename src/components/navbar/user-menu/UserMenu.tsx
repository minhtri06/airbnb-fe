'use client'

import { AiOutlineMenu } from '@react-icons/all-files/ai/AiOutlineMenu'
import { useEffect, useRef, useState } from 'react'

import Avatar from '../../Avatar'
import MenuItem from './MenuItem'
import useRegisterModalStore from '@/stores/useRegisterModalStore'
import useLoginModalStore from '@/stores/useLoginModalStore'
import useAuthStore from '@/stores/useAuthStore'
import useAppSideStore from '@/stores/useAppSideStore'
import useAuthService from '@/hooks/useAuthService'
import { useRouter } from 'next/navigation'
import useOutSideListener from '@/hooks/useOutSideListener'
import Link from 'next/link'

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { currentUser, isLoading, isLogin } = useAuthStore()
  const { appSide } = useAppSideStore()

  const registerModal = useRegisterModalStore()
  const loginModal = useLoginModalStore()
  const { logout } = useAuthService()
  const router = useRouter()

  const toggleOpen = () => setIsOpen((pre) => !pre)
  const closeMenu = () => setIsOpen(false)

  const accountBtnRef = useRef(null)
  const menuRef = useRef(null)
  useOutSideListener('mousedown', [accountBtnRef, menuRef], () => {
    if (isOpen) {
      setIsOpen(false)
    }
  })

  const handleLogout = async () => {
    try {
      await logout()
      router.refresh()
      setIsOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        {!isLoading && (
          <Link
            href={
              appSide !== null && appSide === 'traveling' ? '/hosting' : '/'
            }
          >
            <div
              className=" hidden lg:block text-base font-semibold px-4 py-2 select-none
                hover:bg-neutral-100 transition cursor-pointer rounded-full h-10"
            >
              {appSide === 'traveling'
                ? 'Switch to hosting'
                : 'Switch to traveling'}
            </div>
          </Link>
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
          <Avatar
            size="sm"
            avatarUrl={currentUser ? currentUser.avatar : undefined}
          />
        </div>
      </div>
      {isOpen && (
        <div
          className="absolute rounded-xl w-52 bg-white select-none
            overflow-hidden right-0 top-12 text-base"
          style={{ boxShadow: '0px 4px 10px 4px rgb(0 0 0 / 0.1)' }}
          ref={menuRef}
        >
          <div className="flex flex-col cursor-pointer">
            {isLogin ? (
              <>
                <MenuItem onClick={closeMenu} label="Account" />
                <MenuItem onClick={closeMenu} label="My save" />
                <Link href="/messages">
                  <MenuItem onClick={closeMenu} label="Messages" />
                </Link>
                <hr />
                <MenuItem onClick={closeMenu} label="Help" />
                <MenuItem onClick={handleLogout} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    loginModal.open()
                    closeMenu()
                  }}
                  label="Login"
                />
                <MenuItem
                  onClick={() => {
                    registerModal.open()
                    closeMenu()
                  }}
                  label="Sign up"
                />
                <hr />
                <MenuItem onClick={closeMenu} label="Airbnb your home" />
                <MenuItem onClick={closeMenu} label="Help" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
