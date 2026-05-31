import type { RecommendedResourceModel } from "../models/recommended-resource.model"

export interface IRecommendedResourceRemoteDataSource {
  getAll(): Promise<RecommendedResourceModel[]>
}
