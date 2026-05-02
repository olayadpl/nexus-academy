import type { CareerPathModel } from "../models/career-path.model"

export interface ICareerPathRemoteDataSource {
  create(model: CareerPathModel): Promise<CareerPathModel>
  update(id: string, model: Partial<CareerPathModel>): Promise<CareerPathModel>
  getById(id: string): Promise<CareerPathModel | null>
  getBySlug(slug: string): Promise<CareerPathModel | null>
  getAll(query?: { featuredOnly?: boolean }): Promise<CareerPathModel[]>
  deleteById(id: string): Promise<void>
}

export class CareerPathRemoteDataSource implements ICareerPathRemoteDataSource {
  async create(model: CareerPathModel): Promise<CareerPathModel> {
    throw new Error(`Remote datasource not implemented for create(${model.id})`)
  }

  async update(id: string, model: Partial<CareerPathModel>): Promise<CareerPathModel> {
    void model
    throw new Error(`Remote datasource not implemented for update(${id})`)
  }

  async getById(id: string): Promise<CareerPathModel | null> {
    void id
    return null
  }

  async getBySlug(slug: string): Promise<CareerPathModel | null> {
    void slug
    return null
  }

  async getAll(): Promise<CareerPathModel[]> {
    return []
  }

  async deleteById(id: string): Promise<void> {
    throw new Error(`Remote datasource not implemented for delete(${id})`)
  }
}
