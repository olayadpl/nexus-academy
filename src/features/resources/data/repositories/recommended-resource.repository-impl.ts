import type { RecommendedResourceEntity } from "../../domain/entities/recommended-resource.entity"
import type { IRecommendedResourceRepository } from "../../domain/repositories/recommended-resource.repository"
import type { IRecommendedResourceRemoteDataSource } from "../datasources/recommended-resource.remote-datasource"
import { modelToEntity } from "../mappers/recommended-resource.mapper"

export class RecommendedResourceRepositoryImpl implements IRecommendedResourceRepository {
  constructor(private readonly remoteDataSource: IRecommendedResourceRemoteDataSource) {}

  async getAll(): Promise<RecommendedResourceEntity[]> {
    const models = await this.remoteDataSource.getAll()
    return models.map(modelToEntity)
  }
}
