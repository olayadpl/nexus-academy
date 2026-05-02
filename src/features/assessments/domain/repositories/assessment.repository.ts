import type { AssessmentEntity } from "../entities/assessment.entity"

export type CreateAssessmentInput = AssessmentEntity

export interface UpdateAssessmentInput {
  id: string
  score?: number
  status?: AssessmentEntity["status"]
  submittedAt?: string
}

export interface IAssessmentRepository {
  create(input: CreateAssessmentInput): Promise<AssessmentEntity>
  update(input: UpdateAssessmentInput): Promise<AssessmentEntity>
  getById(id: string): Promise<AssessmentEntity | null>
  getByUserId(userId: string): Promise<AssessmentEntity[]>
  getByCourseId(courseId: string): Promise<AssessmentEntity[]>
  getAll(): Promise<AssessmentEntity[]>
  deleteById(id: string): Promise<void>
}
