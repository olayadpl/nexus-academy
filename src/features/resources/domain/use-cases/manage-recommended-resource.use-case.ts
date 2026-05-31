import type { RecommendedResourceEntity } from "../entities/recommended-resource.entity"
import type { IRecommendedResourceRepository } from "../repositories/recommended-resource.repository"

export class ManageRecommendedResourceUseCase {
  constructor(private readonly repository: IRecommendedResourceRepository) {}

  async getAll(): Promise<RecommendedResourceEntity[]> {
    return this.repository.getAll()
  }
}
