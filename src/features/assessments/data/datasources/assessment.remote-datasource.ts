import type { AssessmentModel } from "../models/assessment.model"

export interface IAssessmentRemoteDataSource {
  create(model: AssessmentModel): Promise<AssessmentModel>
  update(id: string, model: Partial<AssessmentModel>): Promise<AssessmentModel>
  getById(id: string): Promise<AssessmentModel | null>
  getByUserId(userId: string): Promise<AssessmentModel[]>
  getByCourseId(courseId: string): Promise<AssessmentModel[]>
  getAll(): Promise<AssessmentModel[]>
  deleteById(id: string): Promise<void>
}

export class AssessmentRemoteDataSource implements IAssessmentRemoteDataSource {
  async create(model: AssessmentModel): Promise<AssessmentModel> {
    return model
  }

  async update(id: string, model: Partial<AssessmentModel>): Promise<AssessmentModel> {
    void id
    void model
    throw new Error("AssessmentRemoteDataSource.update not implemented")
  }

  async getById(id: string): Promise<AssessmentModel | null> {
    void id
    return null
  }

  async getByUserId(userId: string): Promise<AssessmentModel[]> {
    void userId
    return []
  }

  async getByCourseId(courseId: string): Promise<AssessmentModel[]> {
    void courseId
    return []
  }

  async getAll(): Promise<AssessmentModel[]> {
    return []
  }

  async deleteById(id: string): Promise<void> {
    void id
    throw new Error("AssessmentRemoteDataSource.deleteById not implemented")
  }
}
