import type { PreferenceModel } from "../models/preference.model"

export interface IPreferenceRemoteDataSource {
  create(model: PreferenceModel): Promise<PreferenceModel>
  update(id: string, model: Partial<PreferenceModel>): Promise<PreferenceModel>
  getById(id: string): Promise<PreferenceModel | null>
  getByUserId(userId: string): Promise<PreferenceModel | null>
  getAll(): Promise<PreferenceModel[]>
  deleteById(id: string): Promise<void>
}

export class PreferenceRemoteDataSource implements IPreferenceRemoteDataSource {
  async create(model: PreferenceModel): Promise<PreferenceModel> {
    return model
  }

  async update(id: string, model: Partial<PreferenceModel>): Promise<PreferenceModel> {
    void id
    void model
    throw new Error("PreferenceRemoteDataSource.update not implemented")
  }

  async getById(id: string): Promise<PreferenceModel | null> {
    void id
    return null
  }

  async getByUserId(userId: string): Promise<PreferenceModel | null> {
    void userId
    return null
  }

  async getAll(): Promise<PreferenceModel[]> {
    return []
  }

  async deleteById(id: string): Promise<void> {
    void id
    throw new Error("PreferenceRemoteDataSource.deleteById not implemented")
  }
}
