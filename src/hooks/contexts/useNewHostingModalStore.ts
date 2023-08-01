import { create } from 'zustand'

interface NewHostingModalStore {
  isOpen: boolean
  open: () => void
  close: () => void
}

const useNewHostingModalStore = create<NewHostingModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: true }),
}))

export default useNewHostingModalStore
