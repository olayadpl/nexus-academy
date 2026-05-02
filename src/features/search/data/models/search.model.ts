import type { SearchItemType, SearchResultEntity } from "../../domain/entities/search.entity"

export interface SearchResultModel {
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

export function toSearchEntity(model: SearchResultModel): SearchResultEntity {
  return {
    id: model.id,
    title: model.title,
    description: model.description,
    type: model.type,
    category: model.category,
    thumbnailUrl: model.thumbnailUrl,
    durationMinutes: model.durationMinutes,
    featured: model.featured,
    reviewCount: model.reviewCount,
    rating: model.rating,
    createdAt: model.createdAt,
  }
}
