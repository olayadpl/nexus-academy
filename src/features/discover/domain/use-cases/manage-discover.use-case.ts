import type { DiscoverEntity } from "../entities/discover.entity"
import type { IDiscoverRepository } from "../repositories/discover.repository"

export class ManageDiscoverUseCase {
  constructor(private readonly repository: IDiscoverRepository) {}

  async getMain(): Promise<DiscoverEntity> {
    return this.repository.getMain()
  }

  async create(entity: DiscoverEntity): Promise<DiscoverEntity> {
    return this.repository.create(entity)
  }

  async update(
    id: string,
    entity: Partial<DiscoverEntity>,
  ): Promise<DiscoverEntity | null> {
    return this.repository.update(id, entity)
  }

  async getById(id: string): Promise<DiscoverEntity | null> {
    return this.repository.getById(id)
  }

  async getAll(): Promise<DiscoverEntity[]> {
    return this.repository.getAll()
  }

  async deleteById(id: string): Promise<boolean> {
    return this.repository.deleteById(id)
  }
}
