import type { DiscoverEntity } from "../entities/discover.entity"

export interface IDiscoverRepository {
  getMain(): Promise<DiscoverEntity>
  create(entity: DiscoverEntity): Promise<DiscoverEntity>
  update(id: string, entity: Partial<DiscoverEntity>): Promise<DiscoverEntity | null>
  getById(id: string): Promise<DiscoverEntity | null>
  getAll(): Promise<DiscoverEntity[]>
  deleteById(id: string): Promise<boolean>
}
