import { create } from 'zustand'

interface RegisterModelStore {
  isOpen: boolean
  open: () => void
  close: () => void
}

const useRegisterModalStore = create<RegisterModelStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))

export default useRegisterModalStore
