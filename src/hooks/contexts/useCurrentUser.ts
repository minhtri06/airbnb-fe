import { create } from 'zustand'

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
  const setCurrentUser = (newCurrentUser: CurrentUser | null) => {
    set({ currentUser: newCurrentUser })
  }

  return {
    currentUser: null,
    setCurrentUser,
  }
})

export default useCurrentUser
