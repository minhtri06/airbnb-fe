import { create } from 'zustand'

export interface CurrentUser {
  _id: string
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
  isLogin: boolean | null
  setIsLogin: (isLogin: boolean) => void
}

const useAuthStore = create<CurrentUserStore>((set) => {
  const setCurrentUser = (newCurrentUser: CurrentUser | null) => {
    set({ currentUser: newCurrentUser, isLoading: false })
  }

  return {
    currentUser: null,
    setCurrentUser,
    isLoading: true,
    setIsLoading: (value) => set({ isLoading: value }),
    isLogin: null,
    setIsLogin: (isLogin) => set({ isLogin }),
  }
})

export default useAuthStore
