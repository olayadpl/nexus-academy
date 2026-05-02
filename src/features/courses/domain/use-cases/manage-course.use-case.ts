import { NotFoundFailure, ValidationFailure } from "@/src/core/error/failures"
import type { CourseEntity } from "../entities/course.entity"
import type {
  CreateCourseInput,
  ICourseRepository,
  ListCoursesQuery,
  UpdateCourseInput,
} from "../repositories/course.repository"

function assertNonEmpty(value: string, fieldName: string) {
  if (!value.trim()) {
    throw new ValidationFailure(`${fieldName} is required`)
  }
}

function assertRange(value: number, min: number, max: number, fieldName: string) {
  if (Number.isNaN(value) || value < min || value > max) {
    throw new ValidationFailure(`${fieldName} must be between ${min} and ${max}`)
  }
}

export class ManageCourseUseCase {
  constructor(private readonly repository: ICourseRepository) {}

  async create(input: CreateCourseInput): Promise<CourseEntity> {
    assertNonEmpty(input.id, "id")
    assertNonEmpty(input.title, "title")
    assertNonEmpty(input.description, "description")
    assertNonEmpty(input.bibliographicBase, "bibliographicBase")
    assertRange(input.rating, 0, 5, "rating")

    return this.repository.create(input)
  }

  async update(input: UpdateCourseInput): Promise<CourseEntity> {
    assertNonEmpty(input.id, "id")

    const existing = await this.repository.getById(input.id)
    if (!existing) {
      throw new NotFoundFailure(`Course ${input.id} not found`)
    }

    if (typeof input.title === "string") {
      assertNonEmpty(input.title, "title")
    }

    if (typeof input.rating === "number") {
      assertRange(input.rating, 0, 5, "rating")
    }

    return this.repository.update(input)
  }

  async getById(id: string): Promise<CourseEntity | null> {
    return this.repository.getById(id)
  }

  async getAll(query?: ListCoursesQuery): Promise<CourseEntity[]> {
    return this.repository.getAll(query)
  }

  async deleteById(id: string): Promise<void> {
    const existing = await this.repository.getById(id)
    if (!existing) {
      throw new NotFoundFailure(`Course ${id} not found`)
    }

    await this.repository.deleteById(id)
  }
}
