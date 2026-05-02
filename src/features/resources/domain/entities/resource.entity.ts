export type ResourceType =
  | "video"
  | "pdf"
  | "document"
  | "ebook"
  | "article"
  | "audio"
  | "image"
  | "code"
  | "interactive"
  | "presentation"

export interface ResourceEntity {
  id: string
  courseId: string
  title: string
  type: ResourceType
  resourceUrl: string
  durationMinutes: number
  completed: boolean
  order: number
}
