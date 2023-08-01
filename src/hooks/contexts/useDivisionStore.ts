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
  fetchDivisions: () => Promise<void>
}

const useDivisionStore = create<DivisionStore>((set) => {
  const fetchDivisions = async () => {
    const [res1, res2] = await Promise.all([
      apiAxios.get(GET_ALL_DISTRICTS),
      apiAxios.get(GET_ALL_PROVINCES),
    ])

    const { districts } = res1.data
    const { provinces } = res2.data

    const divisions = [
      ...districts.map(
        (district: any): division => ({
          _id: district._id,
          type: 'district',
          name: district.name,
        }),
      ),
      ...provinces.map(
        (province: any): division => ({
          _id: province._id,
          type: 'province',
          name: province.name,
        }),
      ),
    ]

    set({ divisions })
  }

  return { divisions: null, fetchDivisions }
})

export default useDivisionStore
