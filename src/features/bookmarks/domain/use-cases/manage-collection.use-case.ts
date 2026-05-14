import type { ICollectionRepository, CreateCollectionInput } from "../repositories/collection.repository"
import type { CollectionEntity } from "../entities/collection.entity"

export class ManageCollectionUseCase {
  constructor(private readonly repository: ICollectionRepository) {}

  async create(input: CreateCollectionInput): Promise<CollectionEntity> {
    if (!input.name.trim()) {
      throw new Error("Collection name is required")
    }
    if (!input.userId) {
      throw new Error("User ID is required")
    }
    return await this.repository.create(input)
  }

  async getById(id: string): Promise<CollectionEntity | null> {
    return await this.repository.getById(id)
  }

  async getByUserId(userId: string): Promise<CollectionEntity[]> {
    return await this.repository.getByUserId(userId)
  }

  async update(id: string, name: string): Promise<CollectionEntity> {
    if (!name.trim()) {
      throw new Error("Collection name is required")
    }
    return await this.repository.update(id, name)
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.deleteById(id)
  }
}