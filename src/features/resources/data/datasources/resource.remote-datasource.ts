import type { ResourceModel } from "../models/resource.model"

export interface IResourceRemoteDataSource {
  create(model: ResourceModel): Promise<ResourceModel>
  update(id: string, model: Partial<ResourceModel>): Promise<ResourceModel>
  getById(id: string): Promise<ResourceModel | null>
  getByCourseId(courseId: string): Promise<ResourceModel[]>
  getAll(): Promise<ResourceModel[]>
  deleteById(id: string): Promise<void>
}

export class ResourceRemoteDataSource implements IResourceRemoteDataSource {
  async create(model: ResourceModel): Promise<ResourceModel> {
    throw new Error(`Remote datasource not implemented for create(${model.id})`)
  }

  async update(id: string, _model: Partial<ResourceModel>): Promise<ResourceModel> {
    throw new Error(`Remote datasource not implemented for update(${id})`)
  }

  async getById(_id: string): Promise<ResourceModel | null> {
    return null
  }

  async getByCourseId(_courseId: string): Promise<ResourceModel[]> {
    return []
  }

  async getAll(): Promise<ResourceModel[]> {
    return []
  }

  async deleteById(id: string): Promise<void> {
    throw new Error(`Remote datasource not implemented for delete(${id})`)
  }
}
