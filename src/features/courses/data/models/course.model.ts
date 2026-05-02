export interface CourseModel {
  id: string
  title: string
  description: string
  bibliographicBase: string
  isCraiModel: boolean
  level: "beginner" | "intermediate" | "advanced"
  durationHours: number
  rating: number
  reviewCount: number
  featured: boolean
  progress?: number
  thumbnailUrl: string
  authorName?: string
  authorAvatarUrl?: string
  modules: {
    id: string
    title: string
    type: "video" | "pdf"
    resourceUrl: string
    durationMinutes: number
    completed: boolean
  }[]
}
