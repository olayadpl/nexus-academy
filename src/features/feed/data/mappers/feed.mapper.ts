import type { FeedItemEntity } from "../../domain/entities/feed-item.entity"
import type { FeedItemModel } from "../models/feed-item.model"

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
