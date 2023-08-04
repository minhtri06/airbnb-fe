export type bed = {
  double: number
  queen: number
  single: number
  sofaBed: number
}

export type accommodation = {
  title: string
  pricePerNight: string | number
  maximumOfGuests: number | string
  type: 'specific-room' | 'entire-house' | null
  bed: bed
  numberOfRooms?: number
}

export type ownerObj = {
  name: string
  avatar: string
  _id: string
}

export type property = {
  title: string
  isClosed: boolean
  pageName: string
  owner: string | ownerObj
  score: number | undefined
  reviewCount: number
  description: string
  facilityCodes: string[]
  categoryCodes: string[]
  thumbnail?: string
  images?: string[]
  address: {
    address: string
    district: string
    province: string
    districtName?: string
    provinceName?: string
  }
  accommodations: accommodation[]
}
