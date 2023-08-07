import apiAxios from '@/utils/apiAxios'
import { GET_ALL_DISTRICTS, GET_ALL_PROVINCES } from '@/constants/urls'

export type division = {
  _id: string
  type: string
  name: string
}

export type district = {
  _id: string
  name: string
  province: string
  latitude: number
  longitude: number
}

export type province = {
  _id: string
  name: string
}

const useDivisionAction = () => {
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

  const getAllDistricts = async () => {
    const res = await apiAxios.get(GET_ALL_DISTRICTS)
    return res.data
  }

  const getAllProvinces = async () => {
    const res = await apiAxios.get(GET_ALL_PROVINCES)
    return res.data
  }

  const getCoordinate = async (
    address: string,
  ): Promise<{ latitude: number; longitude: number } | null> => {
    const searchParams = new URLSearchParams({
      format: 'json',
      q: address,
      addressdetails: '1',
    })
    const res = await apiAxios.get(
      `https://nominatim.openstreetmap.org/search?${searchParams.toString()}`,
    )
    const locations = res.data as any[]

    if (locations.length === 0) return null
    return {
      latitude: locations[0].lat,
      longitude: locations[0].lon,
    }
  }

  return { getAllDivisions, getAllDistricts, getAllProvinces, getCoordinate }
}

export default useDivisionAction
