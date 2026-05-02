export interface AssessmentEntity {
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
