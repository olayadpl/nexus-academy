export type BriefDifficulty = "beginner" | "intermediate" | "advanced"

export interface BriefEntity {
  id: string
  title: string
  description: string
  category: string
  difficulty: BriefDifficulty
  estimatedDurationMinutes: number
  thumbnailUrl: string
  authorName: string
  objectives: string[]
  deliverables: string[]
  createdAt: string
}
