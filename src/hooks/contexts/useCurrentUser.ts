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
  isLoading: boolean
  setIsLoading: (value: boolean) => void
}

const useCurrentUser = create<CurrentUserStore>((set) => {
  const setCurrentUser = (newCurrentUser: CurrentUser | null) => {
    set({ currentUser: newCurrentUser, isLoading: false })
  }

  return {
    currentUser: null,
    setCurrentUser,
    isLoading: true,
    setIsLoading: (value) => set({ isLoading: value }),
  }
})

export default useCurrentUser
