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
  page?: number | null
  limit?: number | null
}

export interface SearchStore {
  params: PropertyParams
  setParams: (params: PropertyParams) => void
  properties: property[] | null
  setProperties: (properties: property[]) => void
}

const useSearchStore = create<SearchStore>((set) => ({
  params: {
    districtId: null,
    provinceId: null,
    categoryCode: CATEGORIES[0].code,
    bookIn: null,
    bookOut: null,
    page: null,
    limit: null,
  },
  setParams: (params) =>
    set((pre) => ({
      ...pre,
      params: { ...pre.params, ...params },
    })),
  properties: null,
  setProperties: (properties) => set({ properties }),
}))

export default useSearchStore
