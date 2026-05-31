export type RecommendedResourceType = "video" | "pdf"

export interface RecommendedResourceEntity {
  id: string
  title: string
  type: RecommendedResourceType
  category: string
  resourceUrl: string
  durationMinutes: number
  authorName?: string
  thumbnailUrl?: string
  sortOrder?: number
}
