export type property = {
  _id: string
  title: string
  isClosed: boolean
  owner: string
  pageName: string
  categoryCodes: [string]
  score: number
  reviewCount: number
  description: string
  facilityCodes: string
  address: { [key: string]: string }
  thumbnail: string
  images: string[]
  accommodations: [{ [key: string]: any }]
}
