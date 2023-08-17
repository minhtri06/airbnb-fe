import { create } from 'zustand'

export interface CurrentUser {
  _id: string
  name: string
  email: string
  authType: 'local' | 'google'
  avatar?: string | null
  address?: { [key: string]: string }
  phoneNumber?: string | null
  gender?: 'male' | 'female' | null
  dateOfBirth?: Date | null
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
    if (
      newCurrentUser?.dateOfBirth &&
      typeof newCurrentUser.dateOfBirth === 'string'
    )
      newCurrentUser.dateOfBirth = new Date(newCurrentUser.dateOfBirth)

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
