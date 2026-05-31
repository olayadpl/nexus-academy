import type { RecommendedResourceType } from "../../domain/entities/recommended-resource.entity"

export interface RecommendedResourceModel {
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
