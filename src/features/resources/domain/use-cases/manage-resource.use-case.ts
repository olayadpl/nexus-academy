import { NotFoundFailure, ValidationFailure } from "@/src/core/error/failures"
import type { ResourceEntity } from "../entities/resource.entity"
import type {
  CreateResourceInput,
  IResourceRepository,
  UpdateResourceInput,
} from "../repositories/resource.repository"

function assertNonEmpty(value: string, fieldName: string) {
  if (typeof value !== "string" || !value || !value.trim()) {
    throw new ValidationFailure(`${fieldName} is required`)
  }
}

export class ManageResourceUseCase {
  constructor(private readonly repository: IResourceRepository) {}

  async create(input: CreateResourceInput): Promise<ResourceEntity> {
    assertNonEmpty(input.id, "id")
    assertNonEmpty(input.courseId, "courseId")
    assertNonEmpty(input.title, "title")
    assertNonEmpty(input.resourceUrl, "resourceUrl")

    return this.repository.create(input)
  }

  async update(input: UpdateResourceInput): Promise<ResourceEntity> {
    assertNonEmpty(input.id, "id")

    const existing = await this.repository.getById(input.id)
    if (!existing) {
      throw new NotFoundFailure(`Resource ${input.id} not found`)
    }

    return this.repository.update(input)
  }

  async getById(id: string): Promise<ResourceEntity | null> {
    return this.repository.getById(id)
  }

  async getByCourseId(courseId: string): Promise<ResourceEntity[]> {
    assertNonEmpty(courseId, "courseId")
    return this.repository.getByCourseId(courseId)
  }

  async getAll(): Promise<ResourceEntity[]> {
    return this.repository.getAll()
  }

  async deleteById(id: string): Promise<void> {
    const existing = await this.repository.getById(id)
    if (!existing) {
      throw new NotFoundFailure(`Resource ${id} not found`)
    }

    await this.repository.deleteById(id)
  }
}
