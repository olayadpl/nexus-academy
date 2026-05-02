import type { EnrollmentEntity } from "../../domain/entities/enrollment.entity"
import type { EnrollmentModel } from "../models/enrollment.model"

export function toEnrollmentEntity(model: EnrollmentModel): EnrollmentEntity {
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

export function toEnrollmentModel(entity: EnrollmentEntity): EnrollmentModel {
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
