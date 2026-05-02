import type { LearningHomeEntity } from "../../domain/entities/learning.entity"
import type { ILearningRepository } from "../../domain/repositories/learning.repository"
import type { ILearningRemoteDataSource } from "../datasources/learning.remote-datasource"
import { toLearningEntity } from "../models/learning.model"

export class LearningRepositoryImpl implements ILearningRepository {
  constructor(private readonly remoteDataSource: ILearningRemoteDataSource) {}

  async getHomeSnapshot(): Promise<LearningHomeEntity> {
    const model = await this.remoteDataSource.getHomeSnapshot()
    return toLearningEntity(model)
  }
}
