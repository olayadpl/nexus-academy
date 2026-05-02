import type { BriefDifficulty } from "../../domain/entities/brief.entity"

export interface BriefModel {
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
