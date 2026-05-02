import type { ResourceEntity } from "../entities/resource.entity"

export interface CreateResourceInput extends ResourceEntity {}

export interface UpdateResourceInput {
  id: string
  title?: string
  type?: ResourceEntity["type"]
  resourceUrl?: string
  durationMinutes?: number
  completed?: boolean
  order?: number
}

export interface IResourceRepository {
  create(input: CreateResourceInput): Promise<ResourceEntity>
  update(input: UpdateResourceInput): Promise<ResourceEntity>
  getById(id: string): Promise<ResourceEntity | null>
  getByCourseId(courseId: string): Promise<ResourceEntity[]>
  getAll(): Promise<ResourceEntity[]>
  deleteById(id: string): Promise<void>
}
