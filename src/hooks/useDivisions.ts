import apiAxios from '@/utils/apiAxios'
import { GET_ALL_DISTRICTS, GET_ALL_PROVINCES } from '@/constants/urls'

export type division = {
  _id: string
  type: string
  name: string
}

const useDivisions = () => {
  const getAllDivisions = async (): Promise<division[]> => {
    const [res1, res2] = await Promise.all([
      apiAxios.get(GET_ALL_DISTRICTS),
      apiAxios.get(GET_ALL_PROVINCES),
    ])

    const { districts } = res1.data
    const { provinces } = res2.data

    return [
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
  }

  return { getAllDivisions }
}

export default useDivisions
