export type CourseLevel = "beginner" | "intermediate" | "advanced"
export type CourseResourceType = "video" | "pdf"

export interface CourseModuleEntity {
  id: string
  title: string
  type: CourseResourceType
  resourceUrl: string
  durationMinutes: number
  completed: boolean
}

export interface CourseEntity {
  id: string
  title: string
  description: string
  level: CourseLevel
  durationHours: number
  rating: number
  reviewCount: number
  featured: boolean
  progress?: number
  thumbnailUrl: string
  authorName?: string
  authorAvatarUrl?: string
  modules: CourseModuleEntity[]
}
