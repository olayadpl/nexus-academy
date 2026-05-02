import { NotFoundFailure, ValidationFailure } from "@/src/core/error/failures"
import type { CareerPathEntity } from "../entities/career-path.entity"
import type {
  CreateCareerPathInput,
  ICareerPathRepository,
  ListCareerPathsQuery,
  UpdateCareerPathInput,
} from "../repositories/career-path.repository"

function assertNonEmpty(value: string, fieldName: string) {
  if (!value.trim()) {
    throw new ValidationFailure(`${fieldName} is required`)
  }
}

export class ManageCareerPathUseCase {
  constructor(private readonly repository: ICareerPathRepository) {}

  async create(input: CreateCareerPathInput): Promise<CareerPathEntity> {
    assertNonEmpty(input.id, "id")
    assertNonEmpty(input.slug, "slug")
    assertNonEmpty(input.title, "title")
    assertNonEmpty(input.description, "description")

    return this.repository.create(input)
  }

  async update(input: UpdateCareerPathInput): Promise<CareerPathEntity> {
    assertNonEmpty(input.id, "id")

    const existing = await this.repository.getById(input.id)
    if (!existing) {
      throw new NotFoundFailure(`Career path ${input.id} not found`)
    }

    return this.repository.update(input)
  }

  async getById(id: string): Promise<CareerPathEntity | null> {
    return this.repository.getById(id)
  }

  async getBySlug(slug: string): Promise<CareerPathEntity | null> {
    assertNonEmpty(slug, "slug")
    return this.repository.getBySlug(slug)
  }

  async getAll(query?: ListCareerPathsQuery): Promise<CareerPathEntity[]> {
    return this.repository.getAll(query)
  }

  async deleteById(id: string): Promise<void> {
    const existing = await this.repository.getById(id)
    if (!existing) {
      throw new NotFoundFailure(`Career path ${id} not found`)
    }

    await this.repository.deleteById(id)
  }
}
