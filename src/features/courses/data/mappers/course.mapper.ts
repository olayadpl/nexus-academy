import type { CourseEntity } from "../../domain/entities/course.entity"
import type { UpdateCourseInput } from "../../domain/repositories/course.repository"
import type { CourseModel } from "../models/course.model"

export function modelToEntity(model: CourseModel): CourseEntity {
  return {
    id: model.id,
    title: model.title,
    description: model.description,
    level: model.level,
    durationHours: model.durationHours,
    rating: model.rating,
    reviewCount: model.reviewCount,
    featured: model.featured,
    progress: model.progress,
    thumbnailUrl: model.thumbnailUrl,
    authorName: model.authorName,
    authorAvatarUrl: model.authorAvatarUrl,
    modules: model.modules.map((module) => ({
      id: module.id,
      title: module.title,
      type: module.type,
      resourceUrl: module.resourceUrl,
      durationMinutes: module.durationMinutes,
      completed: module.completed,
    })),
  }
}

export function entityToModel(entity: CourseEntity): CourseModel {
  return {
    id: entity.id,
    title: entity.title,
    description: entity.description,
    level: entity.level,
    durationHours: entity.durationHours,
    rating: entity.rating,
    reviewCount: entity.reviewCount,
    featured: entity.featured,
    progress: entity.progress,
    thumbnailUrl: entity.thumbnailUrl,
    authorName: entity.authorName,
    authorAvatarUrl: entity.authorAvatarUrl,
    modules: entity.modules.map((module) => ({
      id: module.id,
      title: module.title,
      type: module.type,
      resourceUrl: module.resourceUrl,
      durationMinutes: module.durationMinutes,
      completed: module.completed,
    })),
  }
}

export function updateInputToPartialModel(input: UpdateCourseInput): Partial<CourseModel> {
  return {
    title: input.title,
    description: input.description,
    level: input.level,
    durationHours: input.durationHours,
    rating: input.rating,
    reviewCount: input.reviewCount,
    featured: input.featured,
    progress: input.progress,
    thumbnailUrl: input.thumbnailUrl,
    authorName: input.authorName,
    authorAvatarUrl: input.authorAvatarUrl,
    modules: input.modules?.map((module) => ({
      id: module.id,
      title: module.title,
      type: module.type,
      resourceUrl: module.resourceUrl,
      durationMinutes: module.durationMinutes,
      completed: module.completed,
    })),
  }
}
