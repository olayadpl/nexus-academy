import type { AssessmentEntity } from "../../domain/entities/assessment.entity"

export interface AssessmentModel {
  id: string
  userId: string
  courseId: string
  resourceId: string
  title: string
  passingScore: number
  score: number
  status: "passed" | "failed" | "pending"
  submittedAt?: string
}

export function toEntity(model: AssessmentModel): AssessmentEntity {
  return {
    id: model.id,
    userId: model.userId,
    courseId: model.courseId,
    resourceId: model.resourceId,
    title: model.title,
    passingScore: model.passingScore,
    score: model.score,
    status: model.status,
    submittedAt: model.submittedAt,
  }
}

export function fromEntity(entity: AssessmentEntity): AssessmentModel {
  return {
    id: entity.id,
    userId: entity.userId,
    courseId: entity.courseId,
    resourceId: entity.resourceId,
    title: entity.title,
    passingScore: entity.passingScore,
    score: entity.score,
    status: entity.status,
    submittedAt: entity.submittedAt,
  }
}
