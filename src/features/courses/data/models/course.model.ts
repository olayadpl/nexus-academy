export type CourseSectionModel = {
  id: string
  title: string
  resources: ResourceModel[]
}

export type ResourceModel = {
  id: string
  title: string
  type: "video" | "pdf" | "form"
  youtubeUrl?: string
  videoFile?: string
  documentFile?: string
  formId?: string
  durationMinutes: number
  completed: boolean
}

export interface CourseModel {
  id: string
  title: string
  description: string
  level: "beginner" | "intermediate" | "advanced"
  durationHours: number
  rating: number
  reviewCount: number
  featured: boolean
  progress?: number
  thumbnailUrl: string
  authorName?: string
  authorAvatarUrl?: string
  modules: CourseSectionModel[]
}
