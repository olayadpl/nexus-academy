import type { CourseEntity } from "../../domain/entities/course.entity"
import type { UpdateCourseInput } from "../../domain/repositories/course.repository"
import type { CourseModel } from "../models/course.model"

export function modelToEntity(model: CourseModel): CourseEntity {
  try {
    return {
      id: model.id ?? "",
      title: model.title ?? "",
      description: model.description ?? "",
      level: model.level ?? "beginner",
      durationHours: model.durationHours ?? 0,
      rating: model.rating ?? 0,
      reviewCount: model.reviewCount ?? 0,
      featured: model.featured ?? false,
      progress: model.progress,
      thumbnailUrl: model.thumbnailUrl ?? "",
      authorName: model.authorName,
      authorAvatarUrl: model.authorAvatarUrl,
      modules: (model.modules ?? []).map((section) => ({
        id: section.id ?? "",
        title: section.title ?? "",
        resources: (section.resources ?? []).map((r) => ({
          id: r.id ?? "",
          title: r.title ?? "",
          type: r.type,
          resourceUrl: r.videoFile ?? r.youtubeUrl ?? r.documentFile ?? "",
          durationMinutes: r.durationMinutes ?? 0,
          completed: r.completed ?? false,
          order: 0,
          courseId: model.id,
        })),
      })),
    }
  } catch (e) {
    console.error("modelToEntity error:", e)
    throw e
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
    modules: entity.modules.map((section) => ({
      id: section.id,
      title: section.title,
        resources: section.resources.map((r) => ({
        id: r.id,
        title: r.title,
        type: (r.type === "video" || r.type === "pdf" || r.type === "form" ? r.type : "video") as "video" | "pdf" | "form",
        youtubeUrl: r.type === "video" && r.resourceUrl?.includes("youtube") ? r.resourceUrl : undefined,
        videoFile: r.type === "video" && !r.resourceUrl?.includes("youtube") ? r.resourceUrl : undefined,
        documentFile: r.type === "pdf" ? r.resourceUrl : undefined,
        formId: r.type === "form" ? r.resourceUrl : undefined,
        durationMinutes: r.durationMinutes,
        completed: r.completed,
      })),
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
    modules: input.modules?.map((section) => ({
      id: section.id,
      title: section.title,
      resources: section.resources.map((r) => ({
        id: r.id,
        title: r.title,
        type: (r.type === "video" || r.type === "pdf" || r.type === "form" ? r.type : "video") as "video" | "pdf" | "form",
        youtubeUrl: r.type === "video" && r.resourceUrl?.includes("youtube") ? r.resourceUrl : undefined,
        videoFile: r.type === "video" && !r.resourceUrl?.includes("youtube") ? r.resourceUrl : undefined,
        documentFile: r.type === "pdf" ? r.resourceUrl : undefined,
        formId: r.type === "form" ? r.resourceUrl : undefined,
        durationMinutes: r.durationMinutes,
        completed: r.completed,
      })),
    })),
  }
}
