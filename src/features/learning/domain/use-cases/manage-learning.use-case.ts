import type { LearningHomeEntity } from "../entities/learning.entity"
import type { ILearningRepository } from "../repositories/learning.repository"

export class ManageLearningUseCase {
  constructor(private readonly repository: ILearningRepository) {}

  async getHomeSnapshot(): Promise<LearningHomeEntity> {
    return this.repository.getHomeSnapshot()
  }
}
