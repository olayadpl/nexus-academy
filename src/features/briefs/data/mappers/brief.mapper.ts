import type { BriefEntity } from "../../domain/entities/brief.entity"
import type { BriefModel } from "../models/brief.model"

export function toBriefEntity(model: BriefModel): BriefEntity {
  return {
    id: model.id,
    title: model.title,
    description: model.description,
    category: model.category,
    difficulty: model.difficulty,
    estimatedDurationMinutes: model.estimatedDurationMinutes,
    thumbnailUrl: model.thumbnailUrl,
    authorName: model.authorName,
    objectives: model.objectives,
    deliverables: model.deliverables,
    createdAt: model.createdAt,
  }
}

export function toBriefModel(entity: BriefEntity): BriefModel {
  return {
    id: entity.id,
    title: entity.title,
    description: entity.description,
    category: entity.category,
    difficulty: entity.difficulty,
    estimatedDurationMinutes: entity.estimatedDurationMinutes,
    thumbnailUrl: entity.thumbnailUrl,
    authorName: entity.authorName,
    objectives: entity.objectives,
    deliverables: entity.deliverables,
    createdAt: entity.createdAt,
  }
}
