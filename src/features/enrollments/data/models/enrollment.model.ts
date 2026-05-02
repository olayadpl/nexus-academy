import type { EnrollmentEntity } from "../../domain/entities/enrollment.entity"

export interface EnrollmentModel {
  id: string
  userId: string
  courseId: string
  progressPercent: number
  status: "active" | "completed" | "paused"
  enrolledAt: string
  lastAccessedAt: string
}

export function toEntity(model: EnrollmentModel): EnrollmentEntity {
  return {
    id: model.id,
    userId: model.userId,
    courseId: model.courseId,
    progressPercent: model.progressPercent,
    status: model.status,
    enrolledAt: model.enrolledAt,
    lastAccessedAt: model.lastAccessedAt,
  }
}

export function fromEntity(entity: EnrollmentEntity): EnrollmentModel {
  return {
    id: entity.id,
    userId: entity.userId,
    courseId: entity.courseId,
    progressPercent: entity.progressPercent,
    status: entity.status,
    enrolledAt: entity.enrolledAt,
    lastAccessedAt: entity.lastAccessedAt,
  }
}
