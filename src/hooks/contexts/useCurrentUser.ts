import { create } from 'zustand'

import { CURRENT_USER } from '../../constants/auth'
import useAuthTokens from '../useAuthTokens'

interface CurrentUserStore {
  currentUser: object | null
  setCurrentUser: (newCurrentUser: object | null) => void
}

const useCurrentUser = create<CurrentUserStore>((set) => {
  const currentUserStr = localStorage.getItem(CURRENT_USER)
  const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null
  const { removeAuthTokens } = useAuthTokens()

  const setCurrentUser = (newCurrentUser: object | null) => {
    if (!newCurrentUser) {
      localStorage.removeItem(CURRENT_USER)
      removeAuthTokens()
    } else {
      localStorage.setItem(CURRENT_USER, JSON.stringify(newCurrentUser))
    }
    set({ currentUser: newCurrentUser })
  }

  return { currentUser, setCurrentUser }
})

export default useCurrentUser
