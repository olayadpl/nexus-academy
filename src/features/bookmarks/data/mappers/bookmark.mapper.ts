import type { BookmarkEntity } from "../../domain/entities/bookmark.entity"
import type { BookmarkModel } from "../models/bookmark.model"

export function toBookmarkEntity(model: BookmarkModel): BookmarkEntity {
  return {
    id: model.id,
    userId: model.userId,
    resourceId: model.resourceId,
    courseId: model.courseId,
    title: model.title,
    createdAt: model.createdAt,
  }
}

export function toBookmarkModel(entity: BookmarkEntity): BookmarkModel {
  return {
    id: entity.id,
    userId: entity.userId,
    resourceId: entity.resourceId,
    courseId: entity.courseId,
    title: entity.title,
    createdAt: entity.createdAt,
  }
}
