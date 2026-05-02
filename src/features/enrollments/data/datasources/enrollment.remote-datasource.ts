import type { EnrollmentModel } from "../models/enrollment.model"

export interface IEnrollmentRemoteDataSource {
  create(model: EnrollmentModel): Promise<EnrollmentModel>
  update(id: string, model: Partial<EnrollmentModel>): Promise<EnrollmentModel>
  getById(id: string): Promise<EnrollmentModel | null>
  getByUserId(userId: string): Promise<EnrollmentModel[]>
  getAll(): Promise<EnrollmentModel[]>
  deleteById(id: string): Promise<void>
}

export class EnrollmentRemoteDataSource implements IEnrollmentRemoteDataSource {
  async create(model: EnrollmentModel): Promise<EnrollmentModel> {
    return model
  }

  async update(id: string, model: Partial<EnrollmentModel>): Promise<EnrollmentModel> {
    void id
    void model
    throw new Error("EnrollmentRemoteDataSource.update not implemented")
  }

  async getById(id: string): Promise<EnrollmentModel | null> {
    void id
    return null
  }

  async getByUserId(userId: string): Promise<EnrollmentModel[]> {
    void userId
    return []
  }

  async getAll(): Promise<EnrollmentModel[]> {
    return []
  }

  async deleteById(id: string): Promise<void> {
    void id
    throw new Error("EnrollmentRemoteDataSource.deleteById not implemented")
  }
}
