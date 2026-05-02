import type { CareerPathEntity } from "../entities/career-path.entity"

export interface ListCareerPathsQuery {
  featuredOnly?: boolean
}

export type CreateCareerPathInput = CareerPathEntity

export interface UpdateCareerPathInput {
  id: string
  title?: string
  description?: string
  featured?: boolean
  estimatedHours?: number
  level?: CareerPathEntity["level"]
  milestones?: CareerPathEntity["milestones"]
}

export interface ICareerPathRepository {
  create(input: CreateCareerPathInput): Promise<CareerPathEntity>
  update(input: UpdateCareerPathInput): Promise<CareerPathEntity>
  getById(id: string): Promise<CareerPathEntity | null>
  getBySlug(slug: string): Promise<CareerPathEntity | null>
  getAll(query?: ListCareerPathsQuery): Promise<CareerPathEntity[]>
  deleteById(id: string): Promise<void>
}
