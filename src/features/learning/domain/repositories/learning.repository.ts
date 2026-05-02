import type { LearningHomeEntity } from "../entities/learning.entity"

export interface ILearningRepository {
  getHomeSnapshot(): Promise<LearningHomeEntity>
}
