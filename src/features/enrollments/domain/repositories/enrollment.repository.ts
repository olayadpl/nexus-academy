import type { EnrollmentEntity } from "../entities/enrollment.entity"

export type CreateEnrollmentInput = EnrollmentEntity

export interface UpdateEnrollmentInput {
  id: string
  progressPercent?: number
  status?: EnrollmentEntity["status"]
  lastAccessedAt?: string
}

export interface IEnrollmentRepository {
  create(input: CreateEnrollmentInput): Promise<EnrollmentEntity>
  update(input: UpdateEnrollmentInput): Promise<EnrollmentEntity>
  getById(id: string): Promise<EnrollmentEntity | null>
  getByUserId(userId: string): Promise<EnrollmentEntity[]>
  getAll(): Promise<EnrollmentEntity[]>
  deleteById(id: string): Promise<void>
}
