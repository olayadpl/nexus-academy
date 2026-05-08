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
  modules: {
    id: string
    title: string
    type: "video" | "pdf"
    resourceUrl?: string
    youtubeUrl?: string
    videoUrl?: string
    documentUrl?: string
    durationMinutes: number
    completed: boolean
  }[]
}
