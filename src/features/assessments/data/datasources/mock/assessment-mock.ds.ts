import type { IAssessmentRemoteDataSource } from "../assessment.remote-datasource"
import type { AssessmentModel } from "../../models/assessment.model"

const ASSESSMENT_FIXTURES: AssessmentModel[] = [
  {
    id: "assessment-1",
    userId: "demo-user",
    courseId: "course-communication",
    resourceId: "lesson-1",
    title: "Quiz de comunicacion basica",
    passingScore: 70,
    score: 84,
    status: "passed",
    submittedAt: "2026-03-22T10:30:00.000Z",
  },
  {
    id: "assessment-2",
    userId: "demo-user",
    courseId: "course-study-methods",
    resourceId: "study-1",
    title: "Evaluacion de planificacion",
    passingScore: 75,
    score: 62,
    status: "failed",
    submittedAt: "2026-03-25T13:00:00.000Z",
  },
  {
    id: "assessment-3",
    userId: "demo-user",
    courseId: "course-study-methods",
    resourceId: "study-2",
    title: "Active recall checkpoint",
    passingScore: 75,
    score: 0,
    status: "pending",
  },
]

const mockDb = new Map<string, AssessmentModel>(ASSESSMENT_FIXTURES.map((item) => [item.id, item]))

export class AssessmentMockDataSource implements IAssessmentRemoteDataSource {
  async create(model: AssessmentModel): Promise<AssessmentModel> {
    if (mockDb.has(model.id)) {
      throw new Error(`Assessment ${model.id} already exists`)
    }

    mockDb.set(model.id, model)
    return model
  }

  async update(id: string, model: Partial<AssessmentModel>): Promise<AssessmentModel> {
    const current = mockDb.get(id)

    if (!current) {
      throw new Error(`Assessment ${id} not found`)
    }

    const updated: AssessmentModel = {
      ...current,
      ...model,
      id: current.id,
      userId: current.userId,
      courseId: current.courseId,
      resourceId: current.resourceId,
      title: current.title,
      passingScore: current.passingScore,
    }

    mockDb.set(id, updated)
    return updated
  }

  async getById(id: string): Promise<AssessmentModel | null> {
    return mockDb.get(id) ?? null
  }

  async getByUserId(userId: string): Promise<AssessmentModel[]> {
    return [...mockDb.values()]
      .filter((item) => item.userId === userId)
      .sort((a, b) => (Date.parse(b.submittedAt ?? "1970-01-01") - Date.parse(a.submittedAt ?? "1970-01-01")))
  }

  async getByCourseId(courseId: string): Promise<AssessmentModel[]> {
    return [...mockDb.values()]
      .filter((item) => item.courseId === courseId)
      .sort((a, b) => a.title.localeCompare(b.title))
  }

  async getAll(): Promise<AssessmentModel[]> {
    return [...mockDb.values()].sort((a, b) => a.courseId.localeCompare(b.courseId))
  }

  async deleteById(id: string): Promise<void> {
    const deleted = mockDb.delete(id)

    if (!deleted) {
      throw new Error(`Assessment ${id} not found`)
    }
  }
}
