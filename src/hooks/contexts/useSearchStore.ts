'use client'

import { CATEGORIES } from '@/constants/categories'
import { property } from '@/types'
import { create } from 'zustand'

export interface PropertyParams {
  districtId?: string | null
  provinceId?: string | null
  categoryCode?: string | null
  bookIn?: Date | null
  bookOut?: Date | null
}

export interface SearchStore {
  params: PropertyParams
  setParams: (params: PropertyParams) => void
  properties: property[] | null
  setProperties: (properties: property[]) => void
  isLoading: boolean
  setIsLoading: (value: boolean) => void
}

const useSearchStore = create<SearchStore>((set) => ({
  params: {
    districtId: null,
    provinceId: null,
    categoryCode: CATEGORIES[0].code,
    bookIn: null,
    bookOut: null,
  },
  setParams: (params) =>
    set((pre) => ({ params: { ...pre.params, ...params } })),
  properties: null,
  setProperties: (properties) => set({ properties }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}))

export default useSearchStore
