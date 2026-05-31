import type { RecommendedResourceEntity } from "../entities/recommended-resource.entity"

export interface IRecommendedResourceRepository {
  getAll(): Promise<RecommendedResourceEntity[]>
}
