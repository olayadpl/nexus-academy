import { NotFoundFailure, ValidationFailure } from "@/src/core/error/failures"
import type { EnrollmentEntity } from "../entities/enrollment.entity"
import type {
  CreateEnrollmentInput,
  IEnrollmentRepository,
  UpdateEnrollmentInput,
} from "../repositories/enrollment.repository"

function assertNonEmpty(value: string, fieldName: string) {
  if (!value.trim()) {
    throw new ValidationFailure(`${fieldName} is required`)
  }
}

function assertValidProgress(progressPercent: number) {
  if (progressPercent < 0 || progressPercent > 100) {
    throw new ValidationFailure("progressPercent must be between 0 and 100")
  }
}

export class ManageEnrollmentUseCase {
  constructor(private readonly repository: IEnrollmentRepository) {}

  async create(input: CreateEnrollmentInput): Promise<EnrollmentEntity> {
    assertNonEmpty(input.id, "id")
    assertNonEmpty(input.userId, "userId")
    assertNonEmpty(input.courseId, "courseId")
    assertValidProgress(input.progressPercent)

    return this.repository.create(input)
  }

  async update(input: UpdateEnrollmentInput): Promise<EnrollmentEntity> {
    assertNonEmpty(input.id, "id")

    if (typeof input.progressPercent === "number") {
      assertValidProgress(input.progressPercent)
    }

    const existing = await this.repository.getById(input.id)
    if (!existing) {
      throw new NotFoundFailure(`Enrollment ${input.id} not found`)
    }

    return this.repository.update(input)
  }

  async getById(id: string): Promise<EnrollmentEntity | null> {
    return this.repository.getById(id)
  }

  async getByUserId(userId: string): Promise<EnrollmentEntity[]> {
    assertNonEmpty(userId, "userId")
    return this.repository.getByUserId(userId)
  }

  async getAll(): Promise<EnrollmentEntity[]> {
    return this.repository.getAll()
  }

  async deleteById(id: string): Promise<void> {
    const existing = await this.repository.getById(id)
    if (!existing) {
      throw new NotFoundFailure(`Enrollment ${id} not found`)
    }

    await this.repository.deleteById(id)
  }
}
