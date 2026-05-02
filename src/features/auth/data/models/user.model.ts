import type { UserEntity } from "../../domain/entities/user.entity"

export interface SessionUserModel {
  id: string
  email: string
  name: string
  avatarUrl?: string
  provider: "google" | "cas-uci" | "credentials"
}

export function toEntity(model: SessionUserModel): UserEntity {
  return {
    id: model.id,
    email: model.email,
    name: model.name,
    avatarUrl: model.avatarUrl,
    provider: model.provider,
  }
}

export function fromEntity(entity: UserEntity): SessionUserModel {
  return {
    id: entity.id,
    email: entity.email,
    name: entity.name,
    avatarUrl: entity.avatarUrl,
    provider: entity.provider,
  }
}
