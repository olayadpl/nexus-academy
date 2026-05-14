import type { CollectionEntity } from "../../domain/entities/collection.entity"

export interface CollectionModel {
  id: string
  userId: string
  name: string
  createdAt: string
}

export function toEntity(model: CollectionModel): CollectionEntity {
  return {
    id: model.id,
    userId: model.userId,
    name: model.name,
    createdAt: model.createdAt,
  }
}

export function fromEntity(entity: CollectionEntity): CollectionModel {
  return {
    id: entity.id,
    userId: entity.userId,
    name: entity.name,
    createdAt: entity.createdAt,
  }
}