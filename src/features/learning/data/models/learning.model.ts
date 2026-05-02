import type { LearningHomeEntity } from "../../domain/entities/learning.entity"

export interface LearningHomeModel {
  greetingName: string
  stats: {
    coursesInProgress: number
    lessonsCompleted: number
    dayStreak: number
  }
}

export function toLearningEntity(model: LearningHomeModel): LearningHomeEntity {
  return {
    greetingName: model.greetingName,
    stats: model.stats,
  }
}
