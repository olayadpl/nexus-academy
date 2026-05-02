import type { BookmarkEntity } from "../../domain/entities/bookmark.entity"

export interface BookmarkModel {
  id: string
  userId: string
  resourceId: string
  courseId: string
  title: string
  createdAt: string
}

export function toEntity(model: BookmarkModel): BookmarkEntity {
  return {
    id: model.id,
    userId: model.userId,
    resourceId: model.resourceId,
    courseId: model.courseId,
    title: model.title,
    createdAt: model.createdAt,
  }
}

export function fromEntity(entity: BookmarkEntity): BookmarkModel {
  return {
    id: entity.id,
    userId: entity.userId,
    resourceId: entity.resourceId,
    courseId: entity.courseId,
    title: entity.title,
    createdAt: entity.createdAt,
  }
}
