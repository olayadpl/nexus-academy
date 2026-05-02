import type { ResourceEntity } from "../../domain/entities/resource.entity"
import type { UpdateResourceInput } from "../../domain/repositories/resource.repository"
import type { ResourceModel } from "../models/resource.model"

export function modelToEntity(model: ResourceModel): ResourceEntity {
  return {
    id: model.id,
    courseId: model.courseId,
    title: model.title,
    type: model.type,
    resourceUrl: model.resourceUrl,
    durationMinutes: model.durationMinutes,
    completed: model.completed,
    order: model.order,
  }
}

export function entityToModel(entity: ResourceEntity): ResourceModel {
  return {
    id: entity.id,
    courseId: entity.courseId,
    title: entity.title,
    type: entity.type,
    resourceUrl: entity.resourceUrl,
    durationMinutes: entity.durationMinutes,
    completed: entity.completed,
    order: entity.order,
  }
}

export function updateInputToPartialModel(input: UpdateResourceInput): Partial<ResourceModel> {
  return {
    title: input.title,
    type: input.type,
    resourceUrl: input.resourceUrl,
    durationMinutes: input.durationMinutes,
    completed: input.completed,
    order: input.order,
  }
}
