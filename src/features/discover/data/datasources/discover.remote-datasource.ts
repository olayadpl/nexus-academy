import type { DiscoverModel } from "../models/discover.model"

export interface IDiscoverRemoteDataSource {
  create(model: DiscoverModel): Promise<DiscoverModel>
  update(id: string, model: Partial<DiscoverModel>): Promise<DiscoverModel | null>
  getById(id: string): Promise<DiscoverModel | null>
  getAll(): Promise<DiscoverModel[]>
  deleteById(id: string): Promise<boolean>
}

export class DiscoverRemoteDataSource implements IDiscoverRemoteDataSource {
  async create(model: DiscoverModel): Promise<DiscoverModel> {
    return model
  }

  async update(id: string, model: Partial<DiscoverModel>): Promise<DiscoverModel | null> {
    void id
    void model
    return null
  }

  async getById(id: string): Promise<DiscoverModel | null> {
    void id
    return null
  }

  async getAll(): Promise<DiscoverModel[]> {
    return []
  }

  async deleteById(id: string): Promise<boolean> {
    void id
    return false
  }
}
