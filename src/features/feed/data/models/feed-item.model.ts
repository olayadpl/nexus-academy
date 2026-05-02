import type { FeedItemEntity } from "../../domain/entities/feed-item.entity"

export interface FeedItemModel {
  id: string
  title: string
  summary: string
  category: "course" | "brief" | "assessment"
  createdAt: string
}

export function toFeedEntity(model: FeedItemModel): FeedItemEntity {
  return {
    id: model.id,
    title: model.title,
    summary: model.summary,
    category: model.category,
    createdAt: model.createdAt,
  }
}

export function toFeedModel(entity: FeedItemEntity): FeedItemModel {
  return {
    id: entity.id,
    title: entity.title,
    summary: entity.summary,
    category: entity.category,
    createdAt: entity.createdAt,
  }
}
