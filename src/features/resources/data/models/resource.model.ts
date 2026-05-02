export interface ResourceModel {
  id: string
  courseId: string
  title: string
  type:
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
  resourceUrl: string
  durationMinutes: number
  completed: boolean
  order: number
}
