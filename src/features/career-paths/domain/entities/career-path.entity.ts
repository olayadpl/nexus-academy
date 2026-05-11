export interface CareerPathMilestoneEntity {
  id: string
  title: string
  courseIds: string[]
  order: number
}

export interface CareerPathEntity {
  id: string
  slug: string
  title: string
  description: string
  featured: boolean
  estimatedHours: number
  coursesCount: number
  level: "beginner" | "intermediate" | "advanced"
  milestones: CareerPathMilestoneEntity[]
}
