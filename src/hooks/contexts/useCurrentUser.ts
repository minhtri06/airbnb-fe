'use client'

import { create } from 'zustand'

import { CURRENT_USER } from '../../constants/auth'
import useAuthTokens from '../useAuthTokens'

export interface CurrentUser {
  name: string
  email: string
  avatar?: string
  address?: { [key: string]: string }
}

interface CurrentUserStore {
  currentUser: CurrentUser | null
  setCurrentUser: (newCurrentUser: CurrentUser | null) => void
}

const useCurrentUser = create<CurrentUserStore>((set) => {
  if (typeof window === 'undefined') {
    return {
      currentUser: null,
      setCurrentUser: () => {},
    }
  }

  const currentUserStr = localStorage.getItem(CURRENT_USER)
  const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null

  const setCurrentUser = (newCurrentUser: CurrentUser | null) => {
    if (!newCurrentUser) {
      localStorage.removeItem(CURRENT_USER)
    } else {
      localStorage.setItem(CURRENT_USER, JSON.stringify(newCurrentUser))
    }
    set({ currentUser: newCurrentUser })
  }

  return { currentUser, setCurrentUser }
})

export default useCurrentUser
