import { create } from 'zustand'

import { GET_ALL_DISTRICTS, GET_ALL_PROVINCES } from '@/constants/urls'
import apiAxios from '@/utils/apiAxios'

export type division = {
  _id: string
  name: string
  type: 'district' | 'province'
}

interface DivisionStore {
  divisions: division[] | null
  setDivisions: (divisions: division[] | null) => void
}

const useDivisionStore = create<DivisionStore>((set) => ({
  divisions: null,
  setDivisions: (divisions) => set({ divisions }),
}))

export default useDivisionStore
