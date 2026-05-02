import { NotFoundFailure, ValidationFailure } from "@/src/core/error/failures"
import type { AssessmentEntity } from "../entities/assessment.entity"
import type {
  CreateAssessmentInput,
  IAssessmentRepository,
  UpdateAssessmentInput,
} from "../repositories/assessment.repository"

function assertNonEmpty(value: string, fieldName: string) {
  if (!value.trim()) {
    throw new ValidationFailure(`${fieldName} is required`)
  }
}

function assertScore(value: number, fieldName: string) {
  if (Number.isNaN(value) || value < 0 || value > 100) {
    throw new ValidationFailure(`${fieldName} must be between 0 and 100`)
  }
}

export class ManageAssessmentUseCase {
  constructor(private readonly repository: IAssessmentRepository) {}

  async create(input: CreateAssessmentInput): Promise<AssessmentEntity> {
    assertNonEmpty(input.id, "id")
    assertNonEmpty(input.userId, "userId")
    assertNonEmpty(input.courseId, "courseId")
    assertNonEmpty(input.resourceId, "resourceId")
    assertNonEmpty(input.title, "title")
    assertScore(input.passingScore, "passingScore")
    assertScore(input.score, "score")

    return this.repository.create(input)
  }

  async update(input: UpdateAssessmentInput): Promise<AssessmentEntity> {
    assertNonEmpty(input.id, "id")

    if (typeof input.score === "number") {
      assertScore(input.score, "score")
    }

    const existing = await this.repository.getById(input.id)
    if (!existing) {
      throw new NotFoundFailure(`Assessment ${input.id} not found`)
    }

    return this.repository.update(input)
  }

  async getById(id: string): Promise<AssessmentEntity | null> {
    return this.repository.getById(id)
  }

  async getByUserId(userId: string): Promise<AssessmentEntity[]> {
    assertNonEmpty(userId, "userId")
    return this.repository.getByUserId(userId)
  }

  async getByCourseId(courseId: string): Promise<AssessmentEntity[]> {
    assertNonEmpty(courseId, "courseId")
    return this.repository.getByCourseId(courseId)
  }

  async getAll(): Promise<AssessmentEntity[]> {
    return this.repository.getAll()
  }

  async deleteById(id: string): Promise<void> {
    const existing = await this.repository.getById(id)
    if (!existing) {
      throw new NotFoundFailure(`Assessment ${id} not found`)
    }

    await this.repository.deleteById(id)
  }
}
