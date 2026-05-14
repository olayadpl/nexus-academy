import type { ICollectionRepository, CreateCollectionInput } from "../../domain/repositories/collection.repository"
import type { CollectionEntity } from "../../domain/entities/collection.entity"
import { CollectionMockDataSource } from "../datasources/collections/collection-mock.ds"
import { toEntity } from "../models/collection.model"

export class CollectionRepositoryImpl implements ICollectionRepository {
  constructor(private readonly dataSource: CollectionMockDataSource) {}

  async create(input: CreateCollectionInput): Promise<CollectionEntity> {
    const model = {
      id: `collection-${Date.now()}`,
      userId: input.userId,
      name: input.name,
      createdAt: new Date().toISOString(),
    }
    const created = await this.dataSource.create(model)
    return toEntity(created)
  }

  async getById(id: string): Promise<CollectionEntity | null> {
    const model = await this.dataSource.getById(id)
    return model ? toEntity(model) : null
  }

  async getByUserId(userId: string): Promise<CollectionEntity[]> {
    const models = await this.dataSource.getByUserId(userId)
    return models.map(toEntity)
  }

  async update(id: string, name: string): Promise<CollectionEntity> {
    const updated = await this.dataSource.update(id, { name })
    return toEntity(updated)
  }

  async deleteById(id: string): Promise<void> {
    await this.dataSource.deleteById(id)
  }
}