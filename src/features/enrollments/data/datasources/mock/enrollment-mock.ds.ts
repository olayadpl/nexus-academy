import type { IEnrollmentRemoteDataSource } from "../enrollment.remote-datasource"
import type { EnrollmentModel } from "../../models/enrollment.model"

const ENROLLMENT_FIXTURES: EnrollmentModel[] = [
  {
    id: "enroll-1",
    userId: "demo-user",
    courseId: "course-communication",
    progressPercent: 64,
    status: "active",
    enrolledAt: "2026-03-01T10:00:00.000Z",
    lastAccessedAt: "2026-03-28T18:40:00.000Z",
  },
  {
    id: "enroll-2",
    userId: "demo-user",
    courseId: "course-study-methods",
    progressPercent: 20,
    status: "active",
    enrolledAt: "2026-03-12T14:00:00.000Z",
    lastAccessedAt: "2026-03-29T08:15:00.000Z",
  },
  {
    id: "enroll-3",
    userId: "demo-user",
    courseId: "course-critical-thinking",
    progressPercent: 100,
    status: "completed",
    enrolledAt: "2026-02-15T14:00:00.000Z",
    lastAccessedAt: "2026-03-05T08:15:00.000Z",
  },
]

const mockDb = new Map<string, EnrollmentModel>(ENROLLMENT_FIXTURES.map((item) => [item.id, item]))

export class EnrollmentMockDataSource implements IEnrollmentRemoteDataSource {
  async create(model: EnrollmentModel): Promise<EnrollmentModel> {
    if (mockDb.has(model.id)) {
      throw new Error(`Enrollment ${model.id} already exists`)
    }

    mockDb.set(model.id, model)
    return model
  }

  async update(id: string, model: Partial<EnrollmentModel>): Promise<EnrollmentModel> {
    const current = mockDb.get(id)

    if (!current) {
      throw new Error(`Enrollment ${id} not found`)
    }

    const updated: EnrollmentModel = {
      ...current,
      ...model,
      id: current.id,
      userId: current.userId,
      courseId: current.courseId,
    }

    mockDb.set(id, updated)
    return updated
  }

  async getById(id: string): Promise<EnrollmentModel | null> {
    return mockDb.get(id) ?? null
  }

  async getByUserId(userId: string): Promise<EnrollmentModel[]> {
    return [...mockDb.values()]
      .filter((item) => item.userId === userId)
      .sort((a, b) => Date.parse(b.lastAccessedAt) - Date.parse(a.lastAccessedAt))
  }

  async getAll(): Promise<EnrollmentModel[]> {
    return [...mockDb.values()].sort((a, b) => Date.parse(b.lastAccessedAt) - Date.parse(a.lastAccessedAt))
  }

  async deleteById(id: string): Promise<void> {
    const deleted = mockDb.delete(id)

    if (!deleted) {
      throw new Error(`Enrollment ${id} not found`)
    }
  }
}
