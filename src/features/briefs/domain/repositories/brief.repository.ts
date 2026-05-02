import type { BriefEntity } from "../entities/brief.entity"

export type CreateBriefInput = BriefEntity

export interface UpdateBriefInput {
  id: string
  title?: string
  description?: string
  category?: string
  difficulty?: BriefEntity["difficulty"]
  estimatedDurationMinutes?: number
  thumbnailUrl?: string
  authorName?: string
  objectives?: string[]
  deliverables?: string[]
}

export interface IBriefRepository {
  create(input: CreateBriefInput): Promise<BriefEntity>
  update(input: UpdateBriefInput): Promise<BriefEntity>
  getById(id: string): Promise<BriefEntity | null>
  getAll(): Promise<BriefEntity[]>
  deleteById(id: string): Promise<void>
}
