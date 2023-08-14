import { chat, conversation } from '@/types'
import { Socket } from 'socket.io-client'
import { create } from 'zustand'

interface ChatStore {
  conversations: conversation[]
  setConversations: (cons: conversation[]) => void
  chats: chat[]
  setChats: (chats: chat[]) => void
  chatSocket: Socket | null
  setChatSocket: (chatSocket: Socket | null) => void
}

const useChatStore = create<ChatStore>((set) => ({
  conversations: [],
  setConversations: (conversations) => set({ conversations }),
  chats: [],
  setChats: (chats) => set({ chats }),
  chatSocket: null,
  setChatSocket: (chatSocket) => set({ chatSocket }),
}))

export default useChatStore
