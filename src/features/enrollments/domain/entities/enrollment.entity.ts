export interface EnrollmentEntity {
  id: string
  userId: string
  courseId: string
  progressPercent: number
  status: "active" | "completed" | "paused"
  enrolledAt: string
  lastAccessedAt: string
}
