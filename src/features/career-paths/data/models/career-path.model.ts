export interface CareerPathModel {
  id: string
  slug: string
  title: string
  description: string
  featured: boolean
  estimatedHours: number
  level: "beginner" | "intermediate" | "advanced"
  milestones: {
    id: string
    title: string
    courseIds: string[]
    order: number
  }[]
}
