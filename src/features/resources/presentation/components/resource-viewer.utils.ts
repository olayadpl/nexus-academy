import type { ResourceEntity } from "../../domain/entities/resource.entity"
import type { ResourceLesson } from "./resource-viewer.types"

export function mapResourceToLesson(resource: ResourceEntity): ResourceLesson {
  const isVideo = resource.type === "video"
  return {
    id: resource.id,
    title: resource.title,
    type: isVideo ? "video" : resource.type === "form" ? "form" : "pdf",
    videoUrl: isVideo ? resource.resourceUrl : undefined,
    documentUrl: !isVideo ? resource.resourceUrl : undefined,
    durationMinutes: resource.durationMinutes ?? 0,
    completed: Boolean(resource.completed),
    step: resource.order ?? 1,
  }
}