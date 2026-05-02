export type SearchItemType = "course" | "resource" | "brief" | "assessment"
export type SearchSort = "popular" | "recent" | "rating"

export interface SearchResultEntity {
  id: string
  title: string
  description: string
  type: SearchItemType
  category: string
  thumbnailUrl?: string
  durationMinutes?: number
  featured?: boolean
  reviewCount?: number
  rating?: number
  createdAt?: string
}

export interface SearchQueryEntity {
  q: string
  sort: SearchSort
  featuredOnly: boolean
}
