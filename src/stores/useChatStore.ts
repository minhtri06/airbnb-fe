import { chat, conversation } from '@/types'
import { create } from 'zustand'

interface ChatStore {
  conversations: conversation[]
  setConversations: (cons: conversation[]) => void
  chats: chat[]
  setChats: (chats: chat[]) => void
}

const useChatStore = create<ChatStore>((set) => ({
  conversations: [],
  setConversations: (conversations) => set({ conversations }),
  chats: [],
  setChats: (chats) => set({ chats }),
}))

export default useChatStore
