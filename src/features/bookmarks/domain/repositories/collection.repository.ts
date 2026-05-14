import type { CollectionEntity } from "../entities/collection.entity"

export type CreateCollectionInput = Omit<CollectionEntity, "id" | "createdAt">

export interface ICollectionRepository {
  create(input: CreateCollectionInput): Promise<CollectionEntity>
  getById(id: string): Promise<CollectionEntity | null>
  getByUserId(userId: string): Promise<CollectionEntity[]>
  update(id: string, name: string): Promise<CollectionEntity>
  deleteById(id: string): Promise<void>
}