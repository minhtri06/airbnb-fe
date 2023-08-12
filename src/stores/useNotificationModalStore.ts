import { create } from 'zustand'

interface NotificationModalStore {
  isOpen: boolean
  title: string
  body: React.ReactElement | string
  callWhenClose: () => void
  open: (config: {
    title: string
    body: React.ReactElement | string
    callWhenClose?: () => void
  }) => void
  close: () => void
}

const useNotificationModalStore = create<NotificationModalStore>((set) => ({
  isOpen: false,
  title: '',
  body: '',
  callWhenClose: () => {},
  open: ({ title, body, callWhenClose = () => {} }) =>
    set({ isOpen: true, title, body, callWhenClose }),
  close: () => {
    set({ isOpen: false, title: '', body: '', callWhenClose: () => {} })
  },
}))

export default useNotificationModalStore
