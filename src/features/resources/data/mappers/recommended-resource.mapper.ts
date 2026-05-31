import type { RecommendedResourceEntity } from "../../domain/entities/recommended-resource.entity"
import type { RecommendedResourceModel } from "../models/recommended-resource.model"

export function modelToEntity(model: RecommendedResourceModel): RecommendedResourceEntity {
  return {
    id: model.id,
    title: model.title,
    type: model.type,
    category: model.category,
    resourceUrl: model.resourceUrl,
    durationMinutes: model.durationMinutes,
    authorName: model.authorName,
    thumbnailUrl: model.thumbnailUrl,
    sortOrder: model.sortOrder,
  }
}

export function entityToModel(entity: RecommendedResourceEntity): RecommendedResourceModel {
  return {
    id: entity.id,
    title: entity.title,
    type: entity.type,
    category: entity.category,
    resourceUrl: entity.resourceUrl,
    durationMinutes: entity.durationMinutes,
    authorName: entity.authorName,
    thumbnailUrl: entity.thumbnailUrl,
    sortOrder: entity.sortOrder,
  }
}
