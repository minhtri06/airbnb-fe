import { create } from 'zustand'

export interface AppSideStore {
  appSide: 'traveling' | 'hosting' | null
  setAppSide: (appSide: 'traveling' | 'hosting') => void
}

const useAppSideStore = create<AppSideStore>((set) => ({
  appSide: null,
  setAppSide: (appSide) => set({ appSide }),
}))

export default useAppSideStore
