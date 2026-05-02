import type { DiscoverEntity } from "../../domain/entities/discover.entity"
import type { IDiscoverRepository } from "../../domain/repositories/discover.repository"
import type { IDiscoverRemoteDataSource } from "../datasources/discover.remote-datasource"
import { NotFoundFailure } from "@/src/core/error/failures"
import { fromEntity, toEntity } from "../models/discover.model"

export class DiscoverRepositoryImpl implements IDiscoverRepository {
  constructor(private readonly remoteDataSource: IDiscoverRemoteDataSource) {}

  async getMain(): Promise<DiscoverEntity> {
    const model = await this.remoteDataSource.getById("discover-main")
    if (!model) {
      throw new NotFoundFailure("Discover main content not found")
    }

    return toEntity(model)
  }

  async create(entity: DiscoverEntity): Promise<DiscoverEntity> {
    const model = await this.remoteDataSource.create(fromEntity(entity))
    return toEntity(model)
  }

  async update(
    id: string,
    entity: Partial<DiscoverEntity>,
  ): Promise<DiscoverEntity | null> {
    const model = await this.remoteDataSource.update(id, entity)

    if (!model) {
      return null
    }

    return toEntity(model)
  }

  async getById(id: string): Promise<DiscoverEntity | null> {
    const model = await this.remoteDataSource.getById(id)

    if (!model) {
      return null
    }

    return toEntity(model)
  }

  async getAll(): Promise<DiscoverEntity[]> {
    const models = await this.remoteDataSource.getAll()
    return models.map(toEntity)
  }

  async deleteById(id: string): Promise<boolean> {
    return this.remoteDataSource.deleteById(id)
  }
}
