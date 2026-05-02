import type { CareerPathEntity } from "../../domain/entities/career-path.entity"
import type { UpdateCareerPathInput } from "../../domain/repositories/career-path.repository"
import type { CareerPathModel } from "../models/career-path.model"

export function modelToEntity(model: CareerPathModel): CareerPathEntity {
  return {
    id: model.id,
    slug: model.slug,
    title: model.title,
    description: model.description,
    featured: model.featured,
    estimatedHours: model.estimatedHours,
    level: model.level,
    milestones: model.milestones.map((milestone) => ({
      id: milestone.id,
      title: milestone.title,
      courseIds: [...milestone.courseIds],
      order: milestone.order,
    })),
  }
}

export function entityToModel(entity: CareerPathEntity): CareerPathModel {
  return {
    id: entity.id,
    slug: entity.slug,
    title: entity.title,
    description: entity.description,
    featured: entity.featured,
    estimatedHours: entity.estimatedHours,
    level: entity.level,
    milestones: entity.milestones.map((milestone) => ({
      id: milestone.id,
      title: milestone.title,
      courseIds: [...milestone.courseIds],
      order: milestone.order,
    })),
  }
}

export function updateInputToPartialModel(input: UpdateCareerPathInput): Partial<CareerPathModel> {
  return {
    title: input.title,
    description: input.description,
    featured: input.featured,
    estimatedHours: input.estimatedHours,
    level: input.level,
    milestones: input.milestones?.map((milestone) => ({
      id: milestone.id,
      title: milestone.title,
      courseIds: [...milestone.courseIds],
      order: milestone.order,
    })),
  }
}
