'use client'

import { create } from 'zustand'

interface NotificationModalStore {
  isOpen: boolean
  body: React.ReactElement | string
  title: string
  open: (title: string, body: React.ReactElement | string) => void
  close: () => void
}

const useNotificationModal = create<NotificationModalStore>((set) => ({
  isOpen: false,
  body: '',
  title: '',
  open: (title, body) => set({ isOpen: true, title, body }),
  close: () => set({ isOpen: false, title: '', body: '' }),
}))

export default useNotificationModal
