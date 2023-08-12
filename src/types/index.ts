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
  isAvailable?: boolean
}

export type ownerObj = {
  name: string
  avatar: string
  _id: string
}

export type property = {
  _id: string
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
    latitude: number
    longitude: number
  }
  accommodations: accommodation[]
  isAvailable?: boolean
}

export type newProperty = {
  title: string
  isClosed: boolean
  pageName: string
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
    latitude: number
    longitude: number
  }
  accommodations: accommodation[]
  isAvailable?: boolean
}

export type review = {
  _id: string
  reviewer: { _id: string; name: string; avatar?: string }
  body: string
  score: number
  property: string
  createdAt: string | Date
}

export type reviewPaginate = {
  data: review[]
  totalRecords?: number
  totalPage?: number
}

export type propertyPaginate = {
  data: property[]
  totalRecords?: number
  totalPage?: number
}

export type conversation = {
  _id: string
  withUser: { _id: string; name: string; avatar?: string }
  latestMessage: { body: string; sender: string }
}

export type message = {
  _id: string
  userIds: string[]
  body: string
}

export type messagePaginate = {
  data: message[]
  totalPage?: number
  totalRecords?: number
}

export type user = {
  _id: string
  name: string
  avatar?: string
  dateOfBirth?: string | Date
  gender?: string
}

export type chat = {
  user: user
  messages: message[]
}

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
