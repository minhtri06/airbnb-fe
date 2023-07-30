export type property = {
  _id?: string
  title?: string | null
  isClosed?: boolean | null
  owner?: string | null
  pageName?: string | null
  categoryCodes?: [string] | null
  score?: number | null
  reviewCount?: number | null
  description?: string | null
  facilityCodes?: string | null
  address?: { [key: string]: string } | null
  thumbnail?: string | null
  images?: string[] | null
  accommodations?: [{ [key: string]: string }] | null
}
